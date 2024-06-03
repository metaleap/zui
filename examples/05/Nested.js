// Code generated from Nested.zui. DO NOT EDIT
// Source file content hash: p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo

export class Nested extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiCreateHTMLElements(shadowRoot) {
    const e1 = document.createElement("p");
    e1.append("This is another paragraph.");
    shadowRoot.appendChild(e1);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-nested_p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo";
}
customElements.define(Nested.ZuiTagName, Nested);
