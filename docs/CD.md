# Guía de Despliegue Continuo (CD)

El proyecto cuenta con un flujo de despliegue automático hacia el VPS.

## Configuración de GitHub Secrets
Para activar el CD, configura los siguientes secretos en tu repositorio (Settings > Secrets and variables > Actions):
- `SSH_HOST`: IP de tu VPS.
- `SSH_PRIVATE_KEY`: Llave privada SSH (con acceso root al VPS).

## Flujo de Despliegue
1. El despliegue se dispara automáticamente al hacer push a la rama `main`.
2. GitHub Actions se conecta vía SSH al VPS.
3. Se ejecuta `scripts/deploy-server.sh` en el servidor para actualizar el código, instalar dependencias, realizar cache busting y reiniciar el servicio `systemd`.
