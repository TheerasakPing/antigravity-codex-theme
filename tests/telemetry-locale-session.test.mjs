import test from 'node:test';
import assert from 'node:assert/strict';
import { buildMetricsSessionKey } from '../core/daemon/cdp-bridge.mjs';

test('telemetry session cache is invalidated when the UI locale changes', () => {
  const common = {
    cascadeId: '00000000-0000-4000-8000-000000000001',
    rawDbSig: 'db-signature',
    manualContextLimit: 0,
    fallbackContextLimit: 256000,
    telemetryLayout: 'compact',
    telemetryCacheMode: 'session'
  };
  const thai = buildMetricsSessionKey({ ...common, locale: 'th-TH' });
  const chinese = buildMetricsSessionKey({ ...common, locale: 'zh-CN' });
  const english = buildMetricsSessionKey({ ...common, locale: 'en' });

  assert.notEqual(thai, chinese, 'Thai must never reuse a Chinese-rendered session payload');
  assert.notEqual(thai, english, 'Thai must never reuse an English-rendered session payload');
  assert.notEqual(chinese, english, 'each locale needs its own rendered session payload');
  assert.match(thai, /\|locale:th-TH\|/);
});
