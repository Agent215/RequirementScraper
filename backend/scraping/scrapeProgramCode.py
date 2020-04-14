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