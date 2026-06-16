from typing import Any
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import Response, FileResponse
from starlette.types import Scope
from src.infrastructure.settings.logger import setup_logger
from src.infrastructure.settings import config
import yaml
import time

# Clase para añadir cabeceras de caché a archivos estáticos
class CachedStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope: Scope) -> Response:
        response = await super().get_response(path, scope)
        # Caché por 7 días
        response.headers["Cache-Control"] = f"public, max-age={config.STATIC_CACHE_SECONDS}, immutable"
        return response

app = FastAPI(title=config.APP_TITLE)
app.mount("/static", CachedStaticFiles(directory=config.STATIC_DIR), name="static")

templates = Jinja2Templates(directory=config.TEMPLATES_DIR)

def add_static_version():
    return int(time.time())

# Configuración de globales para Jinja2
# Usamos # type: ignore para evitar el error de Pylance sin romper la sintaxis
templates.env.globals["static_version"] = add_static_version # type: ignore
templates.env.globals["config"] = config # type: ignore

logger = setup_logger(config.LOGGER_NAME)

# Cargar contenido desde YAML
def cargar_contenido():
    with open(config.CONTENT_DATA_PATH, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

contenido = cargar_contenido()
# Inyectar el token secreto desde el entorno
chatwoot_token = config.CHATWOOT_TOKEN

@app.get("/robots.txt")
async def robots():
    return FileResponse(config.ROBOTS_TXT_PATH)

@app.get("/sitemap.xml")
async def sitemap(request: Request):
    return templates.TemplateResponse(
        request=request, 
        name="sitemap.xml", 
        media_type="application/xml"
    )

@app.get("/dev/preview/{partial_name}")
async def preview(request: Request, partial_name: str):
    context: dict[str, Any] = {
        "negocio": contenido["negocio"], 
        "servicios": contenido["servicios"],
        "faq": contenido["faq"],
        "chatwoot_token": chatwoot_token,
        "partial_name": partial_name
    }
    return templates.TemplateResponse(request=request, name="preview.html", context=context)

@app.get("/")
async def root(request: Request):
    logger.info("Acceso a la Landing Page")
    # Definir el contexto con tipos explícitos para satisfacer a Pylance
    context: dict[str, Any] = {
        "negocio": contenido["negocio"], 
        "servicios": contenido["servicios"],
        "faq": contenido["faq"],
        "chatwoot_token": chatwoot_token
    }
    return templates.TemplateResponse(request=request, name="index.html", context=context)
