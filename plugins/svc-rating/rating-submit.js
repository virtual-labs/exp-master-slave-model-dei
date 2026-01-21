import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import { imageData } from "./imageData.js";
//  import event

export class SubmitRating extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: Arial, Helvetica, sans-serif;
      }
      
      #submit-button,
      #cancel-button {
        border: none;
        color: #ffffff;
        background-color: #288ec8;
        text-align: center;
        font-size: 1.05rem;
        border-radius: 1em;
        padding: 0.6em 1.2em;
        cursor: pointer;
      }
      #cancel-button {
        background-color: grey;
      }
      #cancel-button:hover {
        background-color: #888;
      }

      #rating-button:hover,
      #submit-button:hover {
        background-color: #a9a9a9;
      }

      #rating-button {
        margin-top: 1rem;
      }
      h1 {
        margin-bottom: 0rem;
        margin-top: 1rem;
      }
      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0; 
        width: 100%; 
        height: 100%; 
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
        justify-content: right;
        align-items: center;
      }
      
      .vl-mobile-rating-button{
        position: fixed;
        bottom : 80px;
        right : 20px;
        z-index: 1;
        font-size: 0;
        border: none;
        padding: 25px;
        background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50px;
        border-radius: 50%;
      }

      @media (min-width: 992px) {
        .vl-mobile-rating-button{
          display: none;
        }
        .rating-button{
          display: block;
        }
      }
      @media (max-width: 992px) {
        .rating-button{
          display: none;
        }
        .vl-mobile-rating-button{
          display: block;
        }
      }
      .modal-content {
        position: relative;
        top: 1px;
        right: 1px;
        background-color: #fefefe;
        padding: 20px;
        border: 1px solid #888;
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        border-radius: 14px;
        transform: translate(-100%,-100%);
      }
      .close {
        color: #aaaaaa;
        font-size: 28px;
        font-weight: bold;
      }
      .fa {
        color: orange;
      }
      .modal {
        display: none;
        height: 100vh;
      }
      .rating-div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        margin: 20px;
      }
      .rating-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .rating-header > img {
        height: 48px;
      }
      .rating-button {
        position: inherit;
        border-radius: 1em;
        padding: 0.6em 1.2em;
        margin: 15px 0px;
        font-size: 1.05rem;
        border: none;
        color: #ffffff;
        background-color: #288ec8;
        text-align: center;
        font-size: 1.05rem;
        border-radius: 1em;
        padding: 0.76em 1.2em;
        cursor: pointer;
        
      }
      .rating-button:hover {
        background-color: #288ec8;
      }
      #submit-button {
        margin-right: 1rem;
      }

      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
    `;
  }
  open() {
    this.shadowRoot.querySelector(".modal").style.display = "flex";
  }
  close() {
    this.shadowRoot.querySelector(".modal").style.display = "none";
  }
  connectedCallback() {
    super.connectedCallback();
    // add event listener and extract data
    window.addEventListener("vl-rating-click", this.updateRating.bind(this));
  }

  updateRating(e){
    this.experiment_rating = e.detail;
  }
  handleSubmit(e) {
    e.preventDefault();

    const data = {
      rating_name : this.rating_name,
      rating: this.experiment_rating,
      lab_rating: this.lab_rating,
    };
    const myEvent = new CustomEvent("vl-rating-submit", {
      detail: data,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(myEvent);
    this.close();
  }
  static properties = {
    rating_name:{type: String},
    title : {type : String},
    text: { type: String },
    experiment_rating: { type: Number },
    lab_rating: { type: Number },
  };
  constructor() {
    super();
    this.rating_name = "NULL";
    this.experiment_rating = 4.5;
    this.lab_rating = 4.5;
  }
  get rating_name() {
    return this._rating_name;
  }
  set rating_name(rating_name) {
    this._rating_name = rating_name;
    // console.debug("New Rating Nammeeee",this._rating_name);
    this.requestUpdate();
  }
  get title() {
    return this._title;
  }
  set title(title) {
    this._title = title;
    this.requestUpdate();
  }
  render() {
    return html`
      <div class="rating-page">
    
          <div class=" modal">
            <div class="modal-content">
              <div class="rating-header">
              <img src="${imageData}" />
                <span class="close" @click=${this.close}>&times;</span>
              </div>
               <h1 id="title">${this.title}</h1>
               <div class="rating-div">
                 <rating-element rating="5"></rating-element>
               </div>
              <div class="button-div">
                <button id="submit-button" @click=${this.handleSubmit}>
                  Submit
                </button>
                <button id="cancel-button" @click=${this.close}>Cancel</button>
              </div>
            </div>
          </div>
          <button class="v-button rating-button" id="rating-button" @click=${this.open}>
            Rate Me
          </button>
          <button class="vl-mobile-rating-button" id="rating-button" @click=${this.open}>
            Rate Me
          </button>
      </div>
    `;
  }
}

customElements.define("rating-submit", SubmitRating);
