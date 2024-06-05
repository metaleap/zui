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
    const f3 = ((evt) => { this.#name = e1.value; }).bind(this);
    e1.addEventListener('input', f3);
    e1.addEventListener('change', f3);
    const f4 = f2;
    e1.setAttribute("value",  f4());
    this.zuiSub('name', () => e1.setAttribute("value",  f4()));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e6 = newE("h1");
    const n_e6 = [];
    n_e6.push(newT("Hello "));
    const f7 = f2;
    const e8 = newT(f7());
    this.zuiSub('name', (() => { e8.nodeValue = f7(); }).bind(this));
    n_e6.push(e8);
    n_e6.push(newT("!"));
    e6.replaceChildren(...n_e6);
    n_shadowRoot.push(e6);
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
