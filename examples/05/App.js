// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }




  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("p");
    el1.append("This is a paragraph.");
    shadowRoot.appendChild(el1);
    shadowRoot.append("\n");
    const el2 = document.createElement(Nested.ZuiTagName);
    shadowRoot.appendChild(el2);
    shadowRoot.append("\n\n");
    const el3 = document.createElement("style");
    el3.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    shadowRoot.appendChild(el3);
  }
  constructor() {
    super();
  }
zuiOnPropChanged(name) {}
zuiSet(k, n, v) {
  if (((typeof this[k]) === 'object') || ((typeof v) === 'object') || !Object.is(this[k], v)) {
    this[k] = v;
    this.zuiOnPropChanged(n);
  }
}


  static ZuiTagName = "zui-app_2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk";
}
import { Nested } from './Nested.js'
customElements.define(App.ZuiTagName, App);
