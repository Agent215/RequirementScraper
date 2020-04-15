# this is a central function to 
# try and call all stats functions.
# return an object with all of stats data
from stats.allReqsDone import allReqsDone
from dbFunctions import readRequirement

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
    try:
        # temp = subReqsDone
        resultSet.append(temp)
    except:
        print("problem percentage of SubRequirements done")

    return resultSet