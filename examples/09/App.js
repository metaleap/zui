// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 2f2g5e8mtx7qz39o5xu6057e592czmk5ad3fgmk3uodv6jsx2uwv1s3fsal

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0 = 0;
  get #count() { return this.#v0; }
  set #count(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('count');
    }
  }

#handleClick() {
    {
        this.#count += 1;
        this.zuiOnPropChanged("count");
    }
}



  zuiCreateHTMLElements(shadowRoot) {
    const e1 = document.createElement("button");
    const f2 = (() => (this.#handleClick)).bind(this);
    e1.addEventListener('click', ((evt) => (f2)().bind(this)()).bind(this));
    e1.append("\n    Clicked ");
    const f3 = (() => (this.#count)).bind(this);
    const e4 = document.createTextNode(f3());
    this.zuiSub('count', (() => { e4.nodeValue = f3(); }).bind(this));
    e1.append(e4);
    e1.append(" ");
    const f5 = (() => (this.#count === 1 ? "time" : "times")).bind(this);
    const e6 = document.createTextNode(f5());
    this.zuiSub('count', (() => { e6.nodeValue = f5(); }).bind(this));
    e1.append(e6);
    e1.append(" ");
    shadowRoot.appendChild(e1);
  }
  constructor() {
    super();
    this.zuiSub('count', () => {
if (this.#count >= 10) {
    alert("count is dangerously high!");
    {
        this.#count = 0;
        this.zuiOnPropChanged("count");
    }
}
    });
    this.zuiSub('count', () => {
{
    console.log(`the count is ${this.#count}`);
    console.log(`this will also be logged whenever count changes`);
}
    });
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

  static ZuiTagName = "zui-app_2f2g5e8mtx7qz39o5xu6057e592czmk5ad3fgmk3uodv6jsx2uwv1s3fsal";
}
customElements.define(App.ZuiTagName, App);
