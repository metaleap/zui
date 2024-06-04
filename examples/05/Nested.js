// Code generated from Nested.zui. DO NOT EDIT
// Source file content hash: p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class Nested extends ZuiElement {
  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("p");
    const n_e1 = [];
    n_e1.push("This is another paragraph.");
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

  static ZuiTagName = "zui-nested_p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo";
}
customElements.define(Nested.ZuiTagName, Nested);
