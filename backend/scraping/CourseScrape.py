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

# scrape all courses taken by given userd
def CourseScrape(tuid, passW):

	source = darsLogin(tuid,passW)
	page_soup = soup(source,"html.parser")
	# grab all rows of all courses taken, there are duplicates here
	# im thinking one way we could do this is remove duplicates then compare against reqs
	tableRows = page_soup.findAll("tr",{"class":"takenCourse"})
	# initialize empty list to hold courses
	courseList = []
	# add each course taken to a list
	# there will be duplicates
	for table in tableRows:
		courseDict = {}
		#scrape course info
		name = table.find("td", {"class":"descLine"}).text
		crn = table.find("td", {"class": "course"}).text
		term = table.find("td", {"class": "term"}).text
		credit = table.find("td", {"class": "credit"}).text
		grade = table.find("td", {"class": "grade"}).text
		#add to dictionary
		courseDict["Name"]  = name.strip()
		courseDict["CRN"] = crn.strip()
		courseDict["Term"] = term.strip()
		courseDict["Credit"] = credit.strip()
		courseDict["Grade"] = grade.strip()
		#append to course list, will remove duplicates later
		courseList.append(courseDict)

	#function to remove duplicates
	def Remove(duplicate): 
	    final_list = [] 
	    for num in duplicate: 
	        if num not in final_list: 
	            final_list.append(num) 
	    return final_list 

	removedList = []
	removedList = Remove(courseList)
	# print list with duplicates removed
	for course in removedList:
	    print(course)

	print("number of courses completed: " + str(len(removedList)))
	#close page connection
	
	return removedList

