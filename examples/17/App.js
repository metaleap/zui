// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1m44rlry9mugrtfv2ndfzhyoe2fr84xz0x4ke03sngk578d3iqq1725kpj

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class App extends ZuiElement {


  #v1 = [{id: "id1", name: "apple"}, {id: "id2", name: "banana"}, {id: "id3", name: "carrot"}, {id: "id4", name: "doughnut"}, {id: "id5", name: "egg"}];
  get #things() { return this.#v1; }
  set #things(v) {
    if (!deepEq(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('things');
    }
  }

#handleClick() {
    {
        this.#things = this.#things.slice(1);
        this.zuiOnPropChanged("things");
    }
}



  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => (this.#handleClick)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)()).bind(this));
    n_e1.push(" Remove first thing ");
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(" ");
    const e4 = newE('zui-loop');
    const n_e4 = [];
    const f3 = (() => { //startLoop
      for (const thing of this.#things) {
      const it_thing = newE('zui-item');
      it_thing.setAttribute('item-id', thing.id);
      const   n_it_thing = [];
    n_e4.push(" ");
    const e5 = newE(Thing.ZuiTagName);
    const n_e5 = [];
    const f6 = (() => (thing.name)).bind(this);
    e5.setAttribute("name",  f6());
    e5.replaceChildren(...n_e5);
    n_e4.push(e5);
    n_e4.push(" ");
      }
      e4.replaceChildren(...n_e4);
      n_e4.splice(0);
    }).bind(this); //endLoop
    f3();
    this.zuiSub("things", f3);
    n_shadowRoot.push(e4);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-app_1m44rlry9mugrtfv2ndfzhyoe2fr84xz0x4ke03sngk578d3iqq1725kpj";
}
import { Thing } from './Thing.js';
customElements.define(App.ZuiTagName, App);
