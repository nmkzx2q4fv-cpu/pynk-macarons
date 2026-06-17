/* ============================================================
   Macaron Pynk — app logic
   ============================================================ */

/* ---- CONFIG: replace with the real shop details ---- */
const CONFIG = {
  whatsapp: "49451000000",          // WhatsApp number, digits only, incl. country code
  email:    "hallo@macaron-pynk.de" // order inbox
};

const EUR = n => n.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Product & flavour data ---- */
const FLAVOURS = {
  erdbeere:    { name: "Erdbeere",    color: "var(--f-strawberry)" },
  himbeere:    { name: "Himbeere",    color: "var(--f-raspberry)" },
  pistazie:    { name: "Pistazie",    color: "var(--f-pistachio)" },
  minze:       { name: "Minze",       color: "var(--f-mint)" },
  heidelbeere: { name: "Heidelbeere", color: "var(--f-blueberry)" },
  vanille:     { name: "Vanille",     color: "var(--f-vanilla)" },
  zitrone:     { name: "Zitrone",     color: "var(--f-lemon)" },
  schokolade:  { name: "Schokolade",  color: "var(--f-chocolate)" },
  salzkaramell:{ name: "Salzkaramell",color: "var(--f-caramel)" },
  lavendel:    { name: "Lavendel",    color: "var(--f-lavender)" }
};

const PRODUCTS = [
  // Bärchen (photos)
  { id: "baer-erdbeer",   type: "baer", name: "Erdbeer-Bärchen",   flavour: "erdbeere",    price: 3.20, img: "img/bear-pink.jpg",     desc: "Rosa Schale, fruchtige Erdbeercreme." },
  { id: "baer-heidel",    type: "baer", name: "Heidelbeer-Bärchen", flavour: "heidelbeere", price: 3.20, img: "img/bear-lavender.jpg", desc: "Sanftes Lila, cremige Heidelbeere." },
  { id: "baer-minz",      type: "baer", name: "Minz-Bärchen",      flavour: "minze",       price: 3.20, img: "img/bear-blue.jpg",     desc: "Kühle Minze, hellblaue Schale." },
  { id: "baer-pistazie",  type: "baer", name: "Pistazien-Bärchen", flavour: "pistazie",    price: 3.20, img: "img/bear-green.png",    desc: "Geröstete Pistazie, herrlich nussig." },
  // Klassisch (CSS-gezeichnet)
  { id: "k-erdbeere",     type: "klassisch", name: "Erdbeere",     flavour: "erdbeere",    price: 2.40, desc: "Der Klassiker mit echter Frucht." },
  { id: "k-pistazie",     type: "klassisch", name: "Pistazie",     flavour: "pistazie",    price: 2.40, desc: "Cremig, nussig, nicht zu süß." },
  { id: "k-vanille",      type: "klassisch", name: "Vanille",      flavour: "vanille",     price: 2.40, desc: "Bourbon-Vanille, pur und fein." },
  { id: "k-schokolade",   type: "klassisch", name: "Schokolade",   flavour: "schokolade",  price: 2.40, desc: "Dunkle Ganache, intensiv." },
  { id: "k-himbeere",     type: "klassisch", name: "Himbeere",     flavour: "himbeere",    price: 2.40, desc: "Spritzig-fruchtig, leicht herb." },
  { id: "k-zitrone",      type: "klassisch", name: "Zitrone",      flavour: "zitrone",     price: 2.40, desc: "Frische Zitrone mit Biss." },
  { id: "k-salzkaramell", type: "klassisch", name: "Salzkaramell", flavour: "salzkaramell",price: 2.40, desc: "Karamell trifft Fleur de Sel." },
  { id: "k-lavendel",     type: "klassisch", name: "Lavendel",     flavour: "lavendel",    price: 2.40, desc: "Zart blumig, ein Hauch Provence." }
];

/* macaron illustration markup */
function macaronHTML(color) {
  return `<span class="macaron" style="--mc:${color}" aria-hidden="true">
    <span class="macaron__shell macaron__shell--top"></span>
    <span class="macaron__filling"></span>
    <span class="macaron__shell macaron__shell--bot"></span>
  </span>`;
}
function thumbHTML(p) {
  if (p.img) return `<img src="${p.img}" width="220" height="220" loading="lazy" alt="${p.name}">`;
  return macaronHTML(FLAVOURS[p.flavour].color);
}

/* ============================================================
   PRODUCT GRID
   ============================================================ */
