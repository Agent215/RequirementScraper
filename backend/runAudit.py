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
from dbFunctions import getCredentials, insertRequirement , insertCourses
import sys

def runAudit(user):

    credentials = []
    courses = None
    reqs = None
    credentials = getCredentials(user)
	#get tuid and pass word for user
    try:
        source = darsLogin(credentials[0],credentials[1])
    except:
        print("error logging in")
    try:
        proCode = scrapeProgramCode(credentials[0],credentials[1],source)
    except:
        print("error scraping program code ")
    try:
        courses = insertCourses(user, source)
    except:
        print("error inserting courses")
	#change insert functions to take source as arg
    try:
        reqs = insertRequirement(user, source, proCode)
    except:
        print("error inserting requirments")
    
  
    return("audit completed")

if __name__ == "__main__":
    print(runAudit("81"))
