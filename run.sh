#!/bin/bash

# Detener proceso ocupando el puerto 8000
PORT=8000
PIDS=$(lsof -t -i:$PORT)
if [ ! -z "$PIDS" ]; then
  echo "Deteniendo procesos en puerto $PORT"
  kill -9 $PIDS
fi

source venv/bin/activate
export PYTHONPATH=$PYTHONPATH:$(pwd)
python3 -m uvicorn src.infrastructure.fastapi.app:app --reload
