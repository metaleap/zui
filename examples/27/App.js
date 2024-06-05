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
    e2.setAttribute("type",  f3());
    const f4 = (() => (this.#yes)).bind(this);
    e2.addEventListener('input', ((evt) => { this.#yes = e2.checked; }).bind(this));
    const f5 = f4;
    e2.setAttribute("checked",  f5());
    this.zuiSub('yes', () => e2.setAttribute("checked",  f5()));
    e2.replaceChildren(...n_e2);
    n_e1.push(e2);
    n_e1.push(newT("\n    Yes! Send me regular email spam\n"));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e8 = newE('zui-cond');
    const n_e8 = [];
    const f7 = (() => { //startCond
      if (this.#yes) {
    n_e8.push(newT(" "));
    const e9 = newE("p");
    const n_e9 = [];
    n_e9.push(newT("Thank you. We will bombard your inbox and sell your personal details."));
    e9.replaceChildren(...n_e9);
    n_e8.push(e9);
    n_e8.push(newT(" "));
      } else {
    n_e8.push(newT(" "));
    const e10 = newE("p");
    const n_e10 = [];
    n_e10.push(newT("You must opt in to continue. If you're not paying, you're the product."));
    e10.replaceChildren(...n_e10);
    n_e8.push(e10);
    n_e8.push(newT(" "));
      }
      e8.replaceChildren(...n_e8);
      n_e8.splice(0);
    }).bind(this); //endCond
    f7();
    this.zuiSub("yes", f7);
    n_shadowRoot.push(e8);
    n_shadowRoot.push(newT(" "));
    const e11 = newE("button");
    const n_e11 = [];
    const f12 = (() => (!this.#yes)).bind(this);
    e11.setAttribute("disabled",  f12());
    this.zuiSub('yes', () => e11.setAttribute("disabled",  f12()));
    n_e11.push(newT("Subscribe"));
    e11.replaceChildren(...n_e11);
    n_shadowRoot.push(e11);
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
