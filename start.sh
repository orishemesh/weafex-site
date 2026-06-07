#!/usr/bin/env bash
# Weafex site launcher — installs dependencies on first run, then starts the
# dev server at http://localhost:3000 (locked to port 3000).
set -e

# Move into this script's own folder, wherever it's run from.
cd "$(dirname "$0")"

# Install dependencies the first time (or after they're removed).
if [ ! -d "node_modules" ]; then
  echo "→ First run: installing dependencies (one-time, ~30s)…"
  npm install
fi

PORT=3000
if lsof -i :"$PORT" >/dev/null 2>&1; then
  echo "⚠  Port $PORT is busy. Free it or run:  npm run dev -- -p 3001"
  exit 1
fi

echo "→ Starting Weafex at http://localhost:$PORT  (Ctrl+C to stop)"
npm run dev
