// Code generated from App.zui. DO NOT EDIT
// Source file content hash: mg4vd2zzs9yz37wx2hcrry9xtxn0oo72myx7wicphg7t8np899sglkr

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


src = "03/image.png";


  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_img_0_0_mg4lkr = document.createElement("img");
    node_img_0_0_mg4lkr.setAttribute("alt", ''+"Rick");
    node_img_0_0_mg4lkr.setAttribute("src", ''+this.src+"");
    shadowRoot.appendChild(node_img_0_0_mg4lkr);
  }

  static ZuiTagName = "zui-app_mg4vd2zzs9yz37wx2hcrry9xtxn0oo72myx7wicphg7t8np899sglkr";
}
customElements.define(App.ZuiTagName, App);
