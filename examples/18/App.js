// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3k1641db0gko61bt99576cxvtd1myzzh0uar2mc19tchw7tod04qujqtl8

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {



#getRandomNumber() {
    return new Promise((resolve, fail) => {
        setTimeout(() => {
            const n = Date.now() * Math.random();
            if (n < 0.1) {
                fail(new Error("Too small: " + n));
            }
            resolve(n);
        }, 2000);
    });
}

  #v1 = this.#getRandomNumber();
  get #promise() { return this.#v1; }
  set #promise(v) {
    if (!deepEq(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('promise');
    }
  }

#handleClick() {
    {
        this.#promise = this.#getRandomNumber();
        this.zuiOnPropChanged("promise");
    }
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#handleClick)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)()).bind(this));
    n_e1.push(newT(" generate random number "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    n_shadowRoot.push(newT(" "));
    const e3 = newE("p");
    const n_e3 = [];
    n_e3.push(newT("...waiting"));
    e3.replaceChildren(...n_e3);
    n_shadowRoot.push(e3);
    n_shadowRoot.push(newT(" "));
    n_shadowRoot.push(newT(" "));
    const e4 = newE("p");
    const n_e4 = [];
    n_e4.push(newT("The number is "));
    const f5 = (() => (number)).bind(this);
    const e6 = newT(f5());
    n_e4.push(e6);
    e4.replaceChildren(...n_e4);
    n_shadowRoot.push(e4);
    n_shadowRoot.push(newT(" "));
    n_shadowRoot.push(newT(" "));
    const e7 = newE("p");
    const n_e7 = [];
    const f8 = (() => ("color: red")).bind(this);
    e7.setAttribute("style",  f8());
    const f9 = (() => (error.message)).bind(this);
    const e10 = newT(f9());
    n_e7.push(e10);
    e7.replaceChildren(...n_e7);
    n_shadowRoot.push(e7);
    n_shadowRoot.push(newT(" "));
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_3k1641db0gko61bt99576cxvtd1myzzh0uar2mc19tchw7tod04qujqtl8";
}
customElements.define(App.ZuiTagName, App);
