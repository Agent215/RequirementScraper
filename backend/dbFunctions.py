from flask_mysqldb import MySQL
from flask import request
from flask import jsonify
from app import app
from scraping.CourseScrape import CourseScrape
from Crypto.Cipher import AES
from base64 import b64encode, b64decode
from Crypto.Random import get_random_bytes
from scraping.getAllCourses import getCIScourses
from scraping.scrapeReqs import scrapeReqs
from scraping.scrapeProgramCode import scrapeProgramCode
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
def insertCourses(web_user_id , sourceHtml):
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
            courseList = CourseScrape(TU_ID,pw,sourceHtml)
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
            cur.execute('DELETE FROM Requirement WHERE web_user_id = %s', [web_id])
            cur.execute("DELETE FROM Takes WHERE web_user_id = %s", [web_id])
            mysql.connection.commit()
            cur.close()
            return 'Delete all taken courses and requirement from users'
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

def updatePassword(user,passw):
    cur = mysql.connection.cursor()
    e = None
    file_in = open("encryptedKey.bin", "rb")
    key = file_in.read()
    file_in.close()
    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(passw.encode("utf8"))
    nonce = cipher.nonce
    try:# check if user exists
        cur.execute("SELECT COUNT(*) AS count FROM Users WHERE web_user_Id = %s", [user]) # Select the amount of users that match web_user_Id = %s
        if cur.fetchone().get("count"):
            print("Users in db exists")
            cur.execute("SELECT * FROM Users WHERE web_user_Id = %s " , [user]) # look for user password
            results = cur.fetchone()
            web_user = results.get("web_user_id")
            cur.execute("UPDATE Users SET password = %s,tag = %s,nonce= %s WHERE web_user_Id = %s" ,([ciphertext],[tag], [nonce], [web_user]))
    except IOError as e:
        print(e)
        return e
    return "password changed"

#this function will insert the requirement of a user into a requirement table
def insertRequirement(web_id, sourceHtml, proCode):
    error = None
    cur = mysql.connection.cursor()
    keyFile = open("encryptedKey.bin", "rb")
    # get password and decrpyt
    key = keyFile.read()
    keyFile.close()
    cur.execute("SELECT * FROM Users WHERE web_user_Id = %s " , [web_id])
    result = cur.fetchone()
    Tu_id = result.get("TU_ID")
    passW = result.get("password")
    nonce = result.get('nonce')
    tag = result.get('tag')
    cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
    pw = cipher.decrypt_and_verify(passW, tag).decode('utf8')
    # end encryption  stuff
    requiredList = scrapeReqs(Tu_id,pw,sourceHtml)
    data =  json.dumps(requiredList, sort_keys = True,indent=4, separators=(',', ': '))
    #Get the program code for user
    #######
    print("attempting to insert data: ",requiredList)
    try:
        insert_query = '''Insert into Requirement (Req_data, web_user_id, ProgramCode) VALUES (%s, %s, %s) '''
        # programCode is 1 for everyone for now, we need to scrape that and insert to db for each user
        insert_data = (data, web_id, proCode)
        cur.execute(insert_query, insert_data)
        mysql.connection.commit()
        print('Inserted requirement Successfuly')
        cur.close()
        return data
    except IOError as error:
        print(error)
        return error
    cur.close()

    return error

#this function will read the data from the requirement table and return the data
def readRequirement(web_id):
    cur = mysql.connection.cursor()
    getQuery = 'Select * from Requirement where web_user_id = %s'
    cur.execute(getQuery, [web_id])
    result = cur.fetchone()
    data = result.get("Req_data")
    print(data)
    cur.close()
    return data

#this function will check if a user with requirement exists, if not then return false
def hasRequirement(web_id):
    cur = mysql.connection.cursor()
    error = None
    try:
        checkQuery = 'Select web_user_id, COUNT(*) FROM Requirement GROUP BY web_user_id HAVING web_user_id = %s'
        cur.execute(checkQuery, [web_id])
        cur.fetchall()
        row_count = cur.rowcount
        mysql.connection.commit()
        cur.close()
    except IOError as error:
        print (error)
    if row_count == 1: #since the web_user_id is a primary key, there can only be one!
        return True
	
    return False

def getCredentials(web_id):
    e = None  # hold errors 
    TU_ID = None
    pw = None
    credentials = []
    # get encryption key
    keyFile = open("encryptedKey.bin", "rb")
    key = keyFile.read()
    keyFile.close()
    cur = mysql.connection.cursor()
    # if the user does have courses then we should not use this function, instead we should use the readcourses function
    # that function reads and outputs the data as json
    try:# check if user exists
        cur.execute("SELECT COUNT(*) AS count FROM Users WHERE web_user_Id = %s", [web_id]) # Select the amount of users that match web_user_Id = %s
        if cur.fetchone().get("count"):
            print("Users in db exists")
            cur.execute("SELECT * FROM Users WHERE web_user_Id = %s " , [web_id]) # look for user password
            results = cur.fetchone()
            # grab the userid and password
            # decrypt password
            ciphertext = results.get('password')
            nonce = results.get('nonce')
            tag = results.get('tag')
            cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
            pw = cipher.decrypt_and_verify(ciphertext, tag).decode('utf8')
            TU_ID = results.get('TU_ID')
            credentials.append(TU_ID)
            credentials.append(pw)
    except IOError as e:
        return e
    return credentials
    

if __name__ == "__main__":
    print(insertUser())