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

 

def scrapeReqs(tuid, passW):

    chrome_options = Options()  
    chrome_options.add_argument("--headless")
	#driver = webdriver.Chrome(ChromeDriverManager().install())  
	#use the above this if you are having trouble adding web driver to path variable
    driver = webdriver.Chrome(chrome_options=chrome_options)

    driver.get("http://dars.temple.edu")

	# wait for elements to load
    driver.implicitly_wait(3)
    userLogin = driver.find_element_by_id('username')
    passLogin = driver.find_element_by_id('password')

	# add you TU login and pass here. we will need to get this from the user and pass it here
    userLogin.send_keys(tuid)
    passLogin.send_keys(passW)

    driver.find_element_by_name("_eventId_proceed").click()
	# wait for elements to load
    driver.implicitly_wait(3)
	# try and enter two factor auth if needed
    try:
		#there is another doc embedded inside the main html doc, its inside an html iframe
	    iframe = driver.find_element_by_xpath("//iframe[1]")
		#switch to that doc
	    driver.switch_to_frame(iframe)
	    driver.find_element_by_xpath("//form[1]/div/fieldset/div/button").click()
	    driver.switch_to.default_content()
    except:
	    pass
	# wait for elements to driver.switch_to.default_content()

	#driver.switch_to.default_content()
    runAudit = WebDriverWait(driver, 20).until(
	EC.presence_of_element_located((By.ID, "runAudit")))
	#runAudit = driver.find_element_by_id('runAudit')
    runAudit.click()
    driver.implicitly_wait(3)
	# check if there is an audit already, if not then make a new one
    driver.find_element_by_xpath("//tbody[1]/tr[2]/td[10]/a").click()
	
    driver.implicitly_wait(1)
	# wait for url to load and get current url
    source = driver.page_source
	# copy page reached from selenium 
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
       
    #for header in reqHeaders:
    #    
    #    req["Title"] = header.text
    #    jsonObj.append(req)
    #    print(header.text)

    print ("lenght of list is ",len( jsonObj))
    return jsonObj

if __name__ == "__main__":
    print(scrapeReqs("tuk85386", "!Alamo2020"))

