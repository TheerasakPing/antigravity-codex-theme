# Native Thai Localization

## User-facing behavior

The embedded Settings page exposes three locale choices:

- `en` — English interface.
- `zh-CN` — existing Simplified Chinese interface and dictionary (kept as the default for existing installations).
- `th-TH` — native Thai interface, with English fallback only for strings outside the source dictionary or unsupported dynamic cases.

Changing the locale persists to `user/config.json` and rebuilds the injected runtime. Existing installations without a `locale` setting retain the previous Simplified Chinese behavior. The default locale is intentionally unchanged.

## Translation policy

Thai wording is contextual and natural for Thai developers, not word-for-word. Keep common technical vocabulary in English where that is clearer: Agent, Workspace, Context, Token, Prompt, MCP, API, Terminal, IDE, CLI, Plugin, Skills, model names, commands, paths, and keyboard shortcuts.

Never translate user-authored content, prompts, code, terminal output, model responses, or dynamic values. Permission, deletion, billing, and security messages must preserve their exact meaning and severity.

## Coverage

- `core/i18n.json` contains **1,937** source interface keys.
- `core/locales/th-TH.json` contains a Thai translation for **all 1,937 source keys**.
- The locale test checks full key coverage and verifies interpolation placeholder parity.
- The runtime includes Thai-specific formatters for quota windows, resets, relative time, usage counts, task summaries, recording messages, and accessibility labels.
- The optional `user/i18n.th-TH.override.json` remains available for user-specific wording overrides.

## Files

- `core/i18n.json` — existing English-to-Simplified-Chinese source dictionary.
- `core/locales/th-TH.json` — complete Thai translation of the source interface dictionary.
- `user/i18n.override.json` — Simplified Chinese overrides.
- `user/i18n.th-TH.override.json` — Thai overrides.
- `core/runtime/60-i18n-engine.js` — locale-aware static and dynamic DOM translation.
- `core/daemon/paths.mjs` — locale validation, dictionary selection, override merge, and boot payload.
- `tests/locale.test.mjs` — locale configuration, dictionary coverage, placeholder, and runtime checks.

## Validation checklist

- [x] Preserve old installations by defaulting missing locale to `zh-CN`.
- [x] Validate locale identifiers against `en`, `zh-CN`, and `th-TH`.
- [x] Keep Chinese override files separate from Thai overrides.
- [x] Translate every key in the 1,937-entry source interface dictionary.
- [x] Verify interpolation placeholders match the English source keys.
- [x] Add Thai-specific dynamic quota, duration, usage, task, and accessibility formatters.
- [ ] Run `npm run check` and `npm test` on Node.js 22.13+.
- [ ] Perform a live Antigravity smoke test on macOS, Windows, and Linux.
- [ ] Review visual wrapping and contextual wording in the live UI before stable release.
