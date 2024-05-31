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


src = "/image.png";


  subs_tmp = new Map();
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_img_0_0_tmp = document.createElement("img");
    node_img_0_0_tmp.setAttribute("alt", "Rick");
    node_img_0_0_tmp.setAttribute("src", "{src}");
    shadowRoot.appendChild(node_img_0_0_tmp);
  }
}

customElements.define('zui-app_tmp', App);
