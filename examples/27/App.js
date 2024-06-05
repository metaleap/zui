// Code generated from App.zui. DO NOT EDIT
// Source file content hash: bd6k01wtvekw2ya1sua66eqxk1m8ocowezmm9c2cjqg98zluipgszsm8t

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = false;
  get #yes() { return this.#v0; }
  set #yes(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('yes');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("label");
    const n_e1 = [];
    n_e1.push(newT(" "));
    const e2 = newE("input");
    const n_e2 = [];
    const f3 = (() => ("checkbox")).bind(this);
    this.zuiSet(e2, "type",  f3());
    const f4 = (() => (this.#yes)).bind(this);
    const f5 = ((evt) => { this.#yes = e2.checked; }).bind(this);
    e2.addEventListener('input', f5);
    e2.addEventListener('change', f5);
    const f6 = f4;
    this.zuiSet(e2, "checked",  f6());
    this.zuiSub('yes', () => this.zuiSet(e2, "checked",  f6()));
    e2.replaceChildren(...n_e2);
    n_e1.push(e2);
    n_e1.push(newT("\n    Yes! Send me regular email spam\n"));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e9 = newE('zui-cond');
    const n_e9 = [];
    const f8 = (() => { //startCond
      if (this.#yes) {
    n_e9.push(newT(" "));
    const e10 = newE("p");
    const n_e10 = [];
    n_e10.push(newT("Thank you. We will bombard your inbox and sell your personal details."));
    e10.replaceChildren(...n_e10);
    n_e9.push(e10);
    n_e9.push(newT(" "));
      } else {
    n_e9.push(newT(" "));
    const e11 = newE("p");
    const n_e11 = [];
    n_e11.push(newT("You must opt in to continue. If you're not paying, you're the product."));
    e11.replaceChildren(...n_e11);
    n_e9.push(e11);
    n_e9.push(newT(" "));
      }
      e9.replaceChildren(...n_e9);
      n_e9.splice(0);
    }).bind(this); //endCond
    f8();
    this.zuiSub("yes", f8);
    n_shadowRoot.push(e9);
    n_shadowRoot.push(newT(" "));
    const e12 = newE("button");
    const n_e12 = [];
    const f13 = (() => (!this.#yes)).bind(this);
    this.zuiSet(e12, "disabled",  f13());
    this.zuiSub('yes', () => this.zuiSet(e12, "disabled",  f13()));
    n_e12.push(newT("Subscribe"));
    e12.replaceChildren(...n_e12);
    n_shadowRoot.push(e12);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_bd6k01wtvekw2ya1sua66eqxk1m8ocowezmm9c2cjqg98zluipgszsm8t";
}
customElements.define(App.ZuiTagName, App);
