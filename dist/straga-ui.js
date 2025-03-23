function o(n, e) {
  const i = n();
  if (!i)
    throw new Error(e || "Invalid value.");
  return i;
}
function a() {
  return new Promise((n) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(n);
    });
  });
}
function s(n) {
  const e = [];
  return n.forEach((i) => {
    const t = i.getAnimations();
    t.length > 0 && e.push(
      ...t.map((r) => r.finished)
    );
  }), Promise.all(e);
}
export {
  s as afterTransition,
  o as getEnsured,
  a as nextTick
};
