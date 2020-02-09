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

/**
 *
 * @author brahm
 */
public class OpenPythonTest {

    /**
     * @param args the command line arguments
     * @return 
     */
    public static String runScraper() {
        try {

            // use the process method to run python at at runtime
            Process p = Runtime.getRuntime().exec("python C:\\Users\\brahm\\Documents\\NetBeansProjects\\openPythonTest\\src\\openpythontest\\testScraper.py");
            //create buffered input that gets input for python output
            BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
            // read in first line of input to return string
            String ret = in.readLine();
            // make a buffer string
            String buf;
            // try and read the next line in, if its not null then add to return string
            while ((buf = in.readLine()) != null) {
                ret += " \n" + buf;
            } // end while

            System.out.println("Data scraped from website : " + ret);
            return ret;
        } catch (Exception e) {
            System.out.println(e);
            return "" + e;
        }
        
    } // end main

} // end OpenPythonTest.java
