# webScraperPage
a web app that displays data that is scraped from temples
public facing pages. 

- Called using ajax, java and python. I built as a skeleton for a larger project.

- This is a very simple skeleton for how one could use ajax to call java server pages (jsp) to run a python script.
- The python script in this case uses the beautiful soup module to scrape the data for a specific course from temples public facing website.
- It then returns the data in the form of a java object made of java strings. The GSON library for java is used to serialize the java object to JSON format.
- This is then read using a an ajax call and a javascript parsing function.
- Then this data is displayed via HTML DOM elements.

## Potential improvements
- add database that java string writes to instead of sending via JSON imeidiatly. 
- Java functions to query the database
- bootstrap for slick UI
- seleanium automated testing
~~- path variable for python script should be relative~~

***Building***
- In order to build for now this needs to run using an apache server.
- This can be done by using netbeans version 8.2.0, a full download comes with apache and glassfish.
- make sure you have the Java Web and EE plugin installed and active.
- in order for the python script to run you need to have at least python 3.7 installed on your machine
- Also you need to install the beautfuilSoup module for python. Do this by opening a terminal and typing: sudo pip install bs4
- you also need to install the request module for python. Do this by opening a terminal and typing : pip install requests
- dowload the following jar files [Gson Jar](http://cis-linux2.temple.edu/~sallyk/cis3308/resources/gson-2.6.2.jar) ,  [java SQL jar](http://cis-linux2.temple.edu/~sallyk/cis3308/resources/mysql-connector-java-5.1.14-bin.jar)
- then with netbeans open right click on the libraries directory and click add jar, find the location where your Jar files are and select them one at a time.
~~- To run the python script you must go to line 45 in the OpenPythonTest file, located in the /src/java/python/ directory and change the absolute path to match the location on your machine. Once this is running on a permenant server it will not need to be changed.~~


