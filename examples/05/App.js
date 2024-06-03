// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }




  zuiCreateHTMLElements(shadowRoot) {
    const e1 = document.createElement("p");
    e1.append("This is a paragraph.");
    shadowRoot.appendChild(e1);
    shadowRoot.append(" ");
    const e2 = document.createElement(Nested.ZuiTagName);
    shadowRoot.appendChild(e2);
    shadowRoot.append(" ");
    const e3 = document.createElement("style");
    e3.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    shadowRoot.appendChild(e3);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk";
}
import { Nested } from './Nested.js'
customElements.define(App.ZuiTagName, App);
