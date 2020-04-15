# this is a central function to 
# try and call all stats functions.
# return an object with all of stats data
from allReqsDone import allReqsDone
from backend.dbFunctions import readRequirement

# takes data from a given user
def getAllStats(user):

    data = readRequirement(user)
    resultSet = []
    temp = None
    try:
        temp = allReqsDone(data)
        resultSet.append(temp)
    except:
        print("problem percentage of requirements done")

    return resultSet