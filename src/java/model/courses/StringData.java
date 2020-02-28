/* The purpose of this class is just to "bundle together" all the 
 * info that is scraped about a course in to one piece of data
 * this can be added to an array then made to be parsed to JSON
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
package model.courses;

import dbUtils.FormatUtils;
import java.sql.ResultSet;

public class StringData {

    public String courseNumber = "";
    public String courseName = "";
    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(String results) {
        try {

            // split string up by white space
            String arr[] = results.split(" ");

            // first element should be course number
            this.courseNumber = arr[0];
            System.out.println("adding course number " + this.courseNumber + " to the string data ");
            // for now this is hardcoded for just the one class that has six words
            // this needs to be generalized so a course title with any amount of word works
            this.courseName = arr[1];
            this.courseName += " " + arr[2];
            this.courseName += " " + arr[3];
            this.courseName += " " + arr[4];
            this.courseName += " " + arr[5];
            this.courseName += " " + arr[6];
            // print out for debugging 
            System.out.println("adding course name " + this.courseName + " to the string data ");
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.courses.StringData (the constructor that takes a string): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.courseName + this.courseNumber + this.errorMsg;
        return s.length();
    }

    public String toString() {
        return "course name:" + this.courseName
                + ", course number: " + this.courseNumber;

    }
}
