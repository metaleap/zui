// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3e4qnvpwjmj2jqgh2m4m507pi2sm4vi7wv1lru8m3vetjqmztq1rgg32j

export class App extends HTMLElement {


  #v1 = {name: "svelte", speed: "blazing", version: 4, website: "https://svelte.dev"};
  get #pkg() { return this.#v1; }
  set #pkg(v) {
    if (((typeof this.#v1) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('pkg');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement(PackageInfo.ZuiTagName);
    const n_e1 = [];
    for (const prop in this.#pkg) {
      e1.setAttribute(prop, this.#pkg[prop]);
    }
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
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_3e4qnvpwjmj2jqgh2m4m507pi2sm4vi7wv1lru8m3vetjqmztq1rgg32j";
}
import { PackageInfo } from './PackageInfo.js'
customElements.define(App.ZuiTagName, App);
