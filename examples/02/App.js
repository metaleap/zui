// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45

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


  greetName = "zui";


  zuiCreateHTMLElements(shadowRoot) {
    const node_h1_0_0_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45 = document.createElement("h1");
    node_h1_0_0_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45.append("Hello {greetName.toUpperCase()}!");
    shadowRoot.appendChild(node_h1_0_0_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45);
  }
}

customElements.define('zui-app_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45', App);
