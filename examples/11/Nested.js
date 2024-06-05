// Code generated from Nested.zui. DO NOT EDIT
// Source file content hash: 29790qf8l78qa1cbfzobvh5pkn1d6cd5kio3oum87h41okh6d4v1s6dvi8

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class Nested extends ZuiElement {


  #v0;
  get answer() { return this.#v0; }
  set answer(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('answer');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("p");
    const n_e1 = [];
    n_e1.push(newT("The answer is "));
    const f2 = (() => (this.answer)).bind(this);
    const e3 = newT(f2());
    this.zuiSub('answer', (() => { e3.nodeValue = f2(); }));
    n_e1.push(e3);
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  static observedAttributes = ['answer'];
  attributeChangedCallback(name, vOld, vNew) {
    this[name] = vNew;
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-nested_29790qf8l78qa1cbfzobvh5pkn1d6cd5kio3oum87h41okh6d4v1s6dvi8";
}
customElements.define(Nested.ZuiTagName, Nested);
