import pytest
from httpx import AsyncClient, ASGITransport # type: ignore
from src.infrastructure.fastapi.app import app

@pytest.mark.asyncio  # type: ignore
async def test_sitemap_rendered():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/sitemap.xml")
    
    assert response.status_code == 200
    assert "application/xml" in response.headers["content-type"]

@pytest.mark.asyncio  # type: ignore
async def test_preview_rendered():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Probamos con cookie-banner.html que existe en templates/partials/
        response = await ac.get("/dev/preview/cookie-banner.html")
    
    assert response.status_code == 200
    assert 'id="cookie-banner"' in response.text
