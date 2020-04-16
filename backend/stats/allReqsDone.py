# function that returns a float
# between 0- 1 representing percentage of all requirements done
#  % of reqs done = completed req/total Reqs
# takes as an arguement list of nested dictionaries 
import json


def allReqsDone(dataIn):
    returnData = {}
    data = None
    reqCount = 0
    reqsDone = 0
    reqsIP = 0
    data = json.loads(dataIn)
    for req in data:
        if req["Status"] == "COMPLETE":
            reqsDone += 1
        if req["Status"] == "IN PROGRESS":
            reqsIP += 1
        reqCount += 1
    percentageDone = float(reqsDone/reqCount)
    percentageIP = float(reqsIP/reqCount)
    print("percentage done " ,percentageDone)
    print("percentage of sub reqs  done " ,percentageIP)
    returnData["requirementsDone"] = reqsDone
    returnData["percentOfReqsDone"] = round(percentageDone,3)
    returnData["requirementsIP"] = reqsIP
    returnData["percentOfReqsIP"] = round(percentageIP,3)
    return returnData