/* Filtros, visor de fotos, formulario de pedido y aparición al scroll */
(function () {
  "use strict";

  var chips = document.querySelectorAll(".chip");
  var items = document.querySelectorAll(".item");
  var empty = document.querySelector(".gallery-empty");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      var visible = 0;
      items.forEach(function (it) {
        var hide = f !== "all" && it.dataset.cat !== f;
        it.classList.toggle("is-hidden", hide);
        if (!hide) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    });
  });

  var box = document.querySelector(".lightbox");
  if (box && typeof box.showModal === "function") {
    var big = box.querySelector("img");
    document.addEventListener("click", function (e) {
      var img = e.target.closest("img.zoomable");
      if (!img || !img.getAttribute("src")) return;
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      box.showModal();
    });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.closest(".lightbox__close")) box.close();
    });
    box.addEventListener("close", function () {
      big.removeAttribute("src");
    });
  }

  var form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var error = form.querySelector(".order-form__error");
      var data = new FormData(form);
      var nombre = String(data.get("nombre") || "").trim();
      var tipo = String(data.get("tipo") || "").trim();
      if (!nombre || !tipo) {
        if (error) error.hidden = false;
        return;
      }
      if (error) error.hidden = true;
      var fecha = String(data.get("fecha") || "").trim();
      var cantidad = String(data.get("cantidad") || "").trim();
      var detalle = String(data.get("detalle") || "").trim();
      var lines = [
        "Hola Isabel, quiero hacer un pedido.",
        "Nombre: " + nombre,
        "Tipo: " + tipo,
      ];
      if (fecha) lines.push("Fecha deseada: " + fecha);
      if (cantidad) lines.push("Cantidad: " + cantidad);
      if (detalle) lines.push("Detalles: " + detalle);
      var number = (window.SITE && window.SITE.whatsapp) || "56930895758";
      window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
    });
  }

  var targets = document.querySelectorAll(
    ".section-head, .item, .steps li, .order-form, .events__text, .events__media, .banqueteria__photo, .about > *, .faq__list, .contact__inner > *"
  );
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  targets.forEach(function (t) {
    t.classList.add("reveal");
  });
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach(function (t) {
    io.observe(t);
  });
})();
