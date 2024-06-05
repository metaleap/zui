// Code generated from Inner.zui. DO NOT EDIT
// Source file content hash: sxkx9xriusg13tct5txod2t9et8smmsidgce2xijue2078nkd6ev8z4

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
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this));
    n_e1.push(newT(" 23 Click to say hello "));
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

  static ZuiTagName = "zui-inner_sxkx9xriusg13tct5txod2t9et8smmsidgce2xijue2078nkd6ev8z4";
}
customElements.define(Inner.ZuiTagName, Inner);
