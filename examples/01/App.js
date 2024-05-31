// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1w6q3ushh5otx2oyeis1ttx2dchsi6xqehpv6z2g18defkdzo0x17605z2

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
  subs_1w65z2 = new Map();
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_h1_0_0_1w65z2 = document.createElement("h1");
    node_h1_0_0_1w65z2.append("Welcome!");
    shadowRoot.appendChild(node_h1_0_0_1w65z2);
  }
  static TagName = "zui-app_1w6q3ushh5otx2oyeis1ttx2dchsi6xqehpv6z2g18defkdzo0x17605z2";
}

customElements.define(App.TagName, App);
