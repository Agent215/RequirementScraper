from bs4 import BeautifulSoup as soup
import sys
import re

def scrapeGPA(source):
    try:
        gpa = None				
        soupPage = soup(source, 'html.parser' )
        divs = soupPage.findAll("table", {"class": ["requirementTotals"]})
        print("scraping gpa...")
        print(divs)
        for div in divs:
            if div.find('td', class_ = 'gpa number') is not None:
                print(div)
                if div.find('td', class_ = 'gpa number').text:
                    gpa = div.find('td', class_ = 'gpa number').text
        print("GPA: ", gpa)
    except IOError as e:
        print(e)
    return gpa
