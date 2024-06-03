// Code generated from App.zui. DO NOT EDIT
// Source file content hash: cpzhwfka6hux3hi56zlkxjq9q3ci30ihxlwr2lrj0fleyli1n21qtfmz1

export class App extends HTMLElement {


  #v0 = [1, 2, 3, 4];
  get #numbers() { return this.#v0; }
  set #numbers(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('numbers');
    }
  }

#addNumber() {
    {
        this.#numbers[this.#numbers.length] = this.#numbers.length + 1;
        this.zuiOnPropChanged("numbers");
    }
}

  get #sum() { return this.#numbers.reduce((total, currentNumber) => {
    return total + currentNumber;
}, 0) }


  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = document.createElement("p");
    const n_e1 = [];
    const f2 = (() => (this.#numbers.join(" + "))).bind(this);
    const e3 = document.createTextNode(f2());
    this.zuiSub('numbers', (() => { e3.nodeValue = f2(); }).bind(this));
    n_e1.push(e3);
    n_e1.push(" = ");
    const f4 = (() => (this.#sum)).bind(this);
    const e5 = document.createTextNode(f4());
    this.zuiSub('sum', (() => { e5.nodeValue = f4(); }).bind(this));
    n_e1.push(e5);
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(" ");
    const e6 = document.createElement("button");
    const n_e6 = [];
    const f7 = (() => (this.#addNumber)).bind(this);
    e6.addEventListener('click', ((evt) => (f7)().bind(this)()).bind(this));
    n_e6.push(" Add a number ");
    e6.replaceChildren(...n_e6);
    n_shadowRoot.push(e6);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
    this.zuiSub('numbers', () => this.zuiOnPropChanged('sum'));
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
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

  static ZuiTagName = "zui-app_cpzhwfka6hux3hi56zlkxjq9q3ci30ihxlwr2lrj0fleyli1n21qtfmz1";
}
customElements.define(App.ZuiTagName, App);
