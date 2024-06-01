// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1w6q3ushh5otx2oyeis1ttx2dchsi6xqehpv6z2g18defkdzo0x17605z2

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("h1");
    el1.append("Welcome!");
    shadowRoot.appendChild(el1);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_1w6q3ushh5otx2oyeis1ttx2dchsi6xqehpv6z2g18defkdzo0x17605z2";
}
customElements.define(App.ZuiTagName, App);
