# webScraperPage
a web app that displays data that is scraped from temples
public facing pages. 

- Called using ajax, java and python. I built as a skeleton for a larger project.

- This is a very simple skeleton for how one could use ajax to call java server pages (jsp) to run a python script.
- The python script in this case uses the beautiful soup module to scrape the data for a specific course from temples public facing website.
- It then returns the data in in java string. The GSON library for java is used to serialize the java string to JSON format.
- This is then read using a an ajax call and a javascript parsing function.
- Then this data is displayed via HTML DOM elements.

## Potential improvements
- add database that java string writes to instead of sending via JSON imeidiatly. 
- Java functions to query the database
- bootstrap for slick UI
- seleanium automated testing
