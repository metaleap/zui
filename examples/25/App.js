// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3jif1arldy06xww0s8q1dvo021uza8x3y3gnkke9xuczt7eu21jvpwdo

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = "world";
  get #name() { return this.#v0; }
  set #name(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('name');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("input");
    const n_e1 = [];
    const f2 = (() => (this.#name)).bind(this);
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e3 = newE("h1");
    const n_e3 = [];
    n_e3.push(newT("Hello "));
    const f4 = f2;
    const e5 = newT(f4());
    this.zuiSub('name', (() => { e5.nodeValue = f4(); }).bind(this));
    n_e3.push(e5);
    n_e3.push(newT("!"));
    e3.replaceChildren(...n_e3);
    n_shadowRoot.push(e3);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_3jif1arldy06xww0s8q1dvo021uza8x3y3gnkke9xuczt7eu21jvpwdo";
}
customElements.define(App.ZuiTagName, App);
