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
@app.route('/api/credentials', methods=['POST'])
def credentials():
    return "credentials content coming soon"

#take user logged in and get all courses taken
@app.route('/api/courses/<user_id>', methods=['GET'])
def getCourses(user_id):
       return  jsonify(courses=DarsScrape())

#take user and get course requrirements
@app.route('/api/requirements/<user_id>', methods=['GET'])
def getRequirements(user_id):
      return "getRequirements content coming soon"

#return all users in db
@app.route('/api/users')
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
    

    
