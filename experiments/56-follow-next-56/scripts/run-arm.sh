#!/bin/zsh
# Runs every counted reader session for one arm in pre-registered order.
set -u
cd "$(dirname "$0")/.."
arm=$1
python3 scripts/readers.py run --arm "$arm" --condition guess --count 3 --parallel 3
python3 scripts/readers.py run --arm "$arm" --condition original --count 6 --parallel 3
python3 scripts/readers.py run --arm "$arm" --condition promoted --count 6 --parallel 3
python3 scripts/readers.py repeat --arm "$arm" --parallel 3
echo "arm $arm done $(date -u +%H:%M:%S)"
