<%-- 
testJsp.jsp

this is  testing skeleton to call a java class that calls a pyton script
the python script scrapes temples course requirements site.
--%>
<%@page import="python.OpenPythonTest"%>
<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import=" python.OpenPythonTest.*" %> 
<%@ page import="java.*" %>
<%@page language="java" import="com.google.gson.*" %>

<%

    String output;
    output = null;
    // get output from python script
    output = OpenPythonTest.runScraper();

    // use GSON lib to formate output as json 
    Gson gson = new Gson();
    out.print(gson.toJson(output).trim());
%>
