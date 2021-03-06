# Graduation Requirement Auditor Visualizer (GRAV)

## Table of Contents
* [Project Board](#Trello-Board)
* [Team Members](#Team-Members)
* [Vision Statement](#Vision-Statement)
* [Personas](#Personas)
* [Feature List](#Feature-List)
* [Build Instructions](#build-instructions)
* [Instructions to run](#Instructions-to-run)

## Trello Board
[Trello Board](https://trello.com/b/a38R5Uay/grav)

## Team Members 
- Abraham Schultz
- Evan Firodeliso
- An T Nguyen
- Rathanank Anthony Onn
- Zachary Joseph Essel

## Vision Statement
For Students, Teachers and Advisors who need a quick and easy way to visualize a students progress towards graduation. The GRAV system is a web based service that allows users to view in one screen at a glance what requirements have been fulfilled and what requirements still need work. 

Unlike Temples current system (DARS), GRAV will be much more streamlined visually and consolidated to the most basic information needed to see general progress. Only if the user wants, will more details be displayed. 
Our product provides a simple and intuitive way to know what you need to do to graduate. 

## Personas

1. 
_Corey, CIS student_

Corey Vanderis sophomore CIS major at temple univeristy, he is 19 years old. He was born in Mt. Airy in Philadelphia and went to Central Highschool. On the weekends he works as a busboy at a bar in Center city. He is taking intro to programming, Physics II , English II and calculus. Corey is interested in web development and has some experience with writing simple server side code as well as client side code.

He has been frustrated with Dars as it can sometimes feel cumbersome and takes time to visually parse. As a user with a busy schedule and limited time he wants to be able to quickly get a sense for what courses he may need to take, and how many more requirements he may need to fulfill in order to graduate. 

2. 
_Maria, a CST advisor_

Maria, age 34, is a CST advisor for Temple University in Philadelphia, a world heritage city in the United States.  She advises undergraduate students in Computer & Information Sciences, Mathematics, and Physics.  She was born in Aquascalientes, Mexico, where her mother runs a hotel.  Her father works for a telecom company installing fiberoptic cable.  She came to Philadelphia for college and earned a degree in communications from Penn.  She stayed for her love of American football; she bleeds green for the birds every Sunday.  After a brief stint working in marketing for a large fashion house, she returned to school to get her Masters in Education before joining Temple.

As a millennial, Maria has grown up around computers.  She also has more recent experiences with different degree tracking software such as dars and degreeworks from her time as a student.  She wouldn't consider herself a computer expert but she can generally navigate most systems confidently.  She's interested in GRAV because she would like a tool for advisors to clearly show students their remaining classes without resorting to paper printouts.

3.
_Kongloo III, a CIS transfer student_

Kongloo the third, age 28, is a CIS major at Temple University. He was born and raised in philadelphia, and went to South Philadelphia High for his High School education. His dad works full time doing landscaping, and his mother works part time at a factory. He is the first to get a high school diploma in his familt and the first to go to college also. Kongloo also works full time at retail to support the family and his 5 other siblings. He feels like he's always been the underdog because he's never had great resources but he wants to try his best to support everyone. Kongloo has a great appreciation for video games, as it has gotten him get through tough times.

Being born in the early 90's and not haven't much access to the internet or even technology growing up, Kongloo always appreciated the simple things and aesthetics. While at his old school he felt comfortable navigating through the degree requirements because of how simple but yet informative it was to him. When transferring to Temple and seeing this new thing called DARS, he had questions that DARS could not answer. 

4.
_Bill, an older student in a non-technical major_

Bill, age 42, a freshmen Business Management major at Temple University. He is going to college for the first time after not being able to afford to go at a young age, now he is trying to gain skills to be able to run a business. Growing up he didn’t have access to computers due to the high cost of the equipment and the rural nature of his hometown. All his life he was a blue collar worker doing a lot of construction jobs.

Due to his lack of experience with computers, navigating around all of the online resources is challenging to him. All he wants to do is to easily access the information he’s looking for without having to jump through many hoops. The user interface needs to be simple to help him understand what he’s required to do to graduate and DARS really isn’t suiting his needs with the rather confusing layout.


5.
_Noah, an English major_

Noah Onark is a retiring military veteran who's going back to college
under the GI bill. He decided that he will go to Temple University this
fall after 20 years of service and study English with the hope of becoming a teacher. 
In his military careers, he worked mainly in the training department of the army and has little exposure to the computer. 
Thus, he has limited knowledge of how to work around the computer and its application. In addition, he
also works as a carpenter to support his daily life and family in addition going to college.

Due to his limimted time and inexperience of using modern application, Noah has difficult time using the
web application DARS to assess his requirement to graduate on time and become a teacher. Sometimes,
DARS would not display data correctly or updated to the current curriculumn, leading Noah
to have many unpleasant meetings with multiple advisors. In addition, Noah planned to study English and
minor in political science but need to know the requirement to fulfill both conditions. The current DARS
might not be suitable to help him achieve his goal on time.


## Feature List
- A feature that allows users to view list of graduation requirements for Their major
- A feature that allows users to login using temple credentials and view courses taken (in green)
- Feature to log off and log back in as another student. 
- A feature to view the requirements yet to be fulfilled (in red)
- A feature that allows users to click on a requirement and display a detailed course list to fulfill course requirement. 
- A feature to view as a gantt chart the courses needed to graduate. 
- A feature to view as a pie chart total progress towards graduation.


**Use Case Diagram**

![Use Case Image](https://github.com/3296Spring2020/individual-subject-proposal-Agent215/raw/master/GraduationAuditor.png)

**Website WireFrame**

![Website Wireframe](https://github.com/3296Spring2020/individual-subject-proposal-Agent215/raw/master/Gantt%20Chart.png)



## build instructions 

The following dependecies should be installed in the virtual environment

**dependencies**
- python selenium
- python requests module
- python beautifulsoup module 
- chromedriver
- webdriver manager
- flask 

**Steps to build** 
<br>
Download the chromedriver for use with selinum <br>
[chromedriver downloads](https://chromedriver.chromium.org/downloads)
<br>
Next you should make a direcotory like
~~~
C:/webDriver/bin
~~~
and add the exe to this 
<br>
Add this directory to your system environment Path variable. 

- instal virtual environment by typing in a terminal :
~~~
python -m pip install --user virtualenv
~~~
- create a virtual environment in root directory by typing in a terminal:
~~~
python3 -m venv venv
~~~
- open virtual environment  on windows like so :
~~~
venv\Scripts\activate
~~~
or if you are on mac
~~~
source venv/bin/activate
~~~
Now install dependencies :
~~~
pip install flask
pip install selenium
pip install webdriver_manager
pip install beautifulsoup4
pip install pycryptodome
pip install flask_mysqldb
~~~
or if beautifulsoup gives problems 
~~~
pip install bs4
~~~
while in root directory of project path for main python script  <br>
if on windows
~~~
set FLASK_APP=flaskGrav.py
~~~
<br> 
if on mac

~~~
export FLASK_APP=flaskGrav.py
~~~

## Instructions to run
while in root directory of project
~~~
flask run
~~~
you should get output somthing like this
~~~
(venv) C:\Users\brahm\Documents\flaskGrav>flask run
 * Tip: There are .env or .flaskenv files present. Do "pip install python-dotenv" to use them.
 * Serving Flask app "flaskGrav.py"
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)

~~~

Copy the url in to your browser to display site.
