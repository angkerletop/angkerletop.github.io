/* ============================================================
   RENONCIN — main.js. Lenis + GSAP + ScrollTrigger orchestration.
   Robust: critical UX works even if motion libs fail.
   ============================================================ */
(function () {
  "use strict";
  const root = document.documentElement;
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(hover: none)").matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  let lenis = null, lenisVel = 0;

  const yEl = $("#year"); if (yEl) yEl.textContent = new Date().getFullYear();

  // ---- critical UX (no motion libs needed) ----
  initNav(); initLightbox(); initCopy(); initStage(); consoleEgg();

  function forceReveal() { root.classList.add("no-anim"); }
  function hardRemoveLoader() { const l = $("#loader"); if (l) l.style.display = "none"; root.classList.remove("is-loading"); }

  if (!hasGSAP) { forceReveal(); hardRemoveLoader(); return; }
  const lite = reduce; // reduced-motion: fundidos suaves, sin movimiento/parallax/loader

  // safety net: if setup hangs, reveal everything
  const safety = setTimeout(() => { if (!root.classList.contains("ready")) { forceReveal(); hardRemoveLoader(); } }, 4500);

  try {
    gsap.registerPlugin(ScrollTrigger);
    if (!isTouch && !lite) initLenis();
    initSplit();
    if (!isTouch && !lite) { initCursor(); initMagnetic(); initTilt(); initParallax(); }
    if (!lite) { initServiceGlow(); initMarquee(); initEaster(); }
    initScrollReveals(lite);
    initCounters();
    if (lite) { hardRemoveLoader(); startHero(true); ScrollTrigger.refresh(); clearTimeout(safety); root.classList.add("ready"); }
    else runLoader(() => { clearTimeout(safety); root.classList.add("ready"); });
  } catch (err) {
    console.warn("[reno] motion init failed:", err);
    clearTimeout(safety); forceReveal(); hardRemoveLoader();
  }

  /* ---------------- Lenis smooth scroll ---------------- */
  function initLenis() {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
    root.classList.add("lenis");
    lenis.on("scroll", (e) => { lenisVel = e.velocity || 0; onScroll(e.scroll || window.scrollY, e.direction || 0); ScrollTrigger.update(); });
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
      const id = a.getAttribute("href"); if (id.length < 2) return;
      const tgt = $(id); if (!tgt) return; e.preventDefault();
      lenis.scrollTo(tgt, { offset: -60, duration: 1.25 }); closeMenu();
    }));
  }
  function onScroll(scroll, dir) {
    const nav = $("#nav"); if (nav) { nav.classList.toggle("scrolled", scroll > 30); nav.classList.toggle("hide", scroll > 240 && dir === 1); }
    const bar = $("#scrollBar"); if (bar) { const max = document.body.scrollHeight - innerHeight; bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, scroll / max) : 0) + ")"; }
  }
  // fallback scroll (touch / no lenis)
  if (!lenis) addEventListener("scroll", () => onScroll(scrollY, 1), { passive: true });

  /* ---------------- SplitType ---------------- */
  function initSplit() {
    if (!window.SplitType) return;
    $$("[data-split]").forEach(el => {
      const type = el.getAttribute("data-split");
      try { new SplitType(el, { types: type === "chars" ? "chars" : "words", tagName: "span" }); } catch (e) {}
    });
  }

  /* ---------------- Preloader ---------------- */
  function runLoader(done) {
    const num = { v: 0 };
    const tl = gsap.timeline();
    tl.set("#loader", { autoAlpha: 1 })
      .from(".loader__logo", { scale: .5, autoAlpha: 0, duration: .6, ease: "power3.out" })
      .from(".loader__word .char", { yPercent: 120, autoAlpha: 0, stagger: .045, duration: .5, ease: "power3.out" }, "-=.3")
      .to("#loaderFill", { width: "100%", duration: 1.25, ease: "power2.inOut" }, "-=.35")
      .to(num, { v: 100, duration: 1.25, ease: "power2.inOut", onUpdate: () => { const n = $("#loaderNum"); if (n) n.textContent = Math.round(num.v); } }, "<")
      .to(".loader__in", { autoAlpha: 0, y: -18, duration: .45, ease: "power2.in" }, "+=.1")
      .add(() => { root.classList.remove("is-loading"); if (lenis) lenis.start(); })
      .to("#loader", { yPercent: -100, duration: .9, ease: "power4.inOut" })
      .set("#loader", { display: "none" })
      .add(() => { startHero(); if (done) done(); ScrollTrigger.refresh(); }, "-=.55");
    if (lenis) lenis.stop();
  }

  function startHero(lite) {
    gsap.set(".hero__title .line", { autoAlpha: 1 });
    if (lite) {
      gsap.set(".hero__title .char", { autoAlpha: 1, yPercent: 0 });
      gsap.to(".hero__eyebrow, .hero__lead, .hero__cta, .hero__stats, .hero__stage, .hud, .hud__corner, .hero__scroll",
        { autoAlpha: 1, y: 0, scale: 1, duration: .6, stagger: .05, ease: "power1.out", overwrite: true });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero__eyebrow", { y: 18, autoAlpha: 0, duration: .6 })
      .fromTo(".hero__title .char", { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: .022, duration: .8 }, "-=.3")
      .to(".hero__lead", { autoAlpha: 1, y: 0, duration: .6 }, "-=.5")
      .to(".hero__cta", { autoAlpha: 1, y: 0, duration: .6 }, "-=.45")
      .to(".hero__stats", { autoAlpha: 1, y: 0, duration: .6 }, "-=.5")
      .from(".hero__stage", { scale: .85, autoAlpha: 0, duration: 1.1, ease: "power4.out" }, "-=1.2")
      .from(".hud, .hud__corner", { autoAlpha: 0, stagger: .04, duration: .5 }, "-=.6")
      .from(".hero__scroll", { autoAlpha: 0, y: 10, duration: .5 }, "-=.3");
  }

  /* ---------------- Scroll reveals ---------------- */
  function initScrollReveals(lite) {
    // generic reveals
    $$("[data-reveal]").forEach(el => {
      if (el.closest(".hero")) return; // hero handled by intro
      if (lite) { gsap.set(el, { y: 0 }); gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: .6, ease: "power1.out", scrollTrigger: { trigger: el, start: "top 94%" } }); }
      else gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    // split section titles (words)
    $$('.shead__title[data-split], .contact__big').forEach(title => {
      gsap.set(title, { autoAlpha: 1 });
      const lns = $$(".line", title); if (lns.length) gsap.set(lns, { autoAlpha: 1 });
      const units = $$(".char, .word", title);
      if (!units.length) return;
      if (lite) { gsap.set(units, { yPercent: 0, autoAlpha: 1 }); gsap.fromTo(title, { opacity: 0 }, { opacity: 1, duration: .6, ease: "power1.out", scrollTrigger: { trigger: title, start: "top 92%" } }); }
      else gsap.fromTo(units, { yPercent: 115, autoAlpha: 0 }, {
        yPercent: 0, autoAlpha: 1, stagger: .03, duration: .8, ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" }
      });
    });
    // tiles + services staggered
    revealBatch(".tile", .07, lite);
    revealBatch(".svc", .07, lite);
    // footer wordmark
    const fm = $("#footMark");
    if (fm) {
      if (lite) gsap.set(fm, { autoAlpha: 1 });
      else { const c = $$(".char", fm); if (c.length) gsap.from(c, { yPercent: 60, autoAlpha: 0, stagger: .03, duration: .6, ease: "power2.out", scrollTrigger: { trigger: ".footer", start: "top 92%" } }); }
    }
    // subtle scroll parallax on tile images (full motion only)
    if (!lite) $$(".tile__media img").forEach(img => gsap.to(img, { yPercent: -8, ease: "none", scrollTrigger: { trigger: img.closest(".tile"), start: "top bottom", end: "bottom top", scrub: true } }));
  }
  function revealBatch(sel, stag, lite) {
    const items = $$(sel); if (!items.length) return;
    if (lite) {
      items.forEach(el => gsap.set(el, { y: 0 }));
      ScrollTrigger.batch(items, { start: "top 94%", onEnter: b => gsap.to(b, { opacity: 1, duration: .6, ease: "power1.out", overwrite: true }) });
      return;
    }
    ScrollTrigger.batch(items, {
      start: "top 90%",
      onEnter: b => gsap.to(b, { opacity: 1, y: 0, stagger: stag, duration: .8, ease: "power3.out", overwrite: true })
    });
  }

  /* ---------------- Counters ---------------- */
  function initCounters() {
    $$("[data-count]").forEach(el => {
      const end = parseFloat(el.getAttribute("data-count")) || 0, suf = el.getAttribute("data-suffix") || "";
      const o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: "top 92%", once: true, onEnter: () =>
        gsap.to(o, { v: end, duration: 1.4, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v) + suf; } }) });
    });
  }

  /* ---------------- Custom cursor ---------------- */
  function initCursor() {
    const cur = $("#cursor"), label = $("#cursorLabel"); if (!cur) return;
    root.classList.add("cursor-none");
    gsap.set(cur, { xPercent: 0, yPercent: 0 });
    const xTo = gsap.quickTo(cur, "x", { duration: .35, ease: "power3" }), yTo = gsap.quickTo(cur, "y", { duration: .35, ease: "power3" });
    addEventListener("mousemove", e => {
      xTo(e.clientX); yTo(e.clientY);
      root.style.setProperty("--mx", e.clientX + "px"); root.style.setProperty("--my", e.clientY + "px");
      const c = $(".cta-huge"); // for cta shine (uses --mx local): set on hovered cta
    });
    const hoverSel = 'a, button, [data-magnetic], [data-tilt], .copy';
    document.addEventListener("mouseover", e => {
      const t = e.target.closest ? e.target.closest("[data-cursor], " + hoverSel) : null;
      cur.classList.remove("is-view", "is-hide");
      if (!t) { cur.classList.remove("is-hover"); return; }
      const mode = t.getAttribute("data-cursor");
      if (mode === "view") { cur.classList.add("is-view"); if (label) label.textContent = (window.RENO_I18N ? window.RENO_I18N.t("cursor.view") : "VER"); }
      else if (mode === "hide") { cur.classList.add("is-hide"); }
      else { cur.classList.add("is-hover"); }
    });
    document.addEventListener("mouseout", e => {
      const to = e.relatedTarget;
      if (!to || !(to.closest && to.closest("[data-cursor], " + hoverSel))) cur.classList.remove("is-hover", "is-view", "is-hide");
    });
  }

  /* ---------------- Magnetic ---------------- */
  function initMagnetic() {
    $$("[data-magnetic]").forEach(el => {
      const xTo = gsap.quickTo(el, "x", { duration: .5, ease: "power3" }), yTo = gsap.quickTo(el, "y", { duration: .5, ease: "power3" });
      el.addEventListener("mousemove", e => { const r = el.getBoundingClientRect(); xTo((e.clientX - (r.left + r.width / 2)) * .35); yTo((e.clientY - (r.top + r.height / 2)) * .35); });
      el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });
  }

  /* ---------------- Tilt (3D) ---------------- */
  function initTilt() {
    $$("[data-tilt]").forEach(el => {
      const rx = gsap.quickTo(el, "rotationX", { duration: .5, ease: "power3" }), ry = gsap.quickTo(el, "rotationY", { duration: .5, ease: "power3" });
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
        rx(-py * 7); ry(px * 9);
        el.style.setProperty("--gx", (px + .5) * 100 + "%"); el.style.setProperty("--gy", (py + .5) * 100 + "%");
      });
      el.addEventListener("mouseleave", () => { rx(0); ry(0); });
    });
  }
  function initServiceGlow() {
    $$("[data-glow]").forEach(el => el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect(); el.style.setProperty("--gx", ((e.clientX - r.left) / r.width * 100) + "%"); el.style.setProperty("--gy", ((e.clientY - r.top) / r.height * 100) + "%");
    }));
  }

  /* ---------------- Mouse parallax ---------------- */
  function initParallax() {
    const els = $$("[data-parallax]").map(el => ({ el, s: parseFloat(el.getAttribute("data-parallax")) || .05,
      x: gsap.quickTo(el, "x", { duration: .9, ease: "power2" }), y: gsap.quickTo(el, "y", { duration: .9, ease: "power2" }) }));
    if (!els.length) return;
    addEventListener("mousemove", e => { const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5; els.forEach(p => { p.x(dx * 120 * p.s); p.y(dy * 120 * p.s); }); });
  }

  /* ---------------- Marquee (velocity reactive) ---------------- */
  function initMarquee() {
    const track = $("#marqTrack"); if (!track) return;
    let x = 0, half = track.scrollWidth / 2;
    const measure = () => { half = track.scrollWidth / 2; };
    addEventListener("resize", measure); setTimeout(measure, 300);
    gsap.ticker.add(() => {
      x -= (0.8 + Math.min(6, Math.abs(lenisVel) * 0.12));
      if (half && x <= -half) x += half;
      gsap.set(track, { x: x });
    });
  }

  /* ---------------- Nav (burger) ---------------- */
  function initNav() {
    const burger = $("#burger"), links = $(".nav__links");
    if (burger && links) {
      burger.addEventListener("click", () => { const o = links.classList.toggle("open"); burger.classList.toggle("open", o); burger.setAttribute("aria-expanded", o ? "true" : "false"); });
      links.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
    }
    // lang toggle handled by i18n.js
  }
  function closeMenu() { const b = $("#burger"), l = $(".nav__links"); if (l) l.classList.remove("open"); if (b) { b.classList.remove("open"); b.setAttribute("aria-expanded", "false"); } }

  /* ---------------- Lightbox ---------------- */
  function initLightbox() {
    const tiles = $$(".tile"); const lb = $("#lightbox"); if (!lb) return;
    const img = $("#lbImg"), cap = $("#lbCap"), count = $("#lbCount");
    const data = tiles.map(t => ({ src: t.getAttribute("data-full"), t: (t.querySelector("figcaption b") || {}).textContent || "", d: (t.querySelector("figcaption span") || {}).textContent || "" }));
    let i = 0;
    function open(n) {
      i = (n + data.length) % data.length; const it = data[i];
      img.src = it.src; if (cap) cap.innerHTML = "<b>" + it.t + "</b> · <em>" + it.d + "</em>";
      if (count) count.textContent = (i + 1) + " / " + data.length;
      lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; if (lenis) lenis.stop();
      if (window.gsap) gsap.fromTo(".lightbox__stage", { scale: .92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .4, ease: "power3.out" });
    }
    function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; if (lenis) lenis.start(); img.src = ""; }
    tiles.forEach((t, n) => t.addEventListener("click", () => open(n)));
    $("#lbClose").addEventListener("click", close);
    $("#lbPrev").addEventListener("click", e => { e.stopPropagation(); open(i - 1); });
    $("#lbNext").addEventListener("click", e => { e.stopPropagation(); open(i + 1); });
    lb.addEventListener("click", e => { if (e.target === lb || e.target.classList.contains("lightbox__stage")) close(); });
    addEventListener("keydown", e => { if (!lb.classList.contains("open")) return; if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") open(i - 1); else if (e.key === "ArrowRight") open(i + 1); });
  }

  /* ---------------- Copy ---------------- */
  function initCopy() {
    const btn = $("#copyId"); if (!btn) return;
    btn.addEventListener("click", async () => {
      const v = btn.getAttribute("data-copy");
      try { await navigator.clipboard.writeText(v); } catch (e) { const t = document.createElement("textarea"); t.value = v; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e2) {} t.remove(); }
      const old = btn.textContent; btn.textContent = window.RENO_I18N ? window.RENO_I18N.t("_copied") : "¡Copiado!";
      btn.style.background = "var(--red)"; btn.style.color = "#fff";
      setTimeout(() => { btn.textContent = old; btn.style.background = ""; btn.style.color = ""; }, 1400);
    });
    document.addEventListener("langchange", () => { const b = $("#copyId"); if (b && window.RENO_I18N && b.style.background === "") b.textContent = window.RENO_I18N.t("contact.copy"); });
  }

  /* ---------------- Background canvas (particles + orbs) ---------------- */
  function initStage() {
    const cv = $("#stage"); if (!cv || reduce) return;
    const ctx = cv.getContext("2d"); let w, h, dpr = Math.min(1.5, devicePixelRatio || 1), parts = [], orbs = [], raf = null;
    function size() { w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr; cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px"; }
    function make() {
      size(); parts = []; const n = Math.min(60, Math.round(innerWidth / 24));
      for (let k = 0; k < n; k++) parts.push({ x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.6 + .5) * dpr, vy: -(Math.random() * .28 + .08) * dpr, vx: (Math.random() - .5) * .1 * dpr, a: Math.random() * .5 + .1, red: Math.random() < .5 });
      orbs = []; for (let k = 0; k < 3; k++) orbs.push({ x: Math.random() * w, y: Math.random() * h, r: (160 + Math.random() * 120) * dpr, vx: (Math.random() - .5) * .15 * dpr, vy: (Math.random() - .5) * .15 * dpr, a: .05 + Math.random() * .05 });
    }
    function frame() {
      ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = "lighter";
      for (const o of orbs) {
        o.x += o.vx; o.y += o.vy; if (o.x < -o.r) o.x = w + o.r; if (o.x > w + o.r) o.x = -o.r; if (o.y < -o.r) o.y = h + o.r; if (o.y > h + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r); g.addColorStop(0, "rgba(229,52,42," + o.a + ")"); g.addColorStop(1, "rgba(229,52,42,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, 6.2832); ctx.fill();
      }
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = p.red ? "rgba(229,52,42," + p.a + ")" : "rgba(244,241,234," + (p.a * .6) + ")"; ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }
    make(); frame();
    addEventListener("resize", () => { cancelAnimationFrame(raf); make(); frame(); }, { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden) { cancelAnimationFrame(raf); raf = null; } else if (!raf) frame(); });
  }

  /* ---------------- Easter eggs ---------------- */
  function initEaster() {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"]; let p = 0;
    addEventListener("keydown", e => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      p = (k === seq[p]) ? p + 1 : (k === seq[0] ? 1 : 0);
      if (p === seq.length) { p = 0; rave(); }
    });
    // click the hero logo -> spin
    const av = $(".av__img"); if (av) av.style.cursor = "pointer", av.addEventListener("click", () => { if (window.gsap) gsap.fromTo(".av__img-wrap", { rotation: 0 }, { rotation: 360, duration: 1, ease: "power3.inOut" }); });
    function rave() {
      const flash = document.createElement("div"); flash.style.cssText = "position:fixed;inset:0;z-index:180;pointer-events:none;background:radial-gradient(circle,rgba(229,52,42,.5),transparent 60%);opacity:0";
      document.body.appendChild(flash);
      if (window.gsap) {
        gsap.to(flash, { opacity: 1, duration: .2, yoyo: true, repeat: 1, onComplete: () => flash.remove() });
        gsap.fromTo(".av__img-wrap", { rotation: 0 }, { rotation: 720, duration: 1.4, ease: "power4.inOut" });
        gsap.fromTo(".av__rings", { scale: 1 }, { scale: 1.15, duration: .3, yoyo: true, repeat: 3, ease: "power1.inOut" });
      } else flash.remove();
      toast("🦌  MAX POLYS UNLOCKED");
    }
    function toast(msg) {
      const t = document.createElement("div"); t.textContent = msg;
      t.style.cssText = "position:fixed;left:50%;bottom:40px;transform:translateX(-50%) translateY(20px);z-index:190;background:#e5342a;color:#fff;font-family:var(--mono,monospace);font-size:.8rem;letter-spacing:.08em;padding:12px 20px;border-radius:10px;box-shadow:0 14px 40px rgba(229,52,42,.5);opacity:0";
      document.body.appendChild(t);
      if (window.gsap) { gsap.to(t, { opacity: 1, y: -20, duration: .4 }); gsap.to(t, { opacity: 0, y: 0, duration: .4, delay: 2.2, onComplete: () => t.remove() }); }
      else setTimeout(() => t.remove(), 2600);
    }
  }
  function consoleEgg() {
    try {
      console.log("%c🦌 RENONCIN %c3D Artist · FiveM & GTA V", "color:#e5342a;font-size:20px;font-weight:bold", "color:#aaa;font-size:12px");
      console.log("%c¿Buscas contenido 3D de calidad? → discord.gg/nn8nPwWsWc", "color:#e5342a");
    } catch (e) {}
  }
})();
