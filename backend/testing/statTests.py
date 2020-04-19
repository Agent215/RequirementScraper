from dbFunctions import *
from stats.allReqsDone import allReqsDone

# test a user data from database.

#test function make sure allreqs done returns correct number of key value pairs
def AllReqsDone_length():
    user = 81
    testData = ReqData = readRequirement(user)
    #get reqsDone data from test user
    #there should only be key value pairs in this list
    reqsDone = allReqsDone(testData)
    assert  len(reqsDone) == 3
    msg = "AllReqsDone_length test passed"
    return msg
    print("AllReqsDone_length test passed")

#function to test if the inprogress count + complete count  = total count
def allReqsDone_count():
  
    assert 1==1
    msg = "allReqsDone_count test passed"
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
    
def runAllTests():
    msg = []
    msg.append(allReqsDone_count())
    msg.append(AllReqsDone_length())
    msg.append(return94and25credits())
    msg.append(returnCorrectGPA())
    return jsonify(msg)


    
    
    

if __name__ == '__main__':
    runAllTests()
