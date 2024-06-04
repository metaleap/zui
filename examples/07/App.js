// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 31h8ys4i60kmd3o9tme4foa1se13invk5pebgv1133hctubzid61mdqi9p

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
    {
        this.#count += 1;
        this.zuiOnPropChanged("count");
    }
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#increment)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)()).bind(this));
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
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_31h8ys4i60kmd3o9tme4foa1se13invk5pebgv1133hctubzid61mdqi9p";
}
customElements.define(App.ZuiTagName, App);
