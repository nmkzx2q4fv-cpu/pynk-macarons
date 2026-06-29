/* ============================================================
   Pynk Macarons — GSAP Premium Motion Layer
   ------------------------------------------------------------
   Layered on top of existing CSS transitions + WAA physics.
   Requires: gsap.min.js, ScrollTrigger.min.js (already on CDN).
   Respects prefers-reduced-motion globally.
   ============================================================ */
(function () {
  "use strict";

  if (typeof gsap === "undefined") return;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (RM) return;

  gsap.registerPlugin(ScrollTrigger);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ============================================================
     1) HERO ENTRANCE TIMELINE
     ============================================================ */
  function initHero() {
    const hero = $(".hero");
    if (!hero) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Nav reveal (guard — injected by main.js)
    const nav = $(".nav");
    const brand = $(".brand");
    const navLinks = $$(".nav__links a");
    if (nav) tl.from(nav, { y: -30, opacity: 0, duration: 0.8 }, 0.1);
    if (brand) tl.from(brand, { x: -20, opacity: 0, duration: 0.6 }, 0.2);
    if (navLinks.length) tl.from(navLinks, { y: -15, opacity: 0, duration: 0.5, stagger: 0.06 }, 0.3);

    // Hero content stagger
    const animEls = $$("[data-anim]", hero);
    if (animEls.length) {
      animEls.forEach(el => { el.style.opacity = "1"; el.style.willChange = "transform"; });
      tl.from(animEls, {
        y: 40, opacity: 0, duration: 0.9,
        stagger: 0.12, ease: "power3.out",
        onComplete: () => animEls.forEach(el => { el.style.willChange = ""; })
      }, 0.4);
    }

    // Scroll indicator
    const scroll = $(".hero__scroll");
    if (scroll) tl.from(scroll, { opacity: 0, y: 15, duration: 0.6 }, 1.2);

    // Parallax on hero background
    const bg = $(".hero__bg");
    if (bg) {
      gsap.to(bg, {
        yPercent: 25, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true }
      });
    }
  }

  /* ============================================================
     3) PRODUCT CARD 3D TILT + HOVER
     ============================================================ */
  function initCardTilt() {
    const cards = $$(".pcard, .anlass-card, .occ-tile, .catcard");
    cards.forEach(card => {
      card.style.transformStyle = "preserve-3d";
      card.style.willChange = "transform";

      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 8,
          rotateX: -y * 6,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateY: 0, rotateX: 0, scale: 1,
          duration: 0.6, ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }

  /* ============================================================
     4) MAGNETIC BUTTONS
     ============================================================ */
  function initMagneticButtons() {
    const btns = $$(".btn--primary, .btn--gold");
    btns.forEach(btn => {
      const strength = 0.3;
      btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        gsap.to(btn, {
          x: dx, y: dy,
          duration: 0.35, ease: "power2.out",
          overwrite: "auto"
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0, y: 0,
          duration: 0.5, ease: "elastic.out(1, 0.4)",
          overwrite: "auto"
        });
      });
    });
  }

  /* ============================================================
     5) REVIEW TICKER (infinite horizontal scroll)
     ============================================================ */
  function initReviewTicker(opts) {
    const pauseOnHover = !opts || opts.pauseOnHover !== false;
    const speed = (opts && opts.speed) || 40;
    const reviews = $(".reviews");
    if (!reviews) return;

    const items = $$(".review", reviews);
    if (items.length < 2) return;

    // Clone items for seamless loop (marked so cleanup can remove them)
    items.forEach(item => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.dataset.tickerClone = "1";
      reviews.appendChild(clone);
    });

    const totalWidth = items.reduce((w, el) => w + el.offsetWidth + 24, 0);

    gsap.to(reviews, {
      x: -totalWidth,
      duration: totalWidth / speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    // Pause on hover (desktop pointers only)
    if (pauseOnHover) {
      reviews.addEventListener("mouseenter", () => gsap.globalTimeline.timeScale(0.2));
      reviews.addEventListener("mouseleave", () => gsap.globalTimeline.timeScale(1));
    }
  }

  /* Remove ticker clones (gsap.context reverts tweens/inline styles but
     not DOM nodes we appended) — called on breakpoint change + pagehide. */
  function killTickerClones() {
    $$('.reviews [data-ticker-clone="1"]').forEach(n => n.remove());
    gsap.set(".reviews", { clearProps: "transform" });
  }

  /* ---- Mobile-lite variants (simpler = steadier 60fps on phones) ---- */
  function initHeroLite() {
    const hero = $(".hero");
    if (!hero) return;
    const animEls = $$("[data-anim]", hero);
    if (!animEls.length) return;
    animEls.forEach(el => { el.style.opacity = "1"; el.style.willChange = "transform"; });
    gsap.from(animEls, {
      y: 24, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
      onComplete: () => animEls.forEach(el => { el.style.willChange = ""; })
    });
    // NO nav-link stagger, NO hero-bg parallax scrub on mobile
  }

  /* ============================================================
     7) OCCASION COLOR MORPHING (Anlass-Seite + Box Builder)
     ============================================================ */
  function initOccasionMorph() {
    const OCCASION_COLORS = {
      hochzeit:  { accent: "#C9A24B", bg: "#FFF8F0", ink: "#4A1530" },
      babyparty: { accent: "#E891B6", bg: "#FFF0F5", ink: "#4A1530" },
      geburtstag:{ accent: "#EF7DA0", bg: "#FFF5F8", ink: "#4A1530" },
      firma:     { accent: "#2C5F6E", bg: "#F0F5F5", ink: "#1A3A45" },
      self:      { accent: "#D81277", bg: "#FFF5F8", ink: "#4A1530" }
    };

    document.addEventListener("click", e => {
      const card = e.target.closest("[data-anlass]") || e.target.closest("[data-occ]");
      if (!card) return;
      const key = card.dataset.anlass || card.dataset.occ;
      const colors = OCCASION_COLORS[key];
      if (!colors) return;

      const root = document.documentElement;
      gsap.to(root, {
        "--exp-accent": colors.accent,
        "--exp-surface": colors.bg,
        duration: 0.8, ease: "power2.inOut"
      });
    });
  }

  /* ============================================================
     9) PAGE-HEAD ENTRANCE (non-hero pages)
     ============================================================ */
  function initPageHead() {
    const ph = $(".pagehead");
    if (!ph) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(ph, { opacity: 0, duration: 0.4 }, 0);
    const children = $$(".eyebrow, .h2, .lead", ph);
    tl.from(children, { y: 30, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.15);
  }

  /* ============================================================
     INIT — gsap.matchMedia() so each breakpoint scopes & cleans
     up its own context. Crossing 768px reverts the old branch and
     builds the other; pagehide tears everything down before the
     next page loads (this is a multi-page static site).
     ============================================================ */
  let mm = null;
  function init() {
  mm = gsap.matchMedia();

  // 1) Desktop / large: full motion suite
  mm.add("(min-width: 768px)", () => {
    const ctx = gsap.context(() => {
      initHero();
      initPageHead();
      initReviewTicker({ pauseOnHover: true });
      initOccasionMorph();
    });
    ScrollTrigger.refresh();
    return () => { ctx.revert(); killTickerClones(); gsap.globalTimeline.timeScale(1); };
  });

  // 2) Pointer-only flourishes (fine pointer + hover) — tilt + magnetic
  mm.add("(min-width: 768px) and (hover: hover) and (pointer: fine)", () => {
    const ctx = gsap.context(() => {
      initCardTilt();
      initMagneticButtons();
    });
    return () => ctx.revert();
  });

  // 3) Phones ≤767px: simplified, transform-only, no scrub / tilt / magnetic
  mm.add("(max-width: 767px)", () => {
    const ctx = gsap.context(() => {
      initHeroLite();
      initPageHead();
      initReviewTicker({ pauseOnHover: false, speed: 32 });
      initOccasionMorph();
      // NO initSectionTransitions (scrub), NO tilt, NO magnetic buttons
    });
    ScrollTrigger.refresh();
    return () => { ctx.revert(); killTickerClones(); gsap.globalTimeline.timeScale(1); };
  });

    // Refresh once images/fonts settle so trigger positions are correct
    ScrollTrigger.refresh();
  }

  // Boot after load — chrome is injected by main.js on DOMContentLoaded,
  // so we wait until layout has settled (matches original timing).
  function boot() { setTimeout(init, 60); }
  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);

  /* ============================================================
     NAVIGATION TEARDOWN — self-cleaning before leaving the page.
     mm.revert() runs every branch's cleanup (ctx.revert + clone
     removal); ScrollTrigger.killAll() drops any stragglers.
     ============================================================ */
  window.addEventListener("pagehide", () => {
    if (mm) mm.revert();
    if (window.ScrollTrigger) ScrollTrigger.killAll();
    if (typeof gsap !== "undefined") gsap.globalTimeline.timeScale(1);
  }, { once: true });
})();
