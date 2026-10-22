/* ==========================================================================
   PORTFOLIO FILTER
   Buttons: <button class="filter-btn" data-filter="Business">
   Items:   <div class="project" data-category="Business">
   ========================================================================== */
(function () {
  var buttons = document.querySelectorAll("[data-filter]");
  var items = document.querySelectorAll(".project");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });

      items.forEach(function (item) {
        var show = cat === "All" || item.getAttribute("data-category") === cat;
        if (show) {
          item.hidden = false;
          item.classList.add("is-hiding");
          void item.offsetWidth;
          item.classList.remove("is-hiding");
        } else {
          item.classList.add("is-hiding");
          setTimeout(function () {
            if (item.classList.contains("is-hiding")) item.hidden = true;
          }, 250);
        }
      });
    });
  });
})();
