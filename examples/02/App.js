// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = "zui";
  get #greetName() { return this.#v0; }
  set #greetName(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('greetName');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("h1");
    const n_e1 = [];
    n_e1.push(newT("Hello "));
    const f2 = (() => (this.#greetName.toUpperCase())).bind(this);
    const e3 = newT(f2());
    this.zuiSub('greetName', (() => { e3.nodeValue = f2(); }).bind(this));
    n_e1.push(e3);
    n_e1.push(newT("!"));
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

  static ZuiTagName = "zui-app_3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz";
}
customElements.define(App.ZuiTagName, App);
