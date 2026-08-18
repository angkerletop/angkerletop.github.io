/* i18n — Renoncin. Diccionario ES/EN + motor. Se carga antes de main.js. */
(function () {
  "use strict";
  const DICT = {
    es: {
      "nav.work": "Trabajos", "nav.services": "Servicios", "nav.about": "Sobre mí", "nav.contact": "Contacto",
      "hero.eyebrow": "Artista 3D · FiveM & GTA V",
      "hero.t1": "Modelo, texturizo", "hero.t2": "y doy vida", "hero.t3": "a tu servidor",
      "hero.lead": "Peds y personajes, ropa y equipo táctico, interiores MLO, props y assets a medida. Del boceto al modelo optimizado, listo para tu ciudad.",
      "hero.cta1": "Ver trabajos", "hero.cta2": "Encargar un modelo",
      "hero.s1": "años modelando", "hero.s2": "assets entregados", "hero.s3": "a medida", "hero.scroll": "Scroll",
      "mq.vehicles": "Vehículos", "mq.gear": "Equipo táctico", "mq.tex": "Texturizado", "mq.props": "Props",
      "work.eyebrow": "Portafolio", "work.title": "Trabajos seleccionados", "work.sub": "Una muestra de lo que modelo y texturizo para servidores de rol.",
      "w6.t": "Ped personalizado", "w6.d": "In-game · FiveM", "w1.t": "Chaleco táctico", "w1.d": "Modelado y textura · Blender",
      "w3.t": "Interior MLO", "w3.d": "Mapeado de interiores", "w4.t": "Personaje riggeado", "w4.d": "Ped a medida",
      "w2.t": "Outfit & equipo", "w2.d": "Ropa y rig táctico", "w5.t": "Prop & escultura", "w5.d": "Alto detalle · texturizado",
      "w7.t": "Escena in-game", "w7.d": "Render en FiveM", "w8.t": "Ped & branding", "w8.d": "In-game · showcase",
      "serv.eyebrow": "Servicios", "serv.title": "Qué puedo hacer por ti",
      "s1.t": "Peds & personajes", "s1.d": "Modelos originales o basados en referencias, riggeados al esqueleto de GTA y listos para entrar al juego.",
      "s2.t": "Ropa & equipo táctico", "s2.d": "Chalecos, rigs, mochilas y ropa con logos y texturas personalizadas para tu facción o servidor.",
      "s3.t": "Interiores MLO", "s3.d": "Interiores mapeados y amueblados, optimizados y con colisiones, para negocios, casas y bases.",
      "s4.t": "Vehículos", "s4.d": "Coches, tuning, liveries y conversiones limpias para FiveM, con handling y detalles cuidados.",
      "s5.t": "Props & escenario", "s5.d": "Objetos, esculturas y decorados con texturas de alta calidad para dar vida a tus mapas.",
      "s6.t": "Texturizado & rigging", "s6.d": "Texturas, materiales y esqueletos. Optimizo el modelo para que rinda bien dentro del servidor.",
      "about.eyebrow": "Sobre mí", "about.title": "Hola, soy Renoncin",
      "about.p1": "Artista y diseñador 3D peruano especializado en contenido para FiveM y GTA V. Llevo años modelando peds, ropa, equipo táctico, interiores y props para servidores de rol de todo LATAM.",
      "about.p2": "Me tomo cada encargo en serio: mallas limpias, texturas cuidadas y modelos optimizados que se ven bien y rinden dentro del juego. Trabajo con Blender y 3ds Max, y colaboro con estudios como Vertex Studios.",
      "about.cta": "Trabajemos juntos", "about.r1": "Herramientas", "about.r2": "Enfoque", "about.r3": "Origen",
      "contact.eyebrow": "Contacto", "contact.big1": "Construyamos", "contact.big2": "algo brutal",
      "contact.sub": "Cuéntame qué necesitas y lo hacemos realidad. Respondo más rápido por Discord.",
      "contact.join": "Únete a mi Discord", "contact.youtube": "Mira mi canal", "contact.copy": "Copiar",
      "footer.made": "Diseño y desarrollo por",
      "meta.desc": "Renoncin — artista y diseñador 3D. Peds, ropa, equipo táctico, interiores MLO, props y assets a medida para FiveM y GTA V. Blender · 3ds Max.",
      "cursor.view": "Ver", "_title": "Renoncin — Artista 3D para FiveM & GTA V", "_copied": "¡Copiado!"
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
      "meta.desc": "Renoncin — 3D artist and designer. Peds, clothing, tactical gear, MLO interiors, props and custom assets for FiveM and GTA V. Blender · 3ds Max.",
      "cursor.view": "View", "_title": "TGE Development — 3D Artist for FiveM & GTA V", "_copied": "Copied!"
    }
  };

  let lang = "es";
  try { lang = localStorage.getItem("reno_lang") || ((navigator.language || "es").slice(0, 2).toLowerCase() === "en" ? "en" : "es"); } catch (e) {}
  if (lang !== "es" && lang !== "en") lang = "es";

  function t(k) { return (DICT[lang] && DICT[lang][k]) || DICT.es[k] || k; }
  function apply(l) {
    lang = l; const d = DICT[l]; document.documentElement.lang = l;
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = d[el.getAttribute("data-i18n")]; if (v != null) el.textContent = v; });
    document.querySelectorAll("[data-i18n-meta]").forEach(el => { const v = d[el.getAttribute("data-i18n-meta")]; if (v != null) el.setAttribute("content", v); });
    document.title = d._title;
    const b = document.getElementById("langBtn");
    if (b) { const f = b.querySelector(".lang__flag"), a = b.querySelector(".lang__alt"); if (f) f.textContent = l.toUpperCase(); if (a) a.textContent = (l === "es" ? "EN" : "ES"); }
    try { localStorage.setItem("reno_lang", l); } catch (e) {}
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: l } }));
  }
  window.RENO_I18N = { get lang() { return lang; }, t, apply, toggle() { apply(lang === "es" ? "en" : "es"); } };

  // Aplica de inmediato: este script va después de todo el contenido, así que los
  // elementos ya existen. Debe correr ANTES de que main.js parta el texto (SplitType),
  // o al re-aplicar textContent borraría los spans del split.
  apply(lang);
  const _b = document.getElementById("langBtn"); if (_b) _b.addEventListener("click", () => window.RENO_I18N.toggle());
})();
