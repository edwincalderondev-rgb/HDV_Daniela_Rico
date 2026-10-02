/* ═══════════════════════════════════════════════════════════════════
   Daniela Rico Iglesias — interacción del sitio
   JavaScript sin dependencias. Todo es mejora progresiva: sin JS el
   contenido se lee completo y los enlaces funcionan.
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const d = document;
  const root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────── tema claro / oscuro ─────────────── */
  const themeBtn = $('#themeBtn');
  const metaTheme = $('meta[name="theme-color"]');

  const setTheme = (t, save) => {
    root.setAttribute('data-theme', t);
    if (metaTheme) metaTheme.content = t === 'dark' ? '#141015' : '#FBF8F4';
    themeBtn?.setAttribute('aria-label', t === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    if (save) { try { localStorage.setItem('dr-theme', t); } catch (e) { /* almacenamiento bloqueado */ } }
  };
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);
  themeBtn?.addEventListener('click', () =>
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));

  // mientras la persona no elija, el sitio sigue al sistema
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', (e) => {
    let saved = null;
    try { saved = localStorage.getItem('dr-theme'); } catch (_) { /* nada */ }
    if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
  });

  /* ─────────────── barra de navegación ─────────────── */
  const nav = $('#nav');
  const onScroll = () => nav?.classList.toggle('scrolled', scrollY > 12);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // sección activa; las secciones sin enlace propio se asocian a una vecina (data-nav)
  const links = $$('.links a');
  const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const key = en.target.dataset.nav || en.target.id;
      links.forEach((a) => a.removeAttribute('aria-current'));
      byId.get(key)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => spy.observe(s));

  /* ─────────────── menú móvil ─────────────── */
  const burger = $('#burger');
  const sheet = $('#sheet');
  const main = $('#main');
  const foot = $('.foot');

  const openSheet = (open) => {
    if (!sheet || !burger) return;
    sheet.classList.toggle('open', open);
    sheet.inert = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    root.classList.toggle('lock', open);
    if (main) main.inert = open;
    if (foot) foot.inert = open;
    if (open) $('a', sheet)?.focus({ preventScroll: true });
  };
  burger?.addEventListener('click', () => openSheet(!sheet.classList.contains('open')));
  sheet?.addEventListener('click', (e) => { if (e.target.closest('a')) openSheet(false); });
  d.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sheet?.classList.contains('open')) { openSheet(false); burger.focus(); }
  });
  matchMedia('(min-width: 1101px)').addEventListener?.('change', (e) => { if (e.matches) openSheet(false); });

  /* ─────────────── entrada de la portada ─────────────── */
  const hero = $('.hero');
  requestAnimationFrame(() => requestAnimationFrame(() => hero?.classList.add('ready')));

  /* ─────────────── revelado al desplazarse ─────────────── */
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      reveal.unobserve(en.target);
      if (en.target.classList.contains('overfill')) {
        // al terminar el trazo, la curva del proceso centrado vuelve a ser punteada
        setTimeout(() => en.target.classList.add('done'), reduce ? 0 : 2800);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
  $$('.reveal').forEach((el) => reveal.observe(el));

  // al tocar el final de la página no debe quedar nada sin mostrar
  const revealRest = () => {
    if (innerHeight + scrollY < root.scrollHeight - 4) return;
    $$('.reveal:not(.in)').forEach((el) => { el.classList.add('in'); reveal.unobserve(el); });
    removeEventListener('scroll', revealRest);
  };
  addEventListener('scroll', revealRest, { passive: true });

  /* ─────────────── contadores ─────────────── */
  const fmt = (v, dec) => v.toLocaleString('es-CO', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      counter.unobserve(el);
      if (reduce) return;
      const to = parseFloat(el.dataset.count);
      const dec = Number(el.dataset.dec || 0);
      const t0 = performance.now();
      const dur = 1500;
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = fmt(to * (1 - Math.pow(1 - p, 4)), dec);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => counter.observe(el));

  /* ─────────────── guilloché del sello y de la credencial ───────────────
     Bandas de curvas senoidales desfasadas, como en los diplomas y billetes.
     data-guilloche="cx,cy,radio,amplitud,ondas,curvas; …"                    */
  const NS = 'http://www.w3.org/2000/svg';
  $$('[data-guilloche]').forEach((host) => {
    host.dataset.guilloche.split(';').forEach((spec) => {
      const [cx, cy, r0, amp, waves, curves] = spec.split(',').map(Number);
      const pts = waves * 14;
      let dPath = '';
      for (let c = 0; c < curves; c++) {
        const ph = (2 * Math.PI * c) / curves;
        for (let i = 0; i <= pts; i++) {
          const t = (i / pts) * 2 * Math.PI;
          const r = r0 + amp * Math.sin(waves * t + ph);
          dPath += (i ? 'L' : 'M') + (cx + r * Math.cos(t)).toFixed(2) + ' ' + (cy + r * Math.sin(t)).toFixed(2);
        }
      }
      const p = d.createElementNS(NS, 'path');
      p.setAttribute('d', dPath);
      host.appendChild(p);
    });
  });

  /* ─────────────── copiar al portapapeles ─────────────── */
  const toast = $('#toast');
  let toastTimer;
  const say = (msg) => {
    if (!toast) return;
    $('span', toast).textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  };
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
    } catch (e) {
      const ta = Object.assign(d.createElement('textarea'), { value });
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0';
      d.body.appendChild(ta); ta.select(); d.execCommand('copy'); ta.remove();
    }
    say('Correo copiado');
  }));

  /* ─────────────── certificado SGS ───────────────
     La página ya tiene el lugar del certificado. Cuando el archivo exista en
     assets/docs/ con el nombre indicado en data-cert (PDF, JPG o PNG), los
     botones «Ver certificado» aparecen solos. No hay que tocar el HTML.       */
  const cred = $('[data-cert]');
  if (cred && location.protocol.startsWith('http')) {
    const base = cred.dataset.cert;
    const activate = (url) => {
      $$('[data-cert-link]').forEach((a) => { a.href = url; });
      $$('[data-cert-actions], [data-cert-doc]').forEach((el) => { el.hidden = false; });
      cred.classList.add('has-file');
    };
    (async () => {
      for (const ext of ['pdf', 'jpg', 'png']) {
        try {
          const res = await fetch(`${base}.${ext}`, { method: 'HEAD', cache: 'no-store' });
          if (res.ok) { activate(`${base}.${ext}`); return; }
        } catch (e) { /* sin red: se deja oculto */ }
      }
    })();
  }

  /* ─────────────── barra de acciones en móvil ─────────────── */
  const dock = $('#dock');
  if (dock && hero) {
    let pastHero = false;
    let inContact = false;
    const sync = () => {
      const show = pastHero && !inContact;
      dock.classList.toggle('show', show);
      dock.inert = !show;
    };
    new IntersectionObserver(([en]) => { pastHero = !en.isIntersecting; sync(); }, { rootMargin: '-35% 0px 0px 0px' })
      .observe(hero);
    const contact = $('#contacto');
    if (contact) {
      new IntersectionObserver(([en]) => { inContact = en.isIntersecting; sync(); }, { threshold: 0.05 })
        .observe(contact);
    }
  }

  /* ─────────────── año del pie ─────────────── */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
