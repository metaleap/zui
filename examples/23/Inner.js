// Code generated from Inner.zui. DO NOT EDIT
// Source file content hash: yres2w2wjhzvmk0xl1n16n8tshsplsrwa0nk3mw59dn1z9nvj1sxgy68

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
    n_e1.push(newT("Click to say hello"));
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

  static ZuiTagName = "zui-inner_yres2w2wjhzvmk0xl1n16n8tshsplsrwa0nk3mw59dn1z9nvj1sxgy68";
}
customElements.define(Inner.ZuiTagName, Inner);
