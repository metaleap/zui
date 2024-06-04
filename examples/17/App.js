// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 272l38pq9pbcjceizydo1z7352dz7eoe2shspb57467zkschx81xch813

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
    n_e1.push(newT(" Remove first thing "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e4 = newE('zui-loop');
    const n_e4 = [];
    const f3 = (() => { //startLoop
      let i = -1;
      n_e4.splice(0);
      for (const thing of this.#things) {
      i++;
    n_e4.push(newT(" "));
    const e5 = newE(Thing.ZuiTagName);
    const n_e5 = [];
    const f6 = (() => (thing.name)).bind(this);
    e5.setAttribute("name",  f6());
    e5.replaceChildren(...n_e5);
    n_e4.push(e5);
    n_e4.push(newT(" "));
      }
      if (n_e4.length != e4.childNodes.length)
        e4.replaceChildren(...n_e4);
      else
        for (let i = 0; i < n_e4.length; i++) {
          if (!n_e4[i].isEqualNode(e4.childNodes[i]))
            e4.replaceChild(n_e4[i], e4.childNodes[i]);
        }
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

  static ZuiTagName = "zui-app_272l38pq9pbcjceizydo1z7352dz7eoe2shspb57467zkschx81xch813";
}
import { Thing } from './Thing.js';
customElements.define(App.ZuiTagName, App);
