#!/usr/bin/env bash
set -euo pipefail

API=${API:-http://localhost:3333/api}

echo "E2E clients test against $API"

# Wait for backend health
MAX_WAIT=30
SLEEP=1
elapsed=0
until curl -sSf --max-time 2 "$API/clients" >/dev/null 2>&1; do
  if [ $elapsed -ge $MAX_WAIT ]; then
    echo "Timeout waiting for backend at $API/clients"
    exit 1
  fi
  printf "."
  sleep $SLEEP
  elapsed=$((elapsed + SLEEP))
done
echo "\nBackend is healthy, starting E2E steps"

# Create
CREATE_RES=$(curl -sS -X POST "$API/clients" -H "Content-Type: application/json" -d '{"cliente":{"cpf_cnpj":"000.000.000-00","name":"E2E User","email":"e2e@example.com"},"level":"E2E"}')
if [ -z "$CREATE_RES" ]; then
  echo "Create failed or empty response"
  exit 1
fi

ID=$(echo "$CREATE_RES" | node -e "const fs=require('fs'); const s=fs.readFileSync(0,'utf8'); const o=JSON.parse(s); console.log(o && o.id ? o.id : '')")

if [ -z "$ID" ] || [ "$ID" = "undefined" ]; then
  echo "Could not parse ID from create response: $CREATE_RES"
  exit 1
fi

echo "Created client id=$ID"

# Get
GET_RES=$(curl -sS "$API/clients/$ID")
echo "Get response: $GET_RES"

# Update
UPDATE_RES=$(curl -sS -X PUT "$API/clients/$ID" -H "Content-Type: application/json" -d '{"cliente":{"cpf_cnpj":"000.000.000-00","name":"E2E User Updated","email":"e2e2@example.com"},"level":"E2E"}')
echo "Update response: $UPDATE_RES"

# Delete
curl -sS -X DELETE "$API/clients/$ID" -o /dev/null -w "%{http_code}\n"

echo "E2E done"
