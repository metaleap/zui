// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1w2nzkohnbh5werzhrcp492821xyhi11kf3nhi3d6m72u7vfeg01ryeigy

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
    const node_h1_0_0_1w2nzkohnbh5werzhrcp492821xyhi11kf3nhi3d6m72u7vfeg01ryeigy = document.createElement("h1");
    node_h1_0_0_1w2nzkohnbh5werzhrcp492821xyhi11kf3nhi3d6m72u7vfeg01ryeigy.append("Hello {greetName}!");
    shadowRoot.appendChild(node_h1_0_0_1w2nzkohnbh5werzhrcp492821xyhi11kf3nhi3d6m72u7vfeg01ryeigy);
  }


greetName = "ZUI";
foo() {
    console.log("FOOBAR " + greetName);
}


}
customElements.define('zui-app_1w2nzkohnbh5werzhrcp492821xyhi11kf3nhi3d6m72u7vfeg01ryeigy', App);
