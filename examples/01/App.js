//1zmkbx3j6oiu2hybj9cbcikwb10lj7spbgbnl61l8rsg0gkubxjdi79wh

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements();
  }
  disconnectedCallback() {
  }
  adoptedCallback() {
  }
  attributeChangedCallback() {
  }
  zuiCreateHTMLElements() {
    const node_0_0 = document.createElement("body");
    const node_1_0 = document.createElement("h1");
    node_1_0.textContent = "Welcome!";
    node_0_0.appendChild(node_1_0);
    shadowRoot.appendChild(node_0_0);
    const node_0_1 = document.createElement("body");
    node_0_1.textContent = "\n";
    shadowRoot.appendChild(node_0_1);
  }
}
customElements.define('zui-App', App);
