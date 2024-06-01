// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 224abhbqzum0a1ljqpikvf8s3y2uqqiwf578t4s2b1paxznc07jc1eg08e2

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #src = '03/image.png';
  get src() { return this.#src; }
  set src(v) {
    if (this.#src !== v) {
      this.#src = v;
      this.zuiOnPropChanged('src');
    }
  }
#subs = null;
zuiSub(name, fn) {
  let arr = this.#subs.get(name);
  if (!(arr && arr.push))
    arr = [fn];
  else
    arr.push(fn);
  this.#subs.set(name, arr);
}
zuiOnPropChanged(name) {
  if (this.#subs) {
    const subs = this.#subs.get(name);
    if (subs && subs.length) {
      for (const fn of subs)
        fn.bind(this)();
    }
  }
}



  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("img");
    el1.setAttribute("alt",  "Rick");
    const fn1 = (function() { return this.src; }).bind(this);
    el1.setAttribute("src",   (fn1()) );
    //this.zuiSub('src', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(fn1, span_var_name));
    shadowRoot.appendChild(el1);
  }
  constructor() {
    super();
    this.#subs = new Map();
  }

  static ZuiTagName = "zui-app_224abhbqzum0a1ljqpikvf8s3y2uqqiwf578t4s2b1paxznc07jc1eg08e2";
}
customElements.define(App.ZuiTagName, App);
