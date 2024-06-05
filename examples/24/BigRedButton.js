// Code generated from BigRedButton.zui. DO NOT EDIT
// Source file content hash: 2v1gd7uj4mqdm1atk22pezzukb1q9h2k9yn0nun1yssr99ebeyye1eijzbt

import { ZuiElement, deepEq, newE, newT } from '../../zui.js';
export class BigRedButton extends ZuiElement {
  zuiCreateHTMLElements(shadowRoot) {
    const n_shadowRoot = [];
    const e1 = newE("button");
    const n_e1 = [];
    const f2 = (() => ((evt) => {
      this.dispatch('click', evt.detail);
    }));
    e1.addEventListener('click', ((evt) => (f2)().bind(this)(evt)).bind(this), {});
    n_e1.push(newT(" Push "));
    e1.replaceChildren(...n_e1);
    n_shadowRoot.push(e1);
    n_shadowRoot.push(newT(" "));
    const e3 = newE("style");
    const n_e3 = [];
    n_e3.push(newT("\n    button {\n        font-size: 1.4em;\n        width: 6em;\n        height: 6em;\n        border-radius: 50%;\n        background: radial-gradient(\n            circle at 25% 25%,\n            hsl(0, 100%, 50%) 0,\n            hsl(0, 100%, 40%) 100%\n        );\n        box-shadow:\n            0 8px 0 hsl(0, 100%, 30%),\n            2px 12px 10px rgba(0, 0, 0, 0.35);\n        color: hsl(0, 100%, 30%);\n        text-shadow:\n            -1px -1px 2px rgba(0, 0, 0, 0.3),\n            1px 1px 2px rgba(255, 255, 255, 0.4);\n        text-transform: uppercase;\n        letter-spacing: 0.05em;\n        transform: translate(0, -8px);\n        transition: all 0.2s;\n    }\n\n    button:active {\n        transform: translate(0, -2px);\n        box-shadow:\n            0 2px 0 hsl(0, 100%, 30%),\n            2px 6px 10px rgba(0, 0, 0, 0.35);\n    }\n"));
    e3.replaceChildren(...n_e3);
    n_shadowRoot.push(e3);
    shadowRoot.replaceChildren(...n_shadowRoot);
  }
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }

  static ZuiTagName = "zui-bigredbutton_2v1gd7uj4mqdm1atk22pezzukb1q9h2k9yn0nun1yssr99ebeyye1eijzbt";
}
customElements.define(BigRedButton.ZuiTagName, BigRedButton);
