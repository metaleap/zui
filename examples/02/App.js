// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 258eb9ct2vsm42hxh56lho4qp8t85tq388rdqr1wexwhdj8guxrq2agr

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
    const node_h1_0_0_258eb9ct2vsm42hxh56lho4qp8t85tq388rdqr1wexwhdj8guxrq2agr = document.createElement("h1");
    node_h1_0_0_258eb9ct2vsm42hxh56lho4qp8t85tq388rdqr1wexwhdj8guxrq2agr.append("Hello {greetName}!");
    shadowRoot.appendChild(node_h1_0_0_258eb9ct2vsm42hxh56lho4qp8t85tq388rdqr1wexwhdj8guxrq2agr);
  }


    let greetName = "ZUI";

    function foo() {
        console.log("FOOBAR");
    }


}
customElements.define('zui-app_258eb9ct2vsm42hxh56lho4qp8t85tq388rdqr1wexwhdj8guxrq2agr', App);
