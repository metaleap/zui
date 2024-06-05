// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3pfxx99qxswzz3e8ij34fkr24l2z2cok5z5s89ca1mrcwgbmmloyvm6zk

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {




  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE(Nested.ZuiTagName);
    const n_e1 = [];
    const f2 = (() => (42)).bind(this);
    this.zuiSet(e1, "answer",  f2());
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

  static ZuiTagName = "zui-app_3pfxx99qxswzz3e8ij34fkr24l2z2cok5z5s89ca1mrcwgbmmloyvm6zk";
}
import { Nested } from './Nested.js';
customElements.define(App.ZuiTagName, App);
