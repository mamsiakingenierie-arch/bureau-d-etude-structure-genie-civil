/**
 * Structura - Scripts du site statique
 */

(function () {
  "use strict";

  const header = document.getElementById("header");
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");
  const contactForm = document.getElementById("contactForm");
  const formNotice = document.getElementById("formNotice");
  const yearEl = document.getElementById("year");

  /* Année dynamique dans le footer */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Header avec fond au scroll */
  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* Menu mobile */
  function toggleMenu(force) {
    const isOpen = typeof force === "boolean" ? force : !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-active", isOpen);
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  if (burger && nav) {
    burger.addEventListener("click", () => toggleMenu());

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("is-open")) {
          toggleMenu(false);
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  }

  /* Navigation active au scroll */
  const sections = document.querySelectorAll("section[id]");

  function setActiveLink() {
    let current = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("is-active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("is-active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* Filtre des réalisations */
  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      filters.forEach((f) => f.classList.remove("is-active"));
      filter.classList.add("is-active");

      projects.forEach((project) => {
        const projectCategory = project.dataset.category;
        if (category === "all" || projectCategory === category) {
          project.classList.remove("is-hidden");
          project.style.animation = "fadeInUp 0.4s ease forwards";
        } else {
          project.classList.add("is-hidden");
        }
      });
    });
  });

  /* Animation d'apparition au scroll */
  const revealElements = document.querySelectorAll(
    ".feature, .service, .project, .contact__info, .contact__form"
  );

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;

    revealElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add("is-visible");
      }
    });
  }

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("scroll", revealOnScroll, { passive: true });
  revealOnScroll();

  /* Ajout de la classe is-visible via JS + CSS inline */
  const revealStyle = document.createElement("style");
  revealStyle.textContent = `
    .is-visible { opacity: 1 !important; transform: translateY(0) !important; }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(revealStyle);

  /* Formulaire de contact */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !subject || !message) {
        showNotice("Veuillez remplir tous les champs du formulaire.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotice("Veuillez saisir une adresse email valide.", "error");
        return;
      }

      // Simulation d'envoi (le site est statique, pas de backend ici)
      showNotice("Merci ! Votre message a bien été envoyé. Nous vous recontacterons sous 24h.", "success");
      contactForm.reset();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showNotice(message, type) {
    if (!formNotice) return;
    formNotice.textContent = message;
    formNotice.className = "form__notice";
    formNotice.classList.add("is-" + type);
  }
})();
