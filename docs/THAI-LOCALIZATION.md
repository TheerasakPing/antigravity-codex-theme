# Native Thai Localization

## User-facing behavior

The embedded settings page exposes three locale choices:

- `en` — English interface; no Chinese-only dynamic formatter runs.
- `zh-CN` — existing Simplified Chinese interface and dictionary (default for existing installations).
- `th-TH` — Thai dictionary with English fallback for strings not translated yet.

Changing the locale persists to `user/config.json` and rebuilds the injected runtime. Existing installations without a `locale` setting retain the previous Simplified Chinese behavior.

## Translation policy

Thai wording is contextual and natural for Thai developers, not word-for-word. Keep common technical vocabulary in English where that is clearer: Agent, Workspace, Context, Token, Prompt, MCP, API, Terminal, IDE, CLI, Plugin, Skills, model names, commands, paths, and keyboard shortcuts.

Never translate user-authored content, prompts, code, terminal output, model responses, or dynamic values. Permission, deletion, billing, and security messages must preserve their exact meaning and severity.

## Files

- `core/i18n.json` — existing English-to-Simplified-Chinese dictionary.
- `core/locales/th-TH.json` — curated Thai dictionary.
- `user/i18n.override.json` — Simplified Chinese overrides.
- `user/i18n.th-TH.override.json` — Thai overrides.
- `core/runtime/60-i18n-engine.js` — locale-aware static and dynamic DOM translation.
- `core/daemon/paths.mjs` — locale validation, dictionary selection, fallback, and boot payload.

## Current coverage and follow-up

The Thai dictionary is an initial curated set, not a full translation of all 1,900+ Chinese dictionary entries. Untranslated labels intentionally remain in English rather than displaying Chinese or guessed Thai. Continue expanding coverage by reviewing actual Antigravity UI strings, preserving placeholders and checking narrow layouts.

## Validation checklist

- [x] Preserve old installations by defaulting missing locale to `zh-CN`.
- [x] Validate locale identifiers against `en`, `zh-CN`, and `th-TH`.
- [x] Keep Chinese override files separate from Thai overrides.
- [x] Prevent Chinese-only contextual, accessibility, and dynamic formatters from running in Thai/English.
- [x] Add basic Thai relative-time and count formatters.
- [x] Add automated tests for locale config and dictionary shape.
- [ ] Run `npm run check` and `npm test` on Node.js 22.13+.
- [ ] Perform a live Antigravity smoke test on macOS, Windows, and Linux.
- [ ] Expand Thai dictionary coverage and review UI wrapping before stable release.
