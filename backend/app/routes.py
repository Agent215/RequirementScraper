from app import app
from flask import jsonify
from flask import Flask

from testScrape import testScrape
from DarsScrape import DarsScrape
from insertUser import insertUser


#default page loaded
@app.route('/')
@app.route('/index')
def index():  # for now this justs runs the testing script
    return  jsonify(courses=DarsScrape())

#add a user and password to databse
@app.route('/api/signup', methods=['GET', 'POST'])
def signup():
    return "sign up content coming soon"

#take user logged in and get all courses taken
@app.route('/api/getCourses/<user_id>', methods=['GET', 'POST'])
def getCourses():
       return  jsonify(courses=DarsScrape())

#take user and get course requrirements
@app.route('/api/getRequirements', methods=['GET', 'POST'])
def getRequirements():
      return "getRequirements content coming soon"

#return all users in db
@app.route('/api/getUsers')
def getUsers():
    return "getUsers content coming soon"
    
#take users and scrape all courses
@app.route('/api/scrapeCourses')
def scrapeCourses():
    return  jsonify(courses=DarsScrape())

#take user and scrape all courses requirements for them
@app.route('/api/scrapeReqs')
def scrapeReqs():
    return  "scrapeReqs content coming soon"
    
#get user credentials from frontend to insert in to db
@app.route('/api/insertUser', methods=['GET', 'POST'])
def apiInsertUser():
    return insertUser()

    
#take courses from scraped data and insert in to db
@app.route('/api/insertCourses')
def insertCourses():
    return  "insertCourses content coming soon"

#take requirements from scraped data and insert in to db
@app.route('/api/isnertReqs')
def insertReqs():
    return  "insertReqs content coming soon"

#readCourses from database and return as json
@app.route('/api/readCourse')
def readCourses():
    return  "readCourse content coming soon"
           
#readReqs from database and return as json
@app.route('/api/readReqs')
def readReqs():
    return  "readReqs content coming soon"
        
