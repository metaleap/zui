// Code generated from Nested.zui. DO NOT EDIT
// Source file content hash: 29790qf8l78qa1cbfzobvh5pkn1d6cd5kio3oum87h41okh6d4v1s6dvi8

export class Nested extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0;
  get answer() { return this.#v0; }
  set answer(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('answer');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const e1 = document.createElement("p");
    e1.append("The answer is ");
    const f2 = (function() { return this.answer; }).bind(this);
    const e3 = document.createTextNode(f2());
    this.zuiSub('answer', (() => { e3.nodeValue = f2(); }).bind(this));
    e1.append(e3);
    shadowRoot.appendChild(e1);
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

  static ZuiTagName = "zui-nested_29790qf8l78qa1cbfzobvh5pkn1d6cd5kio3oum87h41okh6d4v1s6dvi8";
}
customElements.define(Nested.ZuiTagName, Nested);
