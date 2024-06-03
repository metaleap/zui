// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 1pydhcvb0qeks1qgg0clkxdfe52x6vp5f9ezw572mqogv1i2t3sy1spewrz

export class App extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }


  #v0 = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  get #colors() { return this.#v0; }
  set #colors(v) {
    if (((typeof this.#v0) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v0, v)) {
      this.#v0 = v;
      this.zuiOnPropChanged('colors');
    }
  }
  #v1 = colors[0];
  get #selected() { return this.#v1; }
  set #selected(v) {
    if (((typeof this.#v1) === 'object') || ((typeof v) === 'object') || !Object.is(this.#v1, v)) {
      this.#v1 = v;
      this.zuiOnPropChanged('selected');
    }
  }


  zuiCreateHTMLElements(shadowRoot) {
    const e1 = document.createElement("h1");
    const f2 = (() => (this.#selected)).bind(this);
    const f3 = (() => ("color: " +  (f2()) )).bind(this);
    e1.setAttribute("style",  f3());
    this.zuiSub('selected', () => e1.setAttribute("style",  f3()));
    e1.append("Pick a colour");
    shadowRoot.appendChild(e1);
    shadowRoot.append(" ");
    const e4 = document.createElement("div");
    e4.append(" ");
    const e6 = document.createElement('span');
    const f5 = (() => { //startLoop
    e6.replaceChildren();
      for (const  color of this.#colors) {
    e6.append(" ");
    const e7 = document.createElement("button");
    const f8 = (() => (this.#selected === color)).bind(this);
    e7.setAttribute("aria-current",  f8());
    this.zuiSub('selected', () => e7.setAttribute("aria-current",  f8()));
    const f10 = (() => (color)).bind(this);
    e7.setAttribute("aria-label",  f10());
    const f12 = f10;
    const f13 = (() => ("background: " +  (f12()) )).bind(this);
    e7.setAttribute("style",  f13());
    const f14 = (() => (() => {
    return (this.#selected = color);
})).bind(this);
    e7.addEventListener('click', ((evt) => (f14)().bind(this)()).bind(this));
    const f15 = (() => (i + 1)).bind(this);
    const e16 = document.createTextNode(f15());
    e7.append(e16);
    e6.appendChild(e7);
    e6.append(" ");
      }
    }).bind(this); //endLoop
    f5();
    this.zuiSub("colors", f5);
    e4.appendChild(e6);
    e4.append(" ");
    shadowRoot.appendChild(e4);
    shadowRoot.append(" ");
    const e17 = document.createElement("style");
    e17.append("\n    h1 {\n        transition: color 0.2s;\n    }\n\n    div {\n        display: grid;\n        grid-template-columns: repeat(7, 1fr);\n        grid-gap: 5px;\n        max-width: 400px;\n    }\n\n    button {\n        aspect-ratio: 1;\n        border-radius: 50%;\n        background: var(--color, #fff);\n        transform: translate(-2px, -2px);\n        filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));\n        transition: all 0.1s;\n    }\n\n    button[aria-current=\"true\"] {\n        transform: none;\n        filter: none;\n        box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);\n    }\n");
    shadowRoot.appendChild(e17);
  }
  constructor() {
    super();
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

  static ZuiTagName = "zui-app_1pydhcvb0qeks1qgg0clkxdfe52x6vp5f9ezw572mqogv1i2t3sy1spewrz";
}
customElements.define(App.ZuiTagName, App);
