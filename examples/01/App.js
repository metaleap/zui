// Code generated from App.zui. DO NOT EDIT
// Source file content hash: tmp

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  disconnectedCallback() {
  }
  adoptedCallback() {
  }
  attributeChangedCallback() {
  }
  subs_tmp = new Map();
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_h1_0_0_tmp = document.createElement("h1");
    node_h1_0_0_tmp.append("Welcome!");
    shadowRoot.appendChild(node_h1_0_0_tmp);
  }
}

customElements.define('zui-app_tmp', App);
