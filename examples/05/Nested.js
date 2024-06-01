// Code generated from Nested.zui. DO NOT EDIT
// Source file content hash: p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo

export class Nested extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiCreateHTMLElements(shadowRoot) {
    const node_p_0_0_p4uhoo = document.createElement("p");
    node_p_0_0_p4uhoo.append("This is another paragraph.");
    shadowRoot.appendChild(node_p_0_0_p4uhoo);
  }
  constructor() {
    super();
  }

  static ZuiTagName = "zui-nested_p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo";
}
customElements.define(Nested.ZuiTagName, Nested);
