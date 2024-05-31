// Code generated from App.zui. DO NOT EDIT
// Source file content hash: bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_p_0_0_bz0jw4 = document.createElement("p");
    node_p_0_0_bz0jw4.append("This is a paragraph.");
    shadowRoot.appendChild(node_p_0_0_bz0jw4);
    shadowRoot.append("\n\n");
    const node_style_0_2_bz0jw4 = document.createElement("style");
    node_style_0_2_bz0jw4.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    shadowRoot.appendChild(node_style_0_2_bz0jw4);
  }

  static ZuiTagName = "zui-app_bz0x9g56pye3od150qsa8yum2ui1zu4834cyu2h42kb153smve1etljw4";
}
customElements.define(App.ZuiTagName, App);
