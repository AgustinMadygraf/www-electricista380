from typing import Any, Dict
from fastapi import APIRouter, Request, HTTPException, Depends
from src.infrastructure.fastapi.dependencies import templates, get_contenido, get_industrias, get_chatwoot_token
from src.domain.models import ContenidoModel, IndustriaModel

router = APIRouter()

@router.get("/industria/{industria}.html")
async def pagina_industria(request: Request, industria: str, contenido: ContenidoModel = Depends(get_contenido), industrias_data: IndustriaModel = Depends(get_industrias), chatwoot_token: str = Depends(get_chatwoot_token)):
    
    nombre_industria = industrias_data.industrias.get(industria)
    
    if not nombre_industria:
        raise HTTPException(status_code=404, detail="Industria no encontrada")
    
    brand_data = contenido.brand.model_dump()
    servicios_data = [s.model_dump() for s in contenido.content.services.cards]
    industria_formateada = industria.replace("-", " ").title()
        
    context: Dict[str, Any] = {
        "brand": brand_data,
        "servicios": servicios_data,
        "faq": contenido.content.faq.questions,
        "chatwoot_token": chatwoot_token,
        "industria_nombre": nombre_industria,
        "seo_titulo": f"Electricista especializado en {nombre_industria} - Urgencias 24/7",
        "seo_descripcion": f"¿Necesitas un electricista en {nombre_industria}? Servicio profesional certificado en {industria_formateada}. Atención rápida, segura y 24/7."
    }
    return templates.TemplateResponse(request=request, name="index.html", context=context)
