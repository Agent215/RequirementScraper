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

##TESTING FILE , FUNCTION CAN BE FOUND IN dbFunctions.py , method name is named getTotalCredits();

#sauce = urllib.request.urlopen('https://prd-dars.temple.edu/selfservice/audit/read.html?id=JobQueueRun!!!!ISEhIWludFNlcU5vPTM2OTg0NjI=').read()
#soup = bs.BeautifulSoup(sauce, 'lxml')
#print(soup)
#print(soup.find_all('p'))
#print(soup.title)

#START ALGORITHM

#call method

#print("hello mac")
