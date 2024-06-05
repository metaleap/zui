// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1vkzdq3trnr10349obnm712e8u1crfjy38vzbbf22plxlup5slsbkc05im

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

#increment() {
    this.#count += 1;
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#increment)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this), {});
    n_e1.push(newT("\n    Clicked "));
    const f3 = (() => (this.#count)).bind(this);
    const e4 = newT(f3());
    this.zuiSub('count', (() => { e4.nodeValue = f3(); }));
    n_e1.push(e4);
    n_e1.push(newT(" "));
    const f5 = (() => (this.#count === 1 ? "time" : "times")).bind(this);
    const e6 = newT(f5());
    this.zuiSub('count', (() => { e6.nodeValue = f5(); }));
    n_e1.push(e6);
    n_e1.push(newT(" "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e8 = newE('zui-cond');
    const n_e8 = [];
    const f7 = (() => { //startCond
      if (this.#count > 10) {
    n_e8.push(newT(" "));
    const e9 = newE("p");
    const n_e9 = [];
    const f10 = f3;
    const e11 = newT(f10());
    n_e9.push(e11);
    n_e9.push(newT(" is greater than 10"));
    e9.replaceChildren(...n_e9);
    n_e8.push(e9);
    n_e8.push(newT(" "));
      }
      e8.replaceChildren(...n_e8);
      n_e8.splice(0);
    }).bind(this); //endCond
    f7();
    this.zuiSub("count", f7);
    n_shadowRoot.push(e8);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_1vkzdq3trnr10349obnm712e8u1crfjy38vzbbf22plxlup5slsbkc05im";
}
customElements.define(App.ZuiTagName, App);
