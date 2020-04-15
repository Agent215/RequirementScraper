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


def scrapeProgramCode(tu_id, passW, source):
    soupPage = soup(source, 'html.parser' )
    table = soupPage.find('table', class_ = 'verticalListing auditHeaderTable')
    rows = table.find_all('tr')
    programCode = ''
    for row in rows:
        data = row.find_all('td')
        programCode += data[1].text.strip()
    return programCode

#this function will scrape the earned total credits for this user, assuming every users has the same requirementTotal table html structure
#now return an int for total earned credits
def scrapeTotalCredit(Tu_id, password, source): 
    #page = darsLogin(Tu_id, password)
    soupPage = soup(source, 'html.parser')
    table = soupPage.find_all('tr', class_ = 'reqEarned')
    #print(table[2])
    earnTable = soup(str(table[2]), 'html.parser')
    getEarn = earnTable.find('span', class_ = 'hours number')
    #print (int((float(getEarn.text.strip()))))
    return (int((float(getEarn.text.strip()))))
	
#this function will return the current GPA of the user; GPA will be a float
def scrapeGPA(Tu_id, password, source):
    #page = darsLogin(Tu_id, password)
    soupPage = soup(page, 'html.parser')
    table = soupPage.find_all('tr', class_ = 'reqEarned')
    gpaTable = soup(str(table[2]), 'html.parser')
    getGPA = gpaTable.find('td', class_ = 'gpa number')
    #print(getGPA.text.strip())
    GPA  = float(getGPA.text.strip())
    print(GPA)
    return GPA
    