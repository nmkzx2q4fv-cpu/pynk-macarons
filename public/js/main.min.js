/* ============================================================
   Pynk Macarons — shared app logic (multi-page)
   ============================================================ */

/* ---- CONFIG: echte Shop-Daten hier eintragen ---- */
const CONFIG = {
  brand: "Macarons by Pynk",
  whatsapp: "+49 15 228283124",                 // WhatsApp-Nummer, nur Ziffern inkl. Ländercode
  email: "pynk.coffee.hamburg@gmail.com",
  phone: "+49 15 228283124",
  address: "Rentzelstraße 12, 20146 Hamburg",
  hours: "Di–Sa, 11–19 Uhr",
  instagram: "https://instagram.com/pynk_hamburg"
};

/* ============================================================
   i18n — DE/EN
   Mechanik: Markup trägt data-i18n="key" (Textinhalt),
   data-i18n-aria="key" (aria-label) oder data-i18n-ph="key"
   (placeholder). applyI18n() füllt sie aus I18N[LANG].
   → Neue Sprache: weiteres Sprach-Objekt ergänzen.
   → Neuer String: Schlüssel hier + data-i18n im HTML.
   ============================================================ */
const I18N = {
  de: {
    "nav.home":"Start","nav.shop":"Shop","nav.events":"Events","nav.cafe":"Café","nav.partner":"Partner",
    "nav.atelier":"Box-Atelier","nav.gutschein":"Gutscheine","nav.spezial":"Spezial & Anfrage","nav.b2b":"Firmenkunden","nav.besuche":"Besuche uns","nav.ueber":"Über uns","nav.kontakt":"Kontakt",
    "bottomnav.home":"Home","bottomnav.box":"Shop","bottomnav.cafe":"Café finden",
    "a11y.cart":"Warenkorb öffnen","a11y.call":"Jetzt anrufen","a11y.wa":"Auf WhatsApp schreiben","a11y.lang":"Sprache wählen",
    "footer.tag":"Handgemachte Macarons aus Hamburg. Französische Technik, Hamburger Herz – zum Mitnehmen, Verschenken und Vernaschen.",
    "footer.discover":"Entdecken","footer.shop":"Shop","footer.tower":"Tower & Giant","footer.b2b":"Firmenkunden","footer.about":"Über uns",
    "footer.visit":"Besuch uns","footer.news":"Süße Post","footer.newsText":"Neue Sorten & Aktionen – eine Mail pro Monat, versprochen.","news.ph":"deine@mail.de",
    "footer.cookie":"Cookie-Einstellungen","footer.copy":"Mit Liebe gebacken in Hamburg",
    "cart.title":"Dein Warenkorb","cart.subtotal":"Zwischensumme","cart.note":"Alle Preise inkl. MwSt. · Versand ab 35 € kostenlos · Abholung gratis","cart.checkout":"Zur Kasse",
    "cart.empty":"Dein Warenkorb ist noch leer.<br>Zeit für ein paar Macarons.","cart.remove":"entfernen",
    "cookie.title":"Wir respektieren deine Privatsphäre",
    "cookie.text":"Wir setzen Cookies ein. Notwendige Cookies halten den Shop am Laufen (z. B. Warenkorb). Statistik- und Marketing-Cookies nur mit deiner Einwilligung – jederzeit über „Cookie-Einstellungen“ im Footer widerrufbar. Details in der <a href=\"datenschutz.html\">Datenschutzerklärung</a>.",
    "cookie.necessary":"Notwendig","cookie.necessaryDesc":"Warenkorb, Sicherheit – immer aktiv","cookie.stats":"Statistik","cookie.statsDesc":"Anonyme Reichweitenmessung","cookie.marketing":"Marketing","cookie.marketingDesc":"Personalisierte Inhalte",
    "cookie.reject":"Alle ablehnen","cookie.accept":"Alle akzeptieren","cookie.settings":"Einstellungen","cookie.save":"Auswahl speichern",
    "fab.help":"Hilfe & Kontakt",
    "hero.eyebrow":"Handmade in Hamburg",
    "hero.h1":"Zartschmelzend.<br>Handbepinselt.<br><em>Zum Verschenken schön.</em>",
    "hero.lead":"Knusprige Schale, cremige Füllung, alles von Hand. Über 20 Sorten, frisch aus unserem Hamburger Café.",
    "hero.cta1":"Jetzt genießen","hero.cta2":"Box zusammenstellen",
    "hero.trust":"<strong>4,9</strong>/5 · <strong>1.200+</strong> Bestellungen",
    "hero.scarcity":"Täglich nur in kleinen Chargen gebacken – solange der Vorrat reicht.",
    "cat.eyebrow":"Unsere Welt","cat.h2":"Wonach ist dir heute?",
    "best.eyebrow":"Diese Woche beliebt","best.h2":"Frisch aus dem Ofen","best.lead":"Unsere Lieblinge diese Woche – bei jedem Besuch neu gemischt.",
    "builder.eyebrow":"Dein Box-Atelier","builder.h2":"Stell dir deine Box zusammen","builder.lead":"Such dir einen Anlass aus – oder leg einfach los.",
    "builder.or":"Oder bau dir hier eine Probier-Box:","builder.full":"Zum Box-Atelier →",
    "occ.hochzeit":"Hochzeit","occ.babyparty":"Babyparty","occ.geschenk":"Geschenk","occ.firma":"Firmen-Event","occ.self":"Einfach so",
    "spezial.eyebrow":"Für besondere Anlässe","spezial.h2":"Wenn es etwas Größeres sein darf","spezial.lead":"Tower für die Hochzeit, Giant Macaron zum Geburtstag oder euer Logo essbar gedruckt.",
    "anlass.eyebrow":"Für jeden Anlass","anlass.h2":"Ein Geschenk, das in Erinnerung bleibt",
    "proof.eyebrow":"Vertrauen von","proof.h2":"Schon für diese Marken gebacken",
    "versand.eyebrow":"So bekommst du sie","versand.h2":"Abholen oder liefern lassen"
  },
  en: {
    "nav.home":"Home","nav.shop":"Shop","nav.events":"Events","nav.cafe":"Café","nav.partner":"Partner",
    "nav.atelier":"Box Atelier","nav.gutschein":"Gift Cards","nav.spezial":"Special & Enquiry","nav.b2b":"Business","nav.besuche":"Visit us","nav.ueber":"About","nav.kontakt":"Contact",
    "bottomnav.home":"Home","bottomnav.box":"Shop","bottomnav.cafe":"Find Café",
    "a11y.cart":"Open cart","a11y.call":"Call now","a11y.wa":"Message on WhatsApp","a11y.lang":"Choose language",
    "footer.tag":"Handmade macarons from Hamburg. French technique, Hamburg heart – to take away, to gift, to enjoy.",
    "footer.discover":"Discover","footer.shop":"Shop","footer.tower":"Tower & Giant","footer.b2b":"Business","footer.about":"About",
    "footer.visit":"Visit us","footer.news":"Sweet mail","footer.newsText":"New flavours & offers – one email a month, promised.","news.ph":"you@mail.com",
    "footer.cookie":"Cookie settings","footer.copy":"Baked with love in Hamburg",
    "cart.title":"Your cart","cart.subtotal":"Subtotal","cart.note":"All prices incl. VAT · Free shipping from €35 · Pickup always free","cart.checkout":"Checkout",
    "cart.empty":"Your cart is still empty.<br>Time for a few macarons.","cart.remove":"remove",
    "cookie.title":"We respect your privacy",
    "cookie.text":"We use cookies. Necessary cookies keep the shop running (e.g. the cart). Statistics and marketing cookies only with your consent – revocable anytime via “Cookie settings” in the footer. Details in our <a href=\"datenschutz.html\">privacy policy</a>.",
    "cookie.necessary":"Necessary","cookie.necessaryDesc":"Cart, security – always on","cookie.stats":"Statistics","cookie.statsDesc":"Anonymous reach measurement","cookie.marketing":"Marketing","cookie.marketingDesc":"Personalised content",
    "cookie.reject":"Reject all","cookie.accept":"Accept all","cookie.settings":"Settings","cookie.save":"Save selection",
    "fab.help":"Help & contact",
    "hero.eyebrow":"Handmade in Hamburg",
    "hero.h1":"Melt-in-the-mouth.<br>Hand-painted.<br><em>Beautiful to gift.</em>",
    "hero.lead":"Crisp shell, creamy filling, all by hand. Over 20 flavours, fresh from our Hamburg café.",
    "hero.cta1":"Order now","hero.cta2":"Build your box",
    "hero.trust":"<strong>4.9</strong>/5 · <strong>1,200+</strong> orders",
    "hero.scarcity":"Baked daily in small batches only – while stocks last.",
    "cat.eyebrow":"Our world","cat.h2":"What are you craving today?",
    "best.eyebrow":"Popular this week","best.h2":"Fresh from the oven","best.lead":"Our favourites this week – reshuffled on every visit.",
    "builder.eyebrow":"Your Box Atelier","builder.h2":"Build your own box","builder.lead":"Pick an occasion – or just start choosing.",
    "builder.or":"Or build a tasting box right here:","builder.full":"Open the Box Atelier →",
    "occ.hochzeit":"Wedding","occ.babyparty":"Baby shower","occ.geschenk":"Gift","occ.firma":"Corporate","occ.self":"Just because",
    "spezial.eyebrow":"For the big moments","spezial.h2":"When it should be something special","spezial.lead":"A macaron tower for the wedding, a giant macaron as a surprise, or your logo printed edibly.",
    "anlass.eyebrow":"The perfect occasion","anlass.h2":"A gift no one forgets",
    "proof.eyebrow":"Trusted by","proof.h2":"Already baked for these brands",
    "versand.eyebrow":"How to get them","versand.h2":"Pick up in Hamburg or have them delivered"
  }
};
let LANG = (()=>{ try { return localStorage.getItem("pynk_lang") || "de"; } catch(e){ return "de"; } })();
function tr(key){ return (I18N[LANG] && I18N[LANG][key] != null ? I18N[LANG][key] : (I18N.de[key] != null ? I18N.de[key] : key)); }
function applyI18n(root){
  root = root || document;
  root.querySelectorAll("[data-i18n]").forEach(el=>{ el.innerHTML = tr(el.dataset.i18n); });
  root.querySelectorAll("[data-i18n-aria]").forEach(el=>{ el.setAttribute("aria-label", tr(el.dataset.i18nAria)); });
  root.querySelectorAll("[data-i18n-ph]").forEach(el=>{ el.setAttribute("placeholder", tr(el.dataset.i18nPh)); });
}
function setLang(lang){
  if(!I18N[lang]) return;
  LANG = lang;
  try { localStorage.setItem("pynk_lang", lang); } catch(e){}
  document.documentElement.lang = lang;
  applyI18n(document);
  $$(".lang-toggle__btn").forEach(b=>{ const on=b.dataset.lang===lang; b.classList.toggle("is-active",on); b.setAttribute("aria-pressed",String(on)); });
  if (typeof updateCart === "function") updateCart();
}
function wireLang(){ $$(".lang-toggle__btn").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang))); }
window.PynkLang = { set:setLang, get:()=>LANG, t: tr };

const EUR = n => n.toLocaleString("de-DE",{style:"currency",currency:"EUR"});
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $  = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];

/* ---- Flavour colours ---- */
const FC = {
  erdbeere:"#EF7DA0", himbeere:"#E0567E", pistazie:"#A9C77A", matcha:"#9CC06A",
  limette:"#7FD08C", zitrone:"#F2D06B", mango:"#F4B45E", orange:"#EFA277",
  vanille:"#EBD9B4", lavendel:"#BFA0D6", heidelbeere:"#9B7FC4", kokos:"#A9E0D2",
  cheesecake:"#A7D4E6", schokolade:"#9A6B4F", karamell:"#D8A86A", latte:"#B8A48F",
  cookies:"#9C9690", wildberry:"#C86FA8", minze:"#9FD8C9"
};
const FLAVOURS = {
  erdbeere:"Erdbeere", himbeere:"Himbeere", pistazie:"Pistazie", matcha:"Matcha",
  limette:"Limette-Minze", zitrone:"Zitrone", mango:"Mango", orange:"Orange",
  vanille:"Vanille", lavendel:"Lavendel", heidelbeere:"Heidelbeere", kokos:"Kokos",
  schokolade:"Schokolade", karamell:"Salzkaramell", latte:"Latte Macchiato",
  cookies:"Cookies & Cream", wildberry:"Wild Berry", cheesecake:"Cheesecake", minze:"Minze"
};

/* ============================================================
   PRODUCT CATALOG — nur noch 15er-Boxen (sortenrein) + Extras
   Modell (Platzhalter-Preise, zentral hier änderbar):
     • Jede Sorte = eine sortenreine 15er-Box (P_BOX15)
     • "Eigene Box" (15er Mischbox) = Konfigurator, gleicher Preis
     • Tower = Stufen mit Festpreis (TOWER)
     • Exklusiver Geschenk-Macaron = nur Auto-Geschenk ab 80 €
   ============================================================ */
const P_BOX15 = 29;            // Platzhalter — sortenreine 15er-Box
const FREE_SHIP_THRESHOLD = 50; // € — Gratis-Versand ab
const GIFT_THRESHOLD = 80;      // € — automatisches Geschenk ab
const GIFT_ID = "gift-exklusiv";

// Sortenreine 15er-Boxen: eine pro Sorte (Bild = Platzhalter pro Sorte)
const BOX_FLAVOURS = [
  {flavour:"erdbeere",   name:"Erdbeere-Rose",      img:"img/mac-erdbeere.jpg",   desc:"15 Macarons Erdbeere-Rose – fruchtig mit zartem Rosenhauch."},
  {flavour:"himbeere",   name:"Himbeere",           img:"img/mac-himbeere.jpg",   desc:"15 Macarons Himbeere – spritzig und leicht herb."},
  {flavour:"pistazie",   name:"Pistazie",           img:"img/mac-pistazie.jpg",   desc:"15 Macarons Pistazie – geröstet, nussig, cremig."},
  {flavour:"matcha",     name:"Matcha",             img:"img/mac-matcha.jpg",     desc:"15 Macarons Matcha – sanft erdig, fein herb."},
  {flavour:"limette",    name:"Limette-Minze",      img:"img/mac-limette.webp",    desc:"15 Macarons Limette-Minze – frisch und kühl."},
  {flavour:"zitrone",    name:"Zitrone",            img:"img/mac-zitrone.jpg",    desc:"15 Macarons Zitrone – sonnig mit Biss."},
  {flavour:"mango",      name:"Mango",              img:"img/mac-mango.jpg",      desc:"15 Macarons Mango – reif und tropisch süß."},
  {flavour:"orange",     name:"Orange",             img:"img/mac-orange.jpg",     desc:"15 Macarons Orange – saftig, fein-herb."},
  {flavour:"vanille",    name:"Vanille-Mascarpone", img:"img/mac-vanille.jpg",    desc:"15 Macarons Vanille-Mascarpone – Bourbon-Vanille, samtig."},
  {flavour:"lavendel",   name:"Lavendel-Zitrone",   img:"img/mac-lavendel.jpg",   desc:"15 Macarons Lavendel-Zitrone – zart und blumig."},
  {flavour:"kokos",      name:"Kokos-Mango",        img:"img/mac-kokos.webp",      desc:"15 Macarons Kokos-Mango – cremig und exotisch."},
  {flavour:"cheesecake", name:"Blaubeer-Cheesecake",img:"img/mac-cheesecake.jpg", desc:"15 Macarons Blaubeer-Cheesecake – cremig fruchtig."},
  {flavour:"schokolade", name:"Schokolade",         img:"img/mac-schokolade.webp", desc:"15 Macarons Schokolade – dunkle Ganache, intensiv."},
  {flavour:"karamell",   name:"Salzkaramell",       img:"img/mac-salzkaramell.jpg",desc:"15 Macarons Salzkaramell – Karamell mit Fleur de Sel."},
  {flavour:"latte",      name:"Latte Macchiato",    img:"img/mac-latte.jpg",      desc:"15 Macarons Latte Macchiato – mild, rund, Espresso-Creme."},
  {flavour:"cookies",    name:"Cookies & Cream",    img:"img/mac-cookies.webp",    desc:"15 Macarons Cookies & Cream – knusprig in Vanillecreme."},
  {flavour:"wildberry",  name:"Wild Berry",         img:"img/mac-wildberry.webp",  desc:"15 Macarons Wild Berry – wilde Beerenmischung."}
];

const PRODUCTS = [
  // Sortenreine 15er-Boxen (eine pro Sorte)
  ...BOX_FLAVOURS.map(b => ({
    id:`box15-${b.flavour}`, cat:"box", box:15, name:`${b.name} · 15er-Box`,
    flavour:b.flavour, price:P_BOX15, img:b.img, desc:b.desc
  })),
  // Eigene 15er-Mischbox (Konfigurator füllt die Sorten)
  {id:"box15-mix", cat:"box", box:15, custom:true, name:"Deine eigene 15er-Box", flavour:"erdbeere", price:P_BOX15, img:"img/box-open.webp", desc:"Stell dir 15 Macarons aus allen Sorten selbst zusammen."},
  // Extras / Cross-Sell (zufällig im Warenkorb angeboten)
  {id:"crunch",   cat:"addon", crossSell:true, name:"Pynk Crunch",      flavour:"erdbeere", price:6.90, img:"img/mac-erdbeere.jpg", desc:"Zerbröselte Macaron-Schalen als Topping – 150 g Glas."},
  {id:"grusskarte",cat:"addon", crossSell:true, name:"Handgeschriebene Grußkarte", flavour:"lavendel", price:3.50, img:"img/gift-luxe.jpg", desc:"Deine persönliche Nachricht, von Hand geschrieben."},
  {id:"kerze",    cat:"addon", crossSell:true, name:"Pynk Duftkerze",   flavour:"vanille",  price:14.90, img:"img/box-bears.jpg", desc:"Vanille-Sojakerze – passend zum süßen Moment."},
  // Gutschein (Kachel im Shop)
  {id:"gutschein",cat:"gutschein", name:"Geschenkgutschein", flavour:"wildberry", price:25, img:"img/gift-luxe.jpg", desc:"Verschenke Macaron-Glück – Betrag frei wählbar."},
  // Exklusiver Geschenk-Macaron — NICHT regulär kaufbar, nur Auto-Geschenk ab 80 €
  {id:GIFT_ID, cat:"gift", noShop:true, name:"Exklusiver Überraschungs-Macaron", flavour:"wildberry", price:0, img:"img/mac-wildberry.webp", desc:"Unser Geheim-Macaron – gibt es nur als Geschenk ab 50 € Bestellwert."}
];

// Macaron-Tower — 13 Stufen, ein Geschmack pro Stufe
const TOWER = {
  id:"tower",
  tiers:[
    {stufe:1,  stk:3,  label:"Stufe 1",  desc:"3 Macarons · Krönung"},
    {stufe:2,  stk:5,  label:"Stufe 2",  desc:"5 Macarons"},
    {stufe:3,  stk:7,  label:"Stufe 3",  desc:"7 Macarons"},
    {stufe:4,  stk:9,  label:"Stufe 4",  desc:"9 Macarons"},
    {stufe:5,  stk:12, label:"Stufe 5",  desc:"12 Macarons"},
    {stufe:6,  stk:14, label:"Stufe 6",  desc:"14 Macarons"},
    {stufe:7,  stk:16, label:"Stufe 7",  desc:"16 Macarons"},
    {stufe:8,  stk:18, label:"Stufe 8",  desc:"18 Macarons"},
    {stufe:9,  stk:20, label:"Stufe 9",  desc:"20 Macarons"},
    {stufe:10, stk:22, label:"Stufe 10", desc:"22 Macarons"},
    {stufe:11, stk:22, label:"Stufe 11", desc:"22 Macarons"},
    {stufe:12, stk:22, label:"Stufe 12", desc:"22 Macarons"},
    {stufe:13, stk:22, label:"Stufe 13", desc:"22 Macarons · Basis"}
  ],
  totalMacarons: function(n){ return this.tiers.slice(0,n).reduce((s,t)=>s+t.stk,0); }
};

const macaronHTML = c => `<span class="macaron" style="--mc:${c}" aria-hidden="true"><span class="macaron__shell macaron__shell--top"></span><span class="macaron__filling"></span><span class="macaron__shell macaron__shell--bot"></span></span>`;

/* ============================================================
   SHARED CHROME
   ============================================================ */
const NAVLINKS = [
  {href:"shop.html", label:"Shop", key:"shop"},
  {href:"events.html", label:"Anlässe", key:"events", sub:[
    {href:"events.html?occ=Hochzeit#anfrage", label:"Hochzeit", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>'},
    {href:"events.html?occ=Geburtstag#anfrage", label:"Geburtstag", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>'},
    {href:"events.html?occ=Babyshower#anfrage", label:"Baby Reveal & Shower", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>'},
    {href:"events.html?occ=Taufe#anfrage", label:"Taufe", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2v20"/><path d="M2 12h20"/></svg>'},
    {href:"events.html?occ=Jubilaeum#anfrage", label:"Jubiläum", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'},
    {href:"events.html?occ=Firmen-Event#anfrage", label:"Firmen-Event", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>'},
    {href:"events.html?occ=Valentinstag#anfrage", label:"Valentinstag", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"/></svg>'},
    {href:"events.html#anfrage", label:"Sonderwunsch", icon:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>'}
  ]},
  {href:"cafe.html", label:"Café", key:"cafe"},
  {href:"partner.html", label:"Partner", key:"partner"}
];

/* M3 bottom Navigation Bar — primary thumb-reach nav on phones (≤767px).
   Icons: active (filled) + inactive (outline) per M3 spec. */
const BOTTOMNAV = [
  {href:"index.html", label:"Home", i18n:"bottomnav.home",
   on:`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 3 3 10v11h6v-6h6v6h6V10z"/></svg>`,
   off:`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/></svg>`},
  {href:"shop.html", label:"Shop", i18n:"bottomnav.box",
   on:`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M4 7 12 3l8 4v3H4zM4 11h16v8a1 1 0 0 1-1 1h-6v-6h-2v6H5a1 1 0 0 1-1-1z"/></svg>`,
   off:`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 7.5 12 3.5l8.5 4v12a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"/><path d="M3.5 7.5 12 11l8.5-3.5M12 11v9.5"/></svg>`},
  {href:"cafe.html", label:"Café finden", i18n:"bottomnav.cafe",
   on:`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5"/></svg>`,
   off:`<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12"/><circle cx="12" cy="9" r="2.5"/></svg>`}
];

function roseSVG(){return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c0-4 0-6 0-9a4 4 0 1 1 4 4c-2 0-4 1-4 5Z"/><path d="M12 12a4 4 0 1 1-4-4c2 0 4 1 4 5"/><path d="M12 12c0-2 .9-3.5 2.5-4.2"/></svg>`;}
function starSVG(s=18){return `<svg viewBox="0 0 20 20" width="${s}" height="${s}"><path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9z"/></svg>`;}

function injectChrome(){
  const page = document.body.dataset.page || "";
  const hasHero = document.body.hasAttribute("data-hero");

  // HEADER
  const header = document.createElement("header");
  header.className = "nav" + (hasHero ? " on-hero" : " solid");
  header.innerHTML = `
    <div class="wrap nav__inner">
      <a href="index.html" class="brand" aria-label="${CONFIG.brand} – Startseite">
        <span class="brand__rose">${roseSVG()}</span>
        <span>Macaron <em>by pynk</em></span>
      </a>
      <nav class="nav__links" id="navLinks" aria-label="Hauptnavigation">
        ${NAVLINKS.map(l=>{
          if(l.sub){
            return `<div class="nav__dropdown">
              <a href="${l.href}" class="nav__dropdown-trigger"${l.key===page?' aria-current="page"':''} data-i18n="nav.${l.key}">${l.label}
                <svg class="nav__dd-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </a>
              <div class="nav__dropdown-menu">
                <div class="nav__dropdown-inner">
                  ${l.sub.map(s=>`<a href="${s.href}" class="nav__dd-item">${s.icon||""}<span>${s.label}</span></a>`).join("")}
                </div>
              </div>
            </div>`;
          }
          return `<a href="${l.href}"${l.key===page?' aria-current="page"':''} data-i18n="nav.${l.key}">${l.label}</a>`;
        }).join("")}
      </nav>
      <div class="nav__actions">
        <div class="cafe-pin" id="cafePin">
          <button class="nav__icon" id="cafePinBtn" aria-label="Café-Infos: Adresse & Öffnungszeiten" aria-expanded="false" aria-haspopup="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </button>
          <div class="cafe-pop" id="cafePop" hidden role="dialog" aria-label="Café-Infos">
            <strong>Macaron by Pynk</strong>
            <p>${CONFIG.address}</p>
            <p>${CONFIG.hours}</p>
            <a class="btn btn--primary btn--sm btn--block" href="cafe.html">Zum Café &amp; Route</a>
          </div>
        </div>
        <div class="lang-toggle" role="group" data-i18n-aria="a11y.lang" aria-label="Sprache wählen">
          <button class="lang-toggle__btn" data-lang="de" type="button" aria-pressed="true">DE</button>
          <button class="lang-toggle__btn" data-lang="en" type="button" aria-pressed="false">EN</button>
        </div>
        <button class="nav__icon" id="cartBtn" data-i18n-aria="a11y.cart" aria-label="Warenkorb öffnen" aria-haspopup="dialog">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="cart-badge" id="cartBadge" hidden>0</span>
        </button>
        <button class="nav__toggle" id="navToggle" aria-label="Menü öffnen" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>`;
  document.body.prepend(header);

  // FOOTER
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.innerHTML = `
    <div class="wrap footer__grid">
      <div>
        <a href="index.html" class="brand">Macaron <em>by Pynk</em></a>
        <p class="footer__tag" data-i18n="footer.tag">Handgemachte Macarons aus Hamburg. Französische Technik, verspielte Seele – zum Verschenken, Mitnehmen und Verlieben.</p>
      </div>
      <nav class="footer__col" aria-label="Entdecken">
        <h4 data-i18n="footer.discover">Entdecken</h4>
        <a href="shop.html" data-i18n="footer.shop">Shop</a>
        <a href="events.html">Events &amp; Anlässe</a>
        <a href="partner.html">Partner &amp; B2B</a>
        <a href="cafe.html#story">Über uns</a>
      </nav>
      <div class="footer__col">
        <h4 data-i18n="footer.visit">Besuch uns</h4>
        <p>${CONFIG.address}</p>
        <p>${CONFIG.hours}</p>
        <p>${CONFIG.phone}</p>
        <p>${CONFIG.email}</p>
        <a href="cafe.html" style="font-weight:800;color:var(--pynk-soft)">Café &amp; Route</a>
      </div>
      <div class="footer__col footer__col--news">
        <h4 data-i18n="footer.news">Süße Post</h4>
        <p data-i18n="footer.newsText">Neue Sorten & Aktionen – ein Mail pro Monat, versprochen.</p>
        <form class="newsletter" id="newsletter">
          <input type="email" placeholder="deine@mail.de" data-i18n-ph="news.ph" aria-label="E-Mail für Newsletter" required>
          <button type="submit" aria-label="Abonnieren"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </form>
        <div class="socials">
          <a href="${CONFIG.instagram}" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="https://facebook.com/pynkhamburg" aria-label="Facebook" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="wrap footer__base">
      <p>© <span id="year"></span> ${CONFIG.brand} · <span data-i18n="footer.copy">Mit Liebe gebacken in Hamburg</span></p>
      <nav class="footer__legal" aria-label="Rechtliches">
        <a href="impressum.html">Impressum</a>
        <a href="datenschutz.html">Datenschutz</a>
        <a href="agb.html">AGB</a>
        <a href="widerruf.html">Widerruf</a>
        <a href="versand-zahlung.html">Versand &amp; Zahlung</a>
        <a href="kontakt.html">Kontakt</a>
        <button type="button" id="ccReopen" class="footer__legal-btn" data-i18n="footer.cookie">Cookie-Einstellungen</button>
      </nav>
    </div>`;
  document.body.appendChild(footer);

  // M3 BOTTOM NAVIGATION BAR (phones ≤767px) — primary thumb-reach nav
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const bottomnav = document.createElement("nav");
  bottomnav.className = "m3-navbar";
  bottomnav.setAttribute("aria-label", "Hauptbereiche");
  bottomnav.innerHTML = BOTTOMNAV.map(t=>{
    const active = (here === t.href) || (here === "" && t.href === "index.html");
    return `<a class="m3-navtab${active?' is-active':''}" href="${t.href}"${active?' aria-current="page"':''}>
        <span class="m3-navtab__ind">
          <span class="m3-navtab__icon m3-navtab__icon--on" aria-hidden="true">${t.on}</span>
          <span class="m3-navtab__icon m3-navtab__icon--off" aria-hidden="true">${t.off}</span>
        </span>
        <span class="m3-navtab__label" data-i18n="${t.i18n}">${t.label}</span>
      </a>`;
  }).join("");
  document.body.appendChild(bottomnav);

  // DRAWER + fly + toast
  const extra = document.createElement("div");
  extra.innerHTML = `
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer__scrim" id="drawerScrim"></div>
      <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Warenkorb">
        <div class="drawer__head">
          <div class="drawer__head-left">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <h2 data-i18n="cart.title">Dein Warenkorb</h2>
            <span class="drawer__count" id="drawerCount"></span>
          </div>
          <button class="drawer__close" id="drawerClose" aria-label="Schließen"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        </div>

        <div class="drawer__ship-bar" id="shipProgress" hidden>
          <div class="drawer__ship-inner">
            <p class="drawer__ship-label" id="shipLabel"></p>
            <div class="drawer__ship-track"><span class="drawer__ship-fill" id="shipBar"></span></div>
            <div class="drawer__ship-milestones">
              <span class="drawer__milestone" data-at="39">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 4h13v11H1z"/><path d="M14 8h4l3 3v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/></svg>
                Gratis-Versand
              </span>
              <span class="drawer__milestone" data-at="50">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 12v10H4V12"/><path d="M2 7h20v5H2z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
                Geschenk
              </span>
            </div>
          </div>
        </div>

        <div class="drawer__scroll">
          <div class="drawer__body" id="cartItems"></div>

          <div class="drawer__cross" id="cartCrossSell" hidden>
            <p class="drawer__cross-title">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
              Dazu passt
            </p>
            <div class="drawer__cross-items" id="crossSellItems"></div>
          </div>
        </div>

        <div class="drawer__foot">
          <div class="drawer__total">
            <span data-i18n="cart.subtotal">Zwischensumme</span>
            <strong id="cartTotal">0,00 €</strong>
          </div>
          <div class="drawer__trust-row">
            <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg> Sichere Bestellung</span>
            <span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg> Inkl. MwSt.</span>
          </div>
          <a class="btn btn--primary btn--block drawer__checkout-btn" id="toCheckout" href="checkout.html" data-i18n="cart.checkout">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
            Zur Kasse
          </a>
          <p class="drawer__note" data-i18n="cart.note">Versand ab 39 € kostenlos · Abholung gratis</p>
          <label class="drawer__news" id="cartNews">
            <input type="checkbox" id="cartNewsCheck" />
            <span>Ja, ich möchte süße Post – neue Sorten & Aktionen per Newsletter.</span>
          </label>
        </div>
      </aside>
    </div>
    <div id="flyLayer" aria-hidden="true"></div>
    <div class="pdp" id="pdp" hidden>
      <div class="pdp__scrim" id="pdpScrim"></div>
      <div class="pdp__panel">
        <button class="pdp__close" id="pdpClose" type="button" aria-label="Schließen"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        <div class="pdp__media"><img id="pdpImg" alt="" /></div>
        <div class="pdp__body">
          <h2 class="pdp__name" id="pdpName" aria-hidden="true"></h2>
          <p class="pdp__desc" id="pdpDesc"></p>
          <div class="pdp__bundles" id="pdpBundles" role="radiogroup" aria-label="Menge wählen"></div>
          <div class="pdp__total"><span class="pdp__total-price" id="pdpPrice"></span><span class="pdp__total-vat">inkl. MwSt. · <a href="versand-zahlung.html">zzgl. Versand</a></span></div>
          <button class="btn btn--primary btn--block pdp__add" id="pdpAdd" type="button">In den Warenkorb</button>
          <p class="pdp__trust">Perfekt als Geschenk verpackt in der edlen Pynk-Magnetbox. Versand ab 35 € kostenlos.</p>
        </div>
      </div>
    </div>
    <div id="toast" class="toast" role="status" aria-live="polite" hidden></div>
    <div class="cc" id="cookieBanner" role="dialog" aria-modal="false" aria-label="Cookie-Einwilligung" aria-describedby="ccText" hidden>
      <div class="cc__panel">
        <h2 class="cc__title" data-i18n="cookie.title">Wir respektieren deine Privatsphäre</h2>
        <p class="cc__text" id="ccText" data-i18n="cookie.text">Wir setzen Cookies ein. Notwendige Cookies halten den Shop am Laufen (z. B. Warenkorb). Statistik- und Marketing-Cookies nur mit deiner Einwilligung – freiwillig und jederzeit über „Cookie-Einstellungen" im Footer widerrufbar. Details in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
        <div class="cc__cats" id="ccCats" hidden>
          <label class="cc__cat"><span><strong data-i18n="cookie.necessary">Notwendig</strong><small data-i18n="cookie.necessaryDesc">Warenkorb, Sicherheit – immer aktiv</small></span><input type="checkbox" checked disabled aria-label="Notwendige Cookies, immer aktiv"></label>
          <label class="cc__cat"><span><strong data-i18n="cookie.stats">Statistik</strong><small data-i18n="cookie.statsDesc">Anonyme Reichweitenmessung</small></span><input type="checkbox" id="ccStats"></label>
          <label class="cc__cat"><span><strong data-i18n="cookie.marketing">Marketing</strong><small data-i18n="cookie.marketingDesc">Personalisierte Inhalte</small></span><input type="checkbox" id="ccMark"></label>
        </div>
        <div class="cc__actions">
          <button class="cc__btn cc__btn--reject" id="ccReject" type="button" data-i18n="cookie.reject">Alle ablehnen</button>
          <button class="cc__btn cc__btn--accept" id="ccAccept" type="button" data-i18n="cookie.accept">Alle akzeptieren</button>
        </div>
        <div class="cc__sub">
          <button class="cc__link" id="ccSettings" type="button" aria-expanded="false" aria-controls="ccCats" data-i18n="cookie.settings">Einstellungen</button>
          <button class="cc__link" id="ccSave" type="button" hidden data-i18n="cookie.save">Auswahl speichern</button>
        </div>
      </div>
    </div>
    <div class="fab" id="fab">
      <a class="fab__btn fab__btn--call" href="tel:${CONFIG.phone.replace(/[^\d+]/g,"")}" data-i18n-aria="a11y.call" aria-label="Jetzt anrufen">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>
      </a>
      <a class="fab__btn fab__btn--wa" href="https://wa.me/${waNumber()}" target="_blank" rel="noopener" data-i18n-aria="a11y.wa" aria-label="Auf WhatsApp schreiben">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.4.1.8-.1 1.5Z"/></svg>
      </a>
    </div>`;
  document.body.appendChild(extra);

  const y=$("#year"); if(y) y.textContent=new Date().getFullYear();
  wireNav(hasHero);
  wireDrawer();
  wireConsent();
  wireLang();
  wireCafePin();
  setLang(LANG);

  // Scroll-to-top button (long pages)
  const stt = document.createElement("button");
  stt.className = "scroll-top";
  stt.setAttribute("aria-label", "Nach oben scrollen");
  stt.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  stt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(stt);
  let sttVisible = false;
  window.addEventListener("scroll", () => {
    const show = window.scrollY > 600;
    if (show !== sttVisible) { sttVisible = show; stt.classList.toggle("is-visible", show); }
  }, { passive: true });
}

/* ============================================================
   COOKIE CONSENT (DSGVO) — echtes Opt-In, gleichwertige Buttons
   ============================================================ */
function applyConsent(c){
  window.__consent = c;
  // HOOK: Statistik-/Marketing-Skripte NUR hier laden, wenn erlaubt:
  // if (c.stats)  { /* load analytics */ }
  // if (c.marketing) { /* load marketing pixels */ }
}
function wireConsent(){
  const banner=$("#cookieBanner"); if(!banner) return;
  const reopen=$("#ccReopen"); if(reopen) reopen.addEventListener("click",()=>{ banner.hidden=false; $("#ccReject")?.focus(); });
  let saved=null; try{ saved=JSON.parse(localStorage.getItem("pynk_consent")||"null"); }catch(e){}
  if(saved){ applyConsent(saved); return; }
  banner.hidden=false;
  const cats=$("#ccCats"), settingsBtn=$("#ccSettings"), saveBtn=$("#ccSave");
  const store=c=>{ localStorage.setItem("pynk_consent",JSON.stringify(c)); applyConsent(c); banner.hidden=true; if(typeof toast==="function") toast("Cookie-Einstellungen gespeichert"); };
  $("#ccAccept").addEventListener("click",()=>store({necessary:true,stats:true,marketing:true,ts:Date.now()}));
  $("#ccReject").addEventListener("click",()=>store({necessary:true,stats:false,marketing:false,ts:Date.now()}));
  settingsBtn.addEventListener("click",()=>{ const open=cats.hidden; cats.hidden=!open; saveBtn.hidden=!open; settingsBtn.setAttribute("aria-expanded",String(open)); });
  saveBtn.addEventListener("click",()=>store({necessary:true,stats:$("#ccStats").checked,marketing:$("#ccMark").checked,ts:Date.now()}));
}

function wireCafePin(){
  const wrap=$("#cafePin"), btn=$("#cafePinBtn"), pop=$("#cafePop");
  if(!wrap||!btn||!pop) return;
  const close=()=>{ pop.hidden=true; btn.setAttribute("aria-expanded","false"); };
  const open=()=>{ pop.hidden=false; btn.setAttribute("aria-expanded","true"); };
  btn.addEventListener("click",e=>{ e.stopPropagation(); pop.hidden?open():close(); });
  document.addEventListener("click",e=>{ if(!wrap.contains(e.target)) close(); });
  document.addEventListener("keydown",e=>{ if(e.key==="Escape") close(); });
}

function wireNav(hasHero){
  const nav=$(".nav"), toggle=$("#navToggle"), links=$("#navLinks");
  toggle.addEventListener("click",()=>{
    const open=links.classList.toggle("open");
    toggle.setAttribute("aria-expanded",open);
    toggle.setAttribute("aria-label",open?"Menü schließen":"Menü öffnen");
  });
  links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));
  if(hasHero){
    const onScroll=()=>{ nav.classList.toggle("solid", window.scrollY>40); };
    onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
  }
}

/* ============================================================
   CART (localStorage, cross-page)
   ============================================================ */
let cart = [];
try{ cart = JSON.parse(localStorage.getItem("pynk_cart")||"[]"); }catch(e){ cart=[]; }
const saveCart = ()=> localStorage.setItem("pynk_cart", JSON.stringify(cart));

const cartCount = ()=> cart.reduce((n,i)=>n+i.qty,0);
const cartTotal = ()=> cart.reduce((s,i)=>s+i.price*i.qty,0);

/* Revenue thresholds */
const FREE_SHIP = 39;   // € for free shipping
const GIFT_AT   = 50;   // € for automatic gift

function addToCart(item){
  const ex=cart.find(i=>i.key===item.key);
  if(ex) ex.qty+=item.qty||1; else cart.push({...item,qty:item.qty||1});
  saveCart(); updateCart();
}
function changeQty(key,d){ const it=cart.find(i=>i.key===key); if(!it)return; it.qty+=d; if(it.qty<=0)cart=cart.filter(i=>i.key!==key); saveCart(); updateCart(); }
function removeItem(key){ cart=cart.filter(i=>i.key!==key); saveCart(); updateCart(); }

function updateCart(){
  // --- Sticky Mini-Warenkorb (mobil) — Runde 2 #5 ---
  (function(){
    var mc = document.getElementById("miniCart");
    if(!mc){
      mc = document.createElement("button");
      mc.id = "miniCart"; mc.type = "button"; mc.className = "mini-cart";
      mc.setAttribute("aria-label", "Warenkorb ansehen");
      mc.addEventListener("click", function(){ if(typeof openDrawer === "function") openDrawer(); });
      document.body.appendChild(mc);
    }
    var n = cartCount();
    if(n > 0){
      mc.innerHTML = '<span class="mini-cart__left"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> <strong>' + n + '</strong> Artikel</span>'
        + '<span class="mini-cart__right"><span class="mini-cart__total">' + EUR(cartTotal()) + '</span>'
        + '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>';
      mc.classList.add("is-visible");
      document.body.classList.add("has-mini-cart");
    } else {
      mc.classList.remove("is-visible");
      document.body.classList.remove("has-mini-cart");
    }
  })();

  // Automatic gift: add/remove the free gift line based on paid subtotal
  const paidTotal = cart.filter(i=>i.key!=="p-"+GIFT_ID).reduce((s,i)=>s+i.price*i.qty,0);
  const hasGift = cart.some(i=>i.key==="p-"+GIFT_ID);
  if(paidTotal>=GIFT_AT && !hasGift){
    const g=PRODUCTS.find(p=>p.id===GIFT_ID);
    if(g) cart.push({key:"p-"+GIFT_ID,name:g.name,meta:"Geschenk – gratis ab "+GIFT_AT+" €",price:0,qty:1,thumb:`<img src="${g.img}" alt="">`,gift:true});
  } else if(paidTotal<GIFT_AT && hasGift){
    cart=cart.filter(i=>i.key!=="p-"+GIFT_ID);
  }

  const n=cartCount(), badge=$("#cartBadge");
  if(badge){ badge.textContent=n; badge.hidden=n===0; badge.classList.remove("pop"); void badge.offsetWidth; if(n)badge.classList.add("pop"); }

  const drawerCount=$("#drawerCount");
  if(drawerCount) drawerCount.textContent=n>0?`${n} Artikel`:"";

  const items=$("#cartItems");
  if(items){
    if(!cart.length){
      items.innerHTML=`<div class="drawer__empty">
        <div class="drawer__empty-icon">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <p class="drawer__empty-title">Dein Warenkorb ist leer</p>
        <p class="drawer__empty-sub">Zeit für ein paar Macarons?</p>
        <a href="shop.html" class="btn btn--primary btn--sm">Zum Shop</a>
      </div>`;
    } else {
      items.innerHTML=cart.map((i,idx)=>`
        <div class="citem${i.gift?' citem--gift':''}" style="animation-delay:${idx*40}ms">
          <div class="citem__media">${i.thumb||""}</div>
          <div class="citem__info">
            <div class="citem__name">${i.name}</div>
            ${i.meta?`<div class="citem__meta">${i.meta}</div>`:""}
            ${i.gift?'<span class="citem__gift-badge">Geschenk</span>':''}
            <div class="citem__actions">
              <div class="qty"><button data-dec="${i.key}" aria-label="Weniger">−</button><span>${i.qty}</span><button data-inc="${i.key}" aria-label="Mehr">+</button></div>
              <button class="citem__remove" data-rm="${i.key}">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
          <div class="citem__price">${EUR(i.price*i.qty)}</div>
        </div>`).join("");
    }
  }
  const total=cartTotal();
  const tot=$("#cartTotal"); if(tot) tot.textContent=EUR(total);

  // Free-shipping progress
  const prog=$("#shipProgress");
  if(prog){
    if(!cart.length){ prog.hidden=true; }
    else {
      prog.hidden=false;
      const pct=Math.min(100, Math.round(total/FREE_SHIP*100));
      const bar=$("#shipBar"); if(bar) bar.style.width=pct+"%";
      const label=$("#shipLabel");
      if(label){
        if(total>=GIFT_AT){
          label.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> <strong>Gratis-Versand</strong> + <strong>Geschenk</strong> freigeschaltet!';
        } else if(total>=FREE_SHIP){
          label.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> <strong>Gratis-Versand</strong> freigeschaltet! Noch ' + EUR(GIFT_AT-total) + ' bis zum Geschenk';
        } else {
          label.innerHTML='Noch <strong>' + EUR(FREE_SHIP-total) + '</strong> bis zum kostenlosen Versand';
        }
      }
      $$(".drawer__milestone").forEach(m=>{
        const at=+m.dataset.at;
        m.classList.toggle("is-reached", total>=at);
      });
    }
  }

  // Cross-sell: show random products not in cart
  const crossSell=$("#cartCrossSell"), crossItems=$("#crossSellItems");
  if(crossSell && crossItems){
    if(!cart.length){ crossSell.hidden=true; }
    else {
      const inCart=new Set(cart.map(i=>i.key));
      const available=PRODUCTS.filter(p=>p.crossSell && !inCart.has("p-"+p.id));
      const shopItems=PRODUCTS.filter(p=>p.cat==="box" && !p.custom && !inCart.has("p-"+p.id));
      const pool=[...available];
      while(pool.length<2 && shopItems.length){ pool.push(shopItems.splice(Math.floor(Math.random()*shopItems.length),1)[0]); }
      const show=pool.slice(0,2);
      if(show.length){
        crossSell.hidden=false;
        crossItems.innerHTML=show.map(p=>`
          <div class="cross-item">
            <img src="${p.img}" width="52" height="52" alt="${p.name}" loading="lazy">
            <div class="cross-item__info">
              <span class="cross-item__name">${p.name}</span>
              <span class="cross-item__price">${EUR(p.price)}</span>
            </div>
            <button class="cross-item__add" data-cross="${p.id}" type="button" aria-label="${p.name} hinzufügen">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>`).join("");
      } else { crossSell.hidden=true; }
    }
  }

  const co=$("#toCheckout"); if(co){ co.classList.toggle("is-disabled",!cart.length); }
  const fs=$("#formSummary"); if(fs) renderFormSummary();
  if($("#coItems")) renderCheckout();
}

function wireDrawer(){
  const drawer=$("#drawer"); let lastFocus=null;
  const open=()=>{ lastFocus=document.activeElement; drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; $("#drawerClose").focus(); };
  const close=()=>{ drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden","true"); document.body.style.overflow=""; if(lastFocus)lastFocus.focus(); };
  $("#cartBtn").addEventListener("click",open);
  $("#drawerClose").addEventListener("click",close);
  $("#drawerScrim").addEventListener("click",close);
  document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&drawer.classList.contains("is-open"))close(); });
  $("#cartItems").addEventListener("click",e=>{
    const inc=e.target.closest("[data-inc]"),dec=e.target.closest("[data-dec]"),rm=e.target.closest("[data-rm]");
    if(inc)changeQty(inc.dataset.inc,1); if(dec)changeQty(dec.dataset.dec,-1); if(rm)removeItem(rm.dataset.rm);
  });
  // Cross-sell clicks
  document.addEventListener("click",e=>{
    const btn=e.target.closest("[data-cross]");
    if(!btn) return;
    const p=PRODUCTS.find(x=>x.id===btn.dataset.cross);
    if(!p) return;
    addToCart({key:"p-"+p.id,name:p.name,meta:({box:"15er-Box",addon:"Add-on",gutschein:"Gutschein"})[p.cat]||"",price:p.price,thumb:`<img src="${p.img}" alt="">`});
    toast(p.name+" hinzugefügt");
  });
  // Newsletter opt-in (persist choice)
  const news=$("#cartNewsCheck");
  if(news){
    try{ news.checked = localStorage.getItem("pynk_news")==="1"; }catch(e){}
    news.addEventListener("change",()=>{ try{ localStorage.setItem("pynk_news", news.checked?"1":"0"); }catch(e){} if(news.checked && typeof toast==="function") toast("Danke! Du bekommst süße Post."); });
  }
  window.openDrawer=open;
}

function wireDropdowns(){
  $$(".nav__dropdown").forEach(dd=>{
    const trigger=dd.querySelector(".nav__dropdown-trigger");
    const menu=dd.querySelector(".nav__dropdown-menu");
    if(!trigger||!menu) return;
    let hoverTimeout;
    dd.addEventListener("mouseenter",()=>{clearTimeout(hoverTimeout); dd.classList.add("is-open");});
    dd.addEventListener("mouseleave",()=>{hoverTimeout=setTimeout(()=>dd.classList.remove("is-open"),200);});
    trigger.addEventListener("click",e=>{
      if(window.innerWidth<=860){ e.preventDefault(); dd.classList.toggle("is-open"); }
    });
  });
}

/* fly-to-cart */
function flyToCart(src){
  if(reduceMotion||!src)return;
  const fly=$("#flyLayer"), cartBtn=$("#cartBtn"); if(!fly||!cartBtn)return;
  const s=src.getBoundingClientRect(), t=cartBtn.getBoundingClientRect();
  const c=document.createElement("div"); c.className="fly";
  const img=src.querySelector("img");
  c.innerHTML=img?`<img src="${img.src}" alt="">`:src.innerHTML;
  c.style.left=s.left+s.width/2-31+"px"; c.style.top=s.top+s.height/2-31+"px";
  fly.appendChild(c);
  const dx=(t.left+t.width/2)-(s.left+s.width/2), dy=(t.top+t.height/2)-(s.top+s.height/2);
  c.animate([{transform:"translate(0,0) scale(1)",opacity:1},{transform:`translate(${dx}px,${dy}px) scale(.25)`,opacity:.2}],{duration:700,easing:"cubic-bezier(.55,-.2,.4,1)"}).onfinish=()=>c.remove();
}

/* ============================================================
   PRODUCT GRID (shop)
   ============================================================ */
function thumbFor(p){ return p.img ? `<img src="${p.img}" alt="">` : macaronHTML(FC[p.flavour]); }

/* ---- PAngV / LMIV helpers (Grundpreis, Allergene, Zutaten) ---- */
const WEIGHT_G = { macaron:12, baer:15, cupcake:45, box:0 };
const BASE_ALLERG = ["Hühnerei","Mandeln (Schalenfrüchte)","Milch"];
const EXTRA_ALLERG = {
  pistazie:["Pistazien (Schalenfrüchte)"], schokolade:["Soja"], latte:["Soja"],
  cookies:["Glutenhaltiges Getreide (Weizen)","Soja"], cheesecake:["Glutenhaltiges Getreide (Weizen)"]
};
function allergensFor(p){ return [...new Set([...BASE_ALLERG, ...(EXTRA_ALLERG[p.flavour]||[])])]; }
function grundpreisStr(p){ const w=WEIGHT_G[p.cat]||0; return w ? `${EUR(p.price/w*100)} / 100 g` : ""; }
function ingredientsFor(p){ return `Mandeln, Puderzucker, Eiweiß (Hühnerei), Zucker, Butter, ${p.name}-Zubereitung, Lebensmittelfarbe.`; }

function renderProducts(filter="all"){
  const grid=$("#productGrid"); if(!grid)return;
  grid.innerHTML=PRODUCTS.filter(p=>!p.noShop && (filter==="all"||p.cat===filter)).map(p=>{
    const gp=grundpreisStr(p);
    return `
    <article class="pcard reveal" data-id="${p.id}">
      <div class="pcard__media">
        <img src="${p.img}" width="384" height="384" loading="lazy" alt="${p.name} – ${p.desc}">
      </div>
      <div class="pcard__body">
        <h3 class="pcard__name"><span class="pcard__dot" style="background:${FC[p.flavour]}"></span>${p.name}</h3>
        <p class="pcard__desc">${p.desc}</p>
        <p class="pcard__delivery"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Frisch gebacken · versandfertig in 1–2 Werktagen</p>
        <details class="allergens">
          <summary>Zutaten &amp; Allergene</summary>
          <div class="allergens__body">
            <p><strong>Zutaten:</strong> ${ingredientsFor(p)}</p>
            <p><strong>Allergene:</strong> ${allergensFor(p).join(", ")}. Kann Spuren weiterer Schalenfrüchte enthalten.</p>
          </div>
        </details>
        <div class="pcard__foot">
          <span class="pcard__price-wrap">
            <span class="pcard__price">${EUR(p.price)}</span>
            <span class="pcard__vat">inkl. MwSt.${gp?` · ${gp}`:""} · <a href="versand-zahlung.html">zzgl. Versand</a></span>
          </span>
          <button class="pcard__add" data-add="${p.id}" aria-label="${p.name} in den Warenkorb legen"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>
        </div>
      </div>
    </article>`;}).join("");
  observeReveals();
}
function wireGrid(){
  const grid=$("#productGrid"); if(!grid)return;
  $$(".filter").forEach(b=>b.addEventListener("click",()=>{
    $$(".filter").forEach(x=>{x.classList.remove("is-active");x.setAttribute("aria-selected","false");});
    b.classList.add("is-active"); b.setAttribute("aria-selected","true");
    renderProducts(b.dataset.filter);
  }));
  grid.addEventListener("click",e=>{
    const btn=e.target.closest("[data-add]");
    const card=e.target.closest(".pcard");
    if(btn){
      e.stopPropagation();
      const p=PRODUCTS.find(x=>x.id===btn.dataset.add);
      flyToCart(btn.closest(".pcard").querySelector(".pcard__media"));
      addToCart({key:"p-"+p.id,name:p.name,meta:({box:"15er-Box",addon:"Extra",gutschein:"Gutschein"})[p.cat]||"",price:p.price,thumb:`<img src="${p.img}" alt="">`});
      toast(`${p.name} hinzugefügt`);
      return;
    }
    if(card && card.dataset.id) openPDP(card.dataset.id);
  });
}

/* ============================================================
   PRODUCT DETAIL MODAL (Single-Flavor Bundles)
   ============================================================ */
const BUNDLE_NAMES={
  pistazie:{s6:"Pistachio Dreams",s12:"The Green Obsession"},
  matcha:{s6:"Matcha Ritual",s12:"Zen Garden Collection"},
  erdbeere:{s6:"Strawberry Bliss",s12:"Berry Romance"},
  himbeere:{s6:"Raspberry Rush",s12:"Crimson Crush"},
  schokolade:{s6:"Cocoa Affair",s12:"Dark Temptation"},
  kokos:{s6:"Coconut Escape",s12:"Tropical Paradise"},
  wildberry:{s6:"Berry Fever",s12:"The Wild Collection"},
  vanille:{s6:"Vanilla Cloud",s12:"Ivory Indulgence"},
  karamell:{s6:"Caramel Kiss",s12:"Golden Indulgence"},
  latte:{s6:"Espresso Escape",s12:"Latte Lovers Box"},
  cheesecake:{s6:"Cheesecake Bliss",s12:"New York Dreams"},
  lavendel:{s6:"Lavender Haze",s12:"Provence Collection"},
  zitrone:{s6:"Lemon Squeeze",s12:"Sunshine Box"},
  limette:{s6:"Mojito Vibes",s12:"Fresh Breeze Box"},
  mango:{s6:"Mango Tango",s12:"Tropical Heat"},
  orange:{s6:"Orange Blossom",s12:"Citrus Collection"},
  cookies:{s6:"Cookie Monster",s12:"Cookies Galore"},
  minze:{s6:"Cool Mint",s12:"Arctic Collection"},
  heidelbeere:{s6:"Blueberry Hill",s12:"Midnight Berries"},
  _default:{s6:"Pynk Selection",s12:"Pynk Signature Box"}
};
let _pdpProduct=null, _pdpQty=1;

function openPDP(productId){
  const p=PRODUCTS.find(x=>x.id===productId);
  if(!p) return;
  if(p.cat!=="macaron" && p.cat!=="baer" && p.cat!=="cupcake") return;
  _pdpProduct=p; _pdpQty=1;
  const modal=$("#pdp"); if(!modal) return;
  $("#pdpImg").src=p.img; $("#pdpImg").alt=p.name;
  $("#pdpName").textContent=p.name; $("#pdpName").removeAttribute("aria-hidden");
  $("#pdpDesc").textContent=p.desc;

  const bn=BUNDLE_NAMES[p.flavour]||BUNDLE_NAMES._default;
  const p6=+(p.price*6*0.90).toFixed(2);
  const p12=+(p.price*12*0.85).toFixed(2);

  $("#pdpBundles").innerHTML=`
    <label class="bundle-card is-active"><input type="radio" name="pdpBundle" value="1" checked />
      <span class="bundle-card__top"><span class="bundle-card__label">Zum Probieren</span><span class="bundle-card__sub">Einzelstück</span></span>
      <span class="bundle-card__price">${EUR(p.price)}</span></label>
    <label class="bundle-card"><input type="radio" name="pdpBundle" value="6" />
      <span class="bundle-card__top"><span class="bundle-card__label">${bn.s6}</span><span class="bundle-card__sub">6er Box · Spare 10 %</span></span>
      <span class="bundle-card__price">${EUR(p6)}</span></label>
    <label class="bundle-card"><span class="bundle-card__badge">Bestseller</span><input type="radio" name="pdpBundle" value="12" />
      <span class="bundle-card__top"><span class="bundle-card__label">${bn.s12}</span><span class="bundle-card__sub">12er Box · Spare 15 %</span></span>
      <span class="bundle-card__price">${EUR(p12)}</span></label>`;

  $("#pdpPrice").textContent=EUR(p.price);
  modal.hidden=false;
  document.body.style.overflow="hidden";
}

function updatePDPPrice(price){
  const el=$("#pdpPrice");
  if(!el) return;
  el.classList.add("is-changing");
  setTimeout(()=>{el.textContent=EUR(price);el.classList.remove("is-changing");},150);
}

function closePDP(){
  const modal=$("#pdp"); if(!modal) return;
  modal.hidden=true;
  document.body.style.overflow="";
  _pdpProduct=null;
}

function wirePDP(){
  if(!$("#pdp")) return;
  $("#pdpClose")?.addEventListener("click",closePDP);
  $("#pdpScrim")?.addEventListener("click",closePDP);
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#pdp").hidden)closePDP();});

  $("#pdpBundles")?.addEventListener("change",e=>{
    const v=+e.target.value;
    _pdpQty=v;
    $$(".bundle-card").forEach(c=>c.classList.remove("is-active"));
    e.target.closest(".bundle-card").classList.add("is-active");
    if(!_pdpProduct) return;
    const p=_pdpProduct.price;
    const total=v===1?p:v===6?+(p*6*0.90).toFixed(2):+(p*12*0.85).toFixed(2);
    updatePDPPrice(total);
  });

  $("#pdpAdd")?.addEventListener("click",()=>{
    if(!_pdpProduct) return;
    const p=_pdpProduct, q=_pdpQty;
    const bn=BUNDLE_NAMES[p.flavour]||BUNDLE_NAMES._default;
    const price=q===1?p.price:q===6?+(p.price*6*0.90).toFixed(2):+(p.price*12*0.85).toFixed(2);
    const name=q===1?p.name:q===6?`${bn.s6} (6× ${p.name})`: `${bn.s12} (12× ${p.name})`;
    const meta=q===1?"Einzelstück":q===6?"6er Box · 10 % Vorteil":"12er Box · 15 % Vorteil";
    addToCart({key:`bundle-${p.id}-${q}`,name,meta,price,thumb:`<img src="${p.img}" alt="">`});
    toast(name+" hinzugefügt");
    closePDP();
    if(typeof openDrawer==="function") openDrawer();
  });
}

/* ============================================================
   BOX BUILDER
   ============================================================ */
let boxSize=6, boxPrice=14, boxItems=[];
const BOX_PRICES={6:14,12:26};
function buildPalette(){
  const pal=$("#palette"); if(!pal)return;
  const keys=["erdbeere","himbeere","pistazie","matcha","limette","zitrone","mango","vanille","lavendel","kokos","schokolade","karamell","latte","wildberry"];
  pal.innerHTML=keys.map(k=>`<button class="chip" data-flav="${k}"><span class="chip__dot" style="background:${FC[k]}"></span>${FLAVOURS[k]}</button>`).join("");
}
function renderSlots(){
  const slots=$("#boxSlots"); if(!slots)return;
  slots.style.gridTemplateColumns=`repeat(${boxSize===6?3:4},1fr)`;
  slots.innerHTML="";
  for(let i=0;i<boxSize;i++){
    const d=document.createElement("div"); d.className="slot";
    if(boxItems[i]){ d.classList.add("slot--filled","drop"); d.innerHTML=macaronHTML(FC[boxItems[i]]); d.dataset.idx=i; d.setAttribute("role","button"); d.setAttribute("aria-label",FLAVOURS[boxItems[i]]+" entfernen"); }
    slots.appendChild(d);
  }
  $("#boxCount").textContent=boxItems.length;
  $("#boxMax").textContent=boxSize;
  $("#addBoxBtn").disabled=boxItems.length===0;
}
function wireBuilder(){
  if(!$("#boxSlots"))return;
  buildPalette();
  $$(".size").forEach(b=>b.addEventListener("click",()=>{
    $$(".size").forEach(x=>{x.classList.remove("is-active");x.setAttribute("aria-checked","false");});
    b.classList.add("is-active"); b.setAttribute("aria-checked","true");
    boxSize=+b.dataset.size; boxPrice=BOX_PRICES[boxSize]; if(boxItems.length>boxSize)boxItems=boxItems.slice(0,boxSize); renderSlots();
  }));
  $("#palette").addEventListener("click",e=>{ const c=e.target.closest("[data-flav]"); if(!c)return; if(boxItems.length>=boxSize){toast(`Die ${boxSize}er-Box ist voll`);return;} boxItems.push(c.dataset.flav); renderSlots(); });
  $("#boxSlots").addEventListener("click",e=>{ const s=e.target.closest(".slot--filled"); if(!s)return; boxItems.splice(+s.dataset.idx,1); renderSlots(); });
  $("#addBoxBtn").addEventListener("click",()=>{
    const counts={}; boxItems.forEach(f=>counts[f]=(counts[f]||0)+1);
    const meta=Object.entries(counts).map(([k,n])=>`${n}× ${FLAVOURS[k]}`).join(", ");
    flyToCart($("#pinkbox"));
    addToCart({key:"box-"+Date.now(),name:`${boxSize}er Box (eigene Auswahl)`,meta:meta||"gemischt",price:boxPrice,thumb:macaronHTML("#D81277")});
    toast(`${boxSize}er Box hinzugefügt`); boxItems=[]; renderSlots();
  });
  renderSlots();
}

/* ============================================================
   ORDER FORM (Kontakt) + ANFRAGE FORM (Spezial/B2B)
   ============================================================ */
function renderFormSummary(){
  const el=$("#formSummary"); if(!el)return;
  if(!cart.length){ el.innerHTML=`<p class="hint" style="text-align:center">Dein Warenkorb ist leer – <a href="shop.html" style="color:var(--pynk-deep);font-weight:800">zum Shop</a>.</p>`; return; }
  el.innerHTML=cart.map(i=>`<div class="sumline" style="display:flex;justify-content:space-between;padding:5px 0"><span>${i.qty}× ${i.name}</span><span>${EUR(i.price*i.qty)}</span></div>`).join("")+`<div style="display:flex;justify-content:space-between;border-top:1.5px solid rgba(201,162,75,.4);margin-top:8px;padding-top:10px;font-weight:800;font-size:1.1rem"><span>Summe</span><span>${EUR(cartTotal())}</span></div>`;
}
function wireSegmented(){ $$(".seg").forEach(seg=>seg.addEventListener("click",()=>{ const grp=seg.closest(".segmented"); grp.querySelectorAll(".seg").forEach(s=>s.classList.remove("is-active")); seg.classList.add("is-active"); seg.querySelector("input").checked=true; })); }
function validate(ids){ let ok=true; ids.forEach(id=>{ const inp=$("#"+id); if(!inp)return; const err=$(`.field__error[data-for="${id}"]`); if(!inp.value.trim()){ ok=false; inp.setAttribute("aria-invalid","true"); if(err)err.hidden=false; } else { inp.removeAttribute("aria-invalid"); if(err)err.hidden=true; } }); return ok; }

function wireOrderForm(){
  const form=$("#orderForm"); if(!form)return;
  renderFormSummary();
  const send=channel=>{
    if(!cart.length){ toast("Dein Warenkorb ist leer"); return; }
    if(!validate(["ofName","ofPhone"])){ const f=form.querySelector('[aria-invalid="true"]'); if(f)f.focus(); return; }
    const name=$("#ofName").value.trim(), phone=$("#ofPhone").value.trim();
    const fulfil=form.querySelector('input[name="fulfil"]:checked').value;
    const date=$("#ofDate").value, note=$("#ofNote").value.trim();
    let t=`Hallo ${CONFIG.brand}, ich möchte gern bestellen:\n\n`;
    cart.forEach(i=>t+=`• ${i.qty}× ${i.name}${i.meta?" ("+i.meta+")":""} – ${EUR(i.price*i.qty)}\n`);
    t+=`\nSumme: ${EUR(cartTotal())}\n\nName: ${name}\nTelefon: ${phone}\nAbwicklung: ${fulfil}\n`;
    if(date)t+=`Wunschtag: ${date}\n`; if(note)t+=`Nachricht: ${note}\n`;
    if(channel==="wa") window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(t)}`,"_blank","noopener");
    else window.location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent("Bestellung – "+CONFIG.brand)}&body=${encodeURIComponent(t)}`;
    toast("Bestellung wird geöffnet …");
  };
  form.addEventListener("submit",e=>{e.preventDefault();send("wa");});
  const m=$("#sendMail"); if(m)m.addEventListener("click",()=>send("mail"));
  ["ofName","ofPhone"].forEach(id=>{ const i=$("#"+id); if(i)i.addEventListener("input",()=>{ if(i.value.trim()){i.removeAttribute("aria-invalid");const e=$(`.field__error[data-for="${id}"]`);if(e)e.hidden=true;} }); });
}

function wireAnfrageForm(){
  const form=$("#anfrageForm"); if(!form)return;
  const fileInput=$("#afFile");
  if(fileInput) fileInput.addEventListener("change",()=>{ const n=fileInput.files[0]?.name; const lbl=$("#afFileLabel"); if(lbl)lbl.innerHTML=n?`<strong>${n}</strong> ausgewählt`:`Logo/Datei hochladen – <strong>durchsuchen</strong>`; });
  const send=channel=>{
    if(!validate(["afName","afEmail"])){ const f=form.querySelector('[aria-invalid="true"]'); if(f)f.focus(); return; }
    const name=$("#afName").value.trim(), email=$("#afEmail").value.trim(), phone=$("#afPhone").value.trim();
    const typ=$("#afTyp").value, date=$("#afDate").value, qty=$("#afQty").value.trim(), msg=$("#afMsg").value.trim();
    const file=$("#afFile")?.files[0]?.name;
    let t=`Anfrage an ${CONFIG.brand}:\n\nProdukt: ${typ}\n`;
    if(qty)t+=`Menge/Größe: ${qty}\n`; if(date)t+=`Wunschtermin: ${date}\n`;
    t+=`\nName: ${name}\nE-Mail: ${email}\n`; if(phone)t+=`Telefon: ${phone}\n`;
    if(msg)t+=`\nNachricht: ${msg}\n`;
    if(file)t+=`\nLogo/Datei: ${file} (bitte in der Antwort anhängen)\n`;
    if(channel==="wa") window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(t)}`,"_blank","noopener");
    else window.location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent("Anfrage "+typ+" – "+CONFIG.brand)}&body=${encodeURIComponent(t)}`;
    toast("Anfrage wird geöffnet …");
  };
  form.addEventListener("submit",e=>{e.preventDefault();send("mail");});
  const w=$("#afWa"); if(w)w.addEventListener("click",()=>send("wa"));
  ["afName","afEmail"].forEach(id=>{ const i=$("#"+id); if(i)i.addEventListener("input",()=>{ if(i.value.trim()){i.removeAttribute("aria-invalid");const e=$(`.field__error[data-for="${id}"]`);if(e)e.hidden=true;} }); });
}

/* newsletter */
function wireNewsletter(){ const f=$("#newsletter"); if(!f)return; f.addEventListener("submit",e=>{e.preventDefault(); toast("Danke! Bitte bestätige die E-Mail in deinem Postfach."); f.reset();}); }

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
let revObs;
function observeReveals(){
  if(reduceMotion){ $$(".reveal").forEach(el=>el.classList.add("in")); return; }
  if(!revObs){
    revObs=new IntersectionObserver(es=>{ es.forEach(en=>{ if(en.isIntersecting){ const sibs=[...en.target.parentElement.children].filter(c=>c.classList.contains("reveal")); const idx=Math.max(0,sibs.indexOf(en.target)); en.target.style.transitionDelay=Math.min(idx,6)*45+"ms"; en.target.classList.add("in"); revObs.unobserve(en.target); } }); },{threshold:.12,rootMargin:"0px 0px -40px 0px"});
  }
  $$(".reveal:not(.in)").forEach(el=>revObs.observe(el));
}

/* toast */
let toastT;
function toast(msg){ const el=$("#toast"); if(!el)return; el.textContent=msg; el.hidden=false; requestAnimationFrame(()=>el.classList.add("show")); clearTimeout(toastT); toastT=setTimeout(()=>{el.classList.remove("show");setTimeout(()=>el.hidden=true,300);},2600); }

/* ============================================================
   CHECKOUT (PAngV/BGB-konform) — Preisaufschlüsselung,
   Express-Pay, Button-Lösung. Zahlung: Provider noch anzubinden.
   ============================================================ */
const VAT_RATE = 0.07;        // Lebensmittel-Regelsatz (Annahme – steuerlich prüfen)
const SHIP_COST = 3.90, FREE_FROM = 35;
const waNumber = () => CONFIG.whatsapp.replace(/\D/g, "");   // wa.me braucht reine Ziffern

function coFulfil(){ const r=document.querySelector('input[name="coFulfil"]:checked'); return r?r.value:"Abholung"; }
function coPricing(){
  const sub=cartTotal();
  const ship=(coFulfil()==="Versand" && sub>0 && sub<FREE_FROM)?SHIP_COST:0;
  const total=sub+ship;
  return { sub, ship, total, vat: total - total/(1+VAT_RATE) };
}
function renderCheckout(){
  const list=$("#coItems"); if(!list) return;
  const countEl=$("#coCount");
  if(!cart.length){
    list.innerHTML=`<div class="co-empty"><svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><p>Dein Warenkorb ist leer.</p><a href="shop.html">Zum Shop →</a></div>`;
    if(countEl) countEl.textContent="0";
  } else {
    const totalQty=cart.reduce((s,i)=>s+i.qty,0);
    if(countEl) countEl.textContent=totalQty+" Artikel";
    list.innerHTML=cart.map(i=>`<div class="co-line"><span class="co-line__name">${i.qty}× ${i.name}${i.meta?`<small>${i.meta}</small>`:""}</span><span class="co-line__price">${EUR(i.price*i.qty)}</span></div>`).join("");
  }
  const p=coPricing(), set=(id,v)=>{const e=$("#"+id); if(e)e.textContent=v;};
  set("coSubtotal",EUR(p.sub));
  set("coShip", p.ship>0 ? EUR(p.ship) : (coFulfil()==="Versand"?"Kostenlos":"— (Abholung)"));
  set("coVat",EUR(p.vat));
  set("coTotal",EUR(p.total));
  updateCheckoutSubmit();
}
function updateCheckoutSubmit(){
  const btn=$("#coSubmit"); if(!btn)return;
  btn.disabled = !(cart.length && $("#coAgb")?.checked && $("#coWiderruf")?.checked);
}
function initCheckout(){
  if(!$("#coItems")) return;
  const addr=$("#coAddress");
  const toggleAddr=()=>{ if(addr) addr.hidden = coFulfil()!=="Versand"; };
  renderCheckout(); toggleAddr();

  $$(".co-seg").forEach(seg=>seg.addEventListener("click",()=>{
    $$(".co-seg").forEach(s=>{s.classList.remove("is-active");s.querySelector("input").checked=false;});
    seg.classList.add("is-active"); seg.querySelector("input").checked=true; toggleAddr(); renderCheckout();
  }));
  ["coAgb","coWiderruf"].forEach(id=>$("#"+id)?.addEventListener("change",updateCheckoutSubmit));

  const demo=name=>toast(`Demo: ${name} würde hier starten – Zahlungsanbieter wird noch angebunden.`);
  $("#payPaypal")?.addEventListener("click",()=>demo("PayPal"));
  $("#payApple")?.addEventListener("click",()=>demo("Apple Pay"));
  $("#payGoogle")?.addEventListener("click",()=>demo("Google Pay"));
  $("#payWhatsapp")?.addEventListener("click",()=>submitOrder(true));
  $("#checkoutForm")?.addEventListener("submit",e=>{e.preventDefault();submitOrder(false);});
  ["coName","coEmail","coPhone","coStreet","coZip","coCity"].forEach(id=>$("#"+id)?.addEventListener("input",()=>{ const i=$("#"+id); if(i.value.trim()){i.removeAttribute("aria-invalid");const e=$(`.field__error[data-for="${id}"]`);if(e)e.hidden=true;} }));

  function submitOrder(express){
    if(!cart.length){ toast("Dein Warenkorb ist leer"); return; }
    if(!express){
      const req=["coName","coEmail","coPhone"].concat(coFulfil()==="Versand"?["coStreet","coZip","coCity"]:[]);
      if(!validate(req)){ const f=$("#checkoutForm").querySelector('[aria-invalid="true"]'); if(f)f.focus(); return; }
      if(!$("#coAgb").checked || !$("#coWiderruf").checked){ toast("Bitte AGB und Widerruf bestätigen"); return; }
    }
    const p=coPricing();
    let t=`Verbindliche Bestellung – ${CONFIG.brand}:\n\n`;
    cart.forEach(i=>t+=`• ${i.qty}× ${i.name}${i.meta?" ("+i.meta+")":""} – ${EUR(i.price*i.qty)}\n`);
    t+=`\nZwischensumme: ${EUR(p.sub)}\nVersand: ${p.ship>0?EUR(p.ship):"kostenlos / Abholung"}\nGesamt: ${EUR(p.total)} (inkl. ${EUR(p.vat)} MwSt.)\n`;
    if(!express){
      t+=`\nName: ${$("#coName").value.trim()}\nE-Mail: ${$("#coEmail").value.trim()}\nTelefon: ${$("#coPhone").value.trim()}\nAbwicklung: ${coFulfil()}\n`;
      if(coFulfil()==="Versand") t+=`Lieferadresse: ${$("#coStreet").value.trim()}, ${$("#coZip").value.trim()} ${$("#coCity").value.trim()}\n`;
    }
    window.open(`https://wa.me/${waNumber()}?text=${encodeURIComponent(t)}`,"_blank","noopener");
    toast("Bestellung wird übermittelt …");
  }
}

/* ============================================================
   UPSELL + ABO + CHECKOUT EXTRAS
   ============================================================ */
function wireUpsell(){
  const btn=$("#upsellAdd"); if(!btn) return;
  btn.addEventListener("click",()=>{
    const p=PRODUCTS.find(x=>x.id==="crunch"); if(!p) return;
    addToCart({key:"p-crunch",name:p.name,meta:"Add-on",price:p.price,thumb:`<img src="${p.img}" alt="">`});
    toast("Pynk Crunch hinzugefügt");
  });
}

function wireMystery(){
  document.addEventListener("click",e=>{
    const btn=e.target.closest("[data-mystery]");
    if(!btn) return;
    const size=btn.dataset.mystery;
    const price=+btn.dataset.mysteryPrice;
    addToCart({
      key:"mystery-"+size,
      name:`Pynk Mystery Box (${size}er)`,
      meta:"Überraschungs-Auswahl",
      price,
      thumb:'<span style="font-size:1.8rem">🎁</span>'
    });
    toast("Mystery Box hinzugefügt");
    if(typeof openDrawer==="function") openDrawer();
  });
}

function wireCheckoutExtras(){
  const dateInput=$("#coDate");
  if(dateInput){
    const tmrw=new Date(); tmrw.setDate(tmrw.getDate()+1);
    dateInput.min=tmrw.toISOString().split("T")[0];
  }
  const kuehlCheck=$("#coKuehlCheck");
  if(kuehlCheck) kuehlCheck.addEventListener("change", renderCheckout);
}

// Patch coPricing to include Kühlversand
const _origCoPricing = typeof coPricing === "function" ? coPricing : null;
if(_origCoPricing){
  coPricing = function(){
    const p = _origCoPricing();
    const kuehl = $("#coKuehlCheck");
    if(kuehl && kuehl.checked) { p.total += 2.50; p.ship += 2.50; }
    p.vat = p.total - p.total/(1+VAT_RATE);
    return p;
  };
}

/* ============================================================
   M3 TOUCH RIPPLE + HAPTIC
   Visual ripple on tap (M3 standard), with optional real haptic
   on supported devices. Skipped under prefers-reduced-motion.
   Complements the static state-layer ::after/::before overlays.
   ============================================================ */
const RIPPLE_SEL = ".btn, .m3-navtab, .catcard, .pcard, .pay-btn, .filter";
function addRipple(e){
  if(reduceMotion) return;
  const el = e.target.closest(RIPPLE_SEL);
  if(!el || el.hasAttribute("disabled")) return;
  // host must clip + be a positioning context (most already are)
  const cs = getComputedStyle(el);
  if(cs.position === "static") el.style.position = "relative";
  el.style.overflow = "hidden";
  const r = el.getBoundingClientRect();
  const size = Math.max(r.width, r.height) * 1.1;
  const x = (e.clientX ?? r.left + r.width/2) - r.left;
  const y = (e.clientY ?? r.top + r.height/2) - r.top;
  const span = document.createElement("span");
  span.className = "m3-ripple";
  span.style.width = span.style.height = size + "px";
  span.style.left = (x - size/2) + "px";
  span.style.top  = (y - size/2) + "px";
  el.appendChild(span);
  span.addEventListener("animationend", ()=>span.remove(), {once:true});
  // subtle real haptic where supported (Android Chrome); guarded
  try{ navigator.vibrate && navigator.vibrate(8); }catch(_){}
}
function wireRipples(){
  document.addEventListener("pointerdown", addRipple, {passive:true});
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded",()=>{
  injectChrome();
  wireDropdowns();
  updateCart();
  renderProducts();
  wireGrid();
  wireBuilder();
  wireSegmented();
  wireOrderForm();
  wireAnfrageForm();
  wireNewsletter();
  initCheckout();
  wirePDP();
  wireMystery();
  wireCheckoutExtras();
  observeReveals();
  wireRipples();
});
