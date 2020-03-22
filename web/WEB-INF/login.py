#Abraham Schultz
# A script using selenium to login to Temples student portal automatically

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get("http://dars.temple.edu")

# wait for elements to load
driver.implicitly_wait(6)
userLogin = driver.find_element_by_id('username')
passLogin = driver.find_element_by_id('password')

# add you TU login and pass here. we will need to get this from the user and pass it here
userLogin.send_keys("")
passLogin.send_keys("")

driver.find_element_by_name("_eventId_proceed").click()
# wait for elements to load
driver.implicitly_wait(6)
#there is another doc embedded inside the main html doc
iframe = driver.find_element_by_xpath("//iframe[1]")
#switch to that doc
driver.switch_to_frame(iframe)
driver.find_element_by_xpath("//form[1]/div/fieldset/div/button").click()
# wait for elements to load
driver.switch_to.default_content()
element = WebDriverWait(driver, 20).until(
 EC.presence_of_element_located((By.ID, "runAudit")))
#runAudit = driver.find_element_by_id('runAudit')
element.click()
driver.implicitly_wait(6)
# get in to actual DARS data display page, we can scrape after this
driver.find_element_by_xpath("//tbody[1]/tr[2]/td[10]/a").click()





