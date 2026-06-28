/* ============================================================
   Pynk Macarons — interactive.js  (Startseite only)
   Reuses globals from app.js: PRODUCTS, FC, FLAVOURS,
   macaronHTML, addToCart, flyToCart, toast, EUR, reduceMotion
   ============================================================ */
(function () {
  "use strict";

  const RM = (typeof reduceMotion !== "undefined") ? reduceMotion
    : matchMedia("(prefers-reduced-motion: reduce)").matches;
  const qs  = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  const shuffle = a => { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [x[i], x[j]] = [x[j], x[i]]; } return x; };

  /* ----------------------------------------------------------
     1) DYNAMIC "Beliebt diese Woche" — 4 random per load
     ---------------------------------------------------------- */
  const FEATURED_POOL = (typeof PRODUCTS !== "undefined")
    ? PRODUCTS.filter(p => p.cat === "box" && !p.custom && !p.noShop)
    : [];

  function featuredCard(p) {
    const isBear = p.cat === "baer";
    return `
      <article class="pcard featured-swap" data-id="${p.id}">
        <div class="pcard__media">
          ${isBear ? `<span class="pcard__tag">Bärchen</span>` : ``}
          <img src="${p.img}" width="384" height="384" loading="lazy" alt="${p.name} Macaron von Pynk">
        </div>
        <div class="pcard__body">
          <h3 class="pcard__name"><span class="pcard__dot" style="background:${FC[p.flavour]}"></span>${p.name}</h3>
          <p class="pcard__desc">${p.desc}</p>
          <div class="pcard__foot">
            <span class="pcard__price">${EUR(p.price)}${p.box ? ` <small>/ ${p.box}er-Box</small>` : ""}</span>
            <button class="pcard__add" data-add="${p.id}" aria-label="${p.name} in den Warenkorb">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      </article>`;
  }

  function renderFeatured() {
    const grid = qs("#featuredGrid");
    if (!grid || !FEATURED_POOL.length) return;
    const pick = shuffle(FEATURED_POOL).slice(0, 4);
    grid.innerHTML = pick.map(featuredCard).join("");
  }

  function wireFeatured() {
    const grid = qs("#featuredGrid");
    if (!grid) return;
    renderFeatured();
    grid.addEventListener("click", e => {
      const btn = e.target.closest("[data-add]");
      if (!btn) return;
      const p = PRODUCTS.find(x => x.id === btn.dataset.add);
      if (!p) return;
      if (typeof flyToCart === "function") flyToCart(btn.closest(".pcard").querySelector(".pcard__media"));
      addToCart({
        key: "p-" + p.id, name: p.name,
        meta: p.box ? p.box + "er-Box" : "Macaron",
        price: p.price, thumb: `<img src="${p.img}" alt="">`
      });
      if (typeof toast === "function") toast(`${p.name} hinzugefügt`);
    });
    const rr = qs("#featuredReroll");
    if (rr) rr.addEventListener("click", renderFeatured);
  }

  /* ----------------------------------------------------------
     2) GRAVITY BOX BUILDER (gamification)
     ---------------------------------------------------------- */
  const BOX_CAP = 6, BOX_PRICE = 18;
  const GFLAVS = ["erdbeere", "himbeere", "pistazie", "matcha", "limette", "zitrone", "mango", "vanille", "lavendel", "kokos", "schokolade", "karamell"];

  function macIllu(flav) {
    return (typeof macaronHTML === "function")
      ? macaronHTML(FC[flav])
      : `<span class="macaron" style="--mc:${FC[flav]}"><span class="macaron__shell macaron__shell--top"></span><span class="macaron__filling"></span><span class="macaron__shell macaron__shell--bot"></span></span>`;
  }

  function initGravity() {
    const cellsWrap = qs("#gravCells");
    const palette = qs("#gravPalette");
    if (!cellsWrap || !palette) return;

    // build cells + palette
    cellsWrap.innerHTML = Array.from({ length: BOX_CAP }, () => `<div class="gcell"></div>`).join("");
    const cells = qsa(".gcell", cellsWrap);
    palette.innerHTML = GFLAVS.map(f =>
      `<button class="gchip" data-flav="${f}" type="button"><span class="gchip__m">${macIllu(f)}</span>${FLAVOURS[f]}</button>`
    ).join("");

    const countEl = qs("#gravCount");
    const addBtn = qs("#gravAdd");
    const filled = () => cells.filter(c => c.firstChild);
    const update = () => {
      const n = filled().length;
      if (countEl) countEl.textContent = n;
      if (addBtn) addBtn.disabled = n === 0;
    };

    function dropInto(cell, flav) {
      cell.dataset.flav = flav;
      const mac = document.createElement("div");
      mac.className = "grav-mac";
      mac.title = FLAVOURS[flav] + " – zum Entfernen tippen";
      mac.innerHTML = macIllu(flav);
      cell.appendChild(mac);
      update();
      if (!RM) {
        const rot = (Math.random() * 44 - 22).toFixed(1);
        const drift = (Math.random() * 16 - 8).toFixed(1);
        mac.animate([
          { transform: `translate(${drift}px,-190px) rotate(${rot}deg) scale(.7)`, opacity: 0, offset: 0, easing: "cubic-bezier(.45,0,.85,.4)" },
          { transform: "translate(0,0) rotate(0) scale(1)", opacity: 1, offset: .60, easing: "cubic-bezier(.2,.7,.3,1)" },
          { transform: "translate(0,-15px) scale(1.05,.95)", offset: .74, easing: "ease-out" },
          { transform: "translate(0,0) scale(.97,1.03)", offset: .86, easing: "ease-in" },
          { transform: "translate(0,-5px) scale(1)", offset: .94 },
          { transform: "translate(0,0) scale(1)", offset: 1 }
        ], { duration: 720, fill: "both" });
      }
      // tap to remove
      mac.addEventListener("click", () => removeFrom(cell));
    }

    function removeFrom(cell) {
      const mac = cell.firstChild;
      if (!mac) return;
      delete cell.dataset.flav;
      const done = () => { mac.remove(); update(); };
      if (RM) return done();
      mac.animate([
        { transform: "translateY(0) rotate(0)", opacity: 1 },
        { transform: "translateY(130px) rotate(22deg)", opacity: 0 }
      ], { duration: 340, easing: "cubic-bezier(.5,0,.9,.5)", fill: "forwards" }).onfinish = done;
    }

    function addOne(flav) {
      const cell = cells.find(c => !c.firstChild);
      if (!cell) { if (typeof toast === "function") toast("Die Box ist voll (6)"); return false; }
      dropInto(cell, flav);
      return true;
    }

    function emptyBox(animate, done) {
      const f = filled();
      if (!f.length) { if (done) done(); return; }
      let pending = f.length;
      f.forEach((cell, i) => {
        const mac = cell.firstChild;
        delete cell.dataset.flav;
        const fin = () => { mac.remove(); if (--pending === 0) { update(); if (done) done(); } };
        if (RM || !animate) return fin();
        mac.animate([
          { transform: "translateY(0) rotate(0)", opacity: 1 },
          { transform: "translateY(150px) rotate(18deg)", opacity: 0 }
        ], { duration: 360, delay: i * 55, easing: "cubic-bezier(.5,0,.9,.5)", fill: "forwards" }).onfinish = fin;
      });
    }

    function rain() {
      const flavs = shuffle(GFLAVS).slice(0, BOX_CAP);
      flavs.forEach((f, i) => setTimeout(() => addOne(f), RM ? 0 : i * 120));
    }

    // events
    palette.addEventListener("click", e => {
      const chip = e.target.closest("[data-flav]");
      if (chip) addOne(chip.dataset.flav);
    });
    qs("#gravSurprise").addEventListener("click", () => emptyBox(false, rain));
    qs("#gravReroll").addEventListener("click", () => emptyBox(true, () => setTimeout(rain, RM ? 0 : 180)));
    addBtn.addEventListener("click", () => {
      const chosen = filled().map(c => c.dataset.flav);
      if (!chosen.length) return;
      const counts = {};
      chosen.forEach(f => counts[f] = (counts[f] || 0) + 1);
      const meta = Object.entries(counts).map(([k, n]) => `${n}× ${FLAVOURS[k]}`).join(", ");
      if (typeof flyToCart === "function") flyToCart(qs("#gravBox"));
      addToCart({ key: "probierbox-" + Date.now(), name: "Probier-Box (6er)", meta, price: BOX_PRICE, thumb: macIllu("erdbeere") });
      if (typeof toast === "function") toast("Probier-Box hinzugefügt");
      emptyBox(true);
    });

    update();
  }

  /* ----------------------------------------------------------
     3) TRUST-BAR count-up
     ---------------------------------------------------------- */
  function initCounters() {
    const els = qsa("[data-count]");
    if (!els.length) return;
    if (RM) return; // keep static formatted values
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const dur = 1100; const t0 = performance.now();
        const fmt = v => v.toLocaleString("de-DE", { minimumFractionDigits: dec, maximumFractionDigits: dec });
        function step(t) {
          const k = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = fmt(target * eased) + suffix;
          if (k < 1) requestAnimationFrame(step);
          else el.textContent = fmt(target) + suffix;
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: .6 });
    els.forEach(el => io.observe(el));
  }

  /* ----------------------------------------------------------
     4) SMOOTH SCROLL (Lenis) + PARALLAX (GSAP or vanilla)
     ---------------------------------------------------------- */
  function initMotion() {
    if (RM) return;
    let lenis = null;
    if (window.Lenis) {
      lenis = new window.Lenis({ lerp: .09, wheelMultiplier: 1, smoothWheel: true });
      window.__lenis = lenis;
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      document.documentElement.classList.add("lenis-on");
      // smooth in-page anchor links
      qsa('a[href^="#"]').forEach(a => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        a.addEventListener("click", e => {
          const t = document.querySelector(id);
          if (!t) return;
          e.preventDefault();
          lenis.scrollTo(t, { offset: -80 });
        });
      });
    }
    const pEls = qsa("[data-parallax]");
    if (window.gsap && window.ScrollTrigger) {
      const gsap = window.gsap;
      gsap.registerPlugin(window.ScrollTrigger);
      if (lenis) lenis.on("scroll", window.ScrollTrigger.update);
      pEls.forEach(el => {
        const amt = parseFloat(el.getAttribute("data-parallax")) || .25;
        gsap.to(el, {
          yPercent: amt * 100, ease: "none",
          scrollTrigger: { trigger: el.closest("section") || el, start: "top top", end: "bottom top", scrub: true }
        });
      });
    } else if (pEls.length) {
      // vanilla fallback
      const onScroll = () => {
        const y = window.scrollY;
        pEls.forEach(el => {
          const amt = parseFloat(el.getAttribute("data-parallax")) || .25;
          el.style.transform = `translate3d(0,${(y * amt).toFixed(1)}px,0)`;
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ---- init (runs after app.js injected chrome at DOMContentLoaded) ---- */
  function init() {
    wireFeatured();
    initGravity();
    initCounters();
    initMotion();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
