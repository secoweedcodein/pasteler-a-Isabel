/* Navegación, menú móvil, WhatsApp y carga de fotografías */
(function () {
  "use strict";
  var site = window.SITE || {};
  var WA_NUMBER = site.whatsapp || "56930895758";

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(a.dataset.wa);
  });

  var ig = document.querySelectorAll('a[href*="instagram.com"]');
  if (site.instagramUrl) {
    ig.forEach(function (a) {
      a.href = site.instagramUrl;
      if (a.textContent.indexOf("@") === 0 && site.instagramHandle) {
        a.textContent = site.instagramHandle;
      }
    });
  }

  var waDisplay = document.querySelector(".contact__list a[data-wa]");
  if (waDisplay && site.whatsappDisplay) waDisplay.textContent = site.whatsappDisplay;

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", function (m) {
    if (m.matches) setMenu(false);
  });

  var header = document.querySelector(".header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var links = nav.querySelectorAll("ul a");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (l) {
            l.classList.toggle("is-current", l.getAttribute("href") === "#" + en.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach(function (s) {
      io.observe(s);
    });
  }

  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  document.querySelectorAll(".photo[data-src]").forEach(function (el) {
    var img = el.querySelector("img");
    var src = el.getAttribute("data-src");
    if (!img || !src) return;
    el.classList.add("photo--pending");
    img.addEventListener("load", function () {
      el.classList.remove("photo--pending");
      img.removeAttribute("aria-hidden");
    });
    img.addEventListener("error", function () {
      img.removeAttribute("src");
      img.setAttribute("aria-hidden", "true");
      el.classList.add("photo--pending");
    });
    img.src = src;
  });
})();
