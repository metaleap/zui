// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3obzpc4q059miikgf76wuae2p2hvxl01310cboo0tz988smbhbfacbv1

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {



#handleMessage(event) {
    alert(event.detail.text);
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE(Inner.ZuiTagName);
    const n_e1 = [];
    const f2 = (() => (this.#handleMessage)).bind(this);
    e1.addEventListener('message', ((evt) => (f2)().bind(this)(evt)).bind(this), {});
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

  static ZuiTagName = "zui-app_3obzpc4q059miikgf76wuae2p2hvxl01310cboo0tz988smbhbfacbv1";
}
import { Inner } from './Inner.js';
customElements.define(App.ZuiTagName, App);
