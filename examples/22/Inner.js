// Code generated from Inner.zui. DO NOT EDIT
// Source file content hash: 2gvcofelhd6rw1j9673zfg4bq53mtkua0rsrfqm1fn01f8mnq0xoqtvvph

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class Inner extends ZuiElement {



#sayHello() {
    this.dispatch("message", {text: "Hello!"});
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#sayHello)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this), {});
    n_e1.push(newT(" Click to say hello "));
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

  static ZuiTagName = "zui-inner_2gvcofelhd6rw1j9673zfg4bq53mtkua0rsrfqm1fn01f8mnq0xoqtvvph";
}
customElements.define(Inner.ZuiTagName, Inner);
