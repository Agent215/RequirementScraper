from flask_mysqldb import MySQL
from flask import request
from flask import jsonify
from app import app
from DarsScrape import DarsScrape
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import sys


mysql = MySQL(app)
key = get_random_bytes(16)


def insertUser():

    file_out = open("encryptedKey.bin", "wb")
    file_out.write(key)
    print(key)
    cipher = AES.new(key, AES.MODE_EAX)
    e = None
    cur = mysql.connection.cursor()
    TU_ID = request.json['username']
    passW =request.json['password']
    ciphertext, tag = cipher.encrypt_and_digest(passW.encode("utf8"))
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
            cur.execute("INSERT INTO Users(TU_ID, password) VALUES (%s, %s)", (TU_ID, ciphertext))
            web_user_Id = cur.lastrowid
            mysql.connection.commit()
        cur.close()
    except IOError as e:
          print(e)

    return jsonify({ "user_id": web_user_Id, "error": e })

# function to insert courses to database
def insertCourses(web_user_id):
    file_out = open("encryptedKey.bin", "wb")
    e = None  # hold errors 
    courseList = None
    TU_ID = None
    keyFile = open("encryptedKey.bin", "rb")
    # get encryption key
    key = keyFile.read()
    # if no key exists lets make one
    if (len(key) < 2):
        key = get_random_bytes(16)
        file_out.write(key)

    cur = mysql.connection.cursor()
    # we first check if the user has courses, then if user has no courses,call this function
    # passing the TU_id of the user to get courses for.
    # if the user does have courses then we should not use this function, instead we should use the readcourses function
    # that function reads and outputs the data as json
    try:# check if user exists
        cur.execute("SELECT COUNT(*) AS count FROM Users WHERE web_user_Id = %s", [web_user_id]) # Select the amount of users that match web_user_Id = %s
        if cur.fetchone().get("count"):
            print("Users in db exists")
            cur.execute("SELECT password, TU_ID FROM Users WHERE web_user_Id = %s " , [web_user_id]) # look for user password
            results = cur.fetchone()
            # grab the userid and pass word
            # decrypt password
            pw = results.get('password').encode("utf8")
            print (pw)
            print("this is the key: ")
            print(key)
            cipher = AES.new(key, AES.MODE_EAX)
            pw = cipher.decrypt(pw)
            print(pw)
            TU_ID = results.get('TU_ID')
    except IOError as e:
        print(e)
    try:
        #scrape courses using credentials gathered from above
        courseList = DarsScrape(TU_ID,pw)
        print(courseList)
        #for each course returned insert into databse associate with user
        for course in courseList:
            print(course)
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
    #print("Total number of rows: ", cur.rowcount)
    id_list = []
    for row in records:
        #print(row.get('TU_ID'))
        id_list.append(row.get('TU_ID'))
    #print(id_list) #get the list of unique id
    cur.close()	
    return id_list

if __name__ == "__main__":
    print(insertUser())