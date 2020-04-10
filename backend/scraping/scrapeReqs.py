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
            for subreq in subreqs:
                # get subreq titles
                if subreq is not None:
                    key = "subreq" +"_" + str(i)
                    if subreq.select_one('.subreqTitle'):
                        sub = subreq.select_one('.subreqTitle').text
                        reqDict[key] = sub
                        i += 1
                        print(sub)
                else:
                    pass
        else:
            print("none")
        # dont add to list if there is no title
        if len(reqDict["Title"]) > 1:
            jsonObj.append(reqDict)


    
    # get header text of top level requirements 

    # get all requirements 
    #get div, class = requirement
    #|	get div , class =reqHeaderTable
    #|	|	get div ,  class = reqText
    #|	|	|	# get title 
    #|	|	|	get div , class  = reqTitle

    #|	get div, class = reqbody
    #|	 for each body get all subrequirements
    #|	|	get div class = subrequirement
    #|	|	|	get span, class = subreqTitle 
    #|	|	|	#for each subrequirement get ones that are not completed
    #|	|	|	#get courses that you need to complete 
    #|	|	|	OR 
    #|	|	|	#get courses that you can choose from

        
    print ("lenght of list is ",len( jsonObj))
    return jsonObj

if __name__ == "__main__":
    print(scrapeReqs("", ""))

