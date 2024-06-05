// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3962rm30327p10gp3tkcd5o0w381sm1nit7ed82klz7uwc9z1bjcuv78w

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {



#handleMessage(event) {
    alert(event.detail.text);
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE(Outer.ZuiTagName);
    const n_e1 = [];
    const f2 = (() => (this.#handleMessage)).bind(this);
    e1.addEventListener('message', ((evt) => (f2)().bind(this)(evt)).bind(this));
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

  static ZuiTagName = "zui-app_3962rm30327p10gp3tkcd5o0w381sm1nit7ed82klz7uwc9z1bjcuv78w";
}
import { Outer } from './Outer.js';
customElements.define(App.ZuiTagName, App);
