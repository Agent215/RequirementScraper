from flask import Flask

app = Flask(__name__)

from testScrape import testScrape
from DarsScrape import DarsScrape
from insertUser import insertUser
from app import routes