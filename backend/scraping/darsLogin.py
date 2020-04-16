
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


# returns the html code of the DARS page
def darsLogin(tuid, passW):
    chrome_options = Options()  
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(chrome_options=chrome_options)
    #driver = webdriver.Chrome(ChromeDriverManager().install()) ##Keep for Rath, keep commented out
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
    driver.close()
    return source
