# Performance-Tool

## Overview

This tool generates performance reports which include various scores and metrics as well as suggestions for improvement. The reports are broadly divided into 4 categories:
1. Performance: Performance is the speed at which a page loads.
2. Accessibility: Measures how accessible and easy to operate the page is.
3. Best Practices: Checks for common mistakes in the web development process.
4. Search Engine Optimization (SEO): Optimizes for search engine rankings.

These reports are generated using a lighthouse API. [Learn More](https://web.dev/learn/#lighthouse).

Additionally, this tool also informs on whether a page is mobile-friendly or not, and in the case that it is not, it points out the issues/reasons for this. We make use of a google search console (GSC) API for this. [Learn More](https://search.google.com/test/mobile-friendly).

Note that the tool does the above tasks for all the pages accessible from the base URL where it is hosted, i.e, if it is hosted on an experiment, it will generate the above reports for all the pages part of that experiment. This tool has been integrated into the testing build script for VLABS experiments and will be available for all experiments.

## Target Audience

This tool primarily is to help developers better enhance the pages they are building by giving them comprehensive insights into the various aspects of their pages. It allows developers to improve the overall user experience.

## Technology Used

The entire tool has been built in nodejs (javascript). Additionally, we make use of the APIs provided by Google by simple HTTP requests.

## Overall Architecture

The performance page is organised as per a tab structure where each tab pertains to a learning unit or task of the experiment. For learning units, a second layer of tabs is used for all the tasks under that specific LU. The basic page structure (including the tabs) is set up by a template file.

Whenever the performance page is loaded, we obtain the links to all the tasks using the 'data-url' attribute set for all the tabs. Then, we check if the local storage already contains valid reports for all the tasks (tab). By valid, we mean that we first check if the timestamp stored for the current set of reports in the local storage is expired (we give a 2 hour lifetime). If it is expired or not at all set (in case this is the first-ever run of the tool or local storage was manually cleared), a new report is generated for all the tasks.

We loop through all the tasks and color code the tabs as per their lighthouse mobile device performance score for each tab/task. In the case of LU tabs, the tab is color-coded with the color of the worst-performing task under that LU. If the report is being newly generated, the color is added as and when the report is ready. During this loop, we also check if the current task under consideration is the currently active tab and accordingly populate the page with the report for that tab/task.

Whenever we switch tabs, we check if the report is available for that task and accordingly populate the page with the report. For the population, we have divided the page into two segments, one for the lighthouse report and the other for the mobile friendliness report.

For the report generation, we use the lighthouse and mobile-friendliness test API (part of Google Search Console tools) APIs. We use separate API keys and parameters for each. It should be noted that the lighthouse API is run twice for each task as we run it once for a desktop device environment and once for a mobile device environment. We use these APIs by simply sending HTTP requests to the relevant URLs with all the parameters encoded within the URL.

We make sure to generate the reports for a maximum of 5 tasks simultaneously as the lighthouse API has a limit of a maximum of 10 requests at a time, and since each task sends two requests, we make use of all the 10 requests. We enforce this limit by dividing the original array with the links to all the tasks into 5 subarrays and run 5 promises at a time but within the subarrays, only call the API for 1 task at a time.

## Code Explanation

The code has been made in a highly modular way such that each file consists of functions that achieve a single common task.

1. Handlebars
    
    The handlebar files are used to set up the basic template for the page where the reports will be displayed. 
    
    1. 'handlebars/performance-report.handlebars' 
    
        This is the main file that setups the entire page template. It imports all the required CSS and js files, which will be covered later on in this document. It sets up all the essential components such as the title, legend, etc, as well as the divs where the data will be populated. 
    
        The most important part is where it sets up the tabs for each of the experiment units with a data attribute 'data-url' set with the relative path to the page/directory of that unit. In the case of learning units, the path is to the directory of that unit, and for tasks, the path is to the page itself. 

        For experiments with learning units, the handlebar further sets up the second layer of tabs (nested tabs) for each learning unit. However, here it is assumed that the learning unit itself does not consist of any nested learning units, and hence the tab hierarchy is restricted to a maximum of two levels. To easily identify this second layer as being nested (belonging to another unit), the enclosing 'columns' div id is set to the learning unit's name/label followed by the phrase 'SubTabs'.

        We make use of separate divs for the lighthouse and mobile-friendliness reports. The same divs are used by each of the tabs and these are treated as a common area.

2. CSS

    The CSS files help format and beautify the performance page.

    1. 'css/main.css'

        We only make use of a single CSS file, 'main.css'. This file contains all the stylings applied to the various classes. 

3. JS

    The js files are where the main processing occurs, including the parsing of the HTML file setup by the handlebar templates to obtain the pages for which the reports are to be run, the actual report generation using the APIs, the population of the HTML file with the concerned data, etc.

    1. 'js/main.js'

        This is the main js file where all the functionality is tied together. This file mainly involves the calling of the concerned functions and some basic logic to tie everything together.

        The 'clear' function is to clear the main common area where the data is populated.
        
        The 'colorClear' function removes the color formatting for all the tabs (both levels).
        
        The 'newReport' function resets the page to the initial conditions where all data and formatting is cleared from the HTML page, the runtime variables ('reports' and 'luColors'), and the local storage. After this is done, it also starts the generation of new reports for all the pages.
        
        The 'getDate' function mainly takes a timestamp as input and returns the formatted stamp in a readable form.
        
        The 'expiryCheck' function checks if the local storage timestamp is set or not. If not, it sets it to the current time and sets the validity duration to 2 hours. If it is already set, it checks if the timestamp is older than the set duration, in which case the storage is considered expired, is reset, and new reports are generated for all the pages. If it has not expired or has just been set, it populates the appropriate div with the timestamp. The timestamp mentioned is considered to be the report timestamp, i.e, the time of when the latest report was generated.

        The 'isElement' function checks if a given element is an HTML element or not.

        The 'changeActive' function is the function that is called whenever tabs are switched by adding it as the callback function for the 'click' event for all the tab divs. First, it removes the 'is-active' class from all the siblings of the newly selected tab and sets it for the new tab. Next, it checks if the previously selected tab was a learning unit tab (in the 1st layer) and not a parent of the new tab. If it satisfies these conditions, it removes the display for the 2nd layer of tabs for that learning unit. Next, it checks if the new tab is a task tab or a learning unit tab. For a task tab, it checks if the report is available and accordingly calls a function to populate the common area with the report. For a learning unit tab, it displays the second layer of tabs and also calls itself for the task tab that is supposed to be active in the 2nd layer.

        The 'populate' function calls the suitable functions for each report segment (lighthouse and GSC) to populate the common area with a given report.

        The 'reportGen' function generates the reports for all the pages 5 at a time (this restriction is due to the limitations of the APIs) by calling the appropriate functions to send the required HTTP requests and obtain the data. But first, it checks if a valid (non-expired) report is directly available in the local storage and only if it is not that it generates a new report for that task and updates the local storage with the new report. It then sets the color coding for the tab (also sets for the parent LU tab if the current task is in the 2nd layer, the parent LU color is set as per the task with the lowest score) and populates the common area with the report if the task tab is the currently active one.

        We call 'parse' upon loading the page directly to obtain the paths for all the tasks and LUs and then call 'reportGen'. We also set a 'click' event for the 'Refresh Report' button to generate a new report when clicked. 

    2. 'js/parse.js'

        It takes all the tabs as input and first resets each of their 'data-url' attributes to the absolute URL using the base URL of the performance page and the relative path given in the old value of the attribute. It returns two arrays, one with the URLs of all the task tabs and the second with the labels of all the LUs. It makes this distinction for each tab by checking if an element exists in the page with the id as the 'data-url' value + the phrase 'SubTabs'.

    3. 'js/commonData.js'

        It contains all the common data to be shared across multiple files such as API keys, score descriptions, etc.

    4. 'js/api/lighthouse.js'

        It generates the lighthouse report for a given link for different devices (mobile and desktop) by sending separate HTTP requests for each device with the required parameters (including the API key). It organizes the obtained results into an object with only the required scores and metrics. It also includes a link to generate the detailed report (including suggestions, etc). This link is a direct link to the lighthouse report viewer with various parameters (like device, page, and API key) set.

    5. 'js/api/gsc.js'

        It sends a HTTP request to the Google Search Console (GSC) mobile-friendliness API with the required parameters (including API key) set appropriately. It checks if the returned status says 'MOBILE_FRIENDLY' or not. If not, then the API will also have returned some issues to fix, which are also included in the report.

    6. 'js/populate/lighthouse.js'

        The 'genLink' function returns a HTML link element for the detailed report link passed to it.
        
        The 'drawCircle' function uses HTML canvas to render the dials used for the main lighthouse scores.
        
        The 'scoreDial' function handles all the main logic and formatting for each lighthouse score dial, including the filling of the dial with the score text, etc.
        
        The 'genTitle' function is responsible for the device titles 'Mobile' and 'Desktop' for the two lighthouse reports generated per page/task.
        
        The 'lighthousePopulate' function encapsulates the overall rendering of the entire lighthouse reports by generating the required divs and columns and calling the required functions to populate each of those with the required segments like the titles, dials, metric tables, etc. It loops through all the keys for each report and populates the corresponding data in the appropriate parts.

    7. 'js/populate/gsc.js'

        The 'gscPopulate' function handles the entire rendering of the mobile-friendliness report. It sets the dropdown's/card's title to the status returned by the report and checks if the issues array has any entries and accordingly populates the droppable segment. It also adds the 'click' event listener for the dropdown/card so that the issues are displayed upon click.

    8. 'js/util.js'

        This file consists of various functions that may need to be shared across files.

        The 'splitToChunks' function divides a given array into the given number of subarrays. We use this to divide the pages/tasks array (contains all the links for which reports are to be generated) into 5 arrays to loop through the 5 arrays simultaneously to generate reports 5 at a time.

        The 'setUpQuery' function is used to set up the link/API to which we send a HTTP request. It takes the API's base URL, the API key, and the various parameters and sets up the URL to which the request/query is to be sent. It is used for generating both reports (lighthouse and mobile-friendliness).

        The 'genCols' function returns a Bulma columns div appended as a child to the passed div/element.

        The 'genColumn' function returns a Bulma column div appended as a child to the passed div/element (usually appended to a Bulma columns div).

        The 'genText' function appends/adds a given text to a given element/div with the required text formatting. If the flag is set, then it also calls the required function to generate a tooltip for that particular text.

        The 'genToolTip' function handles the generation of a tooltip (hoverable text, usually to give an explanation for the given text) for a given text.

        The 'colorScheme' function returns the appropriate color code based on a given score. This is used for the color-coding of tabs and dials based on the lighthouse scores.      

## Note

All the code and function calls related to the GSC mobile-friendliness API have been commented out for now as it was found to be inadequate as it runs only very basic tests which most experiments satisfy and misleads developers to believe the experiment is mobile-friendly even though it is not. Possible solutons include:

1. Adding some tests (manually designed) in addition to the ones run by the API for a more rigorous and accurate result.
2. Using an alternatve tool instead of this API.
3. Changing the nomenclature to more accurately describe the test and to explain that this is only a very basic check and does not guarentee mobile-friendliness.
