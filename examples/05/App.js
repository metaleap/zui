// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {




  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("p");
    const n_e1 = [];
    n_e1.push(newT("This is a paragraph."));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e2 = newE(Nested.ZuiTagName);
    const n_e2 = [];
    e2.replaceChildren(...n_e2);
    n_shadowRoot.push(e2);
    n_shadowRoot.push(newT(" "));
    const e3 = newE("style");
    const n_e3 = [];
    n_e3.push(newT("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n"));
    e3.replaceChildren(...n_e3);
    n_shadowRoot.push(e3);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk";
}
import { Nested } from './Nested.js';
customElements.define(App.ZuiTagName, App);
