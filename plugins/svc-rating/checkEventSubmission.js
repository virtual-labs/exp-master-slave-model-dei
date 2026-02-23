import {
  LitElement,
  html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class MyListener extends LitElement {
  static properties = {
    canCheck: {},
  };
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("submit-rating", this.onSubmitRating);
  }
  onSubmitRating(e) {
    console.debug(e);
    alert(e.detail.data);
  }

  constructor() {
    super();
    this.canCheck = false;
    this.addEventListener("submit-rating", this._checkedHandler);
  }
  render() {
    return html`
      <div
        @submit-rating=${(e) => {
          console.debug(e);
        }}
      >
      </div>
    `;
  }
}
customElements.define("my-listener", MyListener);
