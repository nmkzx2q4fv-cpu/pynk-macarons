/* ============================================================
   Pynk Atelier — Occasion routing + physics box builder
   ------------------------------------------------------------
   Architektur: strikt getrennt in
     DATA   → MACARONS[], OCCASIONS{}   (frei erweiterbar)
     LOGIC  → State + Rendering + Physik
     UI     → atelier.html / atelier.css
   Nutzt globale Helfer aus app.js: addToCart, toast, EUR,
   reduceMotion, openDrawer
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     1) DATA — MACARON-SORTEN  (nur freigestellte .png!)
        Neue Sorte = transparentes PNG in /img + ein Objekt hier.
     ============================================================ */
  const MACARONS = [
    { id: "erdbeere",  name: "Erdbeere-Rose",      flavour: "erdbeere",  color: "#EF7DA0", price: 2.90, img: "img/macaron-pink.png",   sensory: "zartschmelzend, blütenzart", occasions: ["hochzeit", "babyparty", "geschenk", "self"] },
    { id: "vanille",   name: "Vanille-Mascarpone", flavour: "vanille",   color: "#EBD9B4", price: 2.90, img: "img/mac-cream.png",      sensory: "cremig, samtig",             occasions: ["hochzeit", "firma", "babyparty", "self"] },
    { id: "limette",   name: "Limette-Minze",      flavour: "limette",   color: "#7FD08C", price: 2.90, img: "img/mac-limette.png",    sensory: "frisch, spritzig",           occasions: ["self", "firma", "geschenk"] },
    { id: "schoko",    name: "Dunkle Schokolade",  flavour: "schokolade",color: "#9A6B4F", price: 2.90, img: "img/mac-schokolade.png", sensory: "intensiv, seidig",           occasions: ["firma", "self", "geschenk"] },
    { id: "kokos",     name: "Kokos-Traum",        flavour: "kokos",     color: "#A9E0D2", price: 2.90, img: "img/mac-kokos.png",      sensory: "exotisch, sahnig",           occasions: ["babyparty", "hochzeit", "self"] },
    { id: "wildberry", name: "Wild Berry",         flavour: "wildberry", color: "#C86FA8", price: 2.90, img: "img/mac-wildberry.png",  sensory: "fruchtig, lebhaft",          occasions: ["geschenk", "babyparty", "self"] },
    { id: "cookies",   name: "Cookies & Cream",    flavour: "cookies",   color: "#9C9690", price: 2.90, img: "img/mac-cookies.png",    sensory: "knusprig, verspielt",        occasions: ["self", "firma", "geschenk"] },
    { id: "baer",      name: "Pistazien-Bärchen",  flavour: "pistazie",  color: "#A9C77A", price: 3.90, img: "img/bear-green.png",     sensory: "nussig, zum Knuddeln",       occasions: ["babyparty", "geschenk", "self"] }
  ];

  /* ============================================================
     2) DATA — ANLÄSSE (Theming + Copy + Priorisierung)
     ============================================================ */
  const OCCASIONS = {
    hochzeit:  { label: "Hochzeit",              cardSub: "Elegant in Weiß, Gold & Rosé", img: "img/hero-tower.jpg",   eyebrow: "Hochzeit",       title: "Ein Meisterwerk für euren großen Tag", lead: "Edle Töne, handbepinselte Schalen – abgestimmt auf Weiß, Gold und zartes Rosé.",         counterNoun: "Hochzeits-Macarons", magic: "Magic Fill für die Hochzeit",  priority: ["erdbeere", "vanille", "kokos"] },
    babyparty: { label: "Babyparty & Reveal",    cardSub: "Zartes Pastell & süße Bärchen", img: "img/bear-hero.jpg",    eyebrow: "Babyparty",      title: "Süße Überraschung in Pastell",         lead: "Zarte Pastelltöne und kuschelige Bärchen – perfekt zum Verraten oder Feiern.",            counterNoun: "Babyparty-Macarons", magic: "Magic Fill für die Babyparty", priority: ["baer", "kokos", "erdbeere", "vanille"] },
    firma:     { label: "Firmen-Events",         cardSub: "Logo-Druck & Corporate",        img: "img/b2b-meta.jpg",     eyebrow: "Firmen-Events",  title: "Markenmomente zum Vernaschen",         lead: "Edle, gedeckte Sorten – auf Wunsch mit eurem Logo essbar veredelt.",                       counterNoun: "Firmen-Macarons",    magic: "Magic Fill fürs Büro",         priority: ["vanille", "schoko", "cookies", "limette"] },
    geschenk:  { label: "Geschenk & Geburtstag", cardSub: "Bunte Freude zum Schenken",     img: "img/gift-luxe.jpg",    eyebrow: "Geschenk",       title: "Ein Geschenk, das zergeht",            lead: "Bunt, fröhlich, unvergesslich – die schönste Art, Danke oder Happy Birthday zu sagen.",   counterNoun: "Geschenk-Macarons",  magic: "Magic Fill als Geschenk",      priority: ["wildberry", "erdbeere", "schoko", "baer"] },
    self:      { label: "Just for me",           cardSub: "Ein Moment nur für dich",       img: "img/dessert-berry.jpg",eyebrow: "Just for me",    title: "Gönn dir ein kleines Meisterwerk",     lead: "Kein Anlass nötig. Such dir aus, was zartschmelzend deinen Tag rettet.",                   counterNoun: "Lieblings-Macarons", magic: "Überrasch mich",               priority: ["cookies", "schoko", "wildberry"] }
  };
  const BOX_PRICE = { 6: 18, 12: 34 };

  /* ============================================================
     3) STATE
     ============================================================ */
  const RM = (typeof reduceMotion !== "undefined") ? reduceMotion : matchMedia("(prefers-reduced-motion: reduce)").matches;
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  const byId = id => MACARONS.find(m => m.id === id);
  const shuffle = a => { const x = a.slice(); for (let i = x.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0;[x[i], x[j]] = [x[j], x[i]]; } return x; };

  const state = { occasion: "self", size: 6, slots: new Array(6).fill(null) };

  /* ============================================================
     4) OCCASION OVERLAY + THEMING
     ============================================================ */
  function buildOccasionCards() {
    const grid = qs("#occGrid");
    if (!grid) return;
    grid.innerHTML = Object.entries(OCCASIONS).map(([id, o], i) => `
      <button class="occ-card" data-occ="${id}" type="button" style="animation-delay:${0.15 + i * 0.08}s" aria-label="${o.label}">
        <img src="${o.img}" alt="" loading="lazy">
        <span class="occ-card__body"><h3>${o.label}</h3><span>${o.cardSub}</span></span>
      </button>`).join("");
  }

  function applyOccasion(id) {
    const o = OCCASIONS[id] || OCCASIONS.self;
    state.occasion = id;
    const root = qs("#atelier");
    root.dataset.occasion = id;
    qs("#atEyebrow").textContent = o.eyebrow;
    qs("#atTitle").innerHTML = o.title;
    qs("#atLead").textContent = o.lead;
    qs("#magicLabel").textContent = o.magic;
    renderGrid();
    updateCounter();
  }

  function openExperience(id) {
    applyOccasion(id);
    const main = qs("#atelier");
    main.hidden = false;
    const overlay = qs("#occOverlay");
    overlay.classList.add("is-closing");
    setTimeout(() => { overlay.style.display = "none"; }, RM ? 0 : 460);
  }

  function reopenOverlay() {
    const overlay = qs("#occOverlay");
    overlay.style.display = "";
    overlay.classList.remove("is-closing");
  }

  /* ============================================================
     5) MACARON GRID (occasion-priorisiert)
     ============================================================ */
  function sortedForOccasion() {
    const o = OCCASIONS[state.occasion];
    const prio = o.priority || [];
    return MACARONS.slice().sort((a, b) => {
      const am = a.occasions.includes(state.occasion), bm = b.occasions.includes(state.occasion);
      if (am !== bm) return am ? -1 : 1;             // matching first
      const ap = prio.indexOf(a.id), bp = prio.indexOf(b.id);
      return (ap === -1 ? 99 : ap) - (bp === -1 ? 99 : bp); // then by priority list
    });
  }

  function renderGrid() {
    const grid = qs("#macGrid");
    if (!grid) return;
    const o = OCCASIONS[state.occasion];
    grid.innerHTML = sortedForOccasion().map(m => {
      const match = m.occasions.includes(state.occasion) && state.occasion !== "self";
      return `
      <button class="macaron-item${match ? " is-match" : ""}" data-id="${m.id}" type="button" aria-label="${m.name} zur Box hinzufügen">
        <span class="macaron-item__match">Passt zu ${o.eyebrow}</span>
        <img class="macaron-item__img" src="${m.img}" alt="${m.name}" loading="lazy">
        <span class="macaron-item__name">${m.name}</span>
        <span class="macaron-item__sensory">${m.sensory}</span>
        <span class="macaron-item__plus" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>
      </button>`;
    }).join("");
  }

  /* ============================================================
     6) BOX — slots, physics toss, counter, reward
     ============================================================ */
  function renderSlots() {
    const wrap = qs("#pboxSlots");
    if (!wrap) return;
    wrap.style.gridTemplateColumns = `repeat(${state.size === 6 ? 3 : 4}, 1fr)`;
    wrap.innerHTML = "";
    for (let i = 0; i < state.size; i++) {
      const slot = document.createElement("div");
      slot.className = "pslot"; slot.dataset.idx = i;
      const m = state.slots[i] && byId(state.slots[i]);
      if (m) slot.innerHTML = `<img class="pslot__mac" src="${m.img}" alt="${m.name}" title="${m.name} – entfernen">`;
      wrap.appendChild(slot);
    }
  }

  function nextFree() { return state.slots.indexOf(null); }

  // Render a placed macaron PNG into a slot (idempotent click-to-remove bind)
  function renderSlotImg(slot, macId, pop) {
    const m = byId(macId);
    slot.innerHTML = `<img class="pslot__mac${pop ? " placed" : ""}" src="${m.img}" alt="${m.name}" title="${m.name} – entfernen">`;
    const img = slot.querySelector(".pslot__mac");
    img._wired = true;
    img.addEventListener("click", () => removeFromBox(+slot.dataset.idx));
  }

  // Visual-only WAA parabola flight of a real PNG; calls onLand() on arrival.
  // Placement does NOT depend on this (see placeInSlot) — flight is pure flourish.
  function flightTo(srcRect, slot, macId, onLand) {
    const m = byId(macId);
    const t = slot.getBoundingClientRect();
    const size = t.width * 0.92;
    const sx = srcRect.left + srcRect.width / 2 - size / 2;
    const sy = srcRect.top + srcRect.height / 2 - size / 2;
    const ex = t.left + t.width / 2 - size / 2;
    const ey = t.top + t.height / 2 - size / 2;
    const apexX = (sx + ex) / 2;
    const apexY = Math.min(sy, ey) - Math.max(90, Math.abs(ey - sy) * 0.45);
    const ratio = srcRect.width / size;
    const rot = (Math.random() * 50 - 25).toFixed(1);

    const clone = document.createElement("img");
    clone.className = "flight"; clone.src = m.img; clone.alt = "";
    clone.style.width = size + "px"; clone.style.left = "0"; clone.style.top = "0";
    qs("#flightLayer").appendChild(clone);

    let settled = false;
    const finish = () => { if (settled) return; settled = true; clone.remove(); if (onLand) onLand(); };
    clone.animate([
      { transform: `translate(${sx}px,${sy}px) scale(${ratio}) rotate(0deg)`, offset: 0, easing: "cubic-bezier(.25,.7,.4,1)" },     // launch → apex (decelerate)
      { transform: `translate(${apexX}px,${apexY}px) scale(1) rotate(${rot / 2}deg)`, offset: .45, easing: "cubic-bezier(.5,0,.85,.45)" }, // apex → slot (gravity accel)
      { transform: `translate(${ex}px,${ey}px) scale(1.06) rotate(${rot}deg)`, offset: .85, easing: "ease-out" },                    // impact
      { transform: `translate(${ex}px,${ey}px) scale(.95) rotate(${rot}deg)`, offset: .93 },                                          // squash
      { transform: `translate(${ex}px,${ey}px) scale(1) rotate(${rot}deg)`, offset: 1 }
    ], { duration: 720, fill: "both" }).onfinish = finish;
    setTimeout(finish, 800);   // fallback: hidden/throttled tabs freeze WAA + onfinish
  }

  // Render the macaron into its (already reserved) slot instantly, then fly a
  // decorative clone on top. Placement NEVER waits on a timer/animation.
  function placeInSlot(slotIdx, macId, srcRect) {
    const slot = qs(`.pslot[data-idx="${slotIdx}"]`);
    if (!slot) return;
    renderSlotImg(slot, macId, true);                                       // instant, bulletproof
    if (!RM && srcRect && !document.hidden) flightTo(srcRect, slot, macId); // pure flourish
  }

  function addToBox(macId, sourceEl) {
    const idx = nextFree();
    if (idx === -1) { if (typeof toast === "function") toast(`Deine ${state.size}er-Box ist voll`); return false; }
    state.slots[idx] = macId;                 // reserve synchronously → counter/reward correct now
    placeInSlot(idx, macId, sourceEl ? sourceEl.getBoundingClientRect() : null);
    afterChange();
    return true;
  }

  function removeFromBox(idx) {
    const slot = qs(`.pslot[data-idx="${idx}"]`);
    const macId = state.slots[idx];
    if (macId == null) return;
    const img = slot && slot.querySelector(".pslot__mac");
    state.slots[idx] = null;
    // decorative drop-out (visible only); state/DOM clear is synchronous + bulletproof
    if (!RM && img && !document.hidden) {
      const r = img.getBoundingClientRect();
      const c = document.createElement("img");
      c.className = "flight"; c.src = byId(macId).img; c.alt = "";
      c.style.width = r.width + "px"; c.style.left = "0"; c.style.top = "0";
      qs("#flightLayer").appendChild(c);
      let s = false; const fin = () => { if (s) return; s = true; c.remove(); };
      c.animate([
        { transform: `translate(${r.left}px,${r.top}px) rotate(0)`, opacity: 1 },
        { transform: `translate(${r.left}px,${r.top + 140}px) rotate(22deg)`, opacity: 0 }
      ], { duration: 340, easing: "cubic-bezier(.5,0,.9,.5)", fill: "both" }).onfinish = fin;
      setTimeout(fin, 420);
    }
    if (slot) slot.innerHTML = "";
    afterChange();
  }

  function magicFill() {
    // pool: occasion-matching sorts (fallback: all)
    let pool = MACARONS.filter(m => m.occasions.includes(state.occasion)).map(m => m.id);
    if (!pool.length) pool = MACARONS.map(m => m.id);
    const ordered = shuffle(pool);
    const empties = state.slots.map((v, i) => v === null ? i : -1).filter(i => i !== -1);
    const boxRect = qs("#pbox").getBoundingClientRect();
    empties.forEach((slotIdx, k) => {
      const macId = ordered[k % ordered.length];
      state.slots[slotIdx] = macId;            // reserve + render instantly (robust even if timers frozen)
      const slot = qs(`.pslot[data-idx="${slotIdx}"]`);
      if (slot) renderSlotImg(slot, macId, true);
      if (!RM && !document.hidden) {
        setTimeout(() => {
          // decorative "rain": random x across the box, from above the viewport
          const rainRect = { left: boxRect.left + Math.random() * boxRect.width - 30, top: -130, width: 64, height: 64 };
          flightTo(rainRect, slot, macId);
        }, k * 130);
      }
    });
    afterChange();
  }

  function clearBox() {
    // synchronous clear (each removeFromBox clears state+DOM instantly, fall-out is decorative)
    state.slots.map((v, i) => v !== null ? i : -1).filter(i => i !== -1).forEach(idx => removeFromBox(idx));
  }

  /* counter + reward */
  function updateCounter() {
    const o = OCCASIONS[state.occasion];
    const filled = state.slots.filter(Boolean).length;
    const free = state.size - filled;
    const el = qs("#boxCounter");
    if (el) el.innerHTML = free > 0
      ? `Noch <strong>${free}</strong> ${free === 1 ? "Platz" : "Plätze"} frei für deine ${o.counterNoun}`
      : `Deine ${o.counterNoun}-Box ist komplett ✨`;
  }

  function afterChange() {
    renderSlotsLight();    // keep DOM in sync without rebuilding filled slots mid-animation
    updateCounter();
    const filled = state.slots.filter(Boolean).length;
    const full = filled === state.size;
    const pbox = qs("#pbox");
    const checkout = qs("#boxCheckout");
    pbox.classList.toggle("is-full", full);
    if (checkout) {
      checkout.disabled = filled === 0;
      checkout.classList.toggle("ready", full);
      checkout.textContent = filled === 0 ? "Box füllen, um fortzufahren"
        : full ? `Zur Kasse · ${EUR(BOX_PRICE[state.size])}`
        : `Weiter mit ${filled} Macaron${filled === 1 ? "" : "s"}`;
    }
    if (full && !RM) {
      pbox.classList.add("is-closing");           // reward: box seals…
      setTimeout(() => pbox.classList.remove("is-closing"), 900); // …then reopens for edits
    }
  }

  // (re)bind click-to-remove on placed macarons (idempotent)
  function renderSlotsLight() {
    qsa("#pboxSlots .pslot").forEach(slot => {
      const idx = +slot.dataset.idx;
      const img = slot.querySelector(".pslot__mac");
      if (img && !img._wired) {
        img._wired = true;
        img.addEventListener("click", () => removeFromBox(idx));
      }
    });
  }

  function setSize(n) {
    state.size = n;
    const old = state.slots;
    state.slots = new Array(n).fill(null);
    for (let i = 0; i < Math.min(n, old.length); i++) state.slots[i] = old[i];
    renderSlots(); renderSlotsLight(); afterChange();
  }

  /* checkout */
  function checkout() {
    const filled = state.slots.filter(Boolean);
    if (!filled.length) return;
    const o = OCCASIONS[state.occasion];
    const counts = {};
    filled.forEach(id => { const n = byId(id).name; counts[n] = (counts[n] || 0) + 1; });
    const meta = `${o.label} · ` + Object.entries(counts).map(([n, c]) => `${c}× ${n}`).join(", ");
    if (typeof addToCart === "function") {
      addToCart({ key: "atelier-" + Date.now(), name: `${state.size}er Box · ${o.label}`, meta, price: BOX_PRICE[state.size], thumb: `<img src="img/macaron-pink.png" alt="">` });
      if (typeof toast === "function") toast("Box in den Warenkorb gelegt");
      if (typeof window.openDrawer === "function") window.openDrawer();
    }
  }

  /* ============================================================
     7) WIRING
     ============================================================ */
  function wire() {
    buildOccasionCards();

    // occasion choose (overlay cards + skip)
    document.addEventListener("click", e => {
      const occ = e.target.closest("[data-occ]");
      if (occ && qs("#occOverlay").contains(occ)) openExperience(occ.dataset.occ);
    });
    qs("#occChange").addEventListener("click", reopenOverlay);

    // grid → add to box
    qs("#macGrid").addEventListener("click", e => {
      const item = e.target.closest(".macaron-item");
      if (!item) return;
      addToBox(item.dataset.id, item.querySelector(".macaron-item__img"));
    });

    // size toggle
    qsa(".box-size button").forEach(b => b.addEventListener("click", () => {
      qsa(".box-size button").forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-checked", "false"); });
      b.classList.add("is-active"); b.setAttribute("aria-checked", "true");
      setSize(+b.dataset.size);
    }));

    qs("#magicFill").addEventListener("click", magicFill);
    qs("#boxClear").addEventListener("click", clearBox);
    qs("#boxCheckout").addEventListener("click", checkout);

    // initial render
    renderSlots();
    applyOccasion(state.occasion);

    // deep-link: atelier.html?occ=hochzeit → direkt in den Anlass starten (Overlay überspringen)
    const occParam = new URLSearchParams(location.search).get("occ");
    if (occParam && OCCASIONS[occParam]) openExperience(occParam);

    // optional smooth scroll
    if (!RM && window.Lenis) {
      const lenis = new window.Lenis({ lerp: .1 });
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();
})();
