import pytest
from httpx import AsyncClient, ASGITransport # type: ignore
from src.infrastructure.settings import config
from src.infrastructure.fastapi.app import app
from src.infrastructure.fastapi.dependencies import get_contenido
from src.domain.models import ContenidoModel

# Mock data para test_cookie_banner
async def override_get_contenido():
    return ContenidoModel(
        brand={
            "brandName": "Test",
            "brandAriaLabel": "Test",
            "baseOperativa": "Test",
            "contactEmail": "test@test.com",
            "whatsappUrl": "http://test.com",
            "technician": {"name": "Test", "role": "Test", "photo": {"src": "test.jpg", "alt": "Test"}}
        },
        content={
            "hero": {
                "badge": "Test", "title": "Test", "subtitle": "Test", "responseNote": "Test",
                "primaryCta": {"label": "Test", "href": "http://test.com"},
                "secondaryCta": {"label": "Test", "href": "http://test.com"},
                "benefits": [],
                "image": {"src": "test.jpg", "alt": "Test"}
            },
            "services": {"title": "Test", "cards": []},
            "navbar": {"links": []},
            "faq": {"questions": []},
            "about": {"title": "Test", "paragraphs": [], "image": {"src": "test.jpg", "alt": "Test"}},
            "profile": {"bullets": []},
            "legal": {"text": "Test"}
        },
        seo={"siteDescription": "Test", "siteName": "Test", "siteUrl": "http://test.com"}
    )

@pytest.mark.asyncio  # type: ignore
async def test_cookie_banner_rendered():
    # Modificar el módulo config en tiempo de ejecución
    config.GOOGLE_ANALYTICS_ID = "UA-TEST-123"
    
    app.dependency_overrides[get_contenido] = override_get_contenido
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    
    assert response.status_code == 200
    assert 'id="cookie-banner"' in response.text
    assert 'Aceptar' in response.text
    assert 'Rechazar' in response.text
    
    # Limpiar
    config.GOOGLE_ANALYTICS_ID = None
    app.dependency_overrides.clear()
