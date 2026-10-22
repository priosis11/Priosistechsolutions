/* ==========================================================================
   LAYOUT  -  builds the parts shared by every page:
   top bar + header + mobile menu, footer, floating social buttons, go-to-top.
   Data comes from js/config.js, icons from js/icons.js.
   Placeholders in each page:  <div id="site-header"></div>  <div id="site-footer"></div>
   ========================================================================== */
(function () {
  var S = window.SITE;
  var page = document.body.getAttribute("data-page") || "";
  var year = new Date().getFullYear();

  var socials = [
    {
      label: "Instagram",
      tip: "Instagram",
      href: S.instagram,
      icon: "instagram",
    },
    { label: "WhatsApp", tip: "WhatsApp", href: S.whatsapp, icon: "whatsapp" },
    { label: "Email", tip: "Gmail", href: S.emailHref, icon: "gmail" },
  ];

  /* ---------- small helpers ---------- */
  function socialLinks(size, extraAttrs) {
    return socials
      .map(function (s) {
        return (
          '<a href="' +
          s.href +
          '" target="_blank" rel="noreferrer" aria-label="' +
          s.label +
          '"' +
          (extraAttrs || "") +
          ">" +
          icon(s.icon, size) +
          "</a>"
        );
      })
      .join("");
  }
  function activeClass(item) {
    return item.page === page ? " is-active" : "";
  }

  /* ---------- HEADER ---------- */
  function buildHeader() {
    var navDesktop = S.nav
      .map(function (n) {
        if (n.dropdown) {
          return (
            '<div class="nav-dropdown">' +
            '<a href="' +
            n.href +
            '" class="nav-link' +
            activeClass(n) +
            '">' +
            n.label +
            " " +
            icon("chevron-down", "sm") +
            "</a>" +
            '<div class="nav-dropdown__panel"><ul>' +
            S.services
              .map(function (s) {
                return '<li><a href="' + s.href + '">' + s.title + "</a></li>";
              })
              .join("") +
            "</ul></div></div>"
          );
        }
        return (
          '<a href="' +
          n.href +
          '" class="nav-link' +
          activeClass(n) +
          '">' +
          n.label +
          "</a>"
        );
      })
      .join("");

    var navMobile = S.nav
      .map(function (n) {
        if (n.dropdown) {
          return (
            '<div class="accordion" data-accordion>' +
            '<button type="button" class="accordion__trigger" aria-expanded="false">' +
            n.label +
            icon("chevron-down", "sm") +
            "</button>" +
            '<div class="accordion__content"><div class="accordion__inner"><div>' +
            '<a href="' +
            n.href +
            '">All Services</a>' +
            S.services
              .map(function (s) {
                return '<a href="' + s.href + '">' + s.title + "</a>";
              })
              .join("") +
            "</div></div></div></div>"
          );
        }
        return (
          '<a href="' +
          n.href +
          '" class="drawer__link' +
          activeClass(n) +
          '">' +
          n.label +
          "</a>"
        );
      })
      .join("");

    return (
      "" +
      '<header class="site-header" id="siteHeader">' +
      '<div class="topbar"><div class="container topbar__inner">' +
      '<div class="topbar__social"><span>Follow Us:</span>' +
      socialLinks("xs") +
      "</div>" +
      '<div class="topbar__contact">' +
      '<a href="' +
      S.phoneHref +
      '">' +
      icon("phone", "xs") +
      " Call: " +
      S.phone +
      "</a>" +
      '<a href="' +
      S.emailHref +
      '">' +
      icon("mail", "xs") +
      " Email: " +
      S.email +
      "</a>" +
      "</div>" +
      "</div></div>" +
      '<div class="header-bar"><div class="container header-bar__inner">' +
      '<a href="./" class="header-logo" aria-label="' +
      S.name +
      '"><img src="assets/images/logo.png" alt="' +
      S.name +
      '" width="900" height="300"></a>' +
      '<nav class="main-nav" aria-label="Main">' +
      navDesktop +
      "</nav>" +
      '<a href="contact" class="btn-primary header-cta">Get A Quote ' +
      icon("arrow-right", "sm") +
      "</a>" +
      '<button type="button" class="menu-btn" id="menuBtn" aria-label="Open menu" aria-controls="drawer" aria-expanded="false">' +
      icon("menu", "md") +
      "</button>" +
      "</div></div>" +
      "</header>" +
      '<div class="drawer" id="drawer" hidden>' +
      '<div class="drawer__overlay" data-drawer-close></div>' +
      '<aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Menu">' +
      '<button type="button" class="drawer__close" data-drawer-close aria-label="Close">' +
      icon("x", "sm") +
      "</button>" +
      '<img class="drawer__logo" src="assets/images/logo.png" alt="' +
      S.name +
      '" width="900" height="300">' +
      '<nav class="drawer__nav" aria-label="Mobile">' +
      navMobile +
      "</nav>" +
      '<a href="contact" class="btn-primary btn--block drawer__cta">Get A Quote ' +
      icon("arrow-right", "sm") +
      "</a>" +
      "</aside>" +
      "</div>"
    );
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    var quick = S.nav
      .map(function (n) {
        return '<li><a href="' + n.href + '">' + n.label + "</a></li>";
      })
      .join("");
    var services = S.services
      .map(function (s) {
        return '<li><a href="' + s.href + '">' + s.title + "</a></li>";
      })
      .join("");
    return (
      "" +
      '<footer class="site-footer">' +
      '<div class="container footer-grid">' +
      "<div>" +
      '<div class="footer-logo"><img src="assets/images/logo.png" alt="' +
      S.name +
      '" loading="lazy" width="900" height="300"></div>' +
      '<p class="footer-blurb">' +
      S.blurb +
      "</p>" +
      '<div class="footer-social">' +
      socialLinks("sm") +
      "</div>" +
      "</div>" +
      '<div><h3>Quick Links</h3><ul class="footer-links">' +
      quick +
      "</ul></div>" +
      '<div><h3>Services</h3><ul class="footer-links">' +
      services +
      "</ul></div>" +
      '<div><h3>Contact</h3><ul class="footer-contact">' +
      '<li><a href="' +
      S.phoneHref +
      '">' +
      icon("phone", "sm") +
      "<span>" +
      S.phone +
      "</span></a></li>" +
      '<li><a href="' +
      S.emailHref +
      '">' +
      icon("mail", "sm") +
      "<span>" +
      S.email +
      "</span></a></li>" +
      "<li>" +
      icon("map-pin", "sm") +
      "<span>" +
      S.address +
      "</span></li>" +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><div class="container footer-bottom__inner">' +
      "<p>© " +
      year +
      " " +
      S.name +
      ". All rights reserved.</p>" +
      '<div class="footer-legal"><span>Terms</span><span>Privacy</span><span>Refund</span></div>' +
      "</div></div>" +
      "</footer>"
    );
  }

  /* ---------- FLOATING SOCIAL + GO TO TOP ---------- */
  function buildFloating() {
    var side = socials
      .map(function (s) {
        return (
          '<a class="social-gloss" href="' +
          s.href +
          '" target="_blank" rel="noreferrer" aria-label="' +
          s.label +
          '">' +
          icon(s.icon).replace(
            'class="icon"',
            'class="icon" style="width:20px;height:20px"',
          ) +
          '<span class="tip">' +
          s.tip +
          "</span></a>"
        );
      })
      .join("");
    var pill = socials
      .map(function (s) {
        return (
          '<a class="social-gloss" href="' +
          s.href +
          '" target="_blank" rel="noreferrer" aria-label="' +
          s.label +
          '">' +
          icon(s.icon).replace(
            'class="icon"',
            'class="icon" style="width:18px;height:18px"',
          ) +
          '<span class="tip">' +
          s.tip +
          "</span></a>"
        );
      })
      .join("");
    return (
      '<div class="float-social" id="floatSocial">' +
      side +
      "</div>" +
      '<div class="float-pill" id="floatPill">' +
      pill +
      "</div>" +
      '<div class="go-top" id="goTop"><button type="button" class="go-top-tab" aria-label="Go to top">' +
      '<span class="go-top-line" aria-hidden="true"></span><span class="go-top-text">Go To Top</span></button></div>'
    );
  }

  /* ---------- INSERT INTO PAGE ---------- */
  var headerSlot = document.getElementById("site-header");
  var footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = buildHeader();
  if (footerSlot) footerSlot.outerHTML = buildFooter();
  document.body.insertAdjacentHTML("beforeend", buildFloating());

  /* ---------- CLEAN URLS (/about instead of /about.html) ----------
     All links in the site are written without ".html". Web hosts such as GitHub Pages
     serve /about from about.html automatically. Local tools (VS Code Live Server,
     double-clicking the file) do not, so on a local machine the links get ".html" back. */
  var host = location.hostname;
  var isLocal =
    location.protocol === "file:" ||
    /^(localhost|127\.|0\.0\.0\.0|\[::1\]|192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(
      host,
    );

  if (isLocal) {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href");
      if (h === "./") a.setAttribute("href", "index.html");
      else if (/^[A-Za-z0-9-]+$/.test(h)) a.setAttribute("href", h + ".html");
    });
  } else if (/\.html$/.test(location.pathname)) {
    /* someone opened an old /about.html link: show the clean address */
    history.replaceState(
      null,
      "",
      location.pathname.replace(/index\.html$/, "").replace(/\.html$/, "") +
        location.search +
        location.hash,
    );
  }

  /* ---------- HEADER: shrink on scroll ---------- */
  var header = document.getElementById("siteHeader");
  var goTop = document.getElementById("goTop");
  var footerEl = document.querySelector(".site-footer");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 80);
    if (goTop) {
      goTop.classList.toggle("is-visible", y > 400);
      /* switch to a light colour while the button is over the dark footer */
      if (footerEl) {
        var r = goTop.getBoundingClientRect();
        goTop.classList.toggle(
          "on-dark",
          r.top + r.height / 2 > footerEl.getBoundingClientRect().top,
        );
      }
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (goTop) {
    goTop.querySelector("button").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- MOBILE DRAWER ---------- */
  var drawer = document.getElementById("drawer");
  var menuBtn = document.getElementById("menuBtn");
  var closeTimer;

  function openDrawer() {
    clearTimeout(closeTimer);
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
    menuBtn.setAttribute("aria-expanded", "true");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        drawer.classList.add("is-open");
      });
    });
    var closeBtn = drawer.querySelector(".drawer__close");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    document.body.style.overflow = "";
    menuBtn.setAttribute("aria-expanded", "false");
    closeTimer = setTimeout(function () {
      drawer.hidden = true;
    }, 300);
    menuBtn.focus({ preventScroll: true });
  }
  if (drawer && menuBtn) {
    menuBtn.addEventListener("click", openDrawer);
    drawer.querySelectorAll("[data-drawer-close]").forEach(function (el) {
      el.addEventListener("click", closeDrawer);
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.style.overflow = "";
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) closeDrawer();
    });
    /* close the drawer if the window is resized to desktop width */
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && !drawer.hidden) {
        drawer.classList.remove("is-open");
        drawer.hidden = true;
        document.body.style.overflow = "";
      }
    });
  }

  /* Services accordion inside the drawer */
  document.querySelectorAll("[data-accordion]").forEach(function (acc) {
    var btn = acc.querySelector(".accordion__trigger");
    btn.addEventListener("click", function () {
      var open = acc.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---------- FLOATING SOCIAL: staggered fade-in ---------- */
  ["floatSocial", "floatPill"].forEach(function (id) {
    var box = document.getElementById(id);
    if (!box) return;
    box.querySelectorAll(".social-gloss").forEach(function (el, i) {
      setTimeout(
        function () {
          el.classList.add("is-in");
        },
        400 + i * 150,
      );
    });
  });
})();
