// Code generated from App.zui. DO NOT EDIT
// Source file content hash: 33si952zd3j2330ygvxz0ensak22dmcu12105c51mvtnizctepy81y7mn90

export class App extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    this.zuiCreateHTMLElements(shadowRoot);
  }




  zuiCreateHTMLElements(shadowRoot) {
    let tmp_fn;
    const node_br_0_0_33sn90 = document.createElement("br");
    shadowRoot.appendChild(node_br_0_0_33sn90);
    shadowRoot.append("\n");
    const node_p_0_2_33sn90 = document.createElement("p");
    node_p_0_2_33sn90.append("This is a paragraph.");
    shadowRoot.appendChild(node_p_0_2_33sn90);
    shadowRoot.append("\n");
    const node_hr_0_4_33sn90 = document.createElement("hr");
    shadowRoot.appendChild(node_hr_0_4_33sn90);
    shadowRoot.append("\n");
    const node_zui_tag_33sn90_0_6_33sn90 = document.createElement("zui-tag_33sn90");
    node_zui_tag_33sn90_0_6_33sn90.setAttribute("zui-tag-name", ''+"Nested");
    node_zui_tag_33sn90_0_6_33sn90.setAttribute("foo", ''+"bar");
    shadowRoot.appendChild(node_zui_tag_33sn90_0_6_33sn90);
    shadowRoot.append("\n");
    const node_img_0_8_33sn90 = document.createElement("img");
    shadowRoot.appendChild(node_img_0_8_33sn90);
    shadowRoot.append("\n\n");
    const node_style_0_10_33sn90 = document.createElement("style");
    node_style_0_10_33sn90.append("\n    p {\n        color: goldenrod;\n        font-family: \"Comic Sans MS\", cursive;\n        font-size: 2em;\n    }\n");
    shadowRoot.appendChild(node_style_0_10_33sn90);
  }

  static ZuiTagName = "zui-app_33si952zd3j2330ygvxz0ensak22dmcu12105c51mvtnizctepy81y7mn90";
}
customElements.define(App.ZuiTagName, App);
