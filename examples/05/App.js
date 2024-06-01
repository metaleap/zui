// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }




  zuiCreateHTMLElements(shadowRoot) {
    const node_p_0_0_2dw3yk = document.createElement("p");
    node_p_0_0_2dw3yk.append("This is a paragraph.");
    shadowRoot.appendChild(node_p_0_0_2dw3yk);
    shadowRoot.append("\n");
    const node_zui_2dw3yk_0_2_2dw3yk = document.createElement(Nested.ZuiTagName);
    shadowRoot.appendChild(node_zui_2dw3yk_0_2_2dw3yk);
    shadowRoot.append("\n\n");
    const node_style_0_4_2dw3yk = document.createElement("style");
    node_style_0_4_2dw3yk.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    shadowRoot.appendChild(node_style_0_4_2dw3yk);
  }
  constructor() {
    super();
  }

  static ZuiTagName = "zui-app_2dw72b2k37hk93fqtrlrlgi8spfhy44qznc2i5rwcja3krdxfg11z23yk";
}
import { Nested } from './Nested.js'
customElements.define(App.ZuiTagName, App);
