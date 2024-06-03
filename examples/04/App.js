// Code generated from App.zui. DO NOT EDIT
// Source file content hash: bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement("p");
    const n_e1 = [];
    n_e1.push("This is a paragraph.");
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(" ");
    const e2 = document.createElement("style");
    const n_e2 = [];
    n_e2.push("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    e2.replaceChildren(...n_e2);
    n_shadowRoot.push(e2);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4";
}
customElements.define(App.ZuiTagName, App);
