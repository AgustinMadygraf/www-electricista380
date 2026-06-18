# Plan de Migración (TODO)

## Fase 1: Auditoría y Documentación
- [x] Auditar documentación existente y alinear con arquitectura SSR pura.
- [x] Actualizar `docs/TODO.md` y `docs/architecture.md` (enfoque HTML-first).

## Fase 2: Estructura HTML (Semántica)
- [ ] Definir estructura HTML de todas las secciones (`partials/*.html`) sin estilos CSS.
- [ ] Validar semántica, accesibilidad y SEO de los templates.

## Fase 3: Estilizado (CSS Nativo)
- [ ] Acondicionar `_variables.css` con tokens exactos de marca.
- [ ] Implementar estilos CSS puristas por componente (siguiendo el orden de migración).
- [ ] Verificar fidelidad visual 100% vs Legacy.

## Fase 4: Lógica de Negocio y Formulario
- [ ] Implementar Wizard de Cotización (HTML + Vanilla JS para persistencia local).
- [ ] Validar integración RASA Action Server.
