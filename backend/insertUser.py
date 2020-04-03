from flask_mysqldb import MySQL
from flask import request
from flask import jsonify
from app import app
from DarsScrape import DarsScrape
import sys


mysql = MySQL(app)

def insertUser():
    e = None
    cur = mysql.connection.cursor()
    TU_ID = request.json['username']
    passW =request.json['password']
	#get a list of current user in the database
    user_list = read_db()
    try:
        if(TU_ID in user_list):
            print("Users in db exists")
            return 'Not inserted'
        else:
            cur.execute("INSERT INTO Users(TU_ID, password) VALUES (%s, %s)", (TU_ID, passW))
            mysql.connection.commit()
        cur.close()
    except IOError as e:
          print(e)
		
    id = TU_ID	
    return jsonify({ "user_id": id, "error": e })

# function to insert courses to database
def insertCourses():
    e = None  # hold errors 
    courseList = None
    cur = mysql.connection.cursor()
    # i think actually the tu_id should be passed as an argument. this function will be called in the 
    # get courses endpoint. we first check if the user has courses, then if user has no courses,call this function
    # passing the TU_id of the user to get courses for.
    # if the user does have courses then we should not use this function, instead we should use the readcourses function
    # that function reads and outputs the data as json
    TU_ID = request.json['username']  # grab username/TUID from frontend, hardcode this if you need to test
    user_list = read_db()
   
    try:
        if(TU_ID in user_list):  # check if user exists
            print("Users in db exists")
            cur.execute("SELECT password, web_user_id FROM Users WHERE TU_ID = %s " , [TU_ID]) # look for user password
            results = cur.fetchall()
            # grab the userid and pass word
            pw = results[0].get('password')
            web_user_id = results[0].get('web_user_id')
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