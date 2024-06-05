// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 224abhbqzum0a1ljqpikvf8s3y2uqqiwf578t4s2b1paxznc07jc1eg08e2

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = '03/image.png';
  get #src() { return this.#v0; }
  set #src(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('src');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("img");
    const n_e1 = [];
    const f2 = (() => ("Rick")).bind(this);
    this.zuiSet(e1, "alt",  f2());
    const f3 = (() => (this.#src)).bind(this);
    this.zuiSet(e1, "src",  f3());
    this.zuiSub('src', () => this.zuiSet(e1, "src",  f3()));
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

  static ZuiTagName = "zui-app_224abhbqzum0a1ljqpikvf8s3y2uqqiwf578t4s2b1paxznc07jc1eg08e2";
}
customElements.define(App.ZuiTagName, App);
