// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 7k0q95xxq8293uchw1q7kzujn1zkigsr0ck4iecu5th7ubdec0b5p2ra

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  get #colors() { return this.#v0; }
  set #colors(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('colors');
    }
  }
  #v1 = this.#colors[0];
  get #selected() { return this.#v1; }
  set #selected(v) {
    if (!deepEq(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('selected');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("h1");
    const n_e1 = [];
    const f2 = (() => (this.#selected)).bind(this);
    const f3 = (() => ("color: " +  (f2()) )).bind(this);
    e1.setAttribute("style",  f3());
    this.zuiSub('selected', () => e1.setAttribute("style",  f3()));
    n_e1.push("Pick a colour");
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(" ");
    const e4 = newE("div");
    const n_e4 = [];
    n_e4.push(" ");
    const e6 = newE('zui-loop');
    const n_e6 = [];
    const f5 = (() => { //startLoop
      let i = -1;
      for (const color of this.#colors) {
      i++;
    n_e6.push(" ");
    const e7 = newE("button");
    const n_e7 = [];
    const f8 = (() => (this.#selected === color)).bind(this);
    e7.setAttribute("aria-current",  f8());
    this.zuiSub('selected', () => e7.setAttribute("aria-current",  f8()));
    const f10 = (() => (color)).bind(this);
    e7.setAttribute("aria-label",  f10());
    const f12 = f10;
    const f13 = (() => ("background: " +  (f12()) )).bind(this);
    e7.setAttribute("style",  f13());
    const f14 = (() => (() => {
    return (this.#selected = color);
})).bind(this);
    e7.addEventListener('click', ((evt) => (f14)().bind(this)()).bind(this));
    const f15 = (() => (i + 1)).bind(this);
    const e16 = newT(f15());
    n_e7.push(e16);
    e7.replaceChildren(...n_e7);
    n_e6.push(e7);
    n_e6.push(" ");
      }
      e6.replaceChildren(...n_e6);
      n_e6.splice(0);
    }).bind(this); //endLoop
    f5();
    this.zuiSub("colors", f5);
    n_e4.push(e6);
    n_e4.push(" ");
    e4.replaceChildren(...n_e4);
    n_shadowRoot.push(e4);
    n_shadowRoot.push(" ");
    const e17 = newE("style");
    const n_e17 = [];
    n_e17.push("\n    h1 {\n        transition: color 0.2s;\n    }\n\n    div {\n        display: grid;\n        grid-template-columns: repeat(7, 1fr);\n        grid-gap: 5px;\n        max-width: 400px;\n    }\n\n    button {\n        aspect-ratio: 1;\n        border-radius: 50%;\n        background: var(--color, #fff);\n        transform: translate(-2px, -2px);\n        filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));\n        transition: all 0.1s;\n    }\n\n    button[aria-current=\"true\"] {\n        transform: none;\n        filter: none;\n        box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.5);\n    }\n");
    e17.replaceChildren(...n_e17);
    n_shadowRoot.push(e17);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_7k0q95xxq8293uchw1q7kzujn1zkigsr0ck4iecu5th7ubdec0b5p2ra";
}
customElements.define(App.ZuiTagName, App);
