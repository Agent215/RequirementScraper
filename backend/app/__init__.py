from flask import Flask

app = Flask(__name__)

from scraping.CourseScrape import CourseScrape
from dbFunctions import *
from scraping.getAllCourses import getCIScourses
from scraping.scrapeReqs import scrapeReqs
from stats.allReqsDone import allReqsDone
from stats.getAllStats import getAllStats
#from insertCourses import insertCourses
from app import routes