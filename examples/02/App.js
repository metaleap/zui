// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz

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


  subs_371ehz = new Map();
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_h1_0_0_371ehz = document.createElement("h1");
    node_h1_0_0_371ehz.append("Hello ");
    tmp_fn = (function() { return '' + this.greetName.toUpperCase(); }).bind(this);
    const txt_qyglru = document.createTextNode(tmp_fn());
    this.subs_371ehz.set(txt_qyglru, tmp_fn);
    node_h1_0_0_371ehz.append(txt_qyglru);
    node_h1_0_0_371ehz.append("!");
    shadowRoot.appendChild(node_h1_0_0_371ehz);
  }
  static TagName = "zui-app_3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz";
}

customElements.define(App.TagName, App);
