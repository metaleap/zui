// Code generated from Nested.zui. DO NOT EDIT
// Source file content hash: p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo

export class Nested extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("p");
    el1.append("This is another paragraph.");
    shadowRoot.appendChild(el1);
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


  static ZuiTagName = "zui-nested_p4uv49rgo5fi3cxcikmk7wguu1pje9tw3br7it23unvx8j5wjvc2lzhoo";
}
customElements.define(Nested.ZuiTagName, Nested);
