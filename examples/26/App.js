// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1ierniap8flaj38msgskr1kothpttwg84j44863e6bhe58fbvwxfj81hc

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = 1;
  get #a() { return this.#v0; }
  set #a(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('a');
    }
  }
  #v1 = 2;
  get #b() { return this.#v1; }
  set #b(v) {
    if (!deepEq(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('b');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("label");
    const n_e1 = [];
    n_e1.push(newT(" "));
    const e2 = newE("input");
    const n_e2 = [];
    const f3 = (() => ("number")).bind(this);
    e2.setAttribute("type",  f3());
    const f4 = (() => (this.#a)).bind(this);
    const f5 = ((evt) => { this.#a = parseInt(e2.value); }).bind(this);
    e2.addEventListener('input', f5);
    e2.addEventListener('change', f5);
    const f6 = (() => ("0")).bind(this);
    e2.setAttribute("min",  f6());
    const f7 = (() => ("10")).bind(this);
    e2.setAttribute("max",  f7());
    const f8 = f4;
    e2.setAttribute("value",  f8());
    this.zuiSub('a', () => e2.setAttribute("value",  f8()));
    e2.replaceChildren(...n_e2);
    n_e1.push(e2);
    n_e1.push(newT(" "));
    const e10 = newE("input");
    const n_e10 = [];
    const f11 = (() => ("range")).bind(this);
    e10.setAttribute("type",  f11());
    const f12 = f4;
    const f13 = ((evt) => { this.#a = parseInt(e10.value); }).bind(this);
    e10.addEventListener('input', f13);
    e10.addEventListener('change', f13);
    const f14 = f6;
    e10.setAttribute("min",  f14());
    const f15 = f7;
    e10.setAttribute("max",  f15());
    const f16 = f4;
    e10.setAttribute("value",  f16());
    this.zuiSub('a', () => e10.setAttribute("value",  f16()));
    e10.replaceChildren(...n_e10);
    n_e1.push(e10);
    n_e1.push(newT(" "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e18 = newE("label");
    const n_e18 = [];
    n_e18.push(newT(" "));
    const e19 = newE("input");
    const n_e19 = [];
    const f20 = f3;
    e19.setAttribute("type",  f20());
    const f21 = (() => (this.#b)).bind(this);
    const f22 = ((evt) => { this.#b = parseInt(e19.value); }).bind(this);
    e19.addEventListener('input', f22);
    e19.addEventListener('change', f22);
    const f23 = f6;
    e19.setAttribute("min",  f23());
    const f24 = f7;
    e19.setAttribute("max",  f24());
    const f25 = f21;
    e19.setAttribute("value",  f25());
    this.zuiSub('b', () => e19.setAttribute("value",  f25()));
    e19.replaceChildren(...n_e19);
    n_e18.push(e19);
    n_e18.push(newT(" "));
    const e27 = newE("input");
    const n_e27 = [];
    const f28 = f11;
    e27.setAttribute("type",  f28());
    const f29 = f21;
    const f30 = ((evt) => { this.#b = parseInt(e27.value); }).bind(this);
    e27.addEventListener('input', f30);
    e27.addEventListener('change', f30);
    const f31 = f6;
    e27.setAttribute("min",  f31());
    const f32 = f7;
    e27.setAttribute("max",  f32());
    const f33 = f21;
    e27.setAttribute("value",  f33());
    this.zuiSub('b', () => e27.setAttribute("value",  f33()));
    e27.replaceChildren(...n_e27);
    n_e18.push(e27);
    n_e18.push(newT(" "));
    e18.replaceChildren(...n_e18);
    n_shadowRoot.push(e18);
    n_shadowRoot.push(newT(" "));
    const e35 = newE("p");
    const n_e35 = [];
    const f36 = f4;
    const e37 = newT(f36());
    this.zuiSub('a', (() => { e37.nodeValue = f36(); }).bind(this));
    n_e35.push(e37);
    n_e35.push(newT(" + "));
    const f38 = f21;
    const e39 = newT(f38());
    this.zuiSub('b', (() => { e39.nodeValue = f38(); }).bind(this));
    n_e35.push(e39);
    n_e35.push(newT(" = "));
    const f40 = (() => (this.#a + this.#b)).bind(this);
    const e41 = newT(f40());
    this.zuiSub('a', (() => { e41.nodeValue = f40(); }).bind(this));
    this.zuiSub('b', (() => { e41.nodeValue = f40(); }).bind(this));
    n_e35.push(e41);
    e35.replaceChildren(...n_e35);
    n_shadowRoot.push(e35);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
    setInterval(() => {
    console.log(typeof this.#a);
    console.log(typeof this.#b);
}, 777);
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_1ierniap8flaj38msgskr1kothpttwg84j44863e6bhe58fbvwxfj81hc";
}
customElements.define(App.ZuiTagName, App);
