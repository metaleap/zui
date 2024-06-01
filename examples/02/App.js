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


greetName = "zui";


  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_h1_0_0_371ehz = document.createElement("h1");
    node_h1_0_0_371ehz.append("Hello ");
    tmp_fn = (function() { return '' + this.greetName.toUpperCase(); }).bind(this);
    const txt_3molke = document.createTextNode(tmp_fn());
    this.subs_371ehz.set(txt_3molke, tmp_fn);
    node_h1_0_0_371ehz.append(txt_3molke);
    node_h1_0_0_371ehz.append("!");
    shadowRoot.appendChild(node_h1_0_0_371ehz);
  }

  static ZuiTagName = "zui-app_3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz";
}
customElements.define(App.ZuiTagName, App);
