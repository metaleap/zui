// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1yadqe61wprkz3qm01yq09jv9uhchrpn6j8vdb25w2bdsp7akhn1d1r9n6

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0 = 0;
  get #count() { return this.#v0; }
  set #count(v) { this.zuiSet('#v0', 'count', v) }
  get #doubled() { return this.#count * 2 }

#increment() {
    {
        this.#count += 1;
        this.zuiOnPropChanged("count");
    }
}



  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("button");
    const fn1 = (function() { return this.#increment; }).bind(this);
    el1.addEventListener('click', ((evt) => fn1().bind(this)()).bind(this));
    el1.append("\n    Clicked ");
    const fn2 = (function() { return this.#count; }).bind(this);
    const el2 = document.createTextNode(fn2());
    this.zuiSub('count', (() => { el2.nodeValue = fn2(); }).bind(this));
    el1.append(el2);
    el1.append("\n    ");
    const fn3 = (function() { return this.#count === 1 ? "time" : "times"; }).bind(this);
    const el3 = document.createTextNode(fn3());
    this.zuiSub('count', (() => { el3.nodeValue = fn3(); }).bind(this));
    el1.append(el3);
    el1.append("\n");
    shadowRoot.appendChild(el1);
    shadowRoot.append("\n\n");
    const el4 = document.createElement("p");
    const fn4 = (function() { return this.#count; }).bind(this);
    const el5 = document.createTextNode(fn4());
    this.zuiSub('count', (() => { el5.nodeValue = fn4(); }).bind(this));
    el4.append(el5);
    el4.append(" doubled is ");
    const fn5 = (function() { return this.#doubled; }).bind(this);
    const el6 = document.createTextNode(fn5());
    this.zuiSub('doubled', (() => { el6.nodeValue = fn5(); }).bind(this));
    el4.append(el6);
    shadowRoot.appendChild(el4);
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

zuiSet(k, n, v) {
  if (((typeof this[k]) === 'object') || ((typeof v) === 'object') || !Object.is(this[k], v)) {
    this[k] = v;
    this.zuiOnPropChanged(n);
  }
}


  static ZuiTagName = "zui-app_1yadqe61wprkz3qm01yq09jv9uhchrpn6j8vdb25w2bdsp7akhn1d1r9n6";
}
customElements.define(App.ZuiTagName, App);
