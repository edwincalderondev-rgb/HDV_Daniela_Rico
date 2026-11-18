/* ═══════════════════════════════════════════════════════════════════
   Asistente de Daniela — respuestas con evidencia
   Conversación guiada, sin dependencias y sin servicios externos: todo
   lo que responde sale de esta misma hoja de vida. No guarda ni envía
   lo que la persona escribe.
   Para agregar una respuesta: una entrada más en BASE (o BASE_EN) con
   sus palabras clave (sin tildes) y su texto.
   ═══════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const d = document;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TEL = '+57 312 710 2603';
  const WA = 'https://wa.me/573127102603?text=' + encodeURIComponent('Hola, Daniela. Vi tu hoja de vida en línea y quisiera conversar sobre una oportunidad laboral.');
  const MAIL = 'mailto:danielaricoiglesias999@gmail.com?subject=' + encodeURIComponent('Oportunidad laboral — Daniela Rico Iglesias');
  const DOCS = 'assets/docs/';

  /* Acciones que acompañan a una respuesta: [texto, destino] */
  const A = {
    perfil: ['Ver perfil', '#perfil'], exp: ['Ver experiencia', '#experiencia'], cert: ['Ver certificación', '#certificacion'],
    inv: ['Ver investigación', '#investigacion'], comp: ['Ver competencias', '#competencias'], form: ['Ver formación', '#formacion'],
    docs: ['Ver documentos', '#documentos'], contacto: ['Ir a contacto', '#contacto'],
    wa: ['Escribir por WhatsApp', WA], mail: ['Enviar correo', MAIL], tel: ['Llamar', 'tel:+573127102603'],
    li: ['LinkedIn', 'https://www.linkedin.com/in/daniela-rico-iglesias'],
    cv: ['Hoja de vida general (PDF)', DOCS + 'HDV_Daniela_Rico.pdf'], cvD: ['Versión datos (PDF)', DOCS + 'HDV_Daniela_Rico_Datos.pdf'],
    cvO: ['Versión operaciones (PDF)', DOCS + 'HDV_Daniela_Rico_Operaciones.pdf'], cvEn: ['Résumé in English (PDF)', DOCS + 'Daniela_Rico_Resume_EN.pdf'],
  };

  /* k: expresiones sobre el texto ya normalizado (minúsculas, sin tildes) y su peso */
  const BASE = [
    { id: 'pareja', src: 'Dato fuera de norma',
      k: [[/\b(novi[oa]s?|noviazgo|pareja|espos[oa]|marido|conyuge|prometid[oa]|enamorad[oa]s?|amor|amores|casad[oa]|solter[oa]|comprometid[oa]|media naranja|galan|pretendiente|corazon|crush|estado civil|sale con|anda con|su hombre|quien la (quiere|ama)|companer[oa] (sentimental|de vida)|edwin)\b/, 9]],
      a: '<p>Eso no aparece en la hoja de vida, pero es un hallazgo con evidencia objetiva 😊: <b>se llama Edwin Calderón Aguilera y está muy enamorado</b>. ❤️</p>' },
    { id: 'saludo', k: [[/^(hola|holi|buen[oa]s|hey|que tal|saludos|buen dia)\b/, 1]],
      a: '<p>¡Hola! 👋 Soy el asistente de Daniela. Respondo con lo que está en su hoja de vida: experiencia, certificación, herramientas, disponibilidad y contacto. ¿Qué te gustaría saber?</p>' },
    { id: 'quien', src: '§ 4 Contexto', acts: ['perfil', 'cv'],
      k: [[/\b(quien es|quien eres|sobre (ella|daniela)|perfil|presentacion|presentala|cuentame|hablame|resumen|resumela|describ)\b/, 4]],
      a: '<p><b>Daniela Rico Iglesias</b> es Ingeniera Industrial de la Universidad del Magdalena, de un programa con Acreditación de Alta Calidad (promedio <b>4,19 / 5,00</b>), y <b>Auditora Interna HSEQ</b> formada por SGS Academy en ISO 9001, ISO 14001 e ISO 45001.</p><p>Hizo su práctica en la planta de Klaren’s (Lácteos del Cesar S.A.) y es coautora de dos investigaciones, una publicada por Springer Nature. Su lema: <i>calidad con evidencia, mejora con datos</i>.</p>' },
    { id: 'experiencia', src: '§ 8 Operación', acts: ['exp', 'cv'],
      k: [[/\b(experiencia|practica|practicas|pasantia|pasante|trabaj[oa]|trabajado|laboral|lacteos|klaren|empresa|funciones|planta|produccion|empaque)\b/, 4]],
      a: '<p>Fue <b>Pasante de Proyectos</b> en Lácteos del Cesar S.A., fabricante de Klaren’s (Valledupar), del 18 de julio de 2025 al 17 de enero de 2026: <b>seis meses</b>, terminados satisfactoriamente según certificación de Talento Humano.</p><ul><li>Apoyó la supervisión diaria de producción y empaque y registró inconformidades y defectos.</li><li>Midió en línea tiempos, desperdicios y eficiencia, y apoyó estudios de tiempos y movimientos.</li><li>Mantuvo los indicadores (KPI) y presentó un pre-informe diario a su jefe inmediato.</li><li>Contribuyó a elaborar un procedimiento operativo y dos formatos de registro.</li></ul>' },
    { id: 'logros', src: '§ 8 Operación', acts: ['exp'],
      k: [[/\b(logro|logros|resultado|resultados|proyecto|proyectos|muestreo|sobredosificacion|capacidad|doe|pareto|ishikawa|360|ejemplo|caso)\b/, 4]],
      a: '<p>Cuatro resultados de su práctica:</p><ul><li><b>Muestreo de 360 unidades</b> de material de empaque (95 % de confianza) como base para definir sus especificaciones.</li><li><b>Pérdidas por sobredosificación</b> cuantificadas con muestreo y análisis de capacidad del proceso.</li><li>Análisis de un proceso productivo con <b>DOE, Pareto e Ishikawa</b>, entregado en informes técnicos.</li><li><b>Un procedimiento operativo y dos formatos de registro</b> elaborados y actualizados.</li></ul>' },
    { id: 'certificacion', src: '§ 9.2 Auditoría interna', acts: ['cert'],
      k: [[/\b(certifica\w*|auditor[a]?|auditoria|iso|sgs|hseq|9001|14001|45001|19011|norma|normas|sistema de gestion|sistemas de gestion|sig|calidad)\b/, 4]],
      a: '<p>Es <b>Auditora Interna en Sistemas de Gestión Integrados HSEQ</b> por <b>SGS Academy</b>: ISO 9001:2015, ISO 14001:2026 e ISO 45001:2018, bajo las directrices de ISO 19011:2018 y con enfoque en responsabilidad social. Fueron 50 horas con examen final, que aprobó en 2026.</p><p>Eso la habilita para planificar y ejecutar auditorías internas, obtener evidencia objetiva, redactar hallazgos y no conformidades, y verificar la eficacia de las acciones correctivas.</p>' },
    { id: 'formacion', src: '§ 7.2 Competencia', acts: ['form'],
      k: [[/\b(estudi\w*|universidad|unimagdalena|formacion|carrera|titulo|profesion|ingenier[ao]|promedio|nota|acreditacion|grado|graduad[ao]|egresad[ao]|bachiller|colegio|semillero)\b/, 4]],
      a: '<p><b>Ingeniería Industrial</b> en la Universidad del Magdalena (2021 – 2026), con promedio acumulado de <b>4,19 / 5,00</b>. El programa tiene Acreditación de Alta Calidad (Resolución 024948 del 15 de septiembre de 2026).</p><p>Además fue integrante del Semillero de Investigación GEMC (2024 – 2025) y se formó como auditora interna en SGS Academy.</p>' },
    { id: 'investigacion', src: '§ 10 Mejora', acts: ['inv'],
      k: [[/\b(investiga\w*|publicacion|publicaciones|public[oó]|articulo|articulos|paper|springer|acofi|six sigma|doi|orcid|autora|ponencia|regresion)\b/, 4]],
      a: '<p>Tiene dos trabajos en coautoría:</p><ul><li><b>Springer Nature (2026)</b>, <i>Lecture Notes in Production Engineering</i>: optimización de la calidad de jeringas de dos piezas con superficies de respuesta y Six Sigma. Resultado: Cp de 1,21 y 32 % menos de producto no conforme.</li><li><b>ACOFI · EIEI 2024</b>, como <b>primera autora</b>: análisis de regresión sobre 60 años de datos agrícolas de Colombia, Brasil y Argentina.</li></ul>' },
    { id: 'herramientas', src: '§ 7.1 Recursos', acts: ['comp', 'cvD'],
      k: [[/\b(herramienta|herramientas|excel|power ?bi|minitab|microsoft|office|sharepoint|teams|software|programas?|tecnolog\w*|sql|python|sap|datos|dashboard|tablero|tableros|indicador|indicadores|kpi|estadistica)\b/, 4]],
      a: '<p><b>Excel avanzado</b> y <b>Power BI</b>, ambos certificados, y <b>Minitab</b> para estadística aplicada: muestreo, regresión, capacidad de proceso y diseño de experimentos.</p><p>Trabaja con el núcleo de Microsoft 365 (SharePoint, Lists, Teams, Forms, OneDrive). SQL lo está fortaleciendo ahora; no ha trabajado con SAP.</p>' },
    { id: 'idiomas', src: '§ 7.1 Recursos', acts: ['cvEn'],
      k: [[/\b(idioma|idiomas|ingles|english|bilingue|b2|lengua)\b/, 5]],
      a: '<p>Español nativo e <b>inglés B2</b>. Tiene también su hoja de vida en inglés.</p>' },
    { id: 'disponibilidad', src: '§ 7.4 Comunicación', acts: ['wa', 'contacto'],
      k: [[/\b(disponib\w*|ubicacion|ubicada|ciudad|donde (vive|esta|queda)|vive en|santa marta|valledupar|traslad\w*|remot[oa]|teletrabajo|presencial|hibrid[oa]|viajar|mudar\w*|empezar|inmediat\w*|cuando puede|horario|turnos?)\b/, 5]],
      a: '<p><b>Disponibilidad inmediata.</b> Santa Marta es su prioridad y también trabaja desde Valledupar; acepta modalidad presencial o teletrabajo, y tiene disponibilidad de traslado.</p>' },
    { id: 'contacto', src: '§ 7.4 Comunicación', acts: ['wa', 'mail', 'tel', 'li'],
      k: [[/\b(contact\w*|telefono|celular|numero|whatsapp|correo|email|e-mail|mail|linkedin|llamar\w*|escribir\w*|comunic\w*|hablar con ella|entrevista|agendar)\b/, 5]],
      a: '<p>Daniela responde personalmente:</p><ul><li>Celular y WhatsApp: <b>' + TEL + '</b></li><li>Correo: <b>danielaricoiglesias999@gmail.com</b></li><li>LinkedIn: in/daniela-rico-iglesias</li></ul>' },
    { id: 'cv', src: '§ 7.5 Información documentada', acts: ['cv', 'cvD', 'cvO', 'cvEn'],
      k: [[/\b(hoja de vida|hojas de vida|hdv|cv|curriculum|curriculo|resume|pdf|descarg\w*|documento|documentos|soporte|soportes)\b/, 6]],
      a: '<p>Hay cuatro versiones en PDF, según el cargo: la <b>general</b> (calidad y HSEQ), la de <b>datos e indicadores</b>, la de <b>operaciones y producción</b> y un <b>résumé en inglés</b>.</p>' },
    { id: 'cargos', src: '§ 6 Planificación', acts: ['perfil', 'cv'],
      k: [[/\b(cargo|cargos|rol|roles|puesto|puestos|vacante|vacantes|que busca|busca|interes|intereses|oferta|encaja|areas?|aporta\w*|sector|sectores|industria)\b/, 3]],
      a: '<p>Encaja en cargos de <b>analista de calidad</b>, <b>analista SIG / HSEQ</b>, <b>auditora interna</b>, <b>analista de procesos y mejora continua</b>, <b>analista de datos e indicadores</b> y de apoyo a <b>producción y operaciones</b>.</p><p>Sectores de interés: energía y combustibles, alimentos, manufactura y servicios industriales con sistemas de gestión certificados.</p>' },
    { id: 'porque', src: '§ 4 Contexto', acts: ['wa', 'cv'],
      k: [[/\b(por que (contratar|elegir)\w*|contratarla|diferencia|ventaja|valor|destaca|fortaleza|fortalezas|mejor candidata)\b/, 5]],
      a: '<p>Tres razones:</p><ul><li><b>Criterio de auditora:</b> requisito, evidencia, hallazgo y mejora, en tres normas ISO.</li><li><b>Decide con datos:</b> Excel avanzado y Power BI certificados, y estadística aplicada en Minitab.</li><li><b>Ya lo hizo en planta y lo publicó:</b> seis meses en una industria de alimentos y dos investigaciones, una en Springer Nature.</li></ul>' },
    { id: 'blandas', src: '§ 7.1 Recursos', acts: ['comp'],
      k: [[/\b(habilidad|habilidades|competencia|competencias|blanda|blandas|liderazgo|personalidad|como es|caracter)\b/, 3]],
      a: '<p>Pensamiento crítico, comunicación efectiva, liderazgo, responsabilidad y atención al detalle. En la práctica eso se tradujo en un informe diario a su jefe, registros al día y documentación clara del proceso.</p>' },
    { id: 'salario', acts: ['wa', 'mail'],
      k: [[/\b(salari\w*|sueldo|cuanto (cobra|gana|aspira|pide)|pago|remuneracion|aspiracion)\b/, 6]],
      a: '<p>La aspiración salarial la conversa Daniela directamente, según el cargo y sus responsabilidades. Puedes escribirle y te responde ella misma.</p>' },
    { id: 'personales', acts: ['contacto'],
      k: [[/\b(edad|anos tiene|cuantos anos|cumpleanos|cedula|direccion|hijos|religion|peso|estatura)\b/, 6]],
      a: '<p>Esos datos personales no hacen parte de la hoja de vida. Si son necesarios para un proceso de selección, Daniela los comparte directamente.</p>' },
    { id: 'bot', k: [[/\b(eres (un |una )?(robot|bot|ia|humano|persona|maquina)|quien te hizo|como funcionas|inteligencia artificial|chatbot)\b/, 6]],
      a: '<p>Soy un asistente sencillo: respondo solo con lo que está en la hoja de vida de Daniela. No uso fuentes externas ni guardo lo que escribes. Para lo demás, lo mejor es hablar con ella.</p>', acts: ['wa'] },
    { id: 'gracias', k: [[/\b(gracias|muchas gracias|thanks|thank you|chao|adios|hasta luego|listo|perfecto|ok)\b/, 1]],
      a: '<p>Con gusto. Si quieres avanzar, Daniela responde personalmente por WhatsApp o correo. 🌷</p>', acts: ['wa', 'mail'] },
  ];

  /* Respuestas en inglés, para quien pregunta en inglés */
  const BASE_EN = [
    { k: [[/\b(boyfriend|husband|partner|fiance|married|single|in love|dating|edwin|love)\b/, 9]],
      a: '<p>That is not on the résumé, but it is a verified finding 😊: <b>his name is Edwin Calderón Aguilera, and he is very much in love</b>. ❤️</p>' },
    { k: [[/\b(experience|internship|work|job|worked)\b/, 4]], acts: ['exp', 'cvEn'],
      a: '<p>She worked for six months (Jul 2025 – Jan 2026) as a <b>Project Intern</b> at Lácteos del Cesar S.A., a dairy manufacturer: in-line quality control, statistical sampling, KPI tracking, daily reports, and process documentation.</p>' },
    { k: [[/\b(skills?|tools?|excel|power ?bi|minitab|sql|data|software)\b/, 4]], acts: ['cvEn'],
      a: '<p><b>Advanced Excel and Power BI (both certified)</b>, Minitab for statistics (regression, sampling, DOE, process capability) and Microsoft 365. She is currently strengthening SQL.</p>' },
    { k: [[/\b(certif\w*|auditor|iso|sgs|quality)\b/, 4]], acts: ['cert'],
      a: '<p>She is an <b>Internal Auditor for Integrated Management Systems (HSEQ)</b>: ISO 9001, ISO 14001 and ISO 45001, trained by SGS Academy under ISO 19011 guidelines (50 hours, exam passed in 2026).</p>' },
    { k: [[/\b(contact|phone|email|mail|whatsapp|linkedin|reach|call|interview)\b/, 5]], acts: ['wa', 'mail', 'li'],
      a: '<p>You can reach Daniela directly: <b>' + TEL + '</b> (phone and WhatsApp) or <b>danielaricoiglesias999@gmail.com</b>.</p>' },
    { k: [[/\b(resume|cv|pdf|download|document)\b/, 6]], acts: ['cvEn', 'cv'],
      a: '<p>Here is her one-page résumé in English. The Spanish versions have more detail.</p>' },
    { k: [[/\b(available|availability|location|where|remote|relocat\w*|start|english|language)\b/, 4]], acts: ['wa'],
      a: '<p>She is <b>available immediately</b>, based in Colombia (Santa Marta – Valledupar), open to on-site or remote work. Her English level is B2.</p>' },
    { k: [[/\b(who|about|she|her|daniela|profile|summary|hello|hi|hey|tell me)\b/, 2]], acts: ['cvEn', 'perfil'],
      a: '<p><b>Daniela Rico Iglesias</b> is an Industrial Engineer from Universidad del Magdalena (GPA 4.19 / 5.00) and an Internal Auditor for ISO 9001, 14001 and 45001, trained by SGS Academy. She has a six-month internship in food manufacturing and two published research papers, one with Springer Nature.</p>' },
  ];

  const SIN_DATO = { acts: ['wa', 'mail'],
    a: '<p>Ese dato no lo tengo con evidencia. 🙂 Puedo contarte sobre su <b>experiencia</b>, su <b>certificación HSEQ</b>, sus <b>herramientas</b>, su <b>disponibilidad</b> o cómo <b>contactarla</b>. Y si prefieres, Daniela te responde personalmente.</p>' };
  const SIN_DATO_EN = { acts: ['wa', 'cvEn'],
    a: '<p>I don’t have that on record. I can tell you about her <b>experience</b>, <b>skills</b>, <b>certification</b>, <b>availability</b> or how to <b>contact</b> her.</p>' };
  const SUGERIDAS = [['¿Quién es Daniela?', 'quien'], ['Experiencia', 'experiencia'], ['Certificación HSEQ', 'certificacion'], ['Herramientas', 'herramientas'],
    ['Disponibilidad', 'disponibilidad'], ['Hojas de vida', 'cv'], ['Contacto', 'contacto']];

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  const mejor = (base, n) => { let b = null, p = 0; for (const e of base) { let s = 0; for (const [re, w] of e.k) if (re.test(n)) s += w; if (s > p) { p = s; b = e; } } return b; };
  const esIngles = (n) => /\b(who|what|where|when|how|does|is she|her|she|the|about|experience|skills|contact|resume|available|hello|boyfriend|husband|tell me|can you|english please)\b/.test(n)
    && !/\b(que|quien|como|donde|cuando|cual|ella|su|una?|el|la|los|las|hola|tiene|es)\b/.test(n);
  function responder(q) {
    const n = norm(q);
    if (!n) return SIN_DATO;
    if (esIngles(n)) return mejor(BASE_EN, n) || SIN_DATO_EN;
    return mejor(BASE, n) || mejor(BASE_EN, n) || SIN_DATO;
  }

  /* ─────────────── interfaz ─────────────── */
  const ICO_CHAT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.6a7.9 7.9 0 0 1-11.5 7l-4.5 1.2 1.2-4.2a7.9 7.9 0 1 1 14.8-4z"/><path d="M9 11.4h.01M12.4 11.4h.01M15.8 11.4h.01"/></svg>';
  const launch = d.createElement('button');
  launch.className = 'as-launch'; launch.type = 'button'; launch.id = 'asLaunch';
  launch.setAttribute('aria-expanded', 'false'); launch.setAttribute('aria-controls', 'asPanel');
  launch.setAttribute('aria-label', 'Abrir el asistente de Daniela');
  launch.innerHTML = ICO_CHAT + '<span>Pregúntame</span>';

  const panel = d.createElement('section');
  panel.className = 'as-panel'; panel.id = 'asPanel'; panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Asistente de Daniela'); panel.inert = true;
  panel.innerHTML =
    '<header class="as-head">' +
      '<span class="as-ava-w"><span class="as-ava"><img src="assets/img/daniela-retrato-600.webp" alt="" width="44" height="44" loading="lazy"></span></span>' +
      '<div class="as-tt"><b>Asistente de Daniela</b><span>Respuestas con evidencia</span></div>' +
      '<button class="as-x" type="button" aria-label="Cerrar el asistente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
    '</header>' +
    '<div class="as-log" role="log" aria-live="polite" aria-label="Conversación"></div>' +
    '<div class="as-chips" role="group" aria-label="Preguntas sugeridas"></div>' +
    '<form class="as-form" autocomplete="off">' +
      '<input type="text" name="q" maxlength="160" placeholder="Escribe tu pregunta…" aria-label="Escribe tu pregunta" enterkeyhint="send">' +
      '<button type="submit" aria-label="Enviar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg></button>' +
    '</form>' +
    '<p class="as-note">Responde solo con lo que está en esta hoja de vida. No guarda lo que escribes.</p>';
  d.body.append(launch, panel);

  const log = panel.querySelector('.as-log');
  const chips = panel.querySelector('.as-chips');
  const form = panel.querySelector('.as-form');
  const input = form.querySelector('input');
  let iniciado = false;

  const bajar = () => { log.scrollTop = log.scrollHeight; };
  function burbuja(html, deQuien) {
    const m = d.createElement('div');
    m.className = 'as-msg ' + (deQuien === 'yo' ? 'as-me' : 'as-bot');
    if (deQuien === 'yo') m.textContent = html; else m.innerHTML = html;
    log.append(m); bajar();
    return m;
  }
  function acciones(m, r) {
    if (r.acts && r.acts.length) {
      const w = d.createElement('div'); w.className = 'as-acts';
      r.acts.forEach((k) => {
        const [t, href] = A[k]; const a = d.createElement('a');
        a.textContent = t; a.href = href;
        if (href.charAt(0) === '#') a.addEventListener('click', () => { if (matchMedia('(max-width:760px)').matches) abrir(false); });
        else if (/^https?:/.test(href) || /\.pdf$/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
        w.append(a);
      });
      m.append(w);
    }
    if (r.src) { const s = d.createElement('span'); s.className = 'as-src'; s.textContent = 'Evidencia · ' + r.src; m.append(s); }
  }
  function contestar(r) {
    const t = d.createElement('div'); t.className = 'as-msg as-bot as-typing'; t.innerHTML = '<i></i><i></i><i></i>';
    log.append(t); bajar();
    setTimeout(() => { t.remove(); acciones(burbuja(r.a, 'bot'), r); bajar(); }, reduce ? 0 : 520);
  }
  function preguntar(texto, id) {
    burbuja(texto, 'yo');
    contestar(id ? BASE.find((e) => e.id === id) : responder(texto));
  }
  function pintarChips() {
    chips.innerHTML = '';
    SUGERIDAS.forEach(([t, id]) => {
      const b = d.createElement('button'); b.type = 'button'; b.textContent = t;
      b.addEventListener('click', () => preguntar(t, id));
      chips.append(b);
    });
  }
  function abrir(si) {
    d.documentElement.classList.toggle('as-open', si);
    panel.inert = !si; launch.setAttribute('aria-expanded', String(si));
    if (si) {
      if (!iniciado) {
        iniciado = true; pintarChips();
        burbuja('<p>¡Hola! 👋 Soy el asistente de Daniela. Pregúntame por su <b>experiencia</b>, su <b>certificación</b>, sus <b>herramientas</b> o su <b>disponibilidad</b>: respondo con lo que está en su hoja de vida.</p>', 'bot');
      }
      if (!matchMedia('(max-width:760px)').matches) input.focus({ preventScroll: true });
    } else launch.focus({ preventScroll: true });
  }

  launch.addEventListener('click', () => abrir(true));
  panel.querySelector('.as-x').addEventListener('click', () => abrir(false));
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && d.documentElement.classList.contains('as-open')) abrir(false); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim(); if (!q) return;
    input.value = ''; preguntar(q);
  });
  // cualquier elemento con data-asistente abre la conversación (por ejemplo, un botón de la página)
  d.addEventListener('click', (e) => { if (e.target.closest('[data-asistente]')) { e.preventDefault(); abrir(true); } });

  // para pruebas automáticas
  window.__asistente = { responder, abrir };
})();
