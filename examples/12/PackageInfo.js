// Code generated from PackageInfo.zui. DO NOT EDIT
// Source file content hash: 1cfuhm90q79o6jzy12u2mhbl3m957duu8a02426fftr4nhwlw71yln13z

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class PackageInfo extends ZuiElement {


  #v0;
  get name() { return this.#v0; }
  set name(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('name');
    }
  }
  #v1;
  get version() { return this.#v1; }
  set version(v) {
    if (!deepEq(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('version');
    }
  }
  #v2;
  get speed() { return this.#v2; }
  set speed(v) {
    if (!deepEq(this.#v2, v)) {
      this.#v2 = v;
      this.zuiOnPropChanged('speed');
    }
  }
  #v3;
  get website() { return this.#v3; }
  set website(v) {
    if (!deepEq(this.#v3, v)) {
      this.#v3 = v;
      this.zuiOnPropChanged('website');
    }
  }
  get #href() { return `https://www.npmjs.com/package/${this.name}` }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("p");
    const n_e1 = [];
    n_e1.push(newT("\n    The "));
    const e2 = newE("code");
    const n_e2 = [];
    const f3 = (() => (this.name)).bind(this);
    const e4 = newT(f3());
    this.zuiSub('name', (() => { e4.nodeValue = f3(); }));
    n_e2.push(e4);
    e2.replaceChildren(...n_e2);
    n_e1.push(e2);
    n_e1.push(newT(" package is "));
    const f5 = (() => (this.speed)).bind(this);
    const e6 = newT(f5());
    this.zuiSub('speed', (() => { e6.nodeValue = f5(); }));
    n_e1.push(e6);
    n_e1.push(newT(" fast. Download version "));
    const f7 = (() => (this.version)).bind(this);
    const e8 = newT(f7());
    this.zuiSub('version', (() => { e8.nodeValue = f7(); }));
    n_e1.push(e8);
    n_e1.push(newT(" from\n    "));
    const e9 = newE("a");
    const n_e9 = [];
    const f10 = (() => (this.#href)).bind(this);
    this.zuiSet(e9, "href",  f10());
    this.zuiSub('href', () => this.zuiSet(e9, "href",  f10()));
    n_e9.push(newT("npm"));
    e9.replaceChildren(...n_e9);
    n_e1.push(e9);
    n_e1.push(newT(" and "));
    const e12 = newE("a");
    const n_e12 = [];
    const f13 = (() => (this.website)).bind(this);
    this.zuiSet(e12, "href",  f13());
    this.zuiSub('website', () => this.zuiSet(e12, "href",  f13()));
    n_e12.push(newT("learn more here"));
    e12.replaceChildren(...n_e12);
    n_e1.push(e12);
    n_e1.push(newT(" "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  static observedAttributes = ['name', 'version', 'speed', 'website'];
  attributeChangedCallback(name, vOld, vNew) {
    this[name] = vNew;
  }
  constructor() {
    super();
    this.zuiSub('name', () => this.zuiOnPropChanged('href'));
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-packageinfo_1cfuhm90q79o6jzy12u2mhbl3m957duu8a02426fftr4nhwlw71yln13z";
}
customElements.define(PackageInfo.ZuiTagName, PackageInfo);
