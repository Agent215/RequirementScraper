from urllib.request import urlopen
#get the beautifulSoup module and name as soup
from bs4 import BeautifulSoup as soup
from flask import jsonify
import json

# funcion to scrape all CIS courses from bulliten site
# do not confuse this function with the getCourses function which
# gets courses specific to a user
def getCIScourses():

    # for now just get CIS, we really should have a web crawler do every department 
    my_url = ("https://bulletin.temple.edu/courses/cis/")

    #opening up connection and grabbing the page
    uClient = urlopen(my_url)
    # read page html content to variable
    page_html = uClient.read()
    #close page connection
    uClient.close()

    # html parsing
    page_soup = soup(page_html, "html.parser")

    courseBlocks = page_soup.findAll("div", {"class": "courseblock"})

    # get course data and format for JSON
    jsonObj = []
    for course in courseBlocks:
        crn = course.p.strong.next
        desc = course.div.div.text
        print(desc)
        print(crn)
        number = crn.split('.')[0]
        name = crn.split('.')[1]
        creditS = crn.split('.')[2].strip()
        credit = creditS.split(' ')[0]
        courseDict = {}
        courseDict["CRN"] = number.strip()
        courseDict["Name"] = name.strip()
        courseDict["Credit"] = credit.strip()
        courseDict["Description"] = desc.strip()
        jsonObj.append(courseDict)
        
    return jsonObj


if __name__ == "__main__":
    print(getCIScourses())

