// Code generated from App.zui. DO NOT EDIT
// Source file content hash: omcx4ibmyxj42zp6p36ji35xe1daef1br328w64lbvti0pgvjmlq96ja

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

increment() {
    this.count += 1;
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
    const el1 = document.createElement("button");
    const fn1 = (function() { return this.increment; }).bind(this);
    el1.addEventListener('click', ((evt) => fn1()).bind(this));
    const fn2 = (function() { return this.count; }).bind(this);
    const fn3 = (function() { return this.count === 1 ? 'mal' : 'mals'; }).bind(this);
    el1.setAttribute("title",  "Geklickt " +  (fn2())  + "-" +  (fn3()) );
    //this.zuiSub('count', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(fn3, span_var_name));
    //this.zuiSub('count', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(fn3, span_var_name));
    el1.append("\n    Clicked ");
    const fn4 = (function() { return this.count; }).bind(this);
    const el2 = document.createTextNode(fn4());
    this.zuiSub('count', (() => { el2.nodeValue = fn4(); }).bind(this));
    el1.append(el2);
    el1.append("\n    ");
    const fn5 = (function() { return this.count === 1 ? "time" : "times"; }).bind(this);
    const el3 = document.createTextNode(fn5());
    this.zuiSub('count', (() => { el3.nodeValue = fn5(); }).bind(this));
    el1.append(el3);
    el1.append("\n");
    shadowRoot.appendChild(el1);
  }
  constructor() {
    super();
    this.#subs = new Map();
  }

  static ZuiTagName = "zui-app_omcx4ibmyxj42zp6p36ji35xe1daef1br328w64lbvti0pgvjmlq96ja";
}
customElements.define(App.ZuiTagName, App);
