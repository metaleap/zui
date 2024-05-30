// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3edvizbepy7g61bfhkywt0fhfq1di7znfa8snve3121aa37ciwpc1hudgkr

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  disconnectedCallback() {
  }
  adoptedCallback() {
  }
  attributeChangedCallback() {
  }
  zuiCreateHTMLElements(shadowRoot) {
    const node_h1_0_0_3edvizbepy7g61bfhkywt0fhfq1di7znfa8snve3121aa37ciwpc1hudgkr = document.createElement("h1");
    node_h1_0_0_3edvizbepy7g61bfhkywt0fhfq1di7znfa8snve3121aa37ciwpc1hudgkr.append("Hello {greetName}!");
    shadowRoot.appendChild(node_h1_0_0_3edvizbepy7g61bfhkywt0fhfq1di7znfa8snve3121aa37ciwpc1hudgkr);
  }
  foo() {
    console.log("FOOBAR ") + fbb;
  }
  fbb = "bar baz";
}
customElements.define('zui-app_3edvizbepy7g61bfhkywt0fhfq1di7znfa8snve3121aa37ciwpc1hudgkr', App);
