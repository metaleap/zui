// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 31h8ys4i60kmd3o9tme4foa1se13invk5pebgv1133hctubzid61mdqi9p

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #count = 0;
  get count() { return this.#count; }
  set count(v) {
    if (this.#count !== v) {
      this.#count = v;
      this.zuiOnPropChanged('count');
    }
  }

increment() {
    this.count += 1;
}

#subs = null;
zuiSub(name, fn) {
  let arr = this.#subs.get(name);
  if (!(arr && arr.push))
    arr = [fn];
  else
    arr.push(fn);
  this.#subs.set(name, arr);
}
zuiOnPropChanged(name) {
  if (this.#subs) {
    const subs = this.#subs.get(name);
    if (subs && subs.length) {
      for (const fn of subs)
        fn.bind(this)();
    }
  }
}



  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_button_0_0_31hi9p = document.createElement("button");
    tmp_fn = (function() { return this.increment; }).bind(this);
    node_button_0_0_31hi9p.addEventListener('click', ((fn) => ((evt) => fn().bind(this)(evt)).bind(this)).bind(this)(tmp_fn));
    node_button_0_0_31hi9p.append("\n    Clicked ");
    tmp_fn = (function() { return this.count; }).bind(this);
    const txt_3pp1mo = document.createTextNode(tmp_fn());
    this.zuiSub('count', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(tmp_fn, txt_3pp1mo));
    node_button_0_0_31hi9p.append(txt_3pp1mo);
    node_button_0_0_31hi9p.append("\n    ");
    tmp_fn = (function() { return this.count === 1 ? "time" : "times"; }).bind(this);
    const txt_37bl8f = document.createTextNode(tmp_fn());
    this.zuiSub('count', ((fn, el) => (() => { el.nodeValue = fn(); }).bind(this)).bind(this)(tmp_fn, txt_37bl8f));
    node_button_0_0_31hi9p.append(txt_37bl8f);
    node_button_0_0_31hi9p.append("\n");
    shadowRoot.appendChild(node_button_0_0_31hi9p);
  }
  constructor() {
    super();
    this.#subs = new Map();
  }

  static ZuiTagName = "zui-app_31h8ys4i60kmd3o9tme4foa1se13invk5pebgv1133hctubzid61mdqi9p";
}
customElements.define(App.ZuiTagName, App);
