// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 36ir69jpzdzc516rl9lq3v1upy151nhsem0d6ofw4bw4t025ubp6jx4j5

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {
  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => ((evt) => {
    return alert("clicked");
})).bind(this);
    const f3 = (() => ((evt) => {
      f2().bind(this)(evt);
    })).bind(this);
    e1.addEventListener('click', ((evt) => (f3)().bind(this)(evt)).bind(this), {once:true});
    n_e1.push(newT("Click me once"));
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

  static ZuiTagName = "zui-app_36ir69jpzdzc516rl9lq3v1upy151nhsem0d6ofw4bw4t025ubp6jx4j5";
}
customElements.define(App.ZuiTagName, App);
