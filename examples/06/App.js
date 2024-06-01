// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 18xvgttkqpvu2ypl6te7njfwl1ox9kd7qx0o4p3fgkgq1gy3vc77b2a9

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


string = `this string contains some <strong>HTML!!!</strong>`;


  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_p_0_0_18x2a9 = document.createElement("p");
    tmp_fn = (function() { return '' + this.string; }).bind(this);
    const txt_et3fx7 = document.createTextNode(tmp_fn());
    this.subs_18x2a9.set(txt_et3fx7, tmp_fn);
    node_p_0_0_18x2a9.append(txt_et3fx7);
    node_p_0_0_18x2a9.append("");
    shadowRoot.appendChild(node_p_0_0_18x2a9);
  }

  subs_18x2a9 = new Map();

  static ZuiTagName = "zui-app_18xvgttkqpvu2ypl6te7njfwl1ox9kd7qx0o4p3fgkgq1gy3vc77b2a9";
}
customElements.define(App.ZuiTagName, App);
