/*
Abraham Schultz
2/27/2020


/ The purpose of this class is to have a nice java object that can be converted to JSON 
// to communicate everything necessary to the web page (the array of users plus a possible 
// list level database error message). 
 */
package model.courses;

import java.util.ArrayList;
import java.sql.ResultSet;

public class StringDataList {

    public String dbError = "";
    public ArrayList<StringData> CourseList = new ArrayList();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public StringDataList() {
    }

    // Adds one StringData element to the array list of StringData elements
    public void add(StringData stringData) {
        this.CourseList.add(stringData);
    }

    // Adds creates a StringData element from a ResultSet (from SQL select statement), 
    // then adds that new element to the array list of StringData elements.
    // this will be uses to add results from SQL query to string then to json
    public void add(ResultSet results) {
        //     StringData sd = new StringData(results);
        //   this.burgerList.add(sd);
    }

    // Adds creates a StringData element from a ResultSet (from SQL select statement), 
    // then adds that new element to the array list of StringData elements.
    public void add(String String) {
        StringData sd = new StringData(String);
        this.CourseList.add(sd);
    }
}
