// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk

export class App extends HTMLElement {




  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement("p");
    const n_e1 = [];
    n_e1.push("This is a paragraph.");
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(" ");
    const e2 = document.createElement(Nested.ZuiTagName);
    const n_e2 = [];
    e2.replaceChildren(...n_e2);
    n_shadowRoot.push(e2);
    n_shadowRoot.push(" ");
    const e3 = document.createElement("style");
    const n_e3 = [];
    n_e3.push("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
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
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk";
}
import { Nested } from './Nested.js'
customElements.define(App.ZuiTagName, App);
