// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2f2g5e8mtx7qz39o5xu6057e592czmk5ad3fgmk3uodv6jsx2uwv1s3fsal

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = 0;
  get #count() { return this.#v0; }
  set #count(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('count');
    }
  }

#handleClick() {
    this.#count += 1;
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#handleClick)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this), {});
    n_e1.push(newT("\n    Clicked "));
    const f3 = (() => (this.#count)).bind(this);
    const e4 = newT(f3());
    this.zuiSub('count', (() => { e4.nodeValue = f3(); }).bind(this));
    n_e1.push(e4);
    n_e1.push(newT(" "));
    const f5 = (() => (this.#count === 1 ? "time" : "times")).bind(this);
    const e6 = newT(f5());
    this.zuiSub('count', (() => { e6.nodeValue = f5(); }).bind(this));
    n_e1.push(e6);
    n_e1.push(newT(" "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
    this.zuiSub('count', () => {
if (this.#count >= 10) {
    alert("count is dangerously high!");
    this.#count = 0;
}
    });
    this.zuiSub('count', () => {
{
    console.log(`the count is ${this.#count}`);
    console.log(`this will also be logged whenever count changes`);
}
    });
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_2f2g5e8mtx7qz39o5xu6057e592czmk5ad3fgmk3uodv6jsx2uwv1s3fsal";
}
customElements.define(App.ZuiTagName, App);
