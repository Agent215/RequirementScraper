# Graduation Requirement Auditor Visualizer (GRAV)


[Trello Board](https://trello.com/b/a38R5Uay/grav)

## Team Members 
- Abraham Schultz
- Evan Firodeliso
- An T Nguyen
- Rathanank Anthony Onn
- Zachary Joseph Essel


## Project Abstract

**Use Case Diagram**

![Use Case Image](https://github.com/3296Spring2020/individual-subject-proposal-Agent215/raw/master/GraduationAuditor.png)

**Website WireFrame**

![Website Wireframe](https://github.com/3296Spring2020/individual-subject-proposal-Agent215/raw/master/Gantt%20Chart.png)

- This project stems from frustration with the current Temple tool for viewing and planning what courses you need to take to graduate. The current System “DARS” has fairley comprehensive data, but can be overwhelming in its scope. Additionally it is not easy to parse visually. Users find themselves scrolling up and down many times. This project aims to resolve this issue. Ideally the user should be able to view in one screen at a glance all the basic graduation requirements that have been fulfilled, and yet to be fulfilled. Only if the user wants to inspect general requirements more closely, by clicking a requirement,  would the information "bubble forward". A simple green for complete, and red for incomplete would be the first step. but more advanced methods for visulations suchs as gant charts or flow charts could be implemented. 

## Project Relevance
- This project will tie in to the courses educational goals in multiple ways. This project will require tying together various disparate technologies and making sure they work together. The goal will be to use a Test Driven Development strategy to create requirements from user stories and use cases before hand. This combined with classic scrum techniques ( utilizing  trello ), should direct and maintain organization within the team. In order for the server side code to function we may need to use a multithreaded aproach. The net result of this should be a full stack project, that utilizes various back end components to asynchronously populate a custom designed and user friendly GUI.
## Conceptual Design
- Primarily this will be a web scraper written in python  that grabs already existing data from Temples public and private pages. The python module beautifulsoup seems very well suited to parsing HTML. This can be combined with an automated testing software called selenium to have the python login to a user's account and grab the relevant private data from HTML Dom elements. There will need to be a database component that is queried.This database could be accessed via inline SQL statement written in Java. This data will need to be accessed in an asynchronous manner, not dissimilar to Remote Procedure Calls (RPC). This could be done using Ajax and JSON to grab and format the data. This data will need to be displayed via front end code (HTML and CSS) for the end user. The Java components could be placed in “.jsp” files and accessed from javascript via the GSON library for Java.

- For my contribution, I would like to work with the python and web scraping components. Ideally I would focus on parsing  Temples public facing course requirements pages into some usable format (preferably JSON). This would be accomplished as mentioned above using pythons beautifulsoup module in combination with selenium automated web testing module for python.

## Background
[link to open source skeleteon code](https://github.com/Agent215/webScraperPage)

***Building***
- In order to build for now this needs to run using an apache server.
- This can be done by using netbeans version 8.2.0, a full download comes with apache and glassfish.
- make sure you have the java web plugin installed and active.
- in order for the python script to run you need to have at least python 3.7 installed on your machine
- Also you need to install the beautfuilSoup module for python. Do this by opening a terminal and typing: pip install BeautifulSoup4
- dowload the following jar files [Gson Jar](http://cis-linux2.temple.edu/~sallyk/cis3308/resources/gson-2.6.2.jar) ,  [java SQL jar](http://cis-linux2.temple.edu/~sallyk/cis3308/resources/mysql-connector-java-5.1.14-bin.jar)
- then with netbeans open right click on the libraries directory and click add jar, find the location where your Jar files are and select them one at a time.
- To run the python script you must go to line 30 in the OpenPythonTest file, located in the /src/java/python/ directory and change the absolute path to match the location on your machine. Once this is running on a permenant server it will not need to be changed.

**Running**
- you can run in netbeans by clicking "run project" with the project package selected
- you can also right click on the index.html file and select "run file" to run. 
- hit f12 to inspect console messages

**note**
- if you are getting a permission error then it is likely that you dont have python or beatufilsoup installed correctly.
- another common error could be null data, or not able to exec python script. This could be because the path to the python script is incorrect. 


## Required Resources
**Group members competencies**
- A front end developer who understands javascript HTML css, and JSON. 
- Database admin who can design and create the database. This could also include setting up the server.
- Java programmer who can help write backend code to query database, and clean scraped data.
- Python programer who can use beautifulsoup and selenium to parse necessary data from temples webpages..

**Hardware and software resource required**
- netbeans IDE ( or any other equivalent modern IDE that can run glassfish and apache.)
- GSON library
- mySQL-connector library
- selenium automated web testing module for python
- beautifulsoup module for python
- mySQL 
- Microsoft azure? Or some other free and easy hosting solution? A VM would work fine.
