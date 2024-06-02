// Code generated from Nested.zui. DO NOT EDIT
// Source file content hash: 29790qf8l78qa1cbfzobvh5pkn1d6cd5kio3oum87h41okh6d4v1s6dvi8

export class Nested extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0;
  get answer() { return this.#v0; }
  set answer(v) { this.zuiSet('#v0', 'answer', v) }


  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("p");
    el1.append("The answer is ");
    const fn1 = (function() { return this.answer; }).bind(this);
    const el2 = document.createTextNode(fn1());
    this.zuiSub('answer', (() => { el2.nodeValue = fn1(); }).bind(this));
    el1.append(el2);
    shadowRoot.appendChild(el1);
  }
  static observedAttributes = ['answer'];
  attributeChangedCallback(name, vOld, vNew) {
    this[name] = vNew;
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

zuiSet(k, n, v) {
  if (((typeof this[k]) === 'object') || ((typeof v) === 'object') || !Object.is(this[k], v)) {
    this[k] = v;
    this.zuiOnPropChanged(n);
  }
}


  static ZuiTagName = "zui-nested_29790qf8l78qa1cbfzobvh5pkn1d6cd5kio3oum87h41okh6d4v1s6dvi8";
}
customElements.define(Nested.ZuiTagName, Nested);
