# Daniela Rico Iglesias — Hoja de vida web

Sitio personal de **Daniela Carolina Rico Iglesias**, Ingeniera Industrial de la Universidad del
Magdalena y Auditora Interna en Sistemas de Gestión Integrados HSEQ (ISO 9001 · ISO 14001 ·
ISO 45001) formada por SGS Academy.

🔗 **https://edwincalderondev-rgb.github.io/HDV_Daniela_Rico/**

---

## Concepto

**Porcelana editorial.** Papel cálido, tinta berenjena y una serif de alto contraste
(*Fraunces*) con una sans humanista para la lectura (*Plus Jakarta Sans*). Los tres acentos
del sistema de color son también los tres sistemas que ella audita:

| Color | Sistema | Norma |
|---|---|---|
| Mora `#A23B5B` | Calidad | ISO 9001 |
| Salvia `#4D7464` | Ambiente | ISO 14001 |
| Oro `#B08A4C` | Seguridad y salud en el trabajo | ISO 45001 |

En la portada, su retrato está en el centro de esos tres sistemas que se cruzan (un sistema
de gestión integrado), y **cada sección lleva la numeración de la Estructura Armonizada de las
normas ISO**: § 4 Contexto (perfil), § 9.2 Auditoría interna (certificación), § 8 Operación
(experiencia), § 10 Mejora (investigación), § 7.5 Información documentada (documentos)… Hasta
la página 404 es una *§ 10.2 No conformidad* con su acción correctiva.

## Detalles de implementación

Hecho a mano: **HTML, CSS y JavaScript sin frameworks, sin compilación y sin dependencias.**

- **Tema claro y oscuro** con *custom properties*; sigue al sistema hasta que la persona elige,
  y recuerda la elección.
- **Accesibilidad:** HTML semántico, enlace de salto, `aria-*`, foco visible, menú móvil con
  `inert`, contraste AA y soporte completo de `prefers-reduced-motion`.
- **Rendimiento:** fuentes autoalojadas en WOFF2 con *preload*, retrato en WebP con `srcset`,
  ilustraciones en SVG en línea y animaciones solo con `transform`, `opacity` y `clip-path`.
- **SEO:** Open Graph con imagen propia, datos estructurados JSON-LD (`ProfilePage` + `Person`
  con credenciales), `sitemap.xml`, `robots.txt` y manifiesto web.
- **Hoja de impresión** dedicada y **tarjeta de contacto** `.vcf` con foto.

## El certificado de SGS Academy

La página ya tiene su lugar. Cuando llegue el certificado, basta con copiarlo aquí:

```
assets/docs/Certificado_SGS_Auditora_Interna_HSEQ.pdf
```

(también sirve `.jpg` o `.png` con el mismo nombre). Al publicarlo, los botones
**«Ver certificado»** aparecen solos en la tarjeta de la credencial y en la sección de
documentos. No hay que tocar el HTML.

## Estructura

```
.
├── index.html                      Página completa
├── 404.html                        «§ 10.2 No conformidad»
├── assets/
│   ├── css/styles.css              Sistema de diseño y componentes
│   ├── js/main.js                  Tema, navegación, revelado, contadores, certificado
│   ├── fonts/                      Fraunces y Plus Jakarta Sans (SIL OFL 1.1)
│   ├── img/                        Retrato, íconos e imagen para compartir
│   └── docs/                       Hoja de vida en PDF, tarjeta .vcf y certificado
├── .github/workflows/deploy.yml    Despliegue automático a GitHub Pages
├── site.webmanifest · robots.txt · sitemap.xml · .nojekyll
└── README.md
```

La hoja de vida en PDF y las imágenes se generan con las herramientas de la carpeta
`generadores/`, que vive fuera de este repositorio.

## Ejecutar en local

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Despliegue

Cada `push` a `main` publica el sitio con GitHub Actions.
Para activarlo una sola vez: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

---

**Daniela Carolina Rico Iglesias** · Valledupar, Cesar, Colombia · disponibilidad de traslado
📧 danielaricoiglesias999@gmail.com · 📱 +57 310 612 6306
💼 [LinkedIn](https://www.linkedin.com/in/daniela-rico-iglesias) · 🔬 [ORCID](https://orcid.org/0009-0000-8832-6539)
