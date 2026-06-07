#!/bin/bash
# Weafex launcher.
# Double-click this file in Finder → Terminal opens, dependencies are installed
# if needed, the dev server starts, and the site opens in Safari automatically.
# Closing the Terminal window (or Ctrl+C) stops the server.

cd "$(dirname "$0")" || exit 1
PORT=3000
URL="http://localhost:$PORT"

echo "→ Checking dependencies (first run takes a moment)…"
npm install

echo "→ Starting Weafex on $URL …"
npm run dev &
DEV_PID=$!

# Wait (up to ~60s) for the server to respond, then open Safari.
echo "→ Waiting for the server to be ready…"
for i in $(seq 1 60); do
  if curl -s -o /dev/null "$URL"; then
    break
  fi
  sleep 1
done

echo "→ Opening Safari…"
open -a Safari "$URL"

echo "→ Weafex is running. Leave this window open; press Ctrl+C or close it to stop."
wait $DEV_PID
