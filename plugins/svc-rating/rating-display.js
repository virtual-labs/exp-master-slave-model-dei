import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

/* ----------------------------------------------------------------- */
const googleApiKey = "AIzaSyAJ9pMGaHcmOiNeHEXQLGCiJcr5k3TV4F8"; // Google API Key
const timeLimit = 4 * 60 * 60 * 1000; // time limit for the rating data to be cached
/* ----------------------------------------------------------------- */

export class DisplayRating extends LitElement {
  static get styles() {
    return [
      css`
        .star-images {
          width: 22px;
        }

        .empty-star {
          margin: 0px 3px;
        }
        .fa::before {
          color: #ffb931;
        }
        .fa-star-o {
          color: #ffb931;
        }
      `,
    ];
  }

  static get properties() {
    return {
      numberOfStars: {
        type: Number,
      },
      rating: {
        type: Number,
      },
      roundRating: {
        type: Number,
      },
      title: {
        type: String,
      },
      fullStars: {
        type: Number,
      },
      halfStars: {
        type: Number,
      },

      //  the sheet parameters
      spreadsheetID: {
        // the sheet ID to be referenced for the fetching the rating data
        type: String,
      },
      sheetName: {
        // the sheet Name to be referenced in the main spreadsheet for the fetching the rating data
        type: String,
      },
      columnName: {
        // the column name to be referenced for the fetching the rating data
        type: String,
      },
      columnValue: {
        // the column value to be referenced for the fetching the rating data
        // should be a unique identifier
        // lab_name for lab rating
        // exp_name for experiment rating
        type: String,
      },
      imagesDirectory: {
        // the directory where the images are stored
        type: String,
      }
    };
  }
  // function too fetch the rating data from the google sheet
  parse_local_storage_object(object, key) {
    // function to parse the local storage object and return the rating data
    //  returns a dictionary with timeFetched and rating
    if (object === null) {
      return null;
    }
    const parsedObject = JSON.parse(object);
    if (parsedObject[key] === undefined) {
      return null;
    }

    const newObject = {
      timeFetched: parsedObject.timeFetched,
      rating: parsedObject["rating"][key],
    };
    return newObject;
  }
  async get_rating() {
    //  get the rating data from the experiment from local storage
    console.debug("Getting the rating....", this.columnValue);
    const key = this.columnValue;

    const dataObject = this.parse_local_storage_object(
      localStorage.getItem("vl_data"),
      key
    );

    const rating = localStorage.getItem(this.columnValue);
    // see the time threshold for the rating data
    const timeFetched = localStorage.getItem("timeFetched");
    const currentTime = new Date().getTime();
    //  caching
    if (
      dataObject &&
      dataObject.rating &&
      timeFetched &&
      currentTime - timeFetched < timeLimit
    ) {
      // set the rating data
      this.rating = dataObject.rating;
      return;
    } else {
      // need to make a request to the backend and save the data into the local storage of the browser
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetID}/values/${this.sheetName}!A:O?key=${googleApiKey}`;
      const vl_data = {};
      vl_data["rating"] = {};
      try {
        console.debug("Fetching the data");
        console.debug(url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        console.debug(data);
        const values = data.values;
        //  get the column index of the column name
        const colIndex = values[1].indexOf(this.columnName);
        const ratingIndex = values[1].indexOf("Rating");
        // go over the entire fetched data and cache it for next reference

        for (let i = 1; i < values.length; i++) {
          vl_data["rating"][values[i][colIndex]] = values[i][ratingIndex];
          if (values[i][colIndex] === this.columnValue) {
            // set the rating for the current display
            this.rating = values[i][ratingIndex];
          }
        }
        //  update the time fetched
        vl_data["timeFetched"] = new Date().getTime();
        localStorage.setItem("vl_data", JSON.stringify(vl_data));
      } catch {
        this.rating = 0;
        console.debug("Something went wrong");
      }
      console.debug("Rating is ", this.rating);
      if (vl_data["rating"] == {}) {
        console.debug("Something went wrong");
        this.rating = 0;
      }
    }
  }
  // as soon as the web component is loaded into the browser window
  // the connectedCallback() method is called
  connectedCallback() {
    super.connectedCallback();
    console.debug("Connected Callback");
    this.rating = 0;
    this.get_rating(this.experimentURL, this.experimentName);
  }
  // get and set methods for the properties
  get sheetName() {
    return this._sheetName;
  }
  set sheetName(name) {
    this._sheetName = name;
    this.requestUpdate();
  }
  set spreadsheetID(id) {
    this._spreadsheetID = id;
    this.requestUpdate();
  }
  get spreadsheetID() {
    return this._spreadsheetID;
  }
  set columnName(name) {
    this._columnName = name;
    this.requestUpdate();
  }
  get columnName() {
    return this._columnName;
  }
  set imagesDirectory(directory) {
    this._imagesDirectory = directory;
    console.debug("Set"+this._imagesDirectory);
    this.requestUpdate();
  }
  get imagesDirectory() {
    console.debug("Get"+this._imagesDirectory);
    return this._imagesDirectory;
  }
  set columnValue(value) {
    this._columnValue = value;
    this.requestUpdate();
  }
  get columnValue() {
    return this._columnValue;
  }
  get fullStars() {
    return this._fullStars;
  }
  set fullStars(newVal) {
    this._fullStars = newVal;
    this.requestUpdate();
  }
  get halfStars() {
    return this._halfStars;
  }
  set halfStars(newVal) {
    this._halfStars = newVal;
    this.requestUpdate();
  }
  set rating(newRating) {
    console.debug("New Rating is ", newRating);
    this._rating = newRating;
    this._roundRating = Math.round(2 * newRating) / 2;
    if (this._roundRating % 1 === 0) {
      this._fullStars = this._roundRating;
      this._halfStars = 0;
    } else {
      this._fullStars = Math.floor(this._roundRating);
      this._halfStars = 1;
    }
    console.debug(this._fullStars, this._halfStars);
    this.requestUpdate();
  }
  get rating() {
    return this._rating;
  }
  set title(newTitle) {
    this._title = newTitle;
  }
  get title() {
    return this._title;
  }
  get numberOfStars() {
    return this._numberOfStars;
  }
  set numberOfStars(newVal) {
    this._numberOfStars = newVal;
    this.requestUpdate();
  }
  //  constructor
  constructor() {
    super();
    this._numberOfStars = 5;
    if (this._roundRating % 1 === 0) {
      this._fullStars = this._roundRating;
      this._halfStars = 0;
    } else {
      this._fullStars = Math.floor(this._roundRating);
      this._halfStars = 1;
    }
    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.type = "text/javascript";
    fa.href = "https://unpkg.com/fontawesome@5.6.3/index.js";
    document.head.appendChild(fa);
  }
  render() {
    console.debug(this._fullStars, this._halfStars);
    const stars = [];
    for (let i = 0; i < this._fullStars; i++) {
      stars.push(
        html`<img src=${this.imagesDirectory}star.svg class="star-images"></img>`
        // html`<img src="http://localhost:5500/images/star.svg" class="star-images"></img>`
      );
    }
    for (let i = 0; i < this._halfStars; i++) {
      // stars.push(html`<span class="fa fa-star-half"></span>`);
      stars.push(
        html`<img src=${this.imagesDirectory}half-star.svg class="star-images"></img>`
   
        // html`<img src="http://localhost:5500/images/half-star.svg" class="star-images"></img>`
      );
    }
    console.debug(this._numberOfStars, this._fullStars, this._halfStars);
    for (
      let i = 0;
      i < this._numberOfStars - this._fullStars - this._halfStars;
      i++
    ) {
      stars.push(
        html`<img src=${this.imagesDirectory}empty-star.svg class="star-images empty-star"></img>`
    
        // html`<img src="http://localhost:5500/images/empty-star.svg" class="star-images empty-star"></img>`
      );
      // stars.push(html`<input name="star" type="radio"></input>`)
    }
    console.debug(this.rating);
    return html`<div>
      <h3>${this.title}</h3>
      <div class="star-div">${stars}</div>
    </div>`;
  }
}

customElements.define("rating-display", DisplayRating);
