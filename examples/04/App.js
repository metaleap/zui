// Code generated from App.zui. DO NOT EDIT
// Source file content hash: bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("p");
    el1.append("This is a paragraph.");
    shadowRoot.appendChild(el1);
    shadowRoot.append("\n\n");
    const el2 = document.createElement("style");
    el2.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    shadowRoot.appendChild(el2);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4";
}
customElements.define(App.ZuiTagName, App);
