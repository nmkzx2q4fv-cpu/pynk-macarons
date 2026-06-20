/* ============================================================
   Pynk Macarons — shared app logic (multi-page)
   ============================================================ */

/* ---- CONFIG: echte Shop-Daten hier eintragen ---- */
const CONFIG = {
  brand: "Macarons by Pynk",
  whatsapp: "+49 15 228283124",                 // WhatsApp-Nummer, nur Ziffern inkl. Ländercode
  email: "pynk.coffee.hamburg@gmail.com",
  phone: "+49 15 228283124",
  address: "Musterstraße 1, 20095 Hamburg",  // bitte echte Adresse eintragen
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
    "nav.home":"Start","nav.shop":"Shop","nav.atelier":"Box-Atelier","nav.gutschein":"Gutscheine","nav.spezial":"Spezial & Anfrage","nav.b2b":"Firmenkunden","nav.ueber":"Über uns","nav.kontakt":"Kontakt",
    "a11y.cart":"Warenkorb öffnen","a11y.call":"Jetzt anrufen","a11y.wa":"Auf WhatsApp schreiben","a11y.lang":"Sprache wählen",
    "footer.tag":"Handgemachte Macarons aus Hamburg. Französische Technik, verspielte Seele – zum Verschenken, Mitnehmen und Verlieben.",
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
    "hero.lead":"Knusprige Schale, seidige Ganache, ein Kern, der auf der Zunge zergeht. Über 20 Sorten – jede einzelne von Hand gefüllt und bepinselt, frisch aus unserer Hamburger Manufaktur.",
    "hero.cta1":"Jetzt genießen","hero.cta2":"Box selbst füllen",
    "hero.trust":"<strong>4,9</strong>/5 · über <strong>1.200</strong> glückliche Bestellungen",
    "hero.scarcity":"Täglich nur in kleinen Chargen gebacken – solange der Vorrat reicht.",
    "cat.eyebrow":"Unsere Welt","cat.h2":"Wonach ist dir heute?",
    "best.eyebrow":"Beliebt diese Woche","best.h2":"Heute frisch aus dem Ofen","best.lead":"Eine handverlesene Auswahl – bei jedem Besuch neu gemischt. Welche verführt dich heute?",
    "builder.eyebrow":"Dein Box-Atelier","builder.h2":"Stell dir deine Box zusammen","builder.lead":"Wähle deinen Anlass – oder leg direkt los: Sorte antippen und zusehen, wie sie in die Schachtel fällt.",
    "builder.or":"Oder bau direkt hier deine Probier-Box:","builder.full":"Zum vollen Box-Atelier →",
    "occ.hochzeit":"Hochzeit","occ.babyparty":"Babyparty","occ.geschenk":"Geschenk","occ.firma":"Firmen-Event","occ.self":"Einfach so",
    "spezial.eyebrow":"Für große Momente","spezial.h2":"Wenn's etwas Besonderes sein darf","spezial.lead":"Macaron-Tower für die Hochzeit, ein Giant Macaron als Überraschung oder eure Logos essbar gedruckt.",
    "anlass.eyebrow":"Der perfekte Anlass","anlass.h2":"Ein Geschenk, das man nicht vergisst",
    "proof.eyebrow":"Vertraut von","proof.h2":"Schon für diese Marken gebacken",
    "versand.eyebrow":"So kommst du ran","versand.h2":"Abholen in Hamburg oder liefern lassen"
  },
  en: {
    "nav.home":"Home","nav.shop":"Shop","nav.atelier":"Box Atelier","nav.gutschein":"Gift Cards","nav.spezial":"Special & Enquiry","nav.b2b":"Business","nav.ueber":"About","nav.kontakt":"Contact",
    "a11y.cart":"Open cart","a11y.call":"Call now","a11y.wa":"Message on WhatsApp","a11y.lang":"Choose language",
    "footer.tag":"Handmade macarons from Hamburg. French technique, a playful soul – to gift, to take away, to fall in love with.",
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
    "hero.lead":"A crisp shell, silky ganache, a centre that melts on your tongue. Over 20 flavours – each one filled and hand-painted, fresh from our Hamburg atelier.",
    "hero.cta1":"Order now","hero.cta2":"Build your box",
    "hero.trust":"<strong>4.9</strong>/5 · over <strong>1,200</strong> happy orders",
    "hero.scarcity":"Baked daily in small batches only – while stocks last.",
    "cat.eyebrow":"Our world","cat.h2":"What are you craving today?",
    "best.eyebrow":"Popular this week","best.h2":"Fresh from the oven today","best.lead":"A hand-picked selection – reshuffled on every visit. Which one tempts you today?",
    "builder.eyebrow":"Your Box Atelier","builder.h2":"Compose your own box","builder.lead":"Pick your occasion – or dive straight in: tap a flavour and watch it drop into the box.",
    "builder.or":"Or build your tasting box right here:","builder.full":"Open the full Box Atelier →",
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

/* ---- Product catalog ---- */
const P_MAC = 2.90, P_BEAR = 3.90, P_CUP = 4.50;
const PRODUCTS = [
  // Macarons
  {id:"erdbeere-rose", cat:"macaron", name:"Erdbeere-Rose", flavour:"erdbeere", price:P_MAC, img:"img/mac-erdbeere.jpg", desc:"Fruchtige Erdbeere mit einem Hauch Rose."},
  {id:"himbeere", cat:"macaron", name:"Himbeere", flavour:"himbeere", price:P_MAC, img:"img/mac-himbeere.jpg", desc:"Spritzige Himbeere, leicht herb."},
  {id:"pistazie", cat:"macaron", name:"Pistazie", flavour:"pistazie", price:P_MAC, img:"img/mac-pistazie.jpg", desc:"Geröstete Pistazie, nussig & cremig."},
  {id:"matcha", cat:"macaron", name:"Matcha", flavour:"matcha", price:P_MAC, img:"img/mac-matcha.jpg", desc:"Zeremonien-Matcha, sanft erdig."},
  {id:"limette-minze", cat:"macaron", name:"Limette-Minze", flavour:"limette", price:P_MAC, img:"img/mac-limette.png", desc:"Frische Limette mit kühler Minze."},
  {id:"zitrone", cat:"macaron", name:"Zitrone", flavour:"zitrone", price:P_MAC, img:"img/mac-zitrone.jpg", desc:"Sonnige Zitrone mit Biss."},
  {id:"mango", cat:"macaron", name:"Mango", flavour:"mango", price:P_MAC, img:"img/mac-mango.jpg", desc:"Reife Mango, tropisch süß."},
  {id:"orange", cat:"macaron", name:"Orange", flavour:"orange", price:P_MAC, img:"img/mac-orange.jpg", desc:"Saftige Orange, fein-herb."},
  {id:"vanille", cat:"macaron", name:"Vanille-Mascarpone", flavour:"vanille", price:P_MAC, img:"img/mac-vanille.jpg", desc:"Bourbon-Vanille trifft Mascarpone."},
  {id:"lavendel", cat:"macaron", name:"Lavendel-Zitrone", flavour:"lavendel", price:P_MAC, img:"img/mac-lavendel.jpg", desc:"Zarter Lavendel mit Zitrone."},
  {id:"kokos-mango", cat:"macaron", name:"Kokos-Mango", flavour:"kokos", price:P_MAC, img:"img/mac-kokos.png", desc:"Cremige Kokos mit Mango."},
  {id:"cheesecake", cat:"macaron", name:"Blaubeer-Cheesecake", flavour:"cheesecake", price:P_MAC, img:"img/mac-cheesecake.jpg", desc:"Cheesecake mit Blaubeere."},
  {id:"schokolade", cat:"macaron", name:"Schokolade", flavour:"schokolade", price:P_MAC, img:"img/mac-schokolade.png", desc:"Dunkle Ganache, intensiv."},
  {id:"salzkaramell", cat:"macaron", name:"Salzkaramell", flavour:"karamell", price:P_MAC, img:"img/mac-salzkaramell.jpg", desc:"Karamell mit Fleur de Sel."},
  {id:"latte", cat:"macaron", name:"Latte Macchiato", flavour:"latte", price:P_MAC, img:"img/mac-latte.jpg", desc:"Espresso-Creme, mild & rund."},
  {id:"cookies", cat:"macaron", name:"Cookies & Cream", flavour:"cookies", price:P_MAC, img:"img/mac-cookies.png", desc:"Knusprige Cookies in Vanillecreme."},
  {id:"wildberry", cat:"macaron", name:"Wild Berry", flavour:"wildberry", price:P_MAC, img:"img/mac-wildberry.png", desc:"Wilde Beerenmischung, bunt & fruchtig."},
  // Bärchen
  {id:"baer-erdbeer", cat:"baer", name:"Erdbeer-Bärchen", flavour:"erdbeere", price:P_BEAR, img:"img/bear-pink.jpg", desc:"Handbemaltes Bärchen mit Erdbeercreme."},
  {id:"baer-heidel", cat:"baer", name:"Heidelbeer-Bärchen", flavour:"heidelbeere", price:P_BEAR, img:"img/bear-lavender.jpg", desc:"Bärchen mit cremiger Heidelbeere."},
  {id:"baer-minz", cat:"baer", name:"Minz-Bärchen", flavour:"minze", price:P_BEAR, img:"img/bear-blue.jpg", desc:"Kühle Minze im Bärchen-Look."},
  {id:"baer-pistazie", cat:"baer", name:"Pistazien-Bärchen", flavour:"pistazie", price:P_BEAR, img:"img/bear-green.png", desc:"Nussige Pistazie, zum Knuddeln."},
  // Cupcakes / Törtchen
  {id:"toertchen-beere", cat:"cupcake", name:"Beeren-Törtchen", flavour:"himbeere", price:P_CUP, img:"img/dessert-berry.jpg", desc:"Doppel-Macaron mit Beerencreme & Brombeere."},
  {id:"toertchen-minz", cat:"cupcake", name:"Minz-Törtchen", flavour:"minze", price:P_CUP, img:"img/dessert-mint.jpg", desc:"Frische Minze, Sahne & Brombeere."},
  // Boxen
  {id:"box-12", cat:"box", name:"12er Geschenkbox", flavour:"erdbeere", price:34, img:"img/box-bears.jpg", desc:"Zwölf handverlesene Macarons in der pinken Box."},
  {id:"box-15", cat:"box", name:"15er Geschenkbox", flavour:"lavendel", price:42, img:"img/box-open.jpg", desc:"Fünfzehn Macarons – das perfekte Geschenk."},
  // Sets
  {id:"set-probier", cat:"set", name:"Die Probierbox", flavour:"erdbeere", price:18, img:"img/gift-luxe.jpg", desc:"6 handverlesene Sorten – perfekt zum Kennenlernen."},
  {id:"set-family", cat:"set", name:"Das Family-Set", flavour:"vanille", price:58, img:"img/box-bears.jpg", desc:"24 Stück für große Runden – bunt gemischt, alle glücklich."},
  {id:"set-tasting", cat:"set", name:"Tasting-Flight", flavour:"lavendel", price:42, img:"img/box-open.jpg", desc:"15 Sorten inkl. Pairing-Guide – die Genuss-Reise für Neugierige."},
  // Add-ons
  {id:"crunch", cat:"addon", name:"Pynk Crunch", flavour:"erdbeere", price:6.90, img:"img/mac-erdbeere.jpg", desc:"Zerbröselte Macaron-Schalen als Eis-Topping – 150 g Glas."}
];

const macaronHTML = c => `<span class="macaron" style="--mc:${c}" aria-hidden="true"><span class="macaron__shell macaron__shell--top"></span><span class="macaron__filling"></span><span class="macaron__shell macaron__shell--bot"></span></span>`;

/* ============================================================
   SHARED CHROME
   ============================================================ */
const NAVLINKS = [
  {href:"index.html", label:"Start", key:"home"},
  {href:"shop.html", label:"Shop", key:"shop"},
  {href:"custom-box.html", label:"Box-Atelier", key:"atelier"},
  {href:"gutschein.html", label:"Gutscheine", key:"gutschein"},
  {href:"spezial.html", label:"Spezial & Anfrage", key:"spezial"},
  {href:"firmenkunden.html", label:"Firmenkunden", key:"b2b"},
  {href:"ueber.html", label:"Über uns", key:"ueber"},
  {href:"kontakt.html", label:"Kontakt", key:"kontakt"}
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
        ${NAVLINKS.map(l=>`<a href="${l.href}"${l.key===page?' aria-current="page"':''} data-i18n="nav.${l.key}">${l.label}</a>`).join("")}
      </nav>
      <div class="nav__actions">
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
        <a href="spezial.html" data-i18n="footer.tower">Tower & Giant</a>
        <a href="firmenkunden.html" data-i18n="footer.b2b">Firmenkunden</a>
        <a href="ueber.html" data-i18n="footer.about">Über uns</a>
      </nav>
      <div class="footer__col">
        <h4 data-i18n="footer.visit">Besuch uns</h4>
        <p>${CONFIG.address}</p>
        <p>${CONFIG.hours}</p>
        <p>${CONFIG.phone}<br>${CONFIG.email}</p>
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
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z"/></svg></a>
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

  // DRAWER + fly + toast
  const extra = document.createElement("div");
  extra.innerHTML = `
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer__scrim" id="drawerScrim"></div>
      <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Warenkorb">
        <div class="drawer__head">
          <h2 data-i18n="cart.title">Dein Warenkorb</h2>
          <button class="drawer__close" id="drawerClose" aria-label="Schließen"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        </div>
        <div class="drawer__body" id="cartItems"></div>
        <div class="drawer__foot">
          <div class="upsell" id="cartUpsell" hidden>
            <img src="img/mac-erdbeere.jpg" width="48" height="48" alt="Pynk Crunch" style="border-radius:8px;object-fit:cover">
            <div class="upsell__body"><strong>Perfekt zu deinem Dessert</strong><p>Pynk Crunch · Macaron-Topping · 6,90 €</p></div>
            <button class="btn btn--gold btn--sm" id="upsellAdd" type="button">+ Dazu</button>
          </div>
          <div class="drawer__total"><span data-i18n="cart.subtotal">Zwischensumme</span><strong id="cartTotal">0,00 €</strong></div>
          <p class="drawer__note" data-i18n="cart.note">Alle Preise inkl. MwSt. · Versand ab 35 € kostenlos · Abholung gratis</p>
          <a class="btn btn--primary btn--block" id="toCheckout" href="checkout.html" data-i18n="cart.checkout">Zur Kasse</a>
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
          <h2 class="pdp__name" id="pdpName"></h2>
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
  setLang(LANG);   // applies translations to chrome + page, marks active toggle
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

function addToCart(item){
  const ex=cart.find(i=>i.key===item.key);
  if(ex) ex.qty+=item.qty||1; else cart.push({...item,qty:item.qty||1});
  saveCart(); updateCart();
}
function changeQty(key,d){ const it=cart.find(i=>i.key===key); if(!it)return; it.qty+=d; if(it.qty<=0)cart=cart.filter(i=>i.key!==key); saveCart(); updateCart(); }
function removeItem(key){ cart=cart.filter(i=>i.key!==key); saveCart(); updateCart(); }

function updateCart(){
  const n=cartCount(), badge=$("#cartBadge");
  if(badge){ badge.textContent=n; badge.hidden=n===0; badge.classList.remove("pop"); void badge.offsetWidth; if(n)badge.classList.add("pop"); }
  const items=$("#cartItems");
  if(items){
    if(!cart.length){
      items.innerHTML=`<div class="drawer__empty"><svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>${tr("cart.empty")}</p></div>`;
    } else {
      items.innerHTML=cart.map(i=>`
        <div class="citem">
          <div class="citem__media">${i.thumb||""}</div>
          <div class="citem__info">
            <div class="citem__name">${i.name}</div>
            ${i.meta?`<div class="citem__meta">${i.meta}</div>`:""}
            <div class="qty"><button data-dec="${i.key}" aria-label="Weniger">−</button><span>${i.qty}</span><button data-inc="${i.key}" aria-label="Mehr">+</button></div>
            <button class="citem__remove" data-rm="${i.key}">${tr("cart.remove")}</button>
          </div>
          <div class="citem__price">${EUR(i.price*i.qty)}</div>
        </div>`).join("");
    }
  }
  const tot=$("#cartTotal"); if(tot) tot.textContent=EUR(cartTotal());
  const co=$("#toCheckout"); if(co){ co.classList.toggle("is-disabled",!cart.length); }
  const upsell=$("#cartUpsell");
  if(upsell) upsell.hidden = !cart.length || cart.some(i=>i.key==="p-crunch");
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
  window.openDrawer=open;
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
  grid.innerHTML=PRODUCTS.filter(p=>filter==="all"||p.cat===filter).map(p=>{
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
      addToCart({key:"p-"+p.id,name:p.name,meta:({macaron:"Macaron",baer:"Bärchen-Macaron",cupcake:"Macaron-Törtchen",box:"Geschenkbox",set:"Macaron-Set",addon:"Add-on"})[p.cat],price:p.price,thumb:`<img src="${p.img}" alt="">`});
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
  $("#pdpName").textContent=p.name;
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
let boxSize=12, boxPrice=34, boxItems=[];
const BOX_PRICES={6:18,12:34,16:44};
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
  if(!cart.length){
    list.innerHTML=`<p class="co-empty">Dein Warenkorb ist leer. <a href="shop.html">Zum Shop →</a></p>`;
  } else {
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
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded",()=>{
  injectChrome();
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
  wireUpsell();
  wireMystery();
  wireCheckoutExtras();
  observeReveals();
});
