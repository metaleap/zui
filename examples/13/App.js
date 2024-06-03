// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2ll5tuo70ow2o29smnprgteser3qjkwaqtio07l12evclx82m81t1r22uy1

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
    const f7 = (function() { return this.#count > 10; }).bind(this);
    const e8 = document.createTextNode(f7());
    this.zuiSub('count', (() => { e8.nodeValue = f7(); }).bind(this));
    shadowRoot.append(e8);
    shadowRoot.append("\n    ");
    const e9 = document.createElement("p");
    const f10 = (function() { return this.#count; }).bind(this);
    const e11 = document.createTextNode(f10());
    this.zuiSub('count', (() => { e11.nodeValue = f10(); }).bind(this));
    e9.append(e11);
    e9.append(" is greater than 10");
    shadowRoot.appendChild(e9);
    shadowRoot.append("\n");
    const f12 = (function() { return this.#count < 5; }).bind(this);
    const e13 = document.createTextNode(f12());
    this.zuiSub('count', (() => { e13.nodeValue = f12(); }).bind(this));
    shadowRoot.append(e13);
    shadowRoot.append("\n    ");
    const e14 = document.createElement("p");
    const f15 = (function() { return this.#count; }).bind(this);
    const e16 = document.createTextNode(f15());
    this.zuiSub('count', (() => { e16.nodeValue = f15(); }).bind(this));
    e14.append(e16);
    e14.append(" is less than 5");
    shadowRoot.appendChild(e14);
    shadowRoot.append("\n");
    const f17 = (function() { return ; }).bind(this);
    const e18 = document.createTextNode(f17());
    shadowRoot.append(e18);
    shadowRoot.append("\n    ");
    const e19 = document.createElement("p");
    const f20 = (function() { return this.#count; }).bind(this);
    const e21 = document.createTextNode(f20());
    this.zuiSub('count', (() => { e21.nodeValue = f20(); }).bind(this));
    e19.append(e21);
    e19.append(" is between 5 and 10");
    shadowRoot.appendChild(e19);
    shadowRoot.append("\n");
    const f22 = (function() { return ; }).bind(this);
    const e23 = document.createTextNode(f22());
    shadowRoot.append(e23);
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
  for (const fn of ((this.#subs.get(name)) ?? []))
    fn();
}

  static ZuiTagName = "zui-app_2ll5tuo70ow2o29smnprgteser3qjkwaqtio07l12evclx82m81t1r22uy1";
}
customElements.define(App.ZuiTagName, App);
