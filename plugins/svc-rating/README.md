# Lit Based Rating Web Component for Virtual Labs
----

This repository contains the source code for the rating web component for virtual labs. The web component is written and packaged as a lit component, with some customisable parameters for the web-component.

The rating component is further split into the following components:

1. **`rating-display`** : This component has the display of the submitted rating as `stars`, it reads the data from the google sheet using the sheet API.

2. **`rating-submit`** : This packs the Rate experiment button and the rating-modal, which could be placed on the experiment page and which is used for collecting the rating of the web component, and submits the rating to the google analytics, and gets stored into the google analytics.

## Features 

The following are the features of the rating web-component:

- **rating-display** : 
    - the `rating-display` component could be used separately for displaying the rating of the given experiment,
    - The following parameters are to be supplied to the rating-display web component : 

        1. **numberOfStars** : 
        
            The number of stars to display the rating out of.
        2. **spreadsheetID** : 

            The id of the spreadsheet to read the rating from.
        3. sheetName : 

            The name of the sheet, to read rating from in the spreadsheet.
        4. columnName :

            The column-name, to read-rating from.

        5. columnValue :

            The unique identifier, whose rating is to be displayed. Say, in case of experiments, it is the experiment short name.

        Following is the sample usage :

        
        `<rating-display 
        spreadsheetID="1azCik_ei7pR8cePq8l6ELEPt-iOyrl9QChTx8zdulEc"
        sheetName="Rating-Experiments"
        columnName="Experiment Short Name"
        columnValue="physics">`

    The positioning of the stars could be adjusted, by placing the component into a div and adjusting the div's position accordingly. The component being placed relative to the corresponding div.

- **rating-submit** : 
    The rating submit component, comprises of a button, which on clicking opens up a modal for submitting the rating from the user.
    The `rating-submit` buttons comes with the following parameters : 
        
    1. **title** : The title to be displayed on the rating modal.

        - The title of the rating modal could be varied, and passed as parameter along the component.
    example usage: 
        `<rating-submit title="<some title>"></rating-submit>`
        - Sample Usage : 
        `<rating-submit>
         </rating-submit>`

  # Changing of building environments
  The rating components are included in the following files in the <a href="">ph-3</a> repository, for including it into the experiment and lab pages. These could be changed, or tweaked as per convenience: 

    1. **config.json [`LAB`]**  - include the js modules in the `list-of-experiments-ctnt` object, which should be changed accordingly if the links get updated.

    2. **plugin-config-production.js and plugin-config-testing.js** - same as above, but for, loading the modules for experiment pages.

    3. **list-of-experiments-ctnt.handlebars** : this file in the page-templates folder, encloses the display rating component for the lab-list-of-experiments pages.
    
    - Directory : './templates/partials/'
    4. **content.handlebars** 
    5. **header.handlebars**
    6. **simulation-header.handlebars**

    The tags above have been included in the conditional **testing** environment using the if clause 
    ```js
            {{# if testing}}
                //rating component
            {{/if}}
    ```
    to include it into production, removing/changing the clause should be done in each of the files, wherever the component needs to be included.
  # Events 

- on submitting the rating, an event named `vl-rating-submit` is created, that is later captured by the GA4 analytics, and later stored into the google sheet.
- The event is handled and managed in the file `./templates/assets/js/event-handler.js` file, wherein the event is created and pushed to the data layer for further analytics.
