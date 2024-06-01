// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 224abhbqzum0a1ljqpikvf8s3y2uqqiwf578t4s2b1paxznc07jc1eg08e2

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


src = '03/image.png';


  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_img_0_0_2248e2 = document.createElement("img");
    node_img_0_0_2248e2.setAttribute("alt", '' + "Rick");
    const tmp_fn_0 = (function() { return '' + this.src; }).bind(this);
    node_img_0_0_2248e2.setAttribute("src", '' +  (tmp_fn_0()) );
    shadowRoot.appendChild(node_img_0_0_2248e2);
  }

  static ZuiTagName = "zui-app_224abhbqzum0a1ljqpikvf8s3y2uqqiwf578t4s2b1paxznc07jc1eg08e2";
}
customElements.define(App.ZuiTagName, App);
