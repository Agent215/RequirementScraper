from flask_mysqldb import MySQL
from flask import request
from flask import jsonify
from app import app
from DarsScrape import DarsScrape
from Crypto.Cipher import AES
from base64 import b64encode, b64decode
from Crypto.Random import get_random_bytes
from getAllCourses import getCIScourses
import json

import sys


mysql = MySQL(app)



def insertUser():

    # read in encryption key
    file_in = open("encryptedKey.bin", "rb")
    key = file_in.read()
    file_in.close()
    cipher = AES.new(key, AES.MODE_EAX)
    e = None
    cur = mysql.connection.cursor()
    # grab username and password from front end
    TU_ID = request.json['username']
    passW =request.json['password']
    # encrypt password
    ciphertext, tag = cipher.encrypt_and_digest(passW.encode("utf8"))
    nonce = cipher.nonce
	#get a list of current user in the database
    web_user_Id = None
    try:
        cur.execute("SELECT COUNT(*) AS count FROM Users WHERE TU_ID = %s", [TU_ID]) # Select the amount of users that match web_user_Id = %s
        if cur.fetchone().get("count"):
            print("Users in db exists")
            cur.execute("SELECT web_user_Id FROM Users WHERE TU_ID = %s", [TU_ID])
            results = cur.fetchone()
            web_user_Id = results.get("web_user_Id")
        else:
            # this is encrpyton data for that user
            cur.execute("INSERT INTO Users(TU_ID, password,tag,nonce) VALUES (%s, %s, %s, %s)", (TU_ID, ciphertext,tag, nonce))
            web_user_Id = cur.lastrowid
            mysql.connection.commit()
        cur.close()
    except IOError as e:
          print(e)

    return jsonify({ "user_id": web_user_Id, "error": e })

# function to insert courses to database
def insertCourses(web_user_id):
    e = None  # hold errors 
    courseList = None
    TU_ID = None
    keyFile = open("encryptedKey.bin", "rb")
    # get encryption key
    key = keyFile.read()
    keyFile.close()
    cur = mysql.connection.cursor()
    # if the user does have courses then we should not use this function, instead we should use the readcourses function
    # that function reads and outputs the data as json
    try:# check if user exists
        cur.execute("SELECT COUNT(*) AS count FROM Users WHERE web_user_Id = %s", [web_user_id]) # Select the amount of users that match web_user_Id = %s
        if cur.fetchone().get("count"):
            print("Users in db exists")
            cur.execute("SELECT * FROM Users WHERE web_user_Id = %s " , [web_user_id]) # look for user password
            results = cur.fetchone()
            # grab the userid and pass word
            # decrypt password
            ciphertext = results.get('password')
            nonce = results.get('nonce')
            tag = results.get('tag')
            cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
            pw = cipher.decrypt_and_verify(ciphertext, tag).decode('utf8')
            TU_ID = results.get('TU_ID')

        #scrape courses using credentials gathered from above
        courseList = DarsScrape(TU_ID,pw)
        #for each course returned insert into databse associate with user
        for course in courseList:
            cur.execute("INSERT INTO Takes(web_user_id,CRN) VALUES (%s, %s)", ( int(web_user_id),str(course)))
            mysql.connection.commit()
        cur.close()
    except IOError as e:
        print(e)
        cur.close()

    return jsonify(courseList)
    

def read_db():
    cur = mysql.connection.cursor()
    select_ID_query = 'SELECT TU_ID FROM Users'
    cur.execute(select_ID_query)
    records = cur.fetchall()
    id_list = []
    for row in records:
        id_list.append(row.get('TU_ID'))
    cur.close()	
    return id_list

# this function inserts all the possible CIS courses into the courses table
def insertALLCourses():
    allcourses = []
    try:
        allcourses = getCIScourses()
        cur = mysql.connection.cursor()
        for course in allcourses:
            print(course)
            cur.execute("INSERT INTO courses(CRN,Name,Credits,Description) VALUES \
            (%s, %s, %s, %s)", ( str(course["CRN"]),str(course["Name"]),int(course["Credit"]) \
            ,str(course["Description"])))
            mysql.connection.commit()
        cur.close()
    except IOError as e:
        print(e)
    return jsonify(allcourses)

if __name__ == "__main__":
    print(insertUser())