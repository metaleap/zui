// Code generated from App.zui. DO NOT EDIT
// Source file content hash: hwegtuzv7jdg135l7pijo3c311nx220g238vuw1z5tmqk8o59jx1h3pwrd

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }
  disconnectedCallback() {
  }
  adoptedCallback() {
  }
  attributeChangedCallback() {
  }


src = "/image.png";


  subs_hwegtuzv7jdg135l7pijo3c311nx220g238vuw1z5tmqk8o59jx1h3pwrd = new Map();
  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_img_0_0_hwegtuzv7jdg135l7pijo3c311nx220g238vuw1z5tmqk8o59jx1h3pwrd = document.createElement("img");
    node_img_0_0_hwegtuzv7jdg135l7pijo3c311nx220g238vuw1z5tmqk8o59jx1h3pwrd.setAttribute("alt", "Rick");
    node_img_0_0_hwegtuzv7jdg135l7pijo3c311nx220g238vuw1z5tmqk8o59jx1h3pwrd.setAttribute("src", "{src}");
    shadowRoot.appendChild(node_img_0_0_hwegtuzv7jdg135l7pijo3c311nx220g238vuw1z5tmqk8o59jx1h3pwrd);
  }
}

customElements.define('zui-app_hwegtuzv7jdg135l7pijo3c311nx220g238vuw1z5tmqk8o59jx1h3pwrd', App);
