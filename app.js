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
  {id:"box-15", cat:"box", name:"15er Geschenkbox", flavour:"lavendel", price:42, img:"img/box-open.jpg", desc:"Fünfzehn Macarons – das perfekte Geschenk."}
];

const macaronHTML = c => `<span class="macaron" style="--mc:${c}" aria-hidden="true"><span class="macaron__shell macaron__shell--top"></span><span class="macaron__filling"></span><span class="macaron__shell macaron__shell--bot"></span></span>`;

/* ============================================================
   SHARED CHROME
   ============================================================ */
const NAVLINKS = [
  {href:"index.html", label:"Start", key:"home"},
  {href:"shop.html", label:"Shop", key:"shop"},
  {href:"atelier.html", label:"Box-Atelier", key:"atelier"},
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
        ${NAVLINKS.map(l=>`<a href="${l.href}"${l.key===page?' aria-current="page"':''}>${l.label}</a>`).join("")}
      </nav>
      <div class="nav__actions">
        <button class="nav__icon" id="cartBtn" aria-label="Warenkorb öffnen" aria-haspopup="dialog">
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
        <p class="footer__tag">Handgemachte Macarons aus Hamburg. Französische Technik, verspielte Seele – zum Verschenken, Mitnehmen und Verlieben.</p>
      </div>
      <nav class="footer__col" aria-label="Entdecken">
        <h4>Entdecken</h4>
        <a href="shop.html">Shop</a>
        <a href="spezial.html">Tower & Giant</a>
        <a href="firmenkunden.html">Firmenkunden</a>
        <a href="ueber.html">Über uns</a>
      </nav>
      <div class="footer__col">
        <h4>Besuch uns</h4>
        <p>${CONFIG.address}</p>
        <p>${CONFIG.hours}</p>
        <p>${CONFIG.phone}<br>${CONFIG.email}</p>
      </div>
      <div class="footer__col footer__col--news">
        <h4>Süße Post</h4>
        <p>Neue Sorten & Aktionen – ein Mail pro Monat, versprochen.</p>
        <form class="newsletter" id="newsletter">
          <input type="email" placeholder="deine@mail.de" aria-label="E-Mail für Newsletter" required>
          <button type="submit" aria-label="Abonnieren"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </form>
        <div class="socials">
          <a href="${CONFIG.instagram}" aria-label="Instagram" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="wrap footer__base">
      <p>© <span id="year"></span> ${CONFIG.brand} · Mit Liebe gebacken in Hamburg</p>
      <p><a href="#">Impressum</a> · <a href="#">Datenschutz</a> · <a href="#">AGB</a></p>
    </div>`;
  document.body.appendChild(footer);

  // DRAWER + fly + toast
  const extra = document.createElement("div");
  extra.innerHTML = `
    <div class="drawer" id="drawer" aria-hidden="true">
      <div class="drawer__scrim" id="drawerScrim"></div>
      <aside class="drawer__panel" role="dialog" aria-modal="true" aria-label="Warenkorb">
        <div class="drawer__head">
          <h2>Dein Warenkorb</h2>
          <button class="drawer__close" id="drawerClose" aria-label="Schließen"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
        </div>
        <div class="drawer__body" id="cartItems"></div>
        <div class="drawer__foot">
          <div class="drawer__total"><span>Zwischensumme</span><strong id="cartTotal">0,00 €</strong></div>
          <p class="drawer__note">Versand ab 35 € kostenlos · Abholung immer gratis</p>
          <a class="btn btn--primary btn--block" id="toCheckout" href="kontakt.html#bestellen">Zur Bestellung</a>
        </div>
      </aside>
    </div>
    <div id="flyLayer" aria-hidden="true"></div>
    <div id="toast" class="toast" role="status" aria-live="polite" hidden></div>`;
  document.body.appendChild(extra);

  const y=$("#year"); if(y) y.textContent=new Date().getFullYear();
  wireNav(hasHero);
  wireDrawer();
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
      items.innerHTML=`<div class="drawer__empty"><svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Dein Warenkorb ist noch leer.<br>Zeit für ein paar Macarons.</p></div>`;
    } else {
      items.innerHTML=cart.map(i=>`
        <div class="citem">
          <div class="citem__media">${i.thumb||""}</div>
          <div class="citem__info">
            <div class="citem__name">${i.name}</div>
            ${i.meta?`<div class="citem__meta">${i.meta}</div>`:""}
            <div class="qty"><button data-dec="${i.key}" aria-label="Weniger">−</button><span>${i.qty}</span><button data-inc="${i.key}" aria-label="Mehr">+</button></div>
            <button class="citem__remove" data-rm="${i.key}">entfernen</button>
          </div>
          <div class="citem__price">${EUR(i.price*i.qty)}</div>
        </div>`).join("");
    }
  }
  const tot=$("#cartTotal"); if(tot) tot.textContent=EUR(cartTotal());
  const co=$("#toCheckout"); if(co){ co.classList.toggle("is-disabled",!cart.length); }
  const fs=$("#formSummary"); if(fs) renderFormSummary();
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

function renderProducts(filter="all"){
  const grid=$("#productGrid"); if(!grid)return;
  const tagFor={macaron:"",baer:"Bärchen",cupcake:"Törtchen",box:"Geschenk"};
  grid.innerHTML=PRODUCTS.filter(p=>filter==="all"||p.cat===filter).map(p=>`
    <article class="pcard reveal" data-id="${p.id}">
      <div class="pcard__media">
        ${tagFor[p.cat]?`<span class="pcard__tag">${tagFor[p.cat]}</span>`:""}
        <img src="${p.img}" width="384" height="384" loading="lazy" alt="${p.name} Macaron von Pynk Macarons">
      </div>
      <div class="pcard__body">
        <h3 class="pcard__name"><span class="pcard__dot" style="background:${FC[p.flavour]}"></span>${p.name}</h3>
        <p class="pcard__desc">${p.desc}</p>
        <div class="pcard__foot">
          <span class="pcard__price">${EUR(p.price)}${p.cat==="macaron"?' <small>/ Stück</small>':''}</span>
          <button class="pcard__add" data-add="${p.id}" aria-label="${p.name} in den Warenkorb"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
        </div>
      </div>
    </article>`).join("");
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
    const btn=e.target.closest("[data-add]"); if(!btn)return;
    const p=PRODUCTS.find(x=>x.id===btn.dataset.add);
    flyToCart(btn.closest(".pcard").querySelector(".pcard__media"));
    addToCart({key:"p-"+p.id,name:p.name,meta:({macaron:"Macaron",baer:"Bärchen-Macaron",cupcake:"Macaron-Törtchen",box:"Geschenkbox"})[p.cat],price:p.price,thumb:`<img src="${p.img}" alt="">`});
    toast(`${p.name} hinzugefügt`);
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
    if(channel==="wa") window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`,"_blank","noopener");
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
    if(channel==="wa") window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(t)}`,"_blank","noopener");
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
  observeReveals();
});
