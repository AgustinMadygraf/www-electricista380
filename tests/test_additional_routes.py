import pytest
from httpx import AsyncClient, ASGITransport # type: ignore
from src.infrastructure.fastapi.app import app
from src.infrastructure.fastapi.dependencies import get_contenido, get_chatwoot_token
from src.domain.models import ContenidoModel

# Mock data actualizado a la nueva estructura
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

async def override_get_chatwoot_token():
    return "test_token"

app.dependency_overrides[get_contenido] = override_get_contenido
app.dependency_overrides[get_chatwoot_token] = override_get_chatwoot_token

@pytest.mark.asyncio  # type: ignore
async def test_sitemap_rendered():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/sitemap.xml")
    
    assert response.status_code == 200
    assert "application/xml" in response.headers["content-type"]
