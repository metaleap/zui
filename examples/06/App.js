// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0 = `this string contains some <strong>HTML!!!</strong>`;
  get #string() { return this.#v0; }
  set #string(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('string');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("p");
    const fn1 = (function() { return this.#string; }).bind(this);
    const el2 = document.createElement('span');
    el2.innerHTML = fn1();
    this.zuiSub('string', (() => { el2.innerHTML = fn1(); }).bind(this));
    el1.append(el2);
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


  static ZuiTagName = "zui-app_2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5";
}
customElements.define(App.ZuiTagName, App);
