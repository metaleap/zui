// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3pfxx99qxswzz3e8ij34fkr24l2z2cok5z5s89ca1mrcwgbmmloyvm6zk

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }




  zuiCreateHTMLElements(shadowRoot) {
    const e1 = document.createElement(Nested.ZuiTagName);
    const f2 = (function() { return 42; }).bind(this);
    e1.setAttribute("answer",  f2());
    shadowRoot.appendChild(e1);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_3pfxx99qxswzz3e8ij34fkr24l2z2cok5z5s89ca1mrcwgbmmloyvm6zk";
}
import { Nested } from './Nested.js'
customElements.define(App.ZuiTagName, App);
