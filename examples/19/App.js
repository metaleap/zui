// Code generated from App.zui. DO NOT EDIT
// Source file content hash: hjdycy4m2kuc3kt44tg2yprzx2ipyw7yw7x50q3tcdzzv3cceq6yn3dqu

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

#handleMove(event) {
    {
        this.#m.x = event.clientX;
        this.zuiOnPropChanged("m");
    }
    {
        this.#m.y = event.clientY;
        this.zuiOnPropChanged("m");
    }
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("div");
    const n_e1 = [];
    const f2 = (() => (this.#handleMove)).bind(this);
    e1.addEventListener('pointermove', ((evt) => (f2)().bind(this)(evt)).bind(this));
    n_e1.push(newT("\n    The pointer is at "));
    const e3 = newE("b");
    const n_e3 = [];
    n_e3.push(newT("x:"));
    e3.replaceChildren(...n_e3);
    n_e1.push(e3);
    const f4 = (() => (this.#m.x)).bind(this);
    const e5 = newT(f4());
    this.zuiSub('m', (() => { e5.nodeValue = f4(); }).bind(this));
    n_e1.push(e5);
    n_e1.push(newT(" "));
    const e6 = newE("b");
    const n_e6 = [];
    n_e6.push(newT("y:"));
    e6.replaceChildren(...n_e6);
    n_e1.push(e6);
    const f7 = (() => (this.#m.y)).bind(this);
    const e8 = newT(f7());
    this.zuiSub('m', (() => { e8.nodeValue = f7(); }).bind(this));
    n_e1.push(e8);
    n_e1.push(newT(" "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e9 = newE("style");
    const n_e9 = [];
    n_e9.push(newT("\n    div {\n        position: fixed;\n        left: 0;\n        top: 0;\n        width: 100%;\n        height: 100%;\n        padding: 1rem;\n    }\n"));
    e9.replaceChildren(...n_e9);
    n_shadowRoot.push(e9);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_hjdycy4m2kuc3kt44tg2yprzx2ipyw7yw7x50q3tcdzzv3cceq6yn3dqu";
}
customElements.define(App.ZuiTagName, App);
