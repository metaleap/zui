// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = `this string contains some <strong>HTML!!!</strong>`;
  get #string() { return this.#v0; }
  set #string(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('string');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("p");
    const n_e1 = [];
    const f2 = (() => (this.#string)).bind(this);
    const e3 = newE('span');
    e3.innerHTML = f2();
    this.zuiSub('string', (() => { e3.innerHTML = f2(); }).bind(this));
    n_e1.push(e3);
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5";
}
customElements.define(App.ZuiTagName, App);
