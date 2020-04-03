from app import app
from flask import jsonify
from flask import Flask

from testScrape import testScrape
from DarsScrape import DarsScrape
from insertUser import insertUser, insertCourses


app.config['MYSQL_USER'] = 'sql9329694'
app.config['MYSQL_PASSWORD'] = '9lDUwG3eJI'
app.config['MYSQL_HOST'] = 'sql9.freemysqlhosting.net'
app.config['MYSQL_DB'] = 'sql9329694'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

#default page loaded
@app.route('/')
@app.route('/index')
def index():  # for now this justs runs the testing script
    #return insertCourses()
    return "GRAV BACKEND"

# take user credentials and check them in the database or insert if they're not in the database
@app.route('/api/login', methods=['POST'])
def login():
    return insertUser()

#take user and get course requrirements
@app.route('/api/user/<user>/requirements')
def get_user_requirements(user):
      return "getRequirements content coming soon"

#take user and get course requrirements
@app.route('/api/user/<user>/courses')
def get_user_courses(user):
    return insertCourses(int(user))
        
