// Code generated from App.zui. DO NOT EDIT
// Source file content hash: bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4

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
    const e2 = document.createElement("style");
    e2.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    shadowRoot.appendChild(e2);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4";
}
customElements.define(App.ZuiTagName, App);
