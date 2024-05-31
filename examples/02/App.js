// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45

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


  subs_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45 = new Map();
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_h1_0_0_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45 = document.createElement("h1");
    node_h1_0_0_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45.append("Hello ");
    const span_qygqgnlvib92r2hx2igam2y418ds1tv4rq6ry26t5qo182xhyu6sslru = document.createElement('span');
    tmp_fn = function(this) { return this.greetName.toUpperCase(); };
    this.subs_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45.set(span_qygqgnlvib92r2hx2igam2y418ds1tv4rq6ry26t5qo182xhyu6sslru, tmp_fn);
    span_qygqgnlvib92r2hx2igam2y418ds1tv4rq6ry26t5qo182xhyu6sslru.append(tmp_fn(this));
    node_h1_0_0_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45.append("!");
    shadowRoot.appendChild(node_h1_0_0_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45);
  }
}

customElements.define('zui-app_16f57lkjhvwlm2pa4lz508mqyh2896nlxezdr5n9z9t2bxtlo3e10q7n45', App);
