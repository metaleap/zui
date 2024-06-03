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
    const e1 = document.createElement("p");
    e1.append("\n    The ");
    const e2 = document.createElement("code");
    const f3 = (function() { return this.name; }).bind(this);
    const e4 = document.createTextNode(f3());
    this.zuiSub('name', (() => { e4.nodeValue = f3(); }).bind(this));
    e2.append(e4);
    e1.appendChild(e2);
    e1.append(" package is ");
    const f5 = (function() { return this.speed; }).bind(this);
    const e6 = document.createTextNode(f5());
    this.zuiSub('speed', (() => { e6.nodeValue = f5(); }).bind(this));
    e1.append(e6);
    e1.append(" fast. Download version ");
    const f7 = (function() { return this.version; }).bind(this);
    const e8 = document.createTextNode(f7());
    this.zuiSub('version', (() => { e8.nodeValue = f7(); }).bind(this));
    e1.append(e8);
    e1.append(" from\n    ");
    const e9 = document.createElement("a");
    const f10 = (function() { return this.#href; }).bind(this);
    e9.setAttribute("href",  f10());
    this.zuiSub('href', () => e9.setAttribute("href",  f10()));
    e9.append("npm");
    e1.appendChild(e9);
    e1.append(" and ");
    const e12 = document.createElement("a");
    const f13 = (function() { return this.website; }).bind(this);
    e12.setAttribute("href",  f13());
    this.zuiSub('website', () => e12.setAttribute("href",  f13()));
    e12.append("learn more here");
    e1.appendChild(e12);
    e1.append(" ");
    shadowRoot.appendChild(e1);
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

  static ZuiTagName = "zui-packageinfo_1cfuhm90q79o6jzy12u2mhbl3m957duu8a02426fftr4nhwlw71yln13z";
}
customElements.define(PackageInfo.ZuiTagName, PackageInfo);
