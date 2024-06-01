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
    const node_button_0_0_omc6ja = document.createElement("button");
    const fn1 = (function() { return this.increment; }).bind(this);
    node_button_0_0_omc6ja.addEventListener('click', ((fn) => ((evt) => fn().bind(this)(evt)).bind(this)).bind(this)(fn1));
    const fn2 = (function() { return this.count; }).bind(this);
    const fn3 = (function() { return this.count === 1 ? 'mal' : 'mals'; }).bind(this);
    node_button_0_0_omc6ja.setAttribute("title",  "Geklickt " +  (fn2())  + "-" +  (fn3()) );
    node_button_0_0_omc6ja.append("\n    Clicked ");
    const fn4 = (function() { return this.count; }).bind(this);
    const txt_3pp1mo = document.createTextNode(fn4());
    this.zuiSub('count', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(fn4, txt_3pp1mo));
    node_button_0_0_omc6ja.append(txt_3pp1mo);
    node_button_0_0_omc6ja.append("\n    ");
    const fn5 = (function() { return this.count === 1 ? "time" : "times"; }).bind(this);
    const txt_37bl8f = document.createTextNode(fn5());
    this.zuiSub('count', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(fn5, txt_37bl8f));
    node_button_0_0_omc6ja.append(txt_37bl8f);
    node_button_0_0_omc6ja.append("\n");
    shadowRoot.appendChild(node_button_0_0_omc6ja);
  }
  constructor() {
    super();
    this.#subs = new Map();
  }

  static ZuiTagName = "zui-app_omcx4ibmyxj42zp6p36ji35xe1daef1br328w64lbvti0pgvjmlq96ja";
}
customElements.define(App.ZuiTagName, App);
