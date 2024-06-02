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


  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("img");
    const fn1 = () => "Rick";
    el1.setAttribute("alt",  fn1());
    const fn2 = (function() { return this.src; }).bind(this);
    const fn3 = () =>  (fn2()) ;
    el1.setAttribute("src",  fn3());
    this.zuiSub('src', () => el1.setAttribute("src",  fn3()));
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


  static ZuiTagName = "zui-app_224abhbqzum0a1ljqpikvf8s3y2uqqiwf578t4s2b1paxznc07jc1eg08e2";
}
customElements.define(App.ZuiTagName, App);
