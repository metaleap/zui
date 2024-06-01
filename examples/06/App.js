// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5

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
    const node_p_0_0_2escw5 = document.createElement("p");
    tmp_fn = (function() { return '' + this.string; }).bind(this);
    const txt_et3fx7 = document.createElement('span');
    txt_et3fx7.innerHTML = tmp_fn();
    this.subs_2escw5.set(txt_et3fx7, tmp_fn);
    node_p_0_0_2escw5.append(txt_et3fx7);
    shadowRoot.appendChild(node_p_0_0_2escw5);
  }

  subs_2escw5 = new Map();

  static ZuiTagName = "zui-app_2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5";
}
customElements.define(App.ZuiTagName, App);
