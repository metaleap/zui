// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3e4qnvpwjmj2jqgh2m4m507pi2sm4vi7wv1lru8m3vetjqmztq1rgg32j

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v1 = {name: "svelte", speed: "blazing", version: 4, website: "https://svelte.dev"};
  get #pkg() { return this.#v1; }
  set #pkg(v) {
    if (((typeof this.#v1) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('pkg');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement(PackageInfo.ZuiTagName);
    for (const prop in this.#pkg) {
      el1.setAttribute(prop, this.#pkg[prop]);
    }
    shadowRoot.appendChild(el1);
  }
  constructor() {
    super();
  }
  zuiOnPropChanged(name) {}

  static ZuiTagName = "zui-app_3e4qnvpwjmj2jqgh2m4m507pi2sm4vi7wv1lru8m3vetjqmztq1rgg32j";
}
import { PackageInfo } from './PackageInfo.js'
customElements.define(App.ZuiTagName, App);
