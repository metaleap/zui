// Code generated from PackageInfo.zui. DO NOT EDIT
// Source file content hash: 1cfuhm90q79o6jzy12u2mhbl3m957duu8a02426fftr4nhwlw71yln13z

export class PackageInfo extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0;
  get name() { return this.#v0; }
  set name(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('name');
    }
  }
  #v1;
  get version() { return this.#v1; }
  set version(v) {
    if (((typeof this.#v1) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('version');
    }
  }
  #v2;
  get speed() { return this.#v2; }
  set speed(v) {
    if (((typeof this.#v2) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v2, v)) {
      this.#v2 = v;
      this.zuiOnPropChanged('speed');
    }
  }
  #v3;
  get website() { return this.#v3; }
  set website(v) {
    if (((typeof this.#v3) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v3, v)) {
      this.#v3 = v;
      this.zuiOnPropChanged('website');
    }
  }
  get #href() { return `https://www.npmjs.com/package/${this.name}` }


  zuiCreateHTMLElements(shadowRoot) {
    const el1 = document.createElement("p");
    el1.append("\n    The ");
    const el2 = document.createElement("code");
    const fn1 = (function() { return this.name; }).bind(this);
    const el3 = document.createTextNode(fn1());
    this.zuiSub('name', (() => { el3.nodeValue = fn1(); }).bind(this));
    el2.append(el3);
    el1.appendChild(el2);
    el1.append(" package is ");
    const fn2 = (function() { return this.speed; }).bind(this);
    const el4 = document.createTextNode(fn2());
    this.zuiSub('speed', (() => { el4.nodeValue = fn2(); }).bind(this));
    el1.append(el4);
    el1.append(" fast. Download version ");
    const fn3 = (function() { return this.version; }).bind(this);
    const el5 = document.createTextNode(fn3());
    this.zuiSub('version', (() => { el5.nodeValue = fn3(); }).bind(this));
    el1.append(el5);
    el1.append(" from\n    ");
    const el6 = document.createElement("a");
    const fn4 = (function() { return this.#href; }).bind(this);
    el6.setAttribute("href",  fn4());
    this.zuiSub('href', () => el6.setAttribute("href",  fn4()));
    el6.append("npm");
    el1.appendChild(el6);
    el1.append(" and ");
    const el7 = document.createElement("a");
    const fn6 = (function() { return this.website; }).bind(this);
    el7.setAttribute("href",  fn6());
    this.zuiSub('website', () => el7.setAttribute("href",  fn6()));
    el7.append("learn more here");
    el1.appendChild(el7);
    el1.append("\n");
    shadowRoot.appendChild(el1);
  }
  static observedAttributes = ['name', 'version', 'speed', 'website'];
  attributeChangedCallback(name, vOld, vNew) {
    this[name] = vNew;
  }
  constructor() {
    super();
    this.zuiSub('name', () => this.zuiOnPropChanged('href'));
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

  static ZuiTagName = "zui-packageinfo_1cfuhm90q79o6jzy12u2mhbl3m957duu8a02426fftr4nhwlw71yln13z";
}
customElements.define(PackageInfo.ZuiTagName, PackageInfo);
