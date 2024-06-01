// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 31h8ys4i60kmd3o9tme4foa1se13invk5pebgv1133hctubzid61mdqi9p

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


count = 0;
increment() {
    this.count += 1;
}


  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_button_0_0_31hi9p = document.createElement("button");
    const tmp_fn_0 = (function() { return '' + this.increment; }).bind(this);
    node_button_0_0_31hi9p.setAttribute("on:click", '' +  (tmp_fn_0()) );
    node_button_0_0_31hi9p.append("\n    Clicked ");
    tmp_fn = (function() { return '' + this.count; }).bind(this);
    const txt_3pp1mo = document.createTextNode(tmp_fn());
    this.subs_31hi9p.set(txt_3pp1mo, tmp_fn);
    node_button_0_0_31hi9p.append(txt_3pp1mo);
    node_button_0_0_31hi9p.append("\n    ");
    tmp_fn = (function() { return '' + this.count === 1 ? "time" : "times"; }).bind(this);
    const txt_37bl8f = document.createTextNode(tmp_fn());
    this.subs_31hi9p.set(txt_37bl8f, tmp_fn);
    node_button_0_0_31hi9p.append(txt_37bl8f);
    node_button_0_0_31hi9p.append("\n");
    shadowRoot.appendChild(node_button_0_0_31hi9p);
  }

  subs_31hi9p = new Map();

  static ZuiTagName = "zui-app_31h8ys4i60kmd3o9tme4foa1se13invk5pebgv1133hctubzid61mdqi9p";
}
customElements.define(App.ZuiTagName, App);
