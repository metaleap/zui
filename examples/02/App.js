// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1ng6fjtq1z9z39yo06krmaxnw2w1iq5o1vh2bu35mtjs1v38kqf1u7u1ox

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
    const node_h1_0_0_1ng6fjtq1z9z39yo06krmaxnw2w1iq5o1vh2bu35mtjs1v38kqf1u7u1ox = document.createElement("h1");
    node_h1_0_0_1ng6fjtq1z9z39yo06krmaxnw2w1iq5o1vh2bu35mtjs1v38kqf1u7u1ox.append("Hello {greetName}!");
    shadowRoot.appendChild(node_h1_0_0_1ng6fjtq1z9z39yo06krmaxnw2w1iq5o1vh2bu35mtjs1v38kqf1u7u1ox);
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

customElements.define('zui-app_1ng6fjtq1z9z39yo06krmaxnw2w1iq5o1vh2bu35mtjs1v38kqf1u7u1ox', App);
