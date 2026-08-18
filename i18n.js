/* i18n — TGE Development. Kamus BM/EN + enjin. Dimuatkan sebelum main.js. */
(function () {
  "use strict";
  const DICT = {
    bm: {
      "nav.work": "Kerja", "nav.services": "Perkhidmatan", "nav.about": "Tentang Saya", "nav.contact": "Hubungi",
      "hero.eyebrow": "Artis 3D · FiveM & GTA V",
      "hero.t1": "Saya model, tekstur", "hero.t2": "dan hidupkan", "hero.t3": "server anda",
      "hero.lead": "Ped dan watak, pakaian dan peralatan taktikal, interior MLO, prop dan aset custom. Dari lakaran ke model yang dioptimumkan, sedia untuk bandar anda.",
      "hero.cta1": "Lihat kerja", "hero.cta2": "Tempah model",
      "hero.s1": "tahun bermodel", "hero.s2": "aset dihantar", "hero.s3": "custom dibuat", "hero.scroll": "Skrol",
      "mq.vehicles": "Kenderaan", "mq.gear": "Peralatan taktikal", "mq.tex": "Tekstur", "mq.props": "Prop",
      "work.eyebrow": "Portfolio", "work.title": "Kerja terpilih", "work.sub": "Contoh apa yang saya model dan tekstur untuk server roleplay.",
      "w6.t": "Ped custom", "w6.d": "In-game · FiveM", "w1.t": "Vest taktikal", "w1.d": "Model & tekstur · Blender",
      "w3.t": "Interior MLO", "w3.d": "Pemetaan interior", "w4.t": "Watak rig", "w4.d": "Ped custom",
      "w2.t": "Outfit & peralatan", "w2.d": "Pakaian & rig taktikal", "w5.t": "Prop & arca", "w5.d": "Detail tinggi · tekstur",
      "w7.t": "Adegan in-game", "w7.d": "Render dalam FiveM", "w8.t": "Ped & branding", "w8.d": "In-game · showcase",
      "serv.eyebrow": "Perkhidmatan", "serv.title": "Apa yang saya boleh buat untuk anda",
      "s1.t": "Ped & watak", "s1.d": "Model asli atau berdasarkan rujukan, di-rig ke rangka GTA dan sedia untuk masuk ke dalam game.",
      "s2.t": "Pakaian & peralatan taktikal", "s2.d": "Vest, rig, beg dan pakaian dengan logo dan tekstur custom untuk faksyen atau server anda.",
      "s3.t": "Interior MLO", "s3.d": "Interior dipetakan dan dilengkapi perabot, dioptimumkan dan mempunyai collision, untuk perniagaan, rumah dan pangkalan.",
      "s4.t": "Kenderaan", "s4.d": "Kereta, tuning, livery dan penukaran bersih untuk FiveM, dengan handling dan detail yang dijaga.",
      "s5.t": "Prop & persekitaran", "s5.d": "Objek, arca dan set hiasan dengan tekstur berkualiti tinggi untuk menghidupkan peta anda.",
      "s6.t": "Tekstur & rigging", "s6.d": "Tekstur, bahan dan rangka. Saya optimumkan model supaya berfungsi lancar dalam server.",
      "about.eyebrow": "Tentang Saya", "about.title": "Hai, saya Angker Letop",
      "about.p1": "Artis dan pereka 3D Malaysia yang mengkhusus dalam kandungan untuk FiveM dan GTA V. Saya telah bertahun-tahun memodel ped, pakaian, peralatan taktikal, interior dan prop untuk server roleplay di seluruh Malaysia.",
      "about.p2": "Saya ambil setiap tempahan dengan serius: mesh yang kemas, tekstur yang dijaga dan model yang dioptimumkan, kelihatan baik dan berfungsi lancar dalam game. Saya menggunakan Blender dan 3ds Max, dan bekerjasama dengan studio seperti Vertex Studios.",
      "about.cta": "Jom kita bekerja bersama", "about.r1": "Alat", "about.r2": "Fokus", "about.r3": "Berasal dari",
      "contact.eyebrow": "Hubungi", "contact.big1": "Jom bina", "contact.big2": "sesuatu yang hebat",
      "contact.sub": "Beritahu saya apa yang anda perlukan dan kita jadikan ia kenyataan. Saya balas paling cepat di Discord.",
      "contact.join": "Sertai Discord saya", "contact.youtube": "Tonton saluran saya", "contact.copy": "Salin",
      "footer.made": "Reka bentuk & pembangunan oleh",
      "meta.desc": "TGE Development — artis dan pereka 3D. Ped, pakaian, peralatan taktikal, interior MLO, prop dan aset custom untuk FiveM dan GTA V. Blender · 3ds Max.",
      "cursor.view": "Lihat", "_title": "TGE Development — Artis 3D untuk FiveM & GTA V", "_copied": "Disalin!"
    },
    en: {
      "nav.work": "Work", "nav.services": "Services", "nav.about": "About", "nav.contact": "Contact",
      "hero.eyebrow": "3D Artist · FiveM & GTA V",
      "hero.t1": "Model, texture", "hero.t2": "and bring", "hero.t3": "your server to life",
      "hero.lead": "Peds and characters, clothing and tactical gear, MLO interiors, props and custom assets. From sketch to optimized model, ready for your city.",
      "hero.cta1": "See work", "hero.cta2": "Commission a model",
      "hero.s1": "years modeling", "hero.s2": "assets delivered", "hero.s3": "custom made", "hero.scroll": "Scroll",
      "mq.vehicles": "Vehicles", "mq.gear": "Tactical gear", "mq.tex": "Texturing", "mq.props": "Props",
      "work.eyebrow": "Portfolio", "work.title": "Selected work", "work.sub": "A taste of what I model and texture for roleplay servers.",
      "w6.t": "Custom ped", "w6.d": "In-game · FiveM", "w1.t": "Tactical vest", "w1.d": "Modeling & texturing · Blender",
      "w3.t": "MLO interior", "w3.d": "Interior mapping", "w4.t": "Rigged character", "w4.d": "Custom MLO",
      "w2.t": "Outfit & gear", "w2.d": "Clothing & tactical rig", "w5.t": "Prop & sculpture", "w5.d": "High detail · texturing",
      "w7.t": "In-game scene", "w7.d": "Render in FiveM", "w8.t": "3D LOGO PNG", "w8.d": "In-game · showcase",
      "serv.eyebrow": "Services", "serv.title": "What I can do for you",
      "s1.t": "Peds & characters", "s1.d": "Original or reference-based models, rigged to the GTA skeleton and ready to drop into the game.",
      "s2.t": "Clothing & tactical gear", "s2.d": "Vests, rigs, backpacks and clothing with custom logos and textures for your faction or server.",
      "s3.t": "MLO interiors", "s3.d": "Mapped and furnished interiors, optimized and with collisions, for businesses, homes and bases.",
      "s4.t": "Vehicles", "s4.d": "Cars, tuning, liveries and clean conversions for FiveM, with careful handling and detail.",
      "s5.t": "Props & environment", "s5.d": "Objects, sculptures and set pieces with high-quality textures to bring your maps to life.",
      "s6.t": "Texturing & rigging", "s6.d": "Textures, materials and skeletons. I optimize the model so it performs well inside the server.",
      "about.eyebrow": "About", "about.title": "Hi, I'm Angker Letop",
      "about.p1": "Malaysian 3D artist and designer specialized in content for FiveM and GTA V. I've spent years modeling peds, clothing, tactical gear, interiors and props for roleplay servers across Malaysia",
      "about.p2": "I take every commission seriously: clean meshes, careful textures and optimized models that look good and perform in-game. I work with Blender and 3ds Max, and collaborate with studios like Vertex Studios.",
      "about.cta": "Let's work together", "about.r1": "Tools", "about.r2": "Focus", "about.r3": "Based in",
      "contact.eyebrow": "Contact", "contact.big1": "Let's build", "contact.big2": "something brutal",
      "contact.sub": "Tell me what you need and let's make it happen. I reply fastest on Discord.",
      "contact.join": "Join my Discord", "contact.youtube": "Watch my channel", "contact.copy": "Copy",
      "footer.made": "Design & development by",
      "meta.desc": "TGE Development — 3D artist and designer. Peds, clothing, tactical gear, MLO interiors, props and custom assets for FiveM and GTA V. Blender · 3ds Max.",
      "cursor.view": "View", "_title": "TGE Development — 3D Artist for FiveM & GTA V", "_copied": "Copied!"
    }
  };

  let lang = "bm";
  try { lang = localStorage.getItem("reno_lang") || ((navigator.language || "bm").slice(0, 2).toLowerCase() === "en" ? "en" : "bm"); } catch (e) {}
  if (lang !== "bm" && lang !== "en") lang = "bm";

  function t(k) { return (DICT[lang] && DICT[lang][k]) || DICT.bm[k] || k; }
  function apply(l) {
    lang = l; const d = DICT[l]; document.documentElement.lang = (l === "bm" ? "ms" : l);
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = d[el.getAttribute("data-i18n")]; if (v != null) el.textContent = v; });
    document.querySelectorAll("[data-i18n-meta]").forEach(el => { const v = d[el.getAttribute("data-i18n-meta")]; if (v != null) el.setAttribute("content", v); });
    document.title = d._title;
    const b = document.getElementById("langBtn");
    if (b) { const f = b.querySelector(".lang__flag"), a = b.querySelector(".lang__alt"); if (f) f.textContent = l.toUpperCase(); if (a) a.textContent = (l === "bm" ? "EN" : "BM"); }
    try { localStorage.setItem("reno_lang", l); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
  }
  window.RENO_I18N = { get lang() { return lang; }, t, apply, toggle() { apply(lang === "bm" ? "en" : "bm"); } };

  apply(lang);
  const _b = document.getElementById("langBtn"); if (_b) _b.addEventListener("click", () => window.RENO_I18N.toggle());
})();
