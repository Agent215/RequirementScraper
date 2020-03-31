from app import app
from flask import jsonify
from flask import Flask

from testScrape import testScrape
from DarsScrape import DarsScrape
from insertUser import insertUser
from insertUser import read_db
#default page loaded
@app.route('/')
@app.route('/index')
def index():  # for now this justs runs the testing script
    #return  jsonify(courses=DarsScrape())
    return insertUser()
# =========== #
# User Routes #
# =========== #

# take user credentials and check them in the database or insert if they're not in the database
@app.route('/api/login', methods=['POST'])
def login():
    return "login content coming soon"

#get user credentials from frontend to insert in to db
@app.route('/api/user', methods=['PUT'])
def put_user_credentials():
    return insertUser()

#take user logged in and get all courses taken
@app.route('/api/user/<user_id>/courses')
def get_user_courses(user_id):
       return  jsonify(courses=DarsScrape())

#take user and get course requrirements
@app.route('/api/user/<user_id>/requirements')
def get_user_requirements(user_id):
      return "getRequirements content coming soon"

#return all users in db
@app.route('/api/users')
def get_all_users():
    return "getUsers content coming soon"


# ============== #
# Courses Routes #
# ============== #

#readCourses from database and return as json
@app.route('/api/courses')
def get_all_courses():
    return  "readCourse content coming soon"

#take courses from scraped data and insert in to db
@app.route('/api/courses', methods=['PUT'])
def put_all_courses():
    return  "insertCourses content coming soon"

#take users and scrape all courses
@app.route('/api/courses/scrape')
def scrape_courses():
    return  jsonify(courses=DarsScrape())

# =================== #
# Requirements Routes #
# =================== #

#readReqs from database and return as json
@app.route('/api/requirements')
def get_all_requirements():
    return  "readReqs content coming soon"

#take requirements from scraped data and insert in to db
@app.route('/api/requirements', methods=['PUT'])
def insert_all_requirements():
    return  "insertReqs content coming soon"

#take user and scrape all courses requirements for them
@app.route('/api/requirements/scrape')
def scrape_requirements():
    return  "scrapeReqs content coming soon"
        
