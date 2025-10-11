#!/usr/bin/env bash
"#" populate_all.sh - executa scripts de populacao sequencialmente
# Saia no primeiro erro
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Usando diretório do projeto: $ROOT_DIR"

echo "1/2: Populando clients com assessors (clear, avatar random)"
NODE_PATH="$ROOT_DIR/backend/node_modules" node "$ROOT_DIR/scripts/populate_clients_with_assessors.js" --clear --avatar random

echo "2/2: Populando leads (clear, avatar random)"
NODE_PATH="$ROOT_DIR/backend/node_modules" node "$ROOT_DIR/scripts/populate_leads_db.js" --clear --avatar random

echo "Todos os scripts foram executados com sucesso."
