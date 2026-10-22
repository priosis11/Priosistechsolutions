/* ==========================================================================
   CONTACT FORM  -  validation + "Thanks" message
   To really receive messages: set formEndpoint in js/config.js
   ========================================================================== */
(function () {
  var form = document.getElementById("contactForm");
  if (!form) return;

  var submitBtn = form.querySelector("button[type=submit]");
  var submitLabel = submitBtn.querySelector("span");
  var submitted = false;

  /* ----- validation rules ----- */
  var rules = {
    name: function (v) {
      if (v.length < 2) return "Please enter your name";
      if (v.length > 100) return "Name is too long";
    },
    email: function (v) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.length > 255)
        return "Enter a valid email";
    },
    phone: function (v) {
      if (!/^[+\d\s-]{7,15}$/.test(v)) return "Enter a valid phone number";
    },
    subject: function (v) {
      if (!v) return "Choose a service";
    },
    message: function (v) {
      if (v.length < 10) return "Tell us a bit more (10+ characters)";
      if (v.length > 1000) return "Message is too long (max 1000 characters)";
    },
  };

  function showError(field, msg) {
    var label = field.closest("label");
    var old = label.querySelector(".field-error");
    if (old) old.remove();
    if (msg) {
      var p = document.createElement("p");
      p.className = "field-error";
      p.textContent = msg;
      label.appendChild(p);
    }
  }
  function validateField(field) {
    var msg = rules[field.name](field.value.trim());
    showError(field, msg);
    return !msg;
  }

  /* after the first submit, re-check fields while the user types */
  form.querySelectorAll(".field").forEach(function (f) {
    f.addEventListener("input", function () {
      if (submitted) validateField(f);
    });
    f.addEventListener("change", function () {
      if (submitted) validateField(f);
    });
  });

  /* ----- toast message ----- */
  function toast(message, isError) {
    var t = document.createElement("div");
    t.className = "toast" + (isError ? " toast--error" : "");
    t.setAttribute("role", "status");
    t.innerHTML =
      icon(isError ? "circle-alert" : "circle-check", "sm") + "<span></span>";
    t.querySelector("span").textContent = message;
    document.body.appendChild(t);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        t.classList.add("is-visible");
      });
    });
    setTimeout(function () {
      t.classList.remove("is-visible");
      setTimeout(function () {
        t.remove();
      }, 350);
    }, 4000);
  }

  /* ----- submit ----- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submitted = true;

    var ok = true;
    var firstBad = null;
    form.querySelectorAll(".field").forEach(function (f) {
      if (!validateField(f)) {
        ok = false;
        if (!firstBad) firstBad = f;
      }
    });
    if (!ok) {
      firstBad.focus();
      return;
    }

    var data = {};
    form.querySelectorAll(".field").forEach(function (f) {
      data[f.name] = f.value.trim();
    });

    submitBtn.disabled = true;
    submitLabel.textContent = "Sending...";

    var endpoint = (window.SITE && window.SITE.formEndpoint) || "";
    if (!endpoint) {
      var subject = encodeURIComponent("Website enquiry: " + data.subject);
      var body = encodeURIComponent(
        "Name: " +
          data.name +
          "\\nEmail: " +
          data.email +
          "\\nPhone: " +
          data.phone +
          "\\nService: " +
          data.subject +
          "\\n\\nMessage:\\n" +
          data.message,
      );
      toast("Opening your email app to send the enquiry.");
      submitBtn.disabled = false;
      submitLabel.textContent = "Send Message";
      window.location.href =
        "mailto:" +
        encodeURIComponent((window.SITE && window.SITE.email) || "") +
        "?subject=" +
        subject +
        "&body=" +
        body;
      return;
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        toast("Thanks! Your message was sent successfully.");
        form.reset();
        submitted = false;
      })
      .catch(function () {
        toast("Message could not be sent. Please call or WhatsApp us.", true);
      })
      .then(function () {
        submitBtn.disabled = false;
        submitLabel.textContent = "Send Message";
      });
  });
})();
