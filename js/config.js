/* ==========================================================================
   SITE SETTINGS  -  edit your business details here (one place for all pages)
   The header, footer, floating buttons and contact links read from this file.
   NOTE: text written directly inside the .html pages (headings, paragraphs)
   must be edited in the HTML files themselves.
   ========================================================================== */
window.SITE = {
  name: "Priosis Tech Solutions",
  tagline: "IT Services · Repair · Digital Solutions",
  founder: "Priyansh",

  phone: "+91 99726 68406",
  phoneHref: "tel:+919972668406",
  email: "priyansh6445@gmail.com",
  emailHref: "mailto:priyansh6445@gmail.com",
  whatsapp:
    "https://wa.me/919972668406?text=" +
    encodeURIComponent("Hello Priosis Tech Solutions, I need help with..."),
  instagram: "https://instagram.com/thepriosis11",
  address:
    "Please contact us by phone or WhatsApp for the current service location.",
  blurb:
    "Honest PC & laptop repairs, performance upgrades and modern websites — fast service with clear quotes.",

  /* Contact form: paste a Formspree (or similar) endpoint URL here to receive
     form messages by email, e.g. "https://formspree.io/f/xxxxxxx".
     If empty, the form opens the visitor email app with the message prefilled; it does not silently pretend to send. */
  formEndpoint: "",

  /* Main menu (page = value of <body data-page="..."> used for the active link) */
  nav: [
    { label: "Home", href: "./", page: "home" },
    { label: "About Us", href: "about", page: "about" },
    { label: "Services", href: "services", page: "services", dropdown: true },
    { label: "Portfolio", href: "portfolio", page: "portfolio" },
    { label: "Blogs", href: "blogs", page: "blogs" },
    { label: "Contact Us", href: "contact", page: "contact" },
  ],

  /* Services list - used in the menu dropdown and the footer */
  services: [
    { title: "Laptop Repair", href: "service-laptop-repair" },
    { title: "Desktop PC Repair", href: "service-pc-repair" },
    { title: "Motherboard Repair", href: "service-motherboard-repair" },
    { title: "Windows & Software", href: "service-software-windows" },
    { title: "SSD & RAM Upgrade", href: "service-ssd-ram" },
    { title: "Website Development", href: "service-website-development" },
  ],
};
