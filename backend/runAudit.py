# runaudit
from urllib.request import urlopen
#get the beautifulSoup module and name as soup
from bs4 import BeautifulSoup as soup
from selenium import webdriver
from flask import jsonify
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options 
from scraping.darsLogin import darsLogin
from scraping.CourseScrape import CourseScrape
from scraping.scrapeProgramCode import scrapeProgramCode
from scraping.scrapeReqs import scrapeReqs
from scraping.scrapeGPA import scrapeGPA
from dbFunctions import getCredentials, insertRequirement , insertCourses
import sys

# function to run all scraping functions 
# here we have only one login to dars for all the data we want to scrape
# the dars login returns the users Dars audit page.
def runAudit(user):

    credentials = []

    credentials = getCredentials(user)
	#get tuid and pass word for user
    try:
        source = darsLogin(credentials[0],credentials[1])
    except IOError as e:
        print("error logging in :" , e)
    try:
        proCode = scrapeProgramCode(source)
    except IOError as e:
        print("error scraping program code :", e)
    try:
        gpa = scrapeGPA(source)
    except IOError as e:
        print("problem scraping user gpa : ", e)
    try:
        courses = insertCourses(user, source)
    except IOError as e:
        print("error inserting courses :" , e)
	#change insert functions to take source as arg
    try:
        reqs = insertRequirement(user, source, proCode, gpa)
    except IOError as e:
        print("error inserting requirments : " ,e)
    
  
    return("audit completed")

if __name__ == "__main__":
    print(runAudit(0))
