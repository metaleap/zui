// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1w6q3ushh5otx2oyeis1ttx2dchsi6xqehpv6z2g18defkdzo0x17605z2

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {
  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("h1");
    const n_e1 = [];
    n_e1.push(newT("Welcome!"));
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

  static ZuiTagName = "zui-app_1w6q3ushh5otx2oyeis1ttx2dchsi6xqehpv6z2g18defkdzo0x17605z2";
}
customElements.define(App.ZuiTagName, App);
