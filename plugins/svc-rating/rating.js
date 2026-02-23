import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class RatingElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
    }
    .star-div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 0;
      unicode-bidi: bidi-override;
      direction: rtl;
    }
    input {
      display: none;
    }

    label::before {
      content: "\u2606";
      position: relative;
      top: 0px;
      line-height: 26px;
    }
    label {
      width: 30px;
      height: 30px;
      font-family: Verdana;
      font-size: 30px;
      color: orange;
      transition: 0.2s ease;
    }
    label:hover {
      color: #ffb931;
      transition: 0.2s ease;
      cursor: pointer;
    }
    input:checked ~ label::before {
      content: "\u2605";
    }
  `;
  static get properties() {
    return {
      rating: {
        type: Number,
      },
      checked: {
        type: Number,
      },
      values: {
        type: Array,
      },
      ids: {
        type: Array,
      },
    };
  }
  set rating(val) {
    this._rating = val;
    let arr = [],
      idarr = [];
    for (let i = this._rating; i > 0; i--) {
      arr.push(i);
      idarr.push(`star-${i}`);
    }
    this.values = arr;
    this.ids = idarr;
    this.checked = 0;
  }
  get rating() {
    return this._rating;
  }
  handleClick(e) {
    this.checked = e.target.value;
    this._rating = parseInt(e.target.id.split("-")[1]);

    // dispatch event to submit rating from clicked element
    const data = {
      rating: this._rating
    };
    const clickEvent = new CustomEvent("vl-rating-click", {
      detail: this._rating,
      bubbles: true,
      composed: true,
    });
    console.debug("My data: ", data);
    console.debug("My event: ", clickEvent);
    this.dispatchEvent(clickEvent);

  }

  constructor() {
    super();
    this._rating = 0;
    let arr = [],
      idarr = [];
    for (let i = this._rating; i > 0; i--) {
      arr.push(i);
      idarr.push(`star-${i}`);
    }
    this.values = arr;
    this.ids = idarr;
    this.checked = 0;
  }

  render() {
    return html`
      <div class="star-div">
        ${this.values.map(
          (value, index) =>
            html`
              <input
                type="radio"
                @click=${this.handleClick}
                name="stars"
                id=${this.ids[index]}
              />
              <label for=${this.ids[index]}></label>
            `
        )}
      </div>
    `;
  }
}

customElements.define("rating-element", RatingElement);