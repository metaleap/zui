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
    const f7 = function() { // IF
      if (this.#count > 10) {
    shadowRoot.append("\n    ");
    const e8 = document.createElement("p");
    const f9 = (function() { return this.#count; }).bind(this);
    const e10 = document.createTextNode(f9());
    this.zuiSub('count', (() => { e10.nodeValue = f9(); }).bind(this));
    e8.append(e10);
    e8.append(" is greater than 10");
    shadowRoot.appendChild(e8);
    shadowRoot.append("\n");
      }
    } // IF
    f7();
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
