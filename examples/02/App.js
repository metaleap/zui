// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz

export class App extends HTMLElement {


  #v0 = "zui";
  get #greetName() { return this.#v0; }
  set #greetName(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('greetName');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement("h1");
    const n_e1 = [];
    n_e1.push("Hello ");
    const f2 = (() => (this.#greetName.toUpperCase())).bind(this);
    const e3 = document.createTextNode(f2());
    this.zuiSub('greetName', (() => { e3.nodeValue = f2(); }).bind(this));
    n_e1.push(e3);
    n_e1.push("!");
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
#subs = new Map();
zuiSub(name, fn) {
  let arr = this.#subs.get(name);
  if (!arr)
    arr = [fn];
  else
    arr.push(fn);
  this.#subs.set(name, arr);
}
zuiOnPropChanged(name) {
  for (const fn of ((this.#subs.get(name)) ?? []))
    fn();
}

  static ZuiTagName = "zui-app_3710ixnn6ff0y1iw8u3kk26m701ynt2rrx2xogl5uy0s1aaypom1tbcehz";
}
customElements.define(App.ZuiTagName, App);
