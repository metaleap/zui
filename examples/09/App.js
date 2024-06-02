// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2p8izccyeozrmiwkrddfivgg32mfk6dhxzym21s3g77sjutqph71l4ru

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #count = 0;
  get count() { return this.#count; }
  set count(v) {
    if (this.#count !== v) {
      this.#count = v;
      this.zuiOnPropChanged('count');
    }
  }

handleClick() {
    this.count += 1;
}



  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("button");
    const fn1 = (function() { return this.handleClick; }).bind(this);
    el1.addEventListener('click', ((evt) => fn1().bind(this)()).bind(this));
    el1.append("\n    Clicked ");
    const fn2 = (function() { return this.count; }).bind(this);
    const el2 = document.createTextNode(fn2());
    this.zuiSub('count', (() => { el2.nodeValue = fn2(); }).bind(this));
    el1.append(el2);
    el1.append("\n    ");
    const fn3 = (function() { return this.count === 1 ? "time" : "times"; }).bind(this);
    const el3 = document.createTextNode(fn3());
    this.zuiSub('count', (() => { el3.nodeValue = fn3(); }).bind(this));
    el1.append(el3);
    el1.append("\n");
    shadowRoot.appendChild(el1);
  }
  constructor() {
    super();
    this.zuiSub('count', () => {
if (this.count >= 10) {
    alert("count is dangerously high!");
    this.count = 0;
}
    });
    this.zuiSub('count', () => {
{
    console.log(`the count is ${this.count}`);
    console.log(`this will also be logged whenever count changes`);
}
    });
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


  static ZuiTagName = "zui-app_2p8izccyeozrmiwkrddfivgg32mfk6dhxzym21s3g77sjutqph71l4ru";
}
customElements.define(App.ZuiTagName, App);