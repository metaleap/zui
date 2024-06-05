// Code generated from App.zui. DO NOT EDIT
// Source file content hash: pzv9vqsd2nnq3hxbemtmv6zef2on8e3n4kajaeyiqhxpcpp1ie1bqc0wf

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
    console.log("ploy");
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

  static ZuiTagName = "zui-app_pzv9vqsd2nnq3hxbemtmv6zef2on8e3n4kajaeyiqhxpcpp1ie1bqc0wf";
}
import { BigRedButton } from './BigRedButton.js';
const horn = "24/vibes.mp3";
customElements.define(App.ZuiTagName, App);
