# Arquitectura del Sistema - Datamaq

## Visión General
Migración de SPA (Vue.js) a SSR (FastAPI + Jinja2) priorizando SEO, performance (Core Web Vitals) y simplicidad operativa sin sistemas de compilación de assets.

## Flujo de Datos y Estructura
1.  **Backend:** FastAPI inyecta datos desde archivos YAML (`/data/*.yaml`) en el contexto de Jinja2.
2.  **Frontend (SSR):**
    - **Metodología HTML-first:** Definición de estructuras semánticas limpias mediante componentes Jinja2 (`templates/partials/*.html`).
    - **Estilizado (Pure CSS):** Uso de CSS nativo, sin Tailwind ni preprocesadores que requieran compilación en tiempo de despliegue.
    - **Interactividad (Progressive Enhancement):** Vanilla JS inyectado mediante scripts modulares (`static/js/`) para interacciones basadas en estados (`.is-active`).

## Integración RASA
- Acción como **Action Server**.
- Endpoint: `/webhook`.
- Puerto: 5006.

## Infraestructura y CD
- Despliegue automático vía GitHub Actions.
- Script: `scripts/deploy-server.sh`.
- Servicio Systemd: Manejo directo de Uvicorn (sin capas de compilación).
