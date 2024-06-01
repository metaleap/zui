// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #string = `this string contains some <strong>HTML!!!</strong>`;
  get string() { return this.#string; }
  set string(v) {
    if (this.#string !== v) {
      this.#string = v;
      this.zuiOnPropChanged('string');
    }
  }
#subs = null;
zuiSub(name, fn) {
  let arr = this.subs.get(name);
  if (!arr)
    arr=[fn];
  else
    arr.push(fn);
  this.subs.set(name, arr);
}
zuiOnPropChanged(name) {
  if (this.subs) {
    const subs = this.subs.get(name);
    if (subs && subs.length) {
      for (const fn of subs)
        fn.bind(this)();
    }
  }
}



  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_p_0_0_2escw5 = document.createElement("p");
    tmp_fn = (function() { return this.string; }).bind(this);
    const txt_et3fx7 = document.createElement('span');
    txt_et3fx7.innerHTML = tmp_fn();
    node_p_0_0_2escw5.append(txt_et3fx7);
    shadowRoot.appendChild(node_p_0_0_2escw5);
  }

  static ZuiTagName = "zui-app_2es5dqpeyayji7j5kvo8cgwkr2ac8xud20q48z1uw8ompu8xbi8keucw5";
}
customElements.define(App.ZuiTagName, App);
