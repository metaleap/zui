// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2m9t0otais5kb1f7oe21tt774p27ht9arbu7u653has43t9ghfs41kfsrqt

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
    const node_p_0_0_2m9rqt = document.createElement("p");
    node_p_0_0_2m9rqt.append("This is a paragraph.");
    shadowRoot.appendChild(node_p_0_0_2m9rqt);
    shadowRoot.append("\n");
    const node_nested_0_2_2m9rqt = document.createElement("nested");
    node_nested_0_2_2m9rqt.append("\n\n");
    const node_style_1_1_2m9rqt = document.createElement("style");
    node_style_1_1_2m9rqt.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    node_nested_0_2_2m9rqt.appendChild(node_style_1_1_2m9rqt);
    shadowRoot.appendChild(node_nested_0_2_2m9rqt);
  }

  static ZuiTagName = "zui-app_2m9t0otais5kb1f7oe21tt774p27ht9arbu7u653has43t9ghfs41kfsrqt";
}
customElements.define(App.ZuiTagName, App);
