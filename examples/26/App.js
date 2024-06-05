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
    e2.addEventListener('input', ((evt) => { this.#a = parseInt(e2.value); }).bind(this));
    const f5 = (() => ("0")).bind(this);
    e2.setAttribute("min",  f5());
    const f6 = (() => ("10")).bind(this);
    e2.setAttribute("max",  f6());
    const f7 = f4;
    e2.setAttribute("value",  f7());
    this.zuiSub('a', () => e2.setAttribute("value",  f7()));
    e2.replaceChildren(...n_e2);
    n_e1.push(e2);
    n_e1.push(newT(" "));
    const e9 = newE("input");
    const n_e9 = [];
    const f10 = (() => ("range")).bind(this);
    e9.setAttribute("type",  f10());
    const f11 = f4;
    e9.addEventListener('input', ((evt) => { this.#a = parseInt(e9.value); }).bind(this));
    const f12 = f5;
    e9.setAttribute("min",  f12());
    const f13 = f6;
    e9.setAttribute("max",  f13());
    const f14 = f4;
    e9.setAttribute("value",  f14());
    this.zuiSub('a', () => e9.setAttribute("value",  f14()));
    e9.replaceChildren(...n_e9);
    n_e1.push(e9);
    n_e1.push(newT(" "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e16 = newE("label");
    const n_e16 = [];
    n_e16.push(newT(" "));
    const e17 = newE("input");
    const n_e17 = [];
    const f18 = f3;
    e17.setAttribute("type",  f18());
    const f19 = (() => (this.#b)).bind(this);
    e17.addEventListener('input', ((evt) => { this.#b = parseInt(e17.value); }).bind(this));
    const f20 = f5;
    e17.setAttribute("min",  f20());
    const f21 = f6;
    e17.setAttribute("max",  f21());
    const f22 = f19;
    e17.setAttribute("value",  f22());
    this.zuiSub('b', () => e17.setAttribute("value",  f22()));
    e17.replaceChildren(...n_e17);
    n_e16.push(e17);
    n_e16.push(newT(" "));
    const e24 = newE("input");
    const n_e24 = [];
    const f25 = f10;
    e24.setAttribute("type",  f25());
    const f26 = f19;
    e24.addEventListener('input', ((evt) => { this.#b = parseInt(e24.value); }).bind(this));
    const f27 = f5;
    e24.setAttribute("min",  f27());
    const f28 = f6;
    e24.setAttribute("max",  f28());
    const f29 = f19;
    e24.setAttribute("value",  f29());
    this.zuiSub('b', () => e24.setAttribute("value",  f29()));
    e24.replaceChildren(...n_e24);
    n_e16.push(e24);
    n_e16.push(newT(" "));
    e16.replaceChildren(...n_e16);
    n_shadowRoot.push(e16);
    n_shadowRoot.push(newT(" "));
    const e31 = newE("p");
    const n_e31 = [];
    const f32 = f4;
    const e33 = newT(f32());
    this.zuiSub('a', (() => { e33.nodeValue = f32(); }).bind(this));
    n_e31.push(e33);
    n_e31.push(newT(" + "));
    const f34 = f19;
    const e35 = newT(f34());
    this.zuiSub('b', (() => { e35.nodeValue = f34(); }).bind(this));
    n_e31.push(e35);
    n_e31.push(newT(" = "));
    const f36 = (() => (this.#a + this.#b)).bind(this);
    const e37 = newT(f36());
    this.zuiSub('a', (() => { e37.nodeValue = f36(); }).bind(this));
    this.zuiSub('b', (() => { e37.nodeValue = f36(); }).bind(this));
    n_e31.push(e37);
    e31.replaceChildren(...n_e31);
    n_shadowRoot.push(e31);
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
