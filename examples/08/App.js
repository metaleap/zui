// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1yadqe61wprkz3qm01yq09jv9uhchrpn6j8vdb25w2bdsp7akhn1d1r9n6

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
  get #doubled() { return this.#count * 2 }

#increment() {
    this.#count += 1;
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#increment)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this));
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
    n_shadowRoot.push(newT(" "));
    const e7 = newE("p");
    const n_e7 = [];
    const f8 = f3;
    const e9 = newT(f8());
    this.zuiSub('count', (() => { e9.nodeValue = f8(); }).bind(this));
    n_e7.push(e9);
    n_e7.push(newT(" doubled is "));
    const f10 = (() => (this.#doubled)).bind(this);
    const e11 = newT(f10());
    this.zuiSub('doubled', (() => { e11.nodeValue = f10(); }).bind(this));
    n_e7.push(e11);
    e7.replaceChildren(...n_e7);
    n_shadowRoot.push(e7);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
    this.zuiSub('count', () => this.zuiOnPropChanged('doubled'));
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_1yadqe61wprkz3qm01yq09jv9uhchrpn6j8vdb25w2bdsp7akhn1d1r9n6";
}
customElements.define(App.ZuiTagName, App);
