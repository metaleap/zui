// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1zmkbx3j6oiu2hybj9cbcikwb10lj7spbgbnl61l8rsg0gkubxjdi79wh

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
    const node_h1_0_0_1zmkbx3j6oiu2hybj9cbcikwb10lj7spbgbnl61l8rsg0gkubxjdi79wh = document.createElement("h1");
    node_h1_0_0_1zmkbx3j6oiu2hybj9cbcikwb10lj7spbgbnl61l8rsg0gkubxjdi79wh.append("Welcome!");
    shadowRoot.appendChild(node_h1_0_0_1zmkbx3j6oiu2hybj9cbcikwb10lj7spbgbnl61l8rsg0gkubxjdi79wh);
  }
}
customElements.define('zui-app_1zmkbx3j6oiu2hybj9cbcikwb10lj7spbgbnl61l8rsg0gkubxjdi79wh', App);
