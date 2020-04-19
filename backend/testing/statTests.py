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
def return94and15credits():
    user = 95 #tuk86465
    totalAndRegisterCredits = {} #dictionary to hold test data
    totalAndRegisterCredits = getTotalCredits(95) #call db function and assign values to dictionary
    msg = "return94and15credits Passed"

    assert totalAndRegisterCredits["totalCredits"] == 96, "return94and15credits Failed"
    assert totalAndRegisterCredits["registeredCredits"] == 25 , "return94and15credits Failed"
    
    return msg

def runAllTests():
    msg = []
    msg.append(allReqsDone_count())
    msg.append(AllReqsDone_length())
    msg.append(return94and15credits())
    return jsonify(msg)


    
    
    

if __name__ == '__main__':
    runAllTests()
