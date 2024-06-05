// Code generated from Outer.zui. DO NOT EDIT
// Source file content hash: hqgjld14n9nf6v8u8x2g33bc2j6hrlmy8tixc3v3gniv36pzq21ja9z12

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class Outer extends ZuiElement {




  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE(Inner.ZuiTagName);
    const n_e1 = [];
    const f2 = (() => ((evt) => {
      this.dispatch('message', evt.detail);
    }));
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

  static ZuiTagName = "zui-outer_hqgjld14n9nf6v8u8x2g33bc2j6hrlmy8tixc3v3gniv36pzq21ja9z12";
}
import { Inner } from './Inner.js';
customElements.define(Outer.ZuiTagName, Outer);
