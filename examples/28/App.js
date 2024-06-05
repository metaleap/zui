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
    e5.setAttribute("value",  f9());
    this.zuiSub('selected', () => e5.setAttribute("value",  f9()));
    n_e5.push(newT(" "));
    const e12 = newE('zui-loop');
    const n_e12 = [];
    const f11 = (() => { //startLoop
      n_e12.splice(0);
      for (const question of this.#questions) {
    n_e12.push(newT(" "));
    const e13 = newE("option");
    const n_e13 = [];
    const f14 = (() => (question)).bind(this);
    e13.setAttribute("value",  f14());
    n_e13.push(newT(" "));
    const f16 = (() => (question.text)).bind(this);
    const e17 = newT(f16());
    n_e13.push(e17);
    n_e13.push(newT(" "));
    e13.replaceChildren(...n_e13);
    n_e12.push(e13);
    n_e12.push(newT(" "));
      }
      if (n_e12.length != e12.childNodes.length)
        e12.replaceChildren(...n_e12);
      else
        for (let i = 0; i < n_e12.length; i++) {
          if (!n_e12[i].isEqualNode(e12.childNodes[i]))
            e12.replaceChild(n_e12[i], e12.childNodes[i]);
        }
    }).bind(this); //endLoop
    f11();
    this.zuiSub("questions", f11);
    n_e5.push(e12);
    n_e5.push(newT(" "));
    e5.replaceChildren(...n_e5);
    n_e2.push(e5);
    n_e2.push(newT(" "));
    const e18 = newE("input");
    const n_e18 = [];
    const f19 = (() => (this.#answer)).bind(this);
    const f20 = ((evt) => { this.#answer = e18.value; }).bind(this);
    e18.addEventListener('input', f20);
    e18.addEventListener('change', f20);
    const f21 = f19;
    e18.setAttribute("value",  f21());
    this.zuiSub('answer', () => e18.setAttribute("value",  f21()));
    e18.replaceChildren(...n_e18);
    n_e2.push(e18);
    n_e2.push(newT(" "));
    const e23 = newE("button");
    const n_e23 = [];
    const f24 = (() => (!this.#answer)).bind(this);
    e23.setAttribute("disabled",  f24());
    this.zuiSub('answer', () => e23.setAttribute("disabled",  f24()));
    const f26 = (() => ("submit")).bind(this);
    e23.setAttribute("type",  f26());
    n_e23.push(newT(" Submit "));
    e23.replaceChildren(...n_e23);
    n_e2.push(e23);
    n_e2.push(newT(" "));
    e2.replaceChildren(...n_e2);
    n_shadowRoot.push(e2);
    n_shadowRoot.push(newT(" "));
    const e27 = newE("p");
    const n_e27 = [];
    n_e27.push(newT("\n    selected question "));
    const f28 = (() => (this.#selected ? this.#selected.id : "[waiting...]")).bind(this);
    const e29 = newT(f28());
    this.zuiSub('selected', (() => { e29.nodeValue = f28(); }).bind(this));
    n_e27.push(e29);
    n_e27.push(newT(" "));
    e27.replaceChildren(...n_e27);
    n_shadowRoot.push(e27);
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
