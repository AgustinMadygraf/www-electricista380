#!/bin/bash
set -e # Salir inmediatamente si algún comando falla

echo "Iniciando despliegue en servidor..."

# Actualizar dependencias
./.venv/bin/pip install -r backend/requirements.txt

# Cache Busting
TIMESTAMP=$(date +%s)
sed -i "s/v=[0-9]*/v=$TIMESTAMP/g" backend/frontend/index.html

# Reiniciar servicio
systemctl restart fitba-impacto-economico.service

echo "Despliegue finalizado con éxito."