const grid = document.getElementById("productGrid");

function renderProducts(filter = "all") {
  grid.innerHTML = "";
  PRODUCTS.filter(p => filter === "all" || p.type === filter).forEach(p => {
    const f = FLAVOURS[p.flavour];
    const card = document.createElement("article");
    card.className = "card reveal";
    card.dataset.id = p.id;
    card.innerHTML = `
      <div class="card__media">
        ${p.type === "baer" ? `<span class="card__tag">Bärchen</span>` : ""}
        ${thumbHTML(p)}
      </div>
      <h3 class="card__name"><span class="card__dot" style="background:${f.color}"></span>${p.name}</h3>
      <p class="card__desc">${p.desc}</p>
      <div class="card__foot">
        <span class="card__price">${EUR(p.price)}</span>
        <button class="card__add" aria-label="${p.name} in den Warenkorb" data-add="${p.id}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>`;
    grid.appendChild(card);
  });
  observeReveals();
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("is-active"); btn.setAttribute("aria-selected", "true");
    renderProducts(btn.dataset.filter);
  });
});

/* ============================================================
   CART
   ============================================================ */
let cart = [];   // { key, name, meta, price, qty, img?, flavour? }

const badge   = document.getElementById("cartBadge");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");

function cartCount() { return cart.reduce((n, i) => n + i.qty, 0); }
function cartTotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }

function addToCart(item) {
  const existing = cart.find(i => i.key === item.key);
  if (existing) existing.qty += item.qty || 1;
  else cart.push({ ...item, qty: item.qty || 1 });
  updateCart();
}
function changeQty(key, delta) {
  const it = cart.find(i => i.key === key);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) cart = cart.filter(i => i.key !== key);
  updateCart();
}
function removeItem(key) { cart = cart.filter(i => i.key !== key); updateCart(); }

