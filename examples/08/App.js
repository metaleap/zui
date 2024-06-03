// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1yadqe61wprkz3qm01yq09jv9uhchrpn6j8vdb25w2bdsp7akhn1d1r9n6

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
  get #doubled() { return this.#count * 2 }

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
    const e7 = document.createElement("p");
    const n_e7 = [];
    const f8 = f3;
    const e9 = document.createTextNode(f8());
    this.zuiSub('count', (() => { e9.nodeValue = f8(); }).bind(this));
    n_e7.push(e9);
    n_e7.push(" doubled is ");
    const f10 = (() => (this.#doubled)).bind(this);
    const e11 = document.createTextNode(f10());
    this.zuiSub('doubled', (() => { e11.nodeValue = f10(); }).bind(this));
    n_e7.push(e11);
    e7.replaceChildren(...n_e7);
    n_shadowRoot.push(e7);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
    this.zuiSub('count', () => this.zuiOnPropChanged('doubled'));
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

  static ZuiTagName = "zui-app_1yadqe61wprkz3qm01yq09jv9uhchrpn6j8vdb25w2bdsp7akhn1d1r9n6";
}
customElements.define(App.ZuiTagName, App);
