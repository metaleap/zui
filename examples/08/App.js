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
    const e1 = document.createElement("button");
    const f2 = (function() { return this.#increment; }).bind(this);
    e1.addEventListener('click', ((evt) => f2().bind(this)()).bind(this));
    e1.append("\n    Clicked ");
    const f3 = (function() { return this.#count; }).bind(this);
    const e4 = document.createTextNode(f3());
    this.zuiSub('count', (() => { e4.nodeValue = f3(); }).bind(this));
    e1.append(e4);
    e1.append("\n    ");
    const f5 = (function() { return this.#count === 1 ? "time" : "times"; }).bind(this);
    const e6 = document.createTextNode(f5());
    this.zuiSub('count', (() => { e6.nodeValue = f5(); }).bind(this));
    e1.append(e6);
    e1.append("\n");
    shadowRoot.appendChild(e1);
    shadowRoot.append("\n\n");
    const e7 = document.createElement("p");
    const f8 = (function() { return this.#count; }).bind(this);
    const e9 = document.createTextNode(f8());
    this.zuiSub('count', (() => { e9.nodeValue = f8(); }).bind(this));
    e7.append(e9);
    e7.append(" doubled is ");
    const f10 = (function() { return this.#doubled; }).bind(this);
    const e11 = document.createTextNode(f10());
    this.zuiSub('doubled', (() => { e11.nodeValue = f10(); }).bind(this));
    e7.append(e11);
    shadowRoot.appendChild(e7);
  }
  constructor() {
    super();
    this.zuiSub('count', () => this.zuiOnPropChanged('doubled'));
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
  for (const fn of ((this.#subs.get(name)) ?? []))
    fn();
}

  static ZuiTagName = "zui-app_1yadqe61wprkz3qm01yq09jv9uhchrpn6j8vdb25w2bdsp7akhn1d1r9n6";
}
customElements.define(App.ZuiTagName, App);
