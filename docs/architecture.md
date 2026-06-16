# Arquitectura del Sistema - Electricista 380

## Diagrama Lógico
1. **Capa de Configuración:** Carga de variables de entorno (.env).
2. **Capa de Datos:** Carga de archivos YAML desde /data.
3. **Capa de Aplicación (FastAPI):** Inyección de datos, lógica de negocio y endpoint para RASA Action Server (puerto 5006).
4. **Capa de Presentación (Jinja2):** Renderizado final de HTML.
5. **Capa de Comportamiento (Frontend JS):** Inicialización de componentes (Chat) mediante lectura de atributos data-*.

## Optimización
- Los activos estáticos utilizan cabeceras Cache-Control (7 días).