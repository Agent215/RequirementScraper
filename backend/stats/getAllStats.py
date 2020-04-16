# this is a central function to 
# try and call all stats functions.
# return an object with all of stats data
from stats.allReqsDone import allReqsDone
from dbFunctions import readRequirement, readGPA, read_Courses, getTotalCredits

# takes data from a given user
def getAllStats(user):

    ReqData = readRequirement(user)
    resultSet = []
    temp = None

    try:
        temp = allReqsDone(ReqData)
        resultSet.append(temp)
    except IOError as e:
        print("problem reading percentage of requirements done: " , e)
    try:
        GPA = {}
        temp =readGPA(user)
        GPA["GPA"] = temp
        resultSet.append(GPA)
    except IOError as e:
        print("problem with reading GPA", e)
    try:
        temp = getTotalCredits(user) #return a dictionary
        resultSet.append(temp)
        
    except IOError as e:
        print("problem from getAllStats and getTotalCredits db function", e)
        
    return resultSet
