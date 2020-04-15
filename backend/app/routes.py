from app import app
from flask import jsonify
from flask import Flask
from flask import request
from scraping.getAllCourses import getCIScourses
from scraping.CourseScrape import CourseScrape
from scraping.scrapeReqs import scrapeReqs
from scraping.scrapeProgramCode import scrapeProgramCode
from runAudit import runAudit
from stats.allReqsDone import allReqsDone
from dbFunctions import *

app.config['MYSQL_USER'] = 'sql9329694'
app.config['MYSQL_PASSWORD'] = '9lDUwG3eJI'
app.config['MYSQL_HOST'] = 'sql9.freemysqlhosting.net'
app.config['MYSQL_DB'] = 'sql9329694'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

#default page loaded
@app.route('/')
@app.route('/index')
def index():  # for now this justs runs the testing script
    return 'GRAV BACKEND'
   
          
# take user credentials and check them in the database or insert if they're not in the database
@app.route('/api/login', methods=['POST'])
def login():
    return insertUser()

#this should call a function that takes a user ID and updates assoicated user password
@app.route('/api/user/<user>', methods=['PATCH'])
def update_user(user):
    password = request.json["password"]
    return updatePassword(user, password)

@app.route('/api/user/<user>', methods=['DELETE'])
def delete_user(user):
    # Whether to delete the user credentials or just their course information
    # if deleteUser is True, delete everything related to the user including their credentials
    # if deleteUser if False, only delete the courses the user has taken
    doDeleteUser = request.args["deleteUser"] if "deleteUser" in request.args else False
    return deleteUser(int(user), doDeleteUser)

#take user and get course requrirements
@app.route('/api/user/<user>/requirements')
def get_user_requirements(user):
    hasReq = hasRequirement(user)
    if(hasReq == True):
        return readRequirement(user)
    else:
        runAudit(user)
        return readRequirement(user)

#take user and get course requrirements
@app.route('/api/user/<user>/courses')
def get_user_courses(user):

    takenCourses = hasCourses(int(user))
    if takenCourses:
       return read_Courses(int(user))
    else:
        runAudit(user)
        return read_Courses(int(user))

        
