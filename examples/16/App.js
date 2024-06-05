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
    this.zuiSet(e1, "style",  f3());
    this.zuiSub('selected', () => this.zuiSet(e1, "style",  f3()));
    n_e1.push(newT("Pick a colour"));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e4 = newE("div");
    const n_e4 = [];
    n_e4.push(newT(" "));
    const f5 = (() => { //startLoop
      let i = -1;
      n_e4.splice(0);
      for (const color of this.#colors) {
      i++;
    n_e4.push(newT(" "));
    const e6 = newE("button");
    const n_e6 = [];
    const f7 = (() => (this.#selected === color)).bind(this);
    this.zuiSet(e6, "aria-current",  f7());
    this.zuiSub('selected', () => this.zuiSet(e6, "aria-current",  f7()));
    const f9 = (() => (color)).bind(this);
    this.zuiSet(e6, "aria-label",  f9());
    const f11 = f9;
    const f12 = (() => ("background: " +  (f11()) )).bind(this);
    this.zuiSet(e6, "style",  f12());
    const f13 = (() => (() => {
    return (this.#selected = color);
})).bind(this);
    e6.addEventListener('click', ((evt) => (f13)().bind(this)(evt)).bind(this), {});
    const f14 = (() => (i + 1)).bind(this);
    const e15 = newT(f14());
    n_e6.push(e15);
    e6.replaceChildren(...n_e6);
    n_e4.push(e6);
    n_e4.push(newT(" "));
      }
      if (n_e4.length != e4.childNodes.length)
        e4.replaceChildren(...n_e4);
      else
        for (let i = 0; i < n_e4.length; i++) {
          if (!n_e4[i].isEqualNode(e4.childNodes[i]))
            e4.replaceChild(n_e4[i], e4.childNodes[i]);
        }
    }).bind(this); //endLoop
    f5();
    this.zuiSub("colors", f5);
    n_e4.push(newT(" "));
    e4.replaceChildren(...n_e4);
    n_shadowRoot.push(e4);
    n_shadowRoot.push(newT(" "));
    const e16 = newE("style");
    const n_e16 = [];
    n_e16.push(newT("\n    h1 {\n        transition: color 0.2s;\n    }\n\n    div {\n        display: grid;\n        grid-template-columns: repeat(7, 1fr);\n        grid-gap: 5px;\n        max-width: 400px;\n    }\n\n    button {\n        aspect-ratio: 1;\n        border-radius: 50%;\n        background: var(--color, #fff);\n        transform: translate(-2px, -2px);\n        filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));\n        transition: all 0.1s;\n    }\n\n    button[aria-current=\"true\"] {\n        transform: none;\n        filter: none;\n        box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.5);\n    }\n"));
    e16.replaceChildren(...n_e16);
    n_shadowRoot.push(e16);
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
