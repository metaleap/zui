// Code generated from App.zui. DO NOT EDIT
// Source file content hash: cpzhwfka6hux3hi56zlkxjq9q3ci30ihxlwr2lrj0fleyli1n21qtfmz1

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0 = [1, 2, 3, 4];
  get #numbers() { return this.#v0; }
  set #numbers(v) { this.zuiSet('#v0', 'numbers', v) }

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
    const el1 = document.createElement("p");
    const fn1 = (function() { return this.#numbers.join(" + "); }).bind(this);
    const el2 = document.createTextNode(fn1());
    this.zuiSub('numbers', (() => { el2.nodeValue = fn1(); }).bind(this));
    el1.append(el2);
    el1.append(" = ");
    const fn2 = (function() { return this.#sum; }).bind(this);
    const el3 = document.createTextNode(fn2());
    this.zuiSub('sum', (() => { el3.nodeValue = fn2(); }).bind(this));
    el1.append(el3);
    shadowRoot.appendChild(el1);
    shadowRoot.append("\n\n");
    const el4 = document.createElement("button");
    const fn3 = (function() { return this.#addNumber; }).bind(this);
    el4.addEventListener('click', ((evt) => fn3().bind(this)()).bind(this));
    el4.append(" Add a number ");
    shadowRoot.appendChild(el4);
  }
  constructor() {
    super();
    this.zuiSub('numbers', () => this.zuiOnPropChanged('sum'));
  }
#subs = new Map();
zuiSub(name, ...fn) {
  let arr = this.#subs.get(name);
  if (!arr)
    arr = fn;
  else
    arr.push(...fn);
  this.#subs.set(name, arr);
}
zuiOnPropChanged(name) {
  for (const fn of ((this.#subs.get(name)) ?? []))
    fn();
}

zuiSet(k, n, v) {
  if (((typeof this[k]) === 'object') || ((typeof v) === 'object') || !Object.is(this[k], v)) {
    this[k] = v;
    this.zuiOnPropChanged(n);
  }
}


  static ZuiTagName = "zui-app_cpzhwfka6hux3hi56zlkxjq9q3ci30ihxlwr2lrj0fleyli1n21qtfmz1";
}
customElements.define(App.ZuiTagName, App);
