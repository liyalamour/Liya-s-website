(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var shell = document.querySelector(".site-shell");
  var nav = document.getElementById("site-nav");
  if (!shell || !nav) return;

  var lastY = window.scrollY;
  var hidden = false;
  var minScrollDown = 12;
  var minScrollUp = 12;
  var topRevealPx = 48;

  function setHidden(next) {
    if (next === hidden) return;
    hidden = next;
    shell.classList.toggle("site-shell--nav-hidden", hidden);
  }

  function onScroll() {
    var y = window.scrollY;
    var delta = y - lastY;

    if (y <= topRevealPx) {
      setHidden(false);
    } else if (delta > minScrollDown) {
      setHidden(true);
    } else if (delta < -minScrollUp) {
      setHidden(false);
    }

    lastY = y;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
