// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #greetName = "zui";
  get greetName() { return this.#greetName; }
  set greetName(v) {
    if (this.#greetName !== v) {
      this.#greetName = v;
      this.zuiOnPropChanged('greetName');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("h1");
    el1.append("Hello ");
    const fn1 = (function() { return this.greetName.toUpperCase(); }).bind(this);
    const el2 = document.createTextNode(fn1());
    this.zuiSub('greetName', (() => { el2.nodeValue = fn1(); }).bind(this));
    el1.append(el2);
    el1.append("!");
    shadowRoot.appendChild(el1);
  }
  constructor() {
    super();
  }
#subs = new Map();
zuiSub(name, ...fn) {
  let arr = this.#subs.get(name);
  if (!arr)
    arr = fn;
  else
    arr.push(...fn);
  this.#subs.set(name, arr);
}
zuiOnPropChanged(name) {
  if (this.#subs) {
    const subs = this.#subs.get(name);
    if (subs) {
      for (const fn of subs)
        fn();
    }
  }
}


  static ZuiTagName = "zui-app_3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz";
}
customElements.define(App.ZuiTagName, App);
