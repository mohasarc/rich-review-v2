#!/bin/zsh
# Runs the shipped CLI binary from a worktree and records which daemon entry it spawns.
set -u
WT=${1:?worktree path}
LABEL=${2:?label}
OUT=${0:A:h}/cli-probe-$LABEL.txt
TMP=$(mktemp -d /tmp/rr-cli-probe-XXXX)
cp -R "$WT/packages/testing/fixtures/overview-cases" "$TMP/ws"
mv "$TMP/ws/dot-git" "$TMP/ws/.git"
export SYMNAV_STATE_DIR="$TMP/state"
export SYMNAV_TELEMETRY=0
CLI="$WT/apps/cli/dist/cli.js"
{
  echo "# $LABEL  $(cd $WT && git rev-parse --short HEAD)  $(date -u +%FT%TZ)"
  echo "## run 1: symnav overview barrel.ts"
  (cd "$TMP/ws" && node "$CLI" overview barrel.ts | head -5)
  for i in {1..200}; do
    if grep -l '"state": *"ready"' "$TMP"/state/daemons/*/*.json >/dev/null 2>&1; then break; fi
    sleep 0.05
  done
  RECORD=$(grep -l '"state": *"ready"' "$TMP"/state/daemons/*/*.json 2>/dev/null | head -1)
  PID=$(python3 -c "import json,sys;print(json.load(open(sys.argv[1]))['pid'])" "$RECORD")
  echo "## daemon record: ${RECORD#$TMP/}"
  echo "## daemon process command line (pid $PID)"
  ps -o command= -p "$PID" | sed "s#$WT#<worktree>#g" | cut -c1-160
  echo "## run 2: symnav overview barrel.ts"
  (cd "$TMP/ws" && node "$CLI" overview barrel.ts | head -5)
  echo "## daemon.log kinds"
  python3 -c "import json,sys;[print('  ',json.loads(l)['kind']) for l in open(sys.argv[1])]" "$(dirname $RECORD)/daemon.log"
  echo "## symnav daemon status"
  (cd "$TMP/ws" && node "$CLI" daemon status | sed "s#$TMP#<tmp>#g")
  echo "## symnav daemon stop"
  (cd "$TMP/ws" && node "$CLI" daemon stop | sed "s#$TMP#<tmp>#g")
} > "$OUT" 2>&1
rm -rf "$TMP"
cat "$OUT"
