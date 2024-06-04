// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 23ey363lm9b172q1hmjt874tgt58hewoq9lpx83q17c81kbdrz6185u5ia

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = {x: 0, y: 0};
  get #m() { return this.#v0; }
  set #m(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('m');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("div");
    const n_e1 = [];
    const f2 = (() => ((e) => {
    this.#m = {x: e.clientX, y: e.clientY};
})).bind(this);
    e1.addEventListener('pointermove', ((evt) => (f2)().bind(this)(evt)).bind(this));
    n_e1.push(newT("\n    The pointer is at "));
    const f3 = (() => (this.#m.x)).bind(this);
    const e4 = newT(f3());
    this.zuiSub('m', (() => { e4.nodeValue = f3(); }).bind(this));
    n_e1.push(e4);
    n_e1.push(newT(" x "));
    const f5 = (() => (this.#m.y)).bind(this);
    const e6 = newT(f5());
    this.zuiSub('m', (() => { e6.nodeValue = f5(); }).bind(this));
    n_e1.push(e6);
    n_e1.push(newT(" "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e7 = newE("style");
    const n_e7 = [];
    n_e7.push(newT("\n    div {\n        position: fixed;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        padding: 1rem;\n    }\n"));
    e7.replaceChildren(...n_e7);
    n_shadowRoot.push(e7);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_23ey363lm9b172q1hmjt874tgt58hewoq9lpx83q17c81kbdrz6185u5ia";
}
customElements.define(App.ZuiTagName, App);
