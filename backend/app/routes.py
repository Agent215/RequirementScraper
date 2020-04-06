from app import app
from flask import jsonify
from flask import Flask
from flask import request

from testScrape import testScrape
from getAllCourses import getCIScourses
from DarsScrape import DarsScrape
<<<<<<< HEAD
from insertUser import insertUser, insertCourses ,insertALLCourses, deleteUser, read_db2, read_db
=======
from insertUser import insertUser, insertCourses ,insertALLCourses, deleteUser, read_Courses, hasCourses
>>>>>>> cb0870b4c8202413620ea1b144b736eb3db68eec


app.config['MYSQL_USER'] = 'sql9329694'
app.config['MYSQL_PASSWORD'] = '9lDUwG3eJI'
app.config['MYSQL_HOST'] = 'sql9.freemysqlhosting.net'
app.config['MYSQL_DB'] = 'sql9329694'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

#default page loaded
@app.route('/')
@app.route('/index')
def index():  # for now this justs runs the testing script
    return "GRAV BACKEND"
<<<<<<< HEAD
    #return insertCourses(31)
    #return read_db2(31)
=======
   
>>>>>>> cb0870b4c8202413620ea1b144b736eb3db68eec
    

# take user credentials and check them in the database or insert if they're not in the database
@app.route('/api/login', methods=['POST'])
def login():
    return insertUser()

@app.route('/api/user/<user>', methods=['PATCH'])
def update_user(user):
    username = request.json["username"]
    password = request.json["password"]
    return "Update user content coming soon"

@app.route('/api/user/<user>', methods=['DELETE'])
def delete_user(user):
    # Whether to delete the user credentials or just their course information
    # if deleteUser is True, delete everything related to the user including their credentials
    # if deleteUser if False, only delete the courses the user has taken
<<<<<<< HEAD
    deleteUser = request.args["deleteUser"] if "deleteUser" in request.args else False
    return deleteUser(user, deleteUser)
=======
    doDeleteUser = request.args["deleteUser"] if "deleteUser" in request.args else False
    return deleteUser(int(user), doDeleteUser)
>>>>>>> cb0870b4c8202413620ea1b144b736eb3db68eec

#take user and get course requrirements
@app.route('/api/user/<user>/requirements')
def get_user_requirements(user):
      return "getRequirements content coming soon"

#take user and get course requrirements
@app.route('/api/user/<user>/courses')
def get_user_courses(user):
<<<<<<< HEAD
    web_id_list = read_db()
    #print(user)
    #print(web_id_list)
    if(int(user) in web_id_list):
        return read_db2(user)
    else:
        return insertCourses(int(user))
=======
    takenCourses = hasCourses(int(user))
    if takenCourses:
       return read_Courses(int(user))
    else:
        return insertCourses(int(user))
    return "an unexpected error has occured"
>>>>>>> cb0870b4c8202413620ea1b144b736eb3db68eec
        
