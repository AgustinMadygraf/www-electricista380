#!/bin/bash
set -e

# Cargar configuración desde .env.deploy
if [ -f "scripts/.env.deploy" ]; then
    source scripts/.env.deploy
else
    echo "Error: scripts/.env.deploy no encontrado."
    exit 1
fi

echo "Iniciando despliegue de Electricista 380 en $DEPLOY_SSH_HOST..."

ssh -p $DEPLOY_SSH_PORT $DEPLOY_SSH_USER@$DEPLOY_SSH_HOST "cd $DEPLOY_REMOTE_DIR && git pull && ./venv/bin/pip install -r requirements.txt && systemctl restart electricista380.service"

echo "Despliegue exitoso."
