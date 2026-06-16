import pytest
from httpx import AsyncClient, ASGITransport # type: ignore
import importlib
from src.infrastructure.settings import config
from src.infrastructure.fastapi.app import app

@pytest.mark.asyncio  # type: ignore
async def test_cookie_banner_rendered():
    # Modificar el módulo config en tiempo de ejecución
    config.GOOGLE_ANALYTICS_ID = "UA-TEST-123"
    
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    
    assert response.status_code == 200
    assert 'id="cookie-banner"' in response.text
    assert 'Aceptar' in response.text
    assert 'Rechazar' in response.text
    
    # Limpiar
    config.GOOGLE_ANALYTICS_ID = None
