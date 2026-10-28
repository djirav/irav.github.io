/* GCA - comportamiento del sitio (JS vanilla, sin dependencias).
   Los textos y rutas editables viven en config.js; las galerías en galerias.js (generado). */
(function () {
  'use strict';
  var CFG = window.GCA_CONFIG || {};
  var GAL = window.GCA_GALERIAS || {};
  var d = document;
  var reducir = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ---------- WhatsApp ---------- */
  function urlWA(texto) {
    return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(texto);
  }
  $$('[data-wa]').forEach(function (a) {
    var msg = (CFG.mensajes || {})[a.getAttribute('data-wa')];
    if (CFG.whatsapp && msg) a.href = urlWA(msg);
  });
  $$('[data-comollegar]').forEach(function (a) { if (CFG.comoLlegar) a.href = CFG.comoLlegar; });
  $$('[data-instagram]').forEach(function (a) { if (CFG.instagram) a.href = CFG.instagram; });
  $$('[data-correo]').forEach(function (a) {
    if (CFG.correo) { a.href = 'mailto:' + CFG.correo; a.textContent = CFG.correo; }
  });
  var anio = $('#anio'); if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Formulario de admisiones -> WhatsApp ---------- */
  var form = $('#form-admisiones');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var campos = ['nombre', 'telefono', 'grado'].map(function (n) { return form.elements[n]; });
      var faltan = campos.filter(function (c) { return !c.value.trim(); });
      campos.forEach(function (c) { c.setAttribute('aria-invalid', c.value.trim() ? 'false' : 'true'); });
      $('#form-error').hidden = faltan.length === 0;
      if (faltan.length) { faltan[0].focus(); return; }
      var txt = (CFG.mensajes.general || '') + '. Mi nombre es ' + campos[0].value.trim() +
        ', mi teléfono es ' + campos[1].value.trim() + ' y estoy interesado en el grado: ' + campos[2].value + '.';
      window.open(urlWA(txt), '_blank', 'noopener');
    });
  }

  /* ---------- Menú móvil ---------- */
  var menu = $('#menu'), boton = $('#menu-boton'), cab = $('#cabecera');
  function cerrarMenu() {
    menu.classList.remove('abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
  }
  boton.addEventListener('click', function () {
    var abrir = !menu.classList.contains('abierto');
    menu.classList.toggle('abierto', abrir);
    boton.setAttribute('aria-expanded', String(abrir));
    boton.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) cerrarMenu(); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) { cerrarMenu(); boton.focus(); }
  });
  window.matchMedia('(min-width:1180px)').addEventListener('change', cerrarMenu);

  /* ---------- Sombra de cabecera y botón volver arriba ---------- */
  var arriba = $('#arriba'), ticking = false;
  function alScroll() {
    ticking = false;
    var y = window.scrollY;
    cab.classList.toggle('sombra', y > 8);
    arriba.hidden = y < 900;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(alScroll); }
  }, { passive: true });
  alScroll();
  arriba.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reducir ? 'auto' : 'smooth' });
    var s = $('.saltar'); if (s) s.focus({ preventScroll: true });
  });

  /* ---------- Sección activa en el menú ---------- */
  var enlaces = {};
  $$('#menu a[href^="#"]').forEach(function (a) { enlaces[a.getAttribute('href').slice(1)] = a; });
  var alias = { 'quienes-somos': 'inicio', 'ubicacion': 'admisiones' };
  var actual = null;
  function marcar(id) {
    id = alias[id] || id;
    if (id === actual) return;
    actual = id;
    Object.keys(enlaces).forEach(function (k) {
      if (k === id) enlaces[k].setAttribute('aria-current', 'true');
      else enlaces[k].removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    var oSec = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) marcar(e.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('main > section[id]').forEach(function (s) { oSec.observe(s); });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reducir) {
    var oRv = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); oRv.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    rv.forEach(function (el) { oRv.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Contadores ---------- */
  function contar(el) {
    var fin = parseInt(el.getAttribute('data-contar'), 10), t0 = null, dur = 1400;
    function paso(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), v = Math.round(fin * (1 - Math.pow(1 - p, 3)));
      el.textContent = v.toLocaleString('es-CO');
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }
  var contadores = $$('[data-contar]');
  if ('IntersectionObserver' in window && !reducir) {
    var oC = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { contar(e.target); oC.unobserve(e.target); } });
    }, { threshold: 0.6 });
    contadores.forEach(function (el) { oC.observe(el); });
  }

  /* ---------- Pestañas ---------- */
  $$('[data-pestanas]').forEach(function (cont) {
    var tabs = $$('[role="tab"]', cont), paneles = $$('[role="tabpanel"]', cont);
    function activar(i, foco) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        paneles[j].hidden = !on;
      });
      if (foco) tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activar(i); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, k = e.key, j = null;
        if (k === 'ArrowRight') j = (i + 1) % n;
        else if (k === 'ArrowLeft') j = (i - 1 + n) % n;
        else if (k === 'Home') j = 0;
        else if (k === 'End') j = n - 1;
        if (j !== null) { e.preventDefault(); activar(j, true); }
      });
    });
    activar(0);
  });

  /* ---------- Índice de fotos (generado en galerias.js) ---------- */
  var ANCHOS = [480, 960, 1600];
  var IDX = {};
  Object.keys(GAL).forEach(function (nombre) {
    var g = GAL[nombre];
    g.fotos.forEach(function (f) {
      IDX[f[0]] = { id: f[0], ruta: g.ruta, w: f[1], h: f[2], c: f[3], galeria: nombre };
    });
  });
  function altDe(f, extra) {
    var base = (CFG.alt || {})[f.galeria] || 'Foto del Gimnasio Campestre Los Arrayanes';
    return extra ? base + ' (foto ' + extra + ')' : base;
  }
  function srcset(f, ext) {
    return ANCHOS.map(function (w) { return f.ruta + f.id + '-' + w + '.' + ext + ' ' + w + 'w'; }).join(', ');
  }
  function crearPicture(f, alt, sizes, eager) {
    var p = d.createElement('picture');
    ['avif', 'webp'].forEach(function (ext) {
      var s = d.createElement('source');
      s.type = 'image/' + ext; s.srcset = srcset(f, ext); s.sizes = sizes;
      p.appendChild(s);
    });
    var im = d.createElement('img');
    im.src = f.ruta + f.id + '-960.jpg';
    im.width = f.w; im.height = f.h; im.alt = alt; im.decoding = 'async';
    if (!eager) im.loading = 'lazy';
    p.appendChild(im);
    return p;
  }

  /* ---------- Fotos sueltas: [data-foto="id"] ---------- */
  $$('[data-foto]').forEach(function (el) {
    var f = IDX[el.getAttribute('data-foto')];
    var r = el.getAttribute('data-ratio'); if (r) el.style.aspectRatio = r;
    if (!f) return;
    el.style.setProperty('--c', f.c);
    var sizes = el.classList.contains('panel-portada') ? '(min-width:900px) 40vw, 100vw' : '(min-width:900px) 45vw, 100vw';
    el.appendChild(crearPicture(f, el.getAttribute('data-alt') || altDe(f), sizes, false));
  });

  /* ---------- Visor (lightbox) ---------- */
  var visor = $('#visor'), vImg = $('#visor-img'), vPie = $('#visor-pie');
  var vLista = [], vPos = 0, vOrigen = null;
  function mostrar(i) {
    var n = vLista.length;
    vPos = (i + n) % n;
    var f = vLista[vPos];
    vImg.srcset = ANCHOS.slice(1).map(function (w) { return f.ruta + f.id + '-' + w + '.webp ' + w + 'w'; }).join(', ');
    vImg.sizes = '100vw';
    vImg.src = f.ruta + f.id + '-960.jpg';
    vImg.alt = altDe(f, vPos + 1);
    vPie.textContent = (vPos + 1) + ' / ' + n;
    [vPos + 1, vPos - 1].forEach(function (j) {
      var g = vLista[(j + n) % n], pre = new Image();
      pre.src = g.ruta + g.id + '-960.jpg';
    });
  }
  function abrirVisor(lista, i, origen) {
    if (!visor || typeof visor.showModal !== 'function') return;
    vLista = lista; vOrigen = origen;
    mostrar(i);
    visor.showModal();
  }
  if (visor) {
    visor.addEventListener('click', function (e) {
      var b = e.target.closest('[data-visor]');
      if (b) {
        var a = b.getAttribute('data-visor');
        if (a === 'cerrar') visor.close();
        else mostrar(vPos + (a === 'sig' ? 1 : -1));
      } else if (e.target === visor) visor.close();
    });
    visor.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') mostrar(vPos + 1);
      else if (e.key === 'ArrowLeft') mostrar(vPos - 1);
    });
    visor.addEventListener('close', function () {
      vImg.removeAttribute('src'); vImg.removeAttribute('srcset');
      if (vOrigen && d.contains(vOrigen)) vOrigen.focus();
    });
    var x0 = null;
    var fig = $('.visor-fig', visor);
    fig.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    fig.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) mostrar(vPos + (dx < 0 ? 1 : -1));
    });
    fig.addEventListener('pointercancel', function () { x0 = null; });
  }

  /* ---------- Galerías: [data-galeria] ---------- */
  var LOTE = 12;
  function listaDe(nombre) {
    var col = (CFG.colecciones || {})[nombre];
    if (col && col.length) return col.map(function (id) { return IDX[id]; }).filter(Boolean);
    var g = GAL[nombre] || ((nombre === 'secundaria' || nombre === 'media') && GAL['secundaria-media']);
    return g ? g.fotos.map(function (f) { return IDX[f[0]]; }) : [];
  }
  $$('[data-galeria]').forEach(function (cont) {
    var nombre = cont.getAttribute('data-galeria');
    var lista = listaDe(nombre);
    var mostradas = 0;
    var inicial = parseInt(cont.getAttribute('data-inicial'), 10) || 6;
    if (!lista.length) {
      var v = d.createElement('div');
      v.className = 'galeria-vacio';
      v.textContent = cont.getAttribute('data-vacio') || 'Fotos próximamente.';
      cont.appendChild(v);
      return;
    }
    var mas = d.createElement('div');
    mas.className = 'galeria-mas';
    var btn = d.createElement('button');
    btn.type = 'button'; btn.className = 'btn btn-primario';
    mas.appendChild(btn);
    function pintar(cuantas) {
      var frag = d.createDocumentFragment();
      lista.slice(mostradas, mostradas + cuantas).forEach(function (f, k) {
        var i = mostradas + k;
        var b = d.createElement('button');
        b.type = 'button'; b.className = 'galeria-item';
        b.style.setProperty('--c', f.c);
        b.setAttribute('aria-label', 'Ampliar foto ' + (i + 1) + ' de ' + lista.length + ': ' + altDe(f));
        b.appendChild(crearPicture(f, '', '(min-width:1000px) 25vw, (min-width:640px) 33vw, 50vw', false));
        b.addEventListener('click', function () { abrirVisor(lista, i, b); });
        frag.appendChild(b);
      });
      cont.insertBefore(frag, mas.parentNode ? mas : null);
      mostradas = Math.min(mostradas + cuantas, lista.length);
      var resto = lista.length - mostradas;
      if (resto > 0) {
        btn.textContent = 'Ver más fotos (' + resto + ')';
        if (!mas.parentNode) cont.appendChild(mas);
      } else if (mas.parentNode) {
        var foco = cont.querySelector('.galeria-item:last-of-type');
        mas.remove();
        if (foco) foco.focus();
      }
    }
    btn.addEventListener('click', function () { pintar(LOTE); });
    pintar(inicial);
  });

  /* ---------- Videos con facade (se cargan al hacer clic) ---------- */
  function embedDe(url) {
    var m;
    if ((m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/))) {
      return { tipo: 'iframe', src: 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0' };
    }
    if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) {
      return { tipo: 'iframe', src: 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1' };
    }
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { tipo: 'video', src: url };
    return { tipo: 'iframe', src: url };
  }
  $$('[data-video]').forEach(function (cont) {
    var url = ((CFG.videos || {})[cont.getAttribute('data-video')] || '').trim();
    var btn = $('.video-play', cont);
    if (!btn) return;
    if (!url) {
      cont.classList.add('sin-video');
      btn.disabled = true;
      btn.setAttribute('aria-label', 'Video próximamente');
      $('.video-play-texto', btn).textContent = 'Video próximamente';
      return;
    }
    btn.addEventListener('click', function () {
      var e = embedDe(url), el;
      if (e.tipo === 'video') {
        el = d.createElement('video');
        el.controls = true; el.autoplay = true; el.playsInline = true; el.src = e.src;
      } else {
        el = d.createElement('iframe');
        el.src = e.src;
        el.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        el.allowFullscreen = true;
        el.referrerPolicy = 'strict-origin-when-cross-origin';
      }
      el.title = btn.getAttribute('aria-label') || 'Video del Gimnasio Campestre Los Arrayanes';
      cont.appendChild(el);
      btn.remove();
      el.focus();
    });
  });
})();