function updateCart() {
  const count = cartCount();
  badge.textContent = count;
  badge.hidden = count === 0;
  badge.classList.remove("pop"); void badge.offsetWidth; if (count) badge.classList.add("pop");

  // drawer body
  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="drawer__empty">
        <svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Dein Warenkorb ist noch leer.<br>Zeit für ein paar Bärchen.</p>
      </div>`;
  } else {
    cartItemsEl.innerHTML = cart.map(i => `
      <div class="citem">
        <div class="citem__media">${i.thumb || ""}</div>
        <div class="citem__info">
          <div class="citem__name">${i.name}</div>
          ${i.meta ? `<div class="citem__meta">${i.meta}</div>` : ""}
          <div class="qty" role="group" aria-label="Menge ${i.name}">
            <button data-dec="${i.key}" aria-label="Weniger">−</button>
            <span>${i.qty}</span>
            <button data-inc="${i.key}" aria-label="Mehr">+</button>
          </div>
          <button class="citem__remove" data-rm="${i.key}">entfernen</button>
        </div>
        <div class="citem__price">${EUR(i.price * i.qty)}</div>
      </div>`).join("");
  }

  cartTotalEl.textContent = EUR(cartTotal());
  document.getElementById("toCheckout").disabled = cart.length === 0;
  renderFormSummary();
}

cartItemsEl.addEventListener("click", e => {
  const inc = e.target.closest("[data-inc]"); const dec = e.target.closest("[data-dec]"); const rm = e.target.closest("[data-rm]");
  if (inc) changeQty(inc.dataset.inc, +1);
  if (dec) changeQty(dec.dataset.dec, -1);
  if (rm)  removeItem(rm.dataset.rm);
});

/* add single product (with fly animation) */
grid.addEventListener("click", e => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const p = PRODUCTS.find(x => x.id === btn.dataset.add);
  const card = btn.closest(".card");
  flyToCart(card.querySelector(".card__media"));
  addToCart({
    key: "p-" + p.id,
    name: p.name,
    meta: p.type === "baer" ? "Bärchen-Macaron" : "Klassischer Macaron",
    price: p.price,
    thumb: p.img ? `<img src="${p.img}" alt="">` : macaronHTML(FLAVOURS[p.flavour].color)
  });
  toast(`${p.name} hinzugefügt`);
});

/* ---- fly-to-cart ---- */
const flyLayer = document.getElementById("flyLayer");
const cartBtn = document.getElementById("cartBtn");
function flyToCart(sourceEl) {
  if (reduceMotion || !sourceEl) return;
  const s = sourceEl.getBoundingClientRect();
  const t = cartBtn.getBoundingClientRect();
  const clone = document.createElement("div");
  clone.className = "fly";
  clone.innerHTML = sourceEl.querySelector("img")
    ? `<img src="${sourceEl.querySelector("img").src}" alt="">`
    : sourceEl.innerHTML;
  clone.style.left = s.left + s.width / 2 - 30 + "px";
  clone.style.top = s.top + s.height / 2 - 30 + "px";
  flyLayer.appendChild(clone);
  const dx = (t.left + t.width / 2) - (s.left + s.width / 2);
  const dy = (t.top + t.height / 2) - (s.top + s.height / 2);
  clone.animate([
    { transform: "translate(0,0) scale(1)", opacity: 1 },
    { transform: `translate(${dx}px, ${dy}px) scale(.25)`, opacity: .2 }
  ], { duration: 700, easing: "cubic-bezier(.55,-.2,.4,1)" }).onfinish = () => clone.remove();
}

/* ============================================================
   CART DRAWER
   ============================================================ */
const drawer = document.getElementById("drawer");
let lastFocus = null;
function openDrawer() {
  lastFocus = document.activeElement;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("drawerClose").focus();
}
function closeDrawer() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
cartBtn.addEventListener("click", openDrawer);
document.getElementById("drawerClose").addEventListener("click", closeDrawer);
document.getElementById("drawerScrim").addEventListener("click", closeDrawer);
document.addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer(); });
document.getElementById("toCheckout").addEventListener("click", () => {
  closeDrawer();
  document.getElementById("kontakt").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
});

/* ============================================================
   BOX BUILDER
   ============================================================ */
let boxSize = 6, boxPrice = 16, boxItems = [];
const boxSlotsEl = document.getElementById("boxSlots");
const boxCountEl = document.getElementById("boxCount");
const boxMaxEl   = document.getElementById("boxMax");
const addBoxBtn  = document.getElementById("addBoxBtn");

function buildPalette() {
  const palette = document.getElementById("palette");
  palette.innerHTML = Object.entries(FLAVOURS).map(([k, f]) => `
    <button class="chip" data-flav="${k}">
      <span class="chip__dot" style="background:${f.color}"></span>${f.name}
    </button>`).join("");
}
function renderSlots() {
  const cols = boxSize === 6 ? 3 : 4;
  boxSlotsEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  boxSlotsEl.innerHTML = "";
  for (let i = 0; i < boxSize; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    if (boxItems[i]) {
      slot.classList.add("slot--filled", "drop");
      slot.innerHTML = macaronHTML(FLAVOURS[boxItems[i]].color);
      slot.title = "Entfernen: " + FLAVOURS[boxItems[i]].name;
      slot.dataset.idx = i;
      slot.setAttribute("role", "button");
      slot.setAttribute("aria-label", FLAVOURS[boxItems[i]].name + " entfernen");
    }
    boxSlotsEl.appendChild(slot);
  }
  boxCountEl.textContent = boxItems.length;
  boxMaxEl.textContent = boxSize;
  addBoxBtn.disabled = boxItems.length === 0;
}
document.querySelectorAll(".size").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll(".size").forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-checked", "false"); });
    b.classList.add("is-active"); b.setAttribute("aria-checked", "true");
    boxSize = +b.dataset.size; boxPrice = +b.dataset.price;
    if (boxItems.length > boxSize) boxItems = boxItems.slice(0, boxSize);
    renderSlots();
  });
});
document.getElementById("palette").addEventListener("click", e => {
  const chip = e.target.closest("[data-flav]");
  if (!chip) return;
  if (boxItems.length >= boxSize) { toast(`Die ${boxSize}er-Box ist voll`); return; }
  boxItems.push(chip.dataset.flav);
  renderSlots();
});
boxSlotsEl.addEventListener("click", e => {
  const slot = e.target.closest(".slot--filled");
  if (!slot) return;
  boxItems.splice(+slot.dataset.idx, 1);
  renderSlots();
});
addBoxBtn.addEventListener("click", () => {
  const counts = {};
  boxItems.forEach(f => { counts[f] = (counts[f] || 0) + 1; });
  const meta = Object.entries(counts).map(([k, n]) => `${n}× ${FLAVOURS[k].name}`).join(", ");
  flyToCart(document.getElementById("pinkbox"));
  addToCart({
    key: "box-" + Date.now(),
    name: `${boxSize}er Box`,
    meta: meta || "eigene Auswahl",
    price: boxPrice,
    thumb: macaronHTML("var(--pynk)")
  });
  toast(`${boxSize}er Box hinzugefügt`);
  boxItems = []; renderSlots();
});

/* ============================================================
   ORDER FORM
   ============================================================ */
const form = document.getElementById("orderForm");
const summaryEl = document.getElementById("formSummary");

function renderFormSummary() {
  if (!summaryEl) return;
  if (cart.length === 0) {
    summaryEl.innerHTML = `<p class="orderform__empty">Dein Warenkorb ist noch leer. Leg ein paar Macarons hinein.</p>`;
    return;
  }
  summaryEl.innerHTML =
    cart.map(i => `<div class="sumline"><span>${i.qty}× ${i.name}</span><span>${EUR(i.price * i.qty)}</span></div>`).join("") +
    `<div class="sumtotal"><span>Summe</span><span>${EUR(cartTotal())}</span></div>`;
}

/* segmented control */
document.querySelectorAll(".seg").forEach(seg => {
  seg.addEventListener("click", () => {
    document.querySelectorAll(".seg").forEach(s => s.classList.remove("is-active"));
    seg.classList.add("is-active");
    seg.querySelector("input").checked = true;
  });
});

function validateForm() {
  let ok = true;
  ["ofName", "ofPhone"].forEach(id => {
    const input = document.getElementById(id);
    const err = document.querySelector(`.field__error[data-for="${id}"]`);
    if (!input.value.trim()) {
      ok = false; input.setAttribute("aria-invalid", "true"); if (err) err.hidden = false;
    } else {
      input.removeAttribute("aria-invalid"); if (err) err.hidden = true;
    }
  });
  return ok;
}

function buildOrderText() {
  const name = document.getElementById("ofName").value.trim();
  const phone = document.getElementById("ofPhone").value.trim();
  const fulfil = document.querySelector('input[name="fulfil"]:checked').value;
  const date = document.getElementById("ofDate").value;
  const note = document.getElementById("ofNote").value.trim();

  let t = `Hallo Macaron Pynk, ich möchte gern bestellen:%0A%0A`;
  cart.forEach(i => { t += `• ${i.qty}× ${i.name}${i.meta ? " (" + i.meta + ")" : ""} – ${EUR(i.price * i.qty)}%0A`; });
  t += `%0ASumme: ${EUR(cartTotal())}%0A%0A`;
  t += `Name: ${name}%0ATelefon: ${phone}%0AArt: ${fulfil}%0A`;
  if (date) t += `Wunschtag: ${date}%0A`;
  if (note) t += `Nachricht: ${note}%0A`;
  return t.replace(/%0A/g, "\n"); // readable version; we encode per channel below
}

function submitOrder(channel) {
  if (cart.length === 0) { toast("Dein Warenkorb ist leer"); openDrawer(); return; }
  if (!validateForm()) {
    const firstErr = form.querySelector('[aria-invalid="true"]');
    if (firstErr) firstErr.focus();
    return;
  }
  const body = buildOrderText();
  if (channel === "wa") {
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
  } else {
    const subject = encodeURIComponent("Neue Bestellung – Macaron Pynk");
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }
  toast("Bestellung wird geöffnet …");
}

form.addEventListener("submit", e => { e.preventDefault(); submitOrder("wa"); });
document.getElementById("sendMail").addEventListener("click", () => submitOrder("mail"));

// clear field error on input
["ofName", "ofPhone"].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("input", () => {
    if (input.value.trim()) {
      input.removeAttribute("aria-invalid");
      const err = document.querySelector(`.field__error[data-for="${id}"]`);
      if (err) err.hidden = true;
    }
  });
});

/* ============================================================
   MOBILE NAV
   ============================================================ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
let revealObserver;
function observeReveals() {
  if (reduceMotion) { document.querySelectorAll(".reveal").forEach(el => el.classList.add("in")); return; }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          const sibs = [...en.target.parentElement.children].filter(c => c.classList.contains("reveal"));
          const idx = sibs.indexOf(en.target);
          en.target.style.transitionDelay = Math.min(idx, 6) * 45 + "ms";
          en.target.classList.add("in");
          revealObserver.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  }
  document.querySelectorAll(".reveal:not(.in)").forEach(el => revealObserver.observe(el));
}

/* ============================================================
   INIT
   ============================================================ */
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
buildPalette();
renderSlots();
updateCart();
observeReveals();

/* ---- toast ---- */
let toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg; el.hidden = false;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => { el.hidden = true; }, 300);
  }, 2600);
}
