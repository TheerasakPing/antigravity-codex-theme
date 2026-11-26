import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeOverrideDict, sanitizeConfigPatch } from '../core/daemon/paths.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('locale config accepts only supported locale identifiers', () => {
  const current = { locale: 'zh-CN', modules: { i18n: true } };
  assert.equal(sanitizeConfigPatch(current, { locale: 'th-TH' }).locale, 'th-TH');
  assert.equal(sanitizeConfigPatch(current, { locale: 'en' }).locale, 'en');
  assert.equal(sanitizeConfigPatch(current, { locale: 'zh-CN' }).locale, 'zh-CN');
  assert.equal(sanitizeConfigPatch(current, { locale: 'th' }).locale, 'zh-CN');
  assert.equal(sanitizeConfigPatch(current, { locale: '../user/config.json' }).locale, 'zh-CN');
});

test('Thai locale dictionary is valid, non-empty, and contains native Thai labels', () => {
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'core/locales/th-TH.json'), 'utf8'));
  assert.ok(Object.keys(dict).length >= 100, 'expected a useful first-pass Thai dictionary');
  assert.equal(typeof dict.Settings, 'string');
  assert.equal(dict.Settings, 'ตั้งค่า');
  assert.match(dict['Token Usage'], /Token/);
  assert.ok(Object.values(dict).every((value) => typeof value === 'string' && value.length > 0));
});

test('Thai overrides accept the same exact-key format as the Chinese override file', () => {
  const raw = { exact: { Settings: 'การตั้งค่า', Token: 'Token' }, _comment: 'ignored' };
  assert.deepEqual(normalizeOverrideDict(raw), { Settings: 'การตั้งค่า', Token: 'Token' });
});

test('locale selection does not mutate unrelated existing settings', () => {
  const current = { locale: 'zh-CN', telemetryLayout: 'detailed', modules: { i18n: true, metrics: true } };
  const next = sanitizeConfigPatch(current, { locale: 'th-TH' });
  assert.equal(next.locale, 'th-TH');
  assert.equal(next.telemetryLayout, 'detailed');
  assert.deepEqual(next.modules, { i18n: true, metrics: true });
});
