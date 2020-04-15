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
    data = json.loads(dataIn)
    print("parsed json", data)
    print("object 1 ", data[0]["Status"])
    for req in data:
        print(req["Status"])
        if req["Status"] == "COMPLETE":
            reqsDone += 1
        reqCount += 1
    percentage = reqsDone/reqCount
    returnData["percentOfReqsDone"] = percentage
    return returnData