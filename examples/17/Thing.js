// Code generated from Thing.zui. DO NOT EDIT
// Source file content hash: k7lxk3qbwdoh1heiz4bi4vn73rai3tfk7fv1125et22olym3nqgtkjtf

export class Thing extends HTMLElement {


  #v0 = { apple: "🍎", banana: "🍌", carrot: "🥕", doughnut: "🍩", egg: "🥚" };
  get #emojis() { return this.#v0; }
  set #emojis(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('emojis');
    }
  }
  #v1;
  get name() { return this.#v1; }
  set name(v) {
    if (((typeof this.#v1) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('name');
    }
  }
  #v2 = this.#emojis[this.name];
  get #emoji() { return this.#v2; }
  set #emoji(v) {
    if (((typeof this.#v2) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v2, v)) {
      this.#v2 = v;
      this.zuiOnPropChanged('emoji');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement("p");
    const n_e1 = [];
    const f2 = (() => (this.#emoji)).bind(this);
    const e3 = document.createTextNode(f2());
    this.zuiSub('emoji', (() => { e3.nodeValue = f2(); }).bind(this));
    n_e1.push(e3);
    n_e1.push(" = ");
    const f4 = (() => (this.name)).bind(this);
    const e5 = document.createTextNode(f4());
    this.zuiSub('name', (() => { e5.nodeValue = f4(); }).bind(this));
    n_e1.push(e5);
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  static observedAttributes = ['name'];
  attributeChangedCallback(name, vOld, vNew) {
    this[name] = vNew;
  }
  constructor() {
    super();
  }
  connectedCallback() {
    this.emojis = { apple: "🍎", banana: "🍌", carrot: "🥕", doughnut: "🍩", egg: "🥚" };
    this.emoji = this.#emojis[this.name];
    console.log(this.name, this.emoji)
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

  static ZuiTagName = "zui-thing_k7lxk3qbwdoh1heiz4bi4vn73rai3tfk7fv1125et22olym3nqgtkjtf";
}
customElements.define(Thing.ZuiTagName, Thing);
