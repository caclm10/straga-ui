function a(n, t) {
  const e = n();
  if (!e)
    throw new Error(t || "Invalid value.");
  return e;
}
function d() {
  return new Promise((n) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(n);
    });
  });
}
function o(n) {
  const t = [];
  return n.forEach((e) => {
    const i = e.getAnimations();
    i.length > 0 && t.push(
      ...i.map((s) => s.finished)
    );
  }), Promise.all(t);
}
class r extends HTMLElement {
  get name() {
    return a(
      () => this.getAttribute("name"),
      "Straga dialog name not defined."
    );
  }
  get dialog() {
    return a(
      () => this.querySelector("dialog"),
      "Straga dialog not defined."
    );
  }
  get overlay() {
    return a(
      () => this.querySelector("[data-dialog=overlay]"),
      "Straga dialog overlay not found."
    );
  }
  get content() {
    return a(
      () => this.querySelector("[data-dialog=content]"),
      "Straga dialog content not found."
    );
  }
  get isOpen() {
    return this.dialog.open;
  }
  connectedCallback() {
    this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick), this.removeEventListener("keydown", this.handleKeydown);
  }
  show() {
    const t = this.dialog, e = this.overlay, i = this.content;
    t.classList.add("--enter"), t.showModal(), t.classList.add("--entering"), o([e, i]).then(() => {
      t.classList.remove("--enter", "--entering");
    });
  }
  hide() {
    const t = this.dialog, e = this.overlay, i = this.content;
    t.classList.add("--exit"), t.classList.add("--exiting"), o([e, i]).then(() => {
      t.classList.remove("--exit", "--exiting"), t.close();
    });
  }
  handleClick(t) {
    t.target instanceof HTMLElement && (t.target.getAttribute("data-dialog") === "overlay" || t.target.getAttribute("data-dialog") === "close") && this.hide();
  }
  handleKeydown(t) {
    t.target instanceof HTMLElement && this.contains(t.target) && t.key === "Escape" && (t.preventDefault(), this.hide());
  }
}
class l extends HTMLElement {
  get target() {
    return a(
      () => this.getAttribute("target"),
      "Straga dialog trigger target not defined."
    );
  }
  connectedCallback() {
    this.addEventListener("click", this.handleClick);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }
  handleClick(t) {
    if (t.target instanceof HTMLElement && t.target === this.firstElementChild) {
      const e = document.querySelector(
        `straga-dialog[name=${this.target}]`
      );
      if (!e || e.isOpen) return;
      e.show();
    }
  }
}
function c() {
  customElements.define("stg-dialog", r), customElements.define("stg-dialog-trigger", l);
}
export {
  r as StragaDialog,
  l as StragaDialogTrigger,
  o as afterTransition,
  c as configureElements,
  a as getEnsured,
  d as nextTick
};
