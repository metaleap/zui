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
    const fn4 = (function() { return this.#count > 10; }).bind(this);
    const el4 = document.createTextNode(fn4());
    this.zuiSub('count', (() => { el4.nodeValue = fn4(); }).bind(this));
    shadowRoot.append(el4);
    shadowRoot.append("\n    ");
    const el5 = document.createElement("p");
    const fn5 = (function() { return this.#count; }).bind(this);
    const el6 = document.createTextNode(fn5());
    this.zuiSub('count', (() => { el6.nodeValue = fn5(); }).bind(this));
    el5.append(el6);
    el5.append(" is greater than 10");
    shadowRoot.appendChild(el5);
    shadowRoot.append("\n");
    const fn6 = (function() { return this.#count < 5; }).bind(this);
    const el7 = document.createTextNode(fn6());
    this.zuiSub('count', (() => { el7.nodeValue = fn6(); }).bind(this));
    shadowRoot.append(el7);
    shadowRoot.append("\n    ");
    const el8 = document.createElement("p");
    const fn7 = (function() { return this.#count; }).bind(this);
    const el9 = document.createTextNode(fn7());
    this.zuiSub('count', (() => { el9.nodeValue = fn7(); }).bind(this));
    el8.append(el9);
    el8.append(" is less than 5");
    shadowRoot.appendChild(el8);
    shadowRoot.append("\n");
    const fn8 = (function() { return ; }).bind(this);
    const el10 = document.createTextNode(fn8());
    shadowRoot.append(el10);
    shadowRoot.append("\n    ");
    const el11 = document.createElement("p");
    const fn9 = (function() { return this.#count; }).bind(this);
    const el12 = document.createTextNode(fn9());
    this.zuiSub('count', (() => { el12.nodeValue = fn9(); }).bind(this));
    el11.append(el12);
    el11.append(" is between 5 and 10");
    shadowRoot.appendChild(el11);
    shadowRoot.append("\n");
    const fn10 = (function() { return ; }).bind(this);
    const el13 = document.createTextNode(fn10());
    shadowRoot.append(el13);
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
