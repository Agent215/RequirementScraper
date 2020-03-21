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
import java.nio.file.Paths;
import model.courses.StringDataList;

/**
 *
 * This is a class to open and execute the python script to scrape from Temples
 * public facing web page for CIS course requirements For now the path the
 * python is specific to my machine. If you want this to work you should change
 * the Abspath variable to match your machine. When this is living in a server
 * we can use use the servers file system address and just leave it as is.
 */
public class OpenPythonTest {

    private static String OS = System.getProperty("os.name").toLowerCase();

    /**
     * @return
     */
    public static StringDataList runScraper() {

        StringDataList list = new StringDataList();
        
        try {

            String relativePath = "";

            final int PATHMOD = 36; // number of chars to remove to build path

            // check os to format path with correct backslash
            if (isWindows()) {
                relativePath = "\\testScraper.py";
                System.out.println("This is running on Windows");
            } else if (isMac()) {
                relativePath = "/testScraper.py";
                System.out.println("This running on a Mac");
            } else if (isUnix()) {
                relativePath = "/testScraper.py";
                System.out.println("This is Unix or Linux");
            } else {
                System.out.println("This Os is not supported!!");
            }

            // get location of class in project on machine.
            final File f = new File(OpenPythonTest.class.getProtectionDomain().getCodeSource().getLocation().getPath());
            // build absoulte path
            String Path = f.getAbsolutePath();
            Path = Path.substring(0, f.getAbsolutePath().length() - PATHMOD);
            Path += relativePath;
            System.out.println("absolute path of built path " + Path);
            // use the process method to run python at at runtime
            Process p = Runtime.getRuntime().exec("python3 " + Path);
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

    } // end run Scraper

    //some helper methods for checkin OS
    //****************************************************************************
    public static boolean isWindows() {

        return (OS.indexOf("win") >= 0);

    }

    public static boolean isMac() {

        return (OS.indexOf("mac") >= 0);

    }

    public static boolean isUnix() {

        return (OS.indexOf("nix") >= 0 || OS.indexOf("nux") >= 0 || OS.indexOf("aix") > 0);

    }

} // end OpenPythonTest.java
