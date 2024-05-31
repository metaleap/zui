// Code generated from App.zui. DO NOT EDIT
// Source file content hash: tmp

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


  subs_tmp = new Map();
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_h1_0_0_tmp = document.createElement("h1");
    node_h1_0_0_tmp.append("Hello ");
    const span_qygqgnlvib92r2hx2igam2y418ds1tv4rq6ry26t5qo182xhyu6sslru = document.createElement('span');
    tmp_fn = (function() { return this.greetName.toUpperCase(); }).bind(this);
    this.subs_tmp.set(span_qygqgnlvib92r2hx2igam2y418ds1tv4rq6ry26t5qo182xhyu6sslru, tmp_fn);
    span_qygqgnlvib92r2hx2igam2y418ds1tv4rq6ry26t5qo182xhyu6sslru.append(tmp_fn(this));
    node_h1_0_0_tmp.append("!");
    shadowRoot.appendChild(node_h1_0_0_tmp);
  }
}

customElements.define('zui-app_tmp', App);
