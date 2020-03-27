from app import app
from flask import jsonify

from testScrape import testScrape
from DarsScrape import DarsScrape
# get the request module and name it as uReq for future use

#default page loaded
@app.route('/')
@app.route('/index')
def index():  # for now this justs runs the testing script
    return  jsonify(courses=DarsScrape())

#add a user and password to databse
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    return "sign up content coming soon"

#take user logged in and get all courses taken
@app.route('/getCourses', methods=['GET', 'POST'])
def getCourses():
    return "getCourses content coming soon"

#take user and get course requrirements
@app.route('/getRequirements', methods=['GET', 'POST'])
def getRequirements():
      return "getRequirements content coming soon"

#return all users in db
@app.route('/getUsers')
def getUsers():
    return "getUsers content coming soon"
    
#take users and scrape all courses
@app.route('/scrapeCourses')
def scrapeCourses():
    return  jsonify(courses=DarsScrape())

#take user and scrape all courses requirements for them
@app.route('/scrapeReqs')
def scrapeReqs():
    return  "scrapeReqs content coming soon"
    

    
