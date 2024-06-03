// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1vkzdq3trnr10349obnm712e8u1crfjy38vzbbf22plxlup5slsbkc05im

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0 = 0;
  get #count() { return this.#v0; }
  set #count(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('count');
    }
  }

#increment() {
    {
        this.#count += 1;
        this.zuiOnPropChanged("count");
    }
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement("button");
    const n_e1 = [];
    const f2 = (() => (this.#increment)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)()).bind(this));
    n_e1.push("\n    Clicked ");
    const f3 = (() => (this.#count)).bind(this);
    const e4 = document.createTextNode(f3());
    this.zuiSub('count', (() => { e4.nodeValue = f3(); }).bind(this));
    n_e1.push(e4);
    n_e1.push(" ");
    const f5 = (() => (this.#count === 1 ? "time" : "times")).bind(this);
    const e6 = document.createTextNode(f5());
    this.zuiSub('count', (() => { e6.nodeValue = f5(); }).bind(this));
    n_e1.push(e6);
    n_e1.push(" ");
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(" ");
    const e8 = document.createElement('zui-cond');
    const n_e8 = [];
    const f7 = (() => { //startCond
      if (this.#count > 10) {
    n_e8.push(" ");
    const e9 = document.createElement("p");
    const n_e9 = [];
    const f10 = f3;
    const e11 = document.createTextNode(f10());
    n_e9.push(e11);
    n_e9.push(" is greater than 10");
    e9.replaceChildren(...n_e9);
    n_e8.push(e9);
    n_e8.push(" ");
      }
      e8.replaceChildren(...n_e8)
    }).bind(this); //endCond
    f7();
    this.zuiSub("count", f7);
    n_shadowRoot.push(e8);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
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

  static ZuiTagName = "zui-app_1vkzdq3trnr10349obnm712e8u1crfjy38vzbbf22plxlup5slsbkc05im";
}
customElements.define(App.ZuiTagName, App);
