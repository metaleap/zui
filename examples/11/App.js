// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3pfxx99qxswzz3e8ij34fkr24l2z2cok5z5s89ca1mrcwgbmmloyvm6zk

export class App extends HTMLElement {




  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement(Nested.ZuiTagName);
    const n_e1 = [];
    const f2 = (() => (42)).bind(this);
    e1.setAttribute("answer",  f2());
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_3pfxx99qxswzz3e8ij34fkr24l2z2cok5z5s89ca1mrcwgbmmloyvm6zk";
}
import { Nested } from './Nested.js'
customElements.define(App.ZuiTagName, App);
