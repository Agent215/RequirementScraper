from urllib.request import urlopen
#get the beautifulSoup module and name as soup
from bs4 import BeautifulSoup as soup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options  
from scraping.darsLogin import darsLogin

 

def scrapeReqs(tuid, passW):

    # get Dars html code
    source = darsLogin(tuid,passW)
    page_soup = soup(source,"html.parser")

    jsonObj = []
    # get all requirements 
    requirements = page_soup.findAll("div", {"class": ["requirement"]})
    for req in requirements:
        reqDict = {}
        table = req.find("div", {"class": ["reqHeaderTable"]})
        text = table.find("div", {"class": ["reqText"]})
        # get requirement title
        title = text.find("div", {"class": ["reqTitle"]}).text 
        reqDict["Title"]  = title.strip()
        print(title)
        body = req.find("div", {"class": ["reqBody"]}) 
        if body is not None:
            subreqs = body.findAll("div", {"class": ["subrequirement"]})
            i = 0
            # inner dictionary to hold subrequirements 
            subreqDict = {}
            for subreq in subreqs:
                # get subreq titles
                if subreq is not None:
                    key = "subreq" +"_" + str(i)
                    if subreq.select_one('.subreqTitle'):
                        sub = subreq.select_one('.subreqTitle').text
                        subDict = {}
                        subDict["subrequirement"] =sub
                        subreqDict[key] = subDict
                        i += 1
                        print(sub)
                    # for each subreq check if it is satisfied
                    if subreq.find("span", {"class": ["srTitle_substatusOK"]}):
                        print("we have completed this subreq")
                        takenDict = {}
                        # if it is satistfied then add a dictionary of completed courses
                        completed = subreq.find("table", {"class" :["completedCourses"]})
                        if completed is not None:
                            # check if there are any courses to add
                            taken = completed.findAll("tr", {"class" :["takenCourse"]})
                            # add each course we completed to the taken dictionary
                            k = 0
                            for took in taken:
                                key = "completed course_" + str(k)
                                crn = took.find("td", {"class":"course"}).text
                                print(crn)
                                takenDict[key] = crn
                                k += 1 
                            subDict["Courses Taken"] = takenDict
                            
                    if subreq.find("span", {"class": ["srTitle_substatusNO"]}):
                        print("we have not completed this subreq")
                        needs = 0
                        fromDict = {}
                        # if it is not satistfied then add the needs number as a key value pair
                        # then add the courses you can select from as a sub dictionary within the subreq
                        # also then add the courses you can select from 
        else:
            pass
        reqDict["subrequirements"] = subreqDict
        # only add a req if it has title and has requirments. This gets rid of empty formatting artifacts. 
        if (len(reqDict["Title"]) > 1) and  (len(reqDict["subrequirements"]) > 1):
            jsonObj.append(reqDict)

        
    print ("lenght of list is ",len( jsonObj))
    return jsonObj

if __name__ == "__main__":
    print(scrapeReqs("", ""))

