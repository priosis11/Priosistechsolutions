/* ==========================================================================
   ANIMATIONS  -  scroll reveal + animated counters (used on every page)
   ========================================================================== */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- SCROLL REVEAL ----------
     HTML:  <div data-reveal="up|left|right" data-delay="0.12">...</div>  */
  var revealEls = document.querySelectorAll("[data-reveal], .founder__bar");
  if (!("IntersectionObserver" in window) || reduce) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "-60px 0px -60px 0px" },
    );
    revealEls.forEach(function (el) {
      var delay = el.getAttribute("data-delay");
      if (delay) el.style.transitionDelay = delay + "s";
      revealObserver.observe(el);
    });
  }

  /* ---------- COUNTERS ----------
     HTML:  <strong data-count="50">0</strong>   (shows "50+" at the end) */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduce) {
      el.textContent = target + "+";
      return;
    }
    var start = performance.now();
    var duration = 1600;
    function step(now) {
      var p = Math.min((now - start) / duration, 1);
      var n = Math.round(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = n === target ? n + "+" : n;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      });
      counters.forEach(function (el) {
        counterObserver.observe(el);
      });
    }
  }
})();
