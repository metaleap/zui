// Code generated from App.zui. DO NOT EDIT
// Source file content hash: jkfc1nybzx5n2dny6byg7jhzp329msx31tuqq42iqksko8ncuetboqdr

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
    const node_h1_0_0_jkfc1nybzx5n2dny6byg7jhzp329msx31tuqq42iqksko8ncuetboqdr = document.createElement("h1");
    node_h1_0_0_jkfc1nybzx5n2dny6byg7jhzp329msx31tuqq42iqksko8ncuetboqdr.append("Hello {greetName}!");
    shadowRoot.appendChild(node_h1_0_0_jkfc1nybzx5n2dny6byg7jhzp329msx31tuqq42iqksko8ncuetboqdr);
  }


greetName = "ZUI";
fooB = () => {
    console.log(greetName + " is here but " + wot + " aint");
};
daFunc = function() {
    return greetName.toUpperCase();
};
foo() {
    console.log("FOOBAR " + greetName + blaBla);
    console.log("WhooHa");
}


}

customElements.define('zui-app_jkfc1nybzx5n2dny6byg7jhzp329msx31tuqq42iqksko8ncuetboqdr', App);
