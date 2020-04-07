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
            # grab the userid and password
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
                cur.execute("INSERT INTO Takes(web_user_id,CRN,grade,term,name,credits) VALUES (%s, %s, %s, %s , %s, %s)" \
                    , ( int(web_user_id),str(course["CRN"]), str(course["Grade"]),str(course["Term"]) \
                    ,str(course["Name"]),str(course["Credit"]))) 
                mysql.connection.commit()
            cur.close()
    except IOError as e:
        print(e)
        cur.close()

    return jsonify(courseList)
    
# returns true if user has courses false other wise
def hasCourses(web_user_Id): 
    cur = mysql.connection.cursor()
    try:# check if user exists
        cur.execute("SELECT COUNT(*) AS count FROM Takes WHERE web_user_Id = %s", [web_user_Id]) # Select the amount of users that match web_user_Id = %s
        if cur.fetchone().get("count"):
            cur.execute("SELECT * FROM Users WHERE web_user_Id = %s " , [web_user_Id]) # look for user password
            results = cur.fetchone()
            if len(results) > 0:
                print("user has taken some courses")
                return True
            else: 
                return False
    except IOError as e:
        print(e)
    return False


#this function will return a list of web_user_id in the Users table
def read_db():
    cur = mysql.connection.cursor()
    select_ID_query = 'SELECT web_user_id FROM Users'
    cur.execute(select_ID_query)
    records = cur.fetchall()
    id_list = []
    for row in records:
        id_list.append(row.get('web_user_id'))
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

#this function will delete user based on the web_user_id and the boolean option chosen by users
#this function will delte the user or their taken course only, not future requirement course 
def deleteUser(web_id, deleteUser): #deleteUser is a boolean
    cur = mysql.connection.cursor()
    web_id_list = read_db() #Get a list of web user id
    print(web_id_list)
    e = None
    if(deleteUser == True): #if deleteUser is true then delete everything related to this user
        if(web_id not in web_id_list):
            return 'User not in the database!'
        try:
            cur.execute("DELETE FROM Users WHERE web_user_id = %s", [web_id])
            mysql.connection.commit()
            cur.close()
            return 'DELETE ALL FROM USERS'
        except IOError as e:
            print(e)
        cur.close()
        return 'from delete user function'
    else:#if deleteUser is false then we just delete the courses that they have taken
        if(web_id not in web_id_list):
            return 'User not in the database'
        try:
            cur.execute("DELETE FROM Takes WHERE web_user_id = %s", [web_id])
            mysql.connection.commit()
            cur.close()
            return 'Delete all taken courses from users'
        except IOError as e:
            print(e)
			
        cur.close()
        # if we reach here an error occured
        return e

#this function will return column of a table as a list
#def read_db(column_name, table_name):	
#this function will return a list with all the taken course of a given web_user_id
def read_Courses(web_id):
    cur = mysql.connection.cursor()
    takenCourseList = []
    try:
        select_query = 'SELECT * FROM Takes WHERE web_user_id = %s'
        cur.execute(select_query, [web_id])
        rows = cur.fetchall()
        for row in rows:
            courseDict = {}
            courseDict["Name"]  = row.get('name')
            courseDict["CRN"] = row.get('CRN')
            courseDict["Term"] = row.get('term')
            courseDict["Credit"] = row.get('credits')
            courseDict["Grade"] = row.get('grade')
            print("data",row.get('CRN'), row.get('Name'), row.get('term'), row.get('Credits'),row.get('grade'))
            takenCourseList.append(courseDict)
        cur.close()
    except IOError as e:
        print(e)
		
    return jsonify(takenCourseList)



if __name__ == "__main__":
    print(insertUser())