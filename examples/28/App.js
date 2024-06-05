// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 3hdxn93ch1dbq9iooj9ksf23r3o2k379frh7t52q04q6j98t4ttiwr0yb

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v0 = [{id: 1, text: `Where did you go to school?`}, {id: 2, text: `What is your mother's name?`}, {id: 3, text: `What is another personal fact that an attacker could easily find with Google?`}];
  get #questions() { return this.#v0; }
  set #questions(v) {
    if (!deepEq(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('questions');
    }
  }
  #v1;
  get #selected() { return this.#v1; }
  set #selected(v) {
    if (!deepEq(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('selected');
    }
  }
  #v2 = "";
  get #answer() { return this.#v2; }
  set #answer(v) {
    if (!deepEq(this.#v2, v)) {
      this.#v2 = v;
      this.zuiOnPropChanged('answer');
    }
  }

#handleSubmit() {
    alert(`answered question ${this.#selected.id} (${this.#selected.text}) with "${this.#answer}"`);
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("h2");
    const n_e1 = [];
    n_e1.push(newT("Insecurity questions"));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e2 = newE("form");
    const n_e2 = [];
    const f3 = (() => (this.#handleSubmit)).bind(this);
    const f4 = (() => ((evt) => {
      f3().bind(this)(evt);
    })).bind(this);
    e2.addEventListener('submit', ((evt) => (f4)().bind(this)(evt)).bind(this), {});
    n_e2.push(newT(" "));
    const e5 = newE("select");
    const n_e5 = [];
    const f6 = (() => (this.#selected)).bind(this);
    const f7 = ((evt) => { this.#selected = e5.value; }).bind(this);
    e5.addEventListener('input', f7);
    e5.addEventListener('change', f7);
    const f8 = (() => (() => {
    return (this.#answer = "");
})).bind(this);
    e5.addEventListener('change', ((evt) => (f8)().bind(this)(evt)).bind(this), {});
    const f9 = f6;
    this.zuiSet(e5, "value",  f9());
    this.zuiSub('selected', () => this.zuiSet(e5, "value",  f9()));
    n_e5.push(newT(" "));
    const f11 = (() => { //startLoop
      n_e5.splice(0);
      for (const question of this.#questions) {
    n_e5.push(newT(" "));
    const e12 = newE("option");
    const n_e12 = [];
    const f13 = (() => (question)).bind(this);
    this.zuiSet(e12, "value",  f13());
    n_e12.push(newT(" "));
    const f15 = (() => (question.text)).bind(this);
    const e16 = newT(f15());
    n_e12.push(e16);
    n_e12.push(newT(" "));
    e12.replaceChildren(...n_e12);
    n_e5.push(e12);
    n_e5.push(newT(" "));
      }
      if (n_e5.length != e5.childNodes.length)
        e5.replaceChildren(...n_e5);
      else
        for (let i = 0; i < n_e5.length; i++) {
          if (!n_e5[i].isEqualNode(e5.childNodes[i]))
            e5.replaceChild(n_e5[i], e5.childNodes[i]);
        }
    }).bind(this); //endLoop
    f11();
    this.zuiSub("questions", f11);
    n_e5.push(newT(" "));
    e5.replaceChildren(...n_e5);
    n_e2.push(e5);
    n_e2.push(newT(" "));
    const e17 = newE("input");
    const n_e17 = [];
    const f18 = (() => (this.#answer)).bind(this);
    const f19 = ((evt) => { this.#answer = e17.value; }).bind(this);
    e17.addEventListener('input', f19);
    e17.addEventListener('change', f19);
    const f20 = f18;
    this.zuiSet(e17, "value",  f20());
    this.zuiSub('answer', () => this.zuiSet(e17, "value",  f20()));
    e17.replaceChildren(...n_e17);
    n_e2.push(e17);
    n_e2.push(newT(" "));
    const e22 = newE("button");
    const n_e22 = [];
    const f23 = (() => (!this.#answer)).bind(this);
    this.zuiSet(e22, "disabled",  f23());
    this.zuiSub('answer', () => this.zuiSet(e22, "disabled",  f23()));
    const f25 = (() => ("submit")).bind(this);
    this.zuiSet(e22, "type",  f25());
    n_e22.push(newT(" Submit "));
    e22.replaceChildren(...n_e22);
    n_e2.push(e22);
    n_e2.push(newT(" "));
    e2.replaceChildren(...n_e2);
    n_shadowRoot.push(e2);
    n_shadowRoot.push(newT(" "));
    const e26 = newE("p");
    const n_e26 = [];
    n_e26.push(newT("\n    selected question "));
    const f27 = (() => (this.#selected ? this.#selected.id : "[waiting...]")).bind(this);
    const e28 = newT(f27());
    this.zuiSub('selected', (() => { e28.nodeValue = f27(); }));
    n_e26.push(e28);
    n_e26.push(newT(" "));
    e26.replaceChildren(...n_e26);
    n_shadowRoot.push(e26);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_3hdxn93ch1dbq9iooj9ksf23r3o2k379frh7t52q04q6j98t4ttiwr0yb";
}
customElements.define(App.ZuiTagName, App);
