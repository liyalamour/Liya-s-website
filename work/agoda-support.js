/**
 * Client-side gate only (password is visible in source). Change the code
 * before publishing; session unlocks until the tab is closed.
 */
(function () {
  var STORAGE_KEY = "liyaPortfolioAgodaSupportV1";
  // Change this to your private access phrase:
  var AGODA_SUPPORT_ACCESS_CODE = "agoda";

  function setMainInert(inert) {
    var nav = document.getElementById("site-nav");
    var main = document.querySelector("main.case-study");
    if (nav) {
      if (inert) nav.setAttribute("inert", "");
      else nav.removeAttribute("inert");
    }
    if (main) {
      if (inert) main.setAttribute("inert", "");
      else main.removeAttribute("inert");
    }
  }

  function unlock() {
    var gate = document.getElementById("agoda-support-gate");
    if (gate) gate.hidden = true;
    setMainInert(false);
  }

  function init() {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      unlock();
      return;
    }

    setMainInert(true);

    var form = document.getElementById("agoda-support-unlock-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("agoda-support-password");
      var err = document.getElementById("agoda-support-gate-error");
      if (!input || !err) return;

      if (input.value === AGODA_SUPPORT_ACCESS_CODE) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        err.textContent = "";
        unlock();
      } else {
        err.textContent = "Incorrect password. Try again.";
        input.value = "";
        input.focus();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
