#!/usr/bin/env bash
# PostToolUse hook: autofix, format and lint the file Claude just edited.
# Problems left after autofix are reported back to Claude via stderr + exit code 2.
set -uo pipefail

file_path=$(jq -r '.tool_input.file_path // empty')
[[ -z "$file_path" || ! -f "$file_path" ]] && exit 0

cd "$CLAUDE_PROJECT_DIR" || exit 0

case "$file_path" in
  "$CLAUDE_PROJECT_DIR"/node_modules/* | "$CLAUDE_PROJECT_DIR"/dist/*) exit 0 ;;
  "$CLAUDE_PROJECT_DIR"/*) ;;
  *) exit 0 ;;
esac

case "$file_path" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs)
    pnpm exec vp lint --fix "$file_path" >/dev/null 2>&1
    pnpm exec vp fmt "$file_path" >/dev/null 2>&1
    if ! output=$(pnpm exec vp lint --deny-warnings "$file_path" 2>&1); then
      echo "Lint issues in $file_path:" >&2
      echo "$output" >&2
      exit 2
    fi
    ;;
  *.css | *.json | *.md | *.html | *.yaml | *.yml)
    pnpm exec vp fmt "$file_path" >/dev/null 2>&1
    ;;
esac

exit 0
