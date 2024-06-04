// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 25amm7opbsvam1tyoph7lhadg63epgbqfpelw8a1hnf8iov4xes1pgezc8

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {



#getRandomNumber() {
    return new Promise((resolve, fail) => {
        setTimeout(() => {
            const r = Math.random();
            if (r < 0.123) {
                fail(new Error("Too small: " + r));
            }
            const n = Date.now() * r;
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
    this.#promise = this.#getRandomNumber();
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#handleClick)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this));
    n_e1.push(newT(" generate random number "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e4 = newE('zui-wait');
    const n_e4 = [];
    const f3 = (async () => { //startWait
    n_e4.push(newT(" "));
    const e5 = newE("p");
    const n_e5 = [];
    n_e5.push(newT("...waiting"));
    e5.replaceChildren(...n_e5);
    n_e4.push(e5);
    n_e4.push(newT(" "));
      e4.replaceChildren(...n_e4);
      n_e4.splice(0);
      try {
        const number = await this.#promise;
    n_e4.push(newT(" "));
    const e6 = newE("p");
    const n_e6 = [];
    n_e6.push(newT("The number is "));
    const f7 = (() => (number)).bind(this);
    const e8 = newT(f7());
    n_e6.push(e8);
    e6.replaceChildren(...n_e6);
    n_e4.push(e6);
    n_e4.push(newT(" "));
        e4.replaceChildren(...n_e4);
        n_e4.splice(0);
      } catch (error) {
    n_e4.push(newT(" "));
    const e9 = newE("p");
    const n_e9 = [];
    const f10 = (() => ("color: red")).bind(this);
    e9.setAttribute("style",  f10());
    const f11 = (() => (error.message)).bind(this);
    const e12 = newT(f11());
    n_e9.push(e12);
    e9.replaceChildren(...n_e9);
    n_e4.push(e9);
    n_e4.push(newT(" "));
        e4.replaceChildren(...n_e4);
        n_e4.splice(0);
      }
    }).bind(this); //endWait
    f3();
    this.zuiSub("promise", f3);
    n_shadowRoot.push(e4);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_25amm7opbsvam1tyoph7lhadg63epgbqfpelw8a1hnf8iov4xes1pgezc8";
}
customElements.define(App.ZuiTagName, App);
