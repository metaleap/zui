// Code generated from Thing.zui. DO NOT EDIT
// Source file content hash: k7lxk3qbwdoh1heiz4bi4vn73rai3tfk7fv1125et22olym3nqgtkjtf

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class Thing extends ZuiElement {


  #v0 = {apple: "🍎", banana: "🍌", carrot: "🥕", doughnut: "🍩", egg: "🥚"};
  get #emojis() { return this.#v0; }
  set #emojis(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('emojis');
    }
  }
  #v1;
  get name() { return this.#v1; }
  set name(v) {
    if (!deepEq(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('name');
    }
  }
  #v2 = this.#emojis[this.name];
  get #emoji() { return this.#v2; }
  set #emoji(v) {
    if (!deepEq(this.#v2, v)) {
      this.#v2 = v;
      this.zuiOnPropChanged('emoji');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("p");
    const n_e1 = [];
    const f2 = (() => (this.#emoji)).bind(this);
    const e3 = newT(f2());
    this.zuiSub('emoji', (() => { e3.nodeValue = f2(); }).bind(this));
    n_e1.push(e3);
    n_e1.push(newT(" = "));
    const f4 = (() => (this.name)).bind(this);
    const e5 = newT(f4());
    this.zuiSub('name', (() => { e5.nodeValue = f4(); }).bind(this));
    n_e1.push(e5);
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  static observedAttributes = ['name'];
  attributeChangedCallback(name, vOld, vNew) {
    this[name] = vNew;
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.#emoji = this.#emojis[this.name];
    this.#emojis = {apple: "🍎", banana: "🍌", carrot: "🥕", doughnut: "🍩", egg: "🥚"};
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-thing_k7lxk3qbwdoh1heiz4bi4vn73rai3tfk7fv1125et22olym3nqgtkjtf";
}
customElements.define(Thing.ZuiTagName, Thing);
