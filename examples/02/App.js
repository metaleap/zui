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
    let tmp_fn;
    const node_h1_0_0_371ehz = document.createElement("h1");
    node_h1_0_0_371ehz.append("Hello ");
    tmp_fn = (function() { return this.greetName.toUpperCase(); }).bind(this);
    const txt_3molke = document.createTextNode(tmp_fn());
    this.zuiSub('greetName', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(tmp_fn, txt_3molke));
    node_h1_0_0_371ehz.append(txt_3molke);
    node_h1_0_0_371ehz.append("!");
    shadowRoot.appendChild(node_h1_0_0_371ehz);
  }
  constructor() {
    super();
    this.#subs = new Map();
  }

  static ZuiTagName = "zui-app_3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz";
}
customElements.define(App.ZuiTagName, App);
