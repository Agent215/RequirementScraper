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

    source = darsLogin(tuid,passW)
    page_soup = soup(source,"html.parser")

    #reqHeaders = page_soup.findAll("span",{"class":["srTitle_substatusNO"]})
    reqHeaders = page_soup.findAll("div", {"class": ["reqHeaderTable"]})
    subreqs = page_soup.findAll("span", {"class": ["srTitle_substatusNO"]})

    for req in subreqs:
        print(req.text)


    #return object
    jsonObj =[]
    i = 0
    # for each header  lets get the text
    for header in reqHeaders:
        req = {}
        headerText = header.find("div",{"class":["reqTitle"]}).text.strip()
        #add to dictionary with key value Title
        req["Title"] = headerText
        #if header is empty dont add to return object
        if not headerText:
            i+= 1
            pass
        else:
            jsonObj.append(req)
            i+= 1
       

    print ("lenght of list is ",len( jsonObj))
    return jsonObj

if __name__ == "__main__":
    print(scrapeReqs("", ""))

