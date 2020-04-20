from dbFunctions import *
from stats.allReqsDone import allReqsDone
from scraping.darsLogin import *
import dbFunctions

# test a user data from database.

#test function make sure allreqs done returns correct number of key value pairs
def AllReqsDone_length():
    user = 81
    testData = ReqData = readRequirement(user)
    #get reqsDone data from test user
    #there should only be key value pairs in this list
    reqsDone = allReqsDone(testData)
    try:
        assert  len(reqsDone) == 3 
        msg = "AllReqsDone_length test passed"
        print("AllReqsDone_length test passed")
        return msg
    except:
        msg = "AllReqsDone_length test failed: lenght of data = " ,len(reqsDone) ," expected 3"
        return msg
    

#function to test if the inprogress count + complete count  = total count
def allReqsDone_count():
    user = 81
    testData = readRequirement(user)
    #get reqsDone data from test user
    #there should only be key value pairs in this list
    reqsDone = allReqsDone(testData)
    try:
        assert reqsDone["requirementCount"]==6
        assert reqsDone["requirementsDone"]==0
        assert reqsDone["requirementsIP"]==5
        msg = "allReqsDone_count test passed"
        return msg
    except:
        msg = "allReqsDone_count test failed: requirementCount = " ,reqsDone["requirementCount"] ,\
        " expected 6   requirementsDone = " , reqsDone["requirementsDone"] , " expected 0" \
        ,"requirementsIP =",  reqsDone["requirementsIP"]==5, "expected 5"
        return msg
    
#testing values for Rathanank to see if method returns correct values to credits taken and regiestered
def return94and25credits():
    user = 95 #tuk86465
    totalAndRegisterCredits = {} #dictionary to hold test data
    totalAndRegisterCredits = getTotalCredits(95) #call db function and assign values to dictionary
    msg = "return94and25credits Passed"

    assert totalAndRegisterCredits["totalCredits"] == 96, "return94and25credits Failed"
    assert totalAndRegisterCredits["registeredCredits"] == 25 , "return94and25credits Failed"
    
    return msg

#testing that the function calls, gets and returns the correct GPA from Temple University
def returnCorrectGPA():
    user = 95 #hard coded, user ID can be found from database
    myGPA = readGPA(95) #set value from function call, function call returns a GPA of type double
    
    msg = "returnCorrectGPA Passed" #message to print if test passed
    
    assert myGPA == 3.25, "returnCorrectGPA failed" #REMARK: MY current GPA for tuk86465 is 3.25
                                                    #REMARK 2: assert will fail and print failed message if !=
    return msg #prints only if assert is true

#testing that the given creditional will not log you into Temple with the incorrect information. Will try to log in, when fails, returns the print message instead.
def returnIncorrectLogin():

    user = "tuk86465" #my userID
    pw = "notTheRightPassWord1234" #my incorrect password
    
    try:
        assert darsLogin(user, pw) #returns numm if correct password is given
    except:
        return "returnIncorrectLogin Passed" #return this message if falso info is given

#testing to see when data gets scraped and put into database, that it returns that i have completed 29 courses with id 95 in database
def return29completedCourse():

    msg = "return29completedCourses Passed"
    
    returnSpecificRows(95) == 29, "failed 29courses"
    
    return msg #prints only if assert is true
    
def runAllTests():
    msg = []
    msg.append(allReqsDone_count())
    msg.append(AllReqsDone_length())
    msg.append(return94and25credits())
    msg.append(returnCorrectGPA())
    msg.append(returnIncorrectLogin())
    msg.append(return29completedCourse())
    return jsonify(msg)

if __name__ == '__main__':
    runAllTests()
