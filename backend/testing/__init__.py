from flask import Flask
from scraping.CourseScrape import CourseScrape
from dbFunctions import *
from scraping.getAllCourses import getCIScourses
from scraping.scrapeReqs import scrapeReqs
from stats.allReqsDone import allReqsDone
from stats.getAllStats import getAllStats
app = Flask(__name__)


