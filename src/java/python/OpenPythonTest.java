/*
OpenPythonTest.java
Abraham Schultz
2/08/2020

This is a test class to test calling and running a python script from java
This python script just scrapes data from :
https://bulletin.temple.edu/undergraduate/science-technology/computer-information-science/computer-science-bs/#requirementstext

grabs the 40th even table row HTML DOM element from the requirements page for CIS major
 */
package python;

import java.io.*;
import model.courses.StringDataList;

/**
 *
 * This is a class to open and execute the python script to scrape
 * from Temples public facing web page for CIS course requirements For now the
 * path the python is specific to my machine. If you want this to work you
 * should change the Abspath variable to match your machine. When this is living
 * in a server we can use use the servers file system address and just leave it
 * as is.
 */
public class OpenPythonTest {

    /**
     * @param args the command line arguments
     * @return
     */
    public static StringDataList runScraper() {
        StringDataList list = new StringDataList();
        try {

            // add a list to return the data as list of strings for
            // easy parsing to json
            // if this is on a server then we can use an absolute path 
            String relativePath = "\\testScraper.py"; // this should always stay the same
            // absolute path should change depending no machine
            // once this lives on a server we can just have it stay the same.
            String Abspath;
            // path = System.getProperty("user.dir");
            // if you want to run this on your machien you will need to change the abolute path
            Abspath = "C:\\Users\\brahm\\Documents\\NetBeansProjects\\webScraperWebTest\\web\\WEB-INF" + relativePath;
            System.out.println("this is the path for python scraper " + Abspath);
            // use the process method to run python at at runtime
            Process p = Runtime.getRuntime().exec("python " + Abspath);
            //create buffered input that gets input for python output
            BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
            // read in first line of input to return string
            String ret = in.readLine();
            // make a buffer string
            String buf;
            // try and read the next line in, if its not null then add to return string
            while ((buf = in.readLine()) != null) {
                ret += " \n" + buf;
                // list.add((StringData)ret);
            } // end while

            System.out.println("Data scraped from website : " + ret);

            // add scraped data to string data list
            list.add(ret);

            System.out.println("list in is " + list.CourseList);

            return list;
        } catch (IOException e) {
            System.out.println(e);
            list.add(e.toString());
            return list;
        }

    } // end main

} // end OpenPythonTest.java
