/* ==========================================================================
   HERO SLIDER (home page)
   - auto-plays every 5.6s, typewriter on the second heading line
   - pauses while the mouse is over the slide card, or with the pause button
   - desktop: background cross-fade + mouse parallax
   Edit slide text in the "slides" list below. Images are set in index.html.
   ========================================================================== */
(function () {
  var root = document.querySelector("[data-hero]");
  if (!root) return;

  var DURATION = 5600; // time per slide (ms)
  var TYPE_SPEED = 60; // typewriter speed (ms per letter)
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var slides = [
    {
      eyebrow: "01 / PC & LAPTOP REPAIR",
      a: "Fast Repairs &",
      b: "Hardware Fixes",
      cta: "Book a Repair",
      desc: "Laptop and desktop repairs done right — honest diagnosis, clear quotes and quick turnaround.",
      img: "assets/images/hero-1.jpg",
    },
    {
      eyebrow: "02 / UPGRADES",
      a: "SSD & RAM",
      b: "Performance Upgrades",
      cta: "Upgrade My PC",
      desc: "Give your old machine a second life. SSD and RAM upgrades that make everyday work feel brand new.",
      img: "assets/images/hero-2.jpg",
    },
    {
      eyebrow: "03 / WEB DEVELOPMENT",
      a: "Websites &",
      b: "Web Apps",
      cta: "Get My Website",
      desc: "Modern, mobile-friendly websites that help shops and businesses get found and get enquiries.",
      img: "assets/images/hero-3.jpg",
    },
  ];

  var content = root.querySelector(".hero__content");
  var elEyebrow = root.querySelector("[data-hero-eyebrow]");
  var elA = root.querySelector("[data-hero-a]");
  var elB = root.querySelector("[data-hero-b]");
  var elDesc = root.querySelector("[data-hero-desc]");
  var elCta = root.querySelector("[data-hero-cta]");
  var mobileImg = root.querySelector("[data-hero-mobile-img]");
  var bgImgs = root.querySelectorAll(".hero__bg img");
  var tabs = root.querySelectorAll(".hero__tab");
  var bars = root.querySelectorAll(".hero__bar-fill");
  var btnPrev = root.querySelector("[data-hero-prev]");
  var btnNext = root.querySelector("[data-hero-next]");
  var btnPause = root.querySelector("[data-hero-pause]");

  var current = 0,
    paused = false,
    hovered = false,
    timer,
    typeTimer,
    swapTimer;

  function stopped() {
    return paused || hovered;
  }

  /* ----- typewriter on line 2 ----- */
  function typewrite(text) {
    clearInterval(typeTimer);
    if (reduce) {
      setTyped(text);
      return;
    }
    var n = 0;
    setTyped("");
    typeTimer = setInterval(function () {
      n++;
      setTyped(text.slice(0, n));
      if (n >= text.length) clearInterval(typeTimer);
    }, TYPE_SPEED);
  }
  function setTyped(t) {
    elB.innerHTML =
      '<span class="hero__type"></span><span class="caret" aria-hidden="true"></span>';
    elB.firstChild.textContent = t;
  }

  /* ----- progress bar under each tab ----- */
  function restartBar() {
    bars.forEach(function (b, i) {
      b.style.transition = "none";
      b.style.width = "0";
      if (i !== current) return;
      if (stopped()) {
        b.style.width = "100%";
        return;
      }
      void b.offsetWidth; // force reflow so the animation restarts
      b.style.transition = "width " + DURATION / 1000 + "s linear";
      b.style.width = "100%";
    });
  }

  /* ----- timer ----- */
  function schedule() {
    clearTimeout(timer);
    restartBar();
    if (stopped()) return;
    timer = setTimeout(function () {
      go(current + 1);
    }, DURATION);
  }

  /* ----- fill text ----- */
  function fill(s) {
    elEyebrow.textContent = s.eyebrow;
    elA.textContent = s.a;
    elDesc.textContent = s.desc;
    elCta.firstChild.textContent = s.cta + " ";
    typewrite(s.b);
  }
  function enter() {
    content.classList.remove("is-out");
    content.classList.add("is-pre");
    void content.offsetWidth;
    content.classList.remove("is-pre");
    content.classList.add("is-in");
  }

  /* ----- change slide ----- */
  function go(n, initial) {
    current = (n + slides.length) % slides.length;
    var s = slides[current];

    tabs.forEach(function (t, i) {
      t.classList.toggle("is-active", i === current);
      t.setAttribute("aria-current", i === current ? "true" : "false");
    });
    bgImgs.forEach(function (img, i) {
      img.classList.toggle("is-active", i === current);
    });
    mobileImg.src = s.img;

    clearTimeout(swapTimer);
    if (initial || reduce) {
      fill(s);
      enter();
    } else {
      content.classList.remove("is-in");
      content.classList.add("is-out");
      swapTimer = setTimeout(function () {
        fill(s);
        enter();
      }, 450);
    }
    schedule();
  }

  /* ----- controls ----- */
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () {
      go(i);
    });
  });
  btnPrev.addEventListener("click", function () {
    go(current - 1);
  });
  btnNext.addEventListener("click", function () {
    go(current + 1);
  });
  btnPause.addEventListener("click", function () {
    paused = !paused;
    btnPause.classList.toggle("is-paused", paused);
    btnPause.setAttribute("aria-label", paused ? "Play" : "Pause");
    schedule();
  });

  /* Pause only while a MOUSE is over the slide card (tabs + buttons) or while a
     keyboard user has focus there. Mouse resting on the image / text does not stop
     the slider, and touch taps on phones never pause it. */
  var nav = root.querySelector(".hero__nav");
  nav.addEventListener("pointerenter", function (e) {
    if (e.pointerType !== "mouse") return;
    hovered = true;
    schedule();
  });
  nav.addEventListener("pointerleave", function (e) {
    if (e.pointerType !== "mouse") return;
    hovered = false;
    schedule();
  });
  nav.addEventListener("focusin", function (e) {
    if (!e.target.matches(":focus-visible")) return; // ignore focus caused by mouse clicks
    hovered = true;
    schedule();
  });
  nav.addEventListener("focusout", function (e) {
    if (e.relatedTarget && nav.contains(e.relatedTarget)) return;
    hovered = false;
    schedule();
  });

  /* desktop mouse parallax on the background image */
  var bg = root.querySelector(".hero__bg");
  root.addEventListener("mousemove", function (e) {
    if (reduce || window.innerWidth < 992) return;
    var r = root.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    bg.style.setProperty("--mx", x * -18 + "px");
    bg.style.setProperty("--my", y * -12 + "px");
  });

  go(0, true);
})();
