// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2ddb4una5u5xy23twc4cr476it2xq7mrmecn18t3h4cz3tln5ykd1342aah

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v2 = new Audio();
  get #audio() { return this.#v2; }
  set #audio(v) {
    if (!deepEq(this.#v2, v)) {
      this.#v2 = v;
      this.zuiOnPropChanged('audio');
    }
  }

#handleClick() {
    this.#audio.load();
    this.#audio.play();
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE(BigRedButton.ZuiTagName);
    const n_e1 = [];
    const f2 = (() => (this.#handleClick)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
    this.#audio.src = horn;
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_2ddb4una5u5xy23twc4cr476it2xq7mrmecn18t3h4cz3tln5ykd1342aah";
}
import { BigRedButton } from './BigRedButton.js';
const horn = "24/vibes.mp3";
customElements.define(App.ZuiTagName, App);
