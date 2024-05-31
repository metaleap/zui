// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3k4fpzey8kzgk1wds5y69s1z41bmd3w0w4xvpz1tt4lr8kfcx9wil12xo

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
    const node_h1_0_0_3k4fpzey8kzgk1wds5y69s1z41bmd3w0w4xvpz1tt4lr8kfcx9wil12xo = document.createElement("h1");
    node_h1_0_0_3k4fpzey8kzgk1wds5y69s1z41bmd3w0w4xvpz1tt4lr8kfcx9wil12xo.append("Hello {greetName}!");
    shadowRoot.appendChild(node_h1_0_0_3k4fpzey8kzgk1wds5y69s1z41bmd3w0w4xvpz1tt4lr8kfcx9wil12xo);
  }


greetName = "ZUI";
fooB = () => {
    let mooha = () => {
        if (true) {
            while (false) {
                console.log(123);
            }
        }
    };
    console.log(greetName + " is here but " + wot + " aint");
};
daFunc = function() {
    function foobie() {
        if (true) {
            while (false) {
                console.log(123);
            }
        }
    }
    return greetName.toUpperCase();
};
foo() {
    console.log("FOOBAR " + greetName + blaBla);
    console.log("WhooHa");
}


}

customElements.define('zui-app_3k4fpzey8kzgk1wds5y69s1z41bmd3w0w4xvpz1tt4lr8kfcx9wil12xo', App);
