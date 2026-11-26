/**
 * tests/protobuf-telemetry.test.mjs — Unit tests for Protobuf wire decoding, retry log parsing & telemetry layout formatting
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

process.env.AG_DAEMON_LIBRARY = '1';

const {
  parseProto,
  parseGenMetadataRow,
  extractMaxStepIdx,
  extractProtoLeafStrings,
  extractStep17Message,
  isCancelText,
  readRecentLsRetryInfo
} = await import('../core/daemon.mjs');

const {
  fmtTok,
  computeSegPcts,
  buildInlineTelemetryHtml,
  buildMetricsTooltipHtml,
  localizeTelemetryHtml,
  buildTurnSummaries
} = await import('../core/daemon/telemetry-renderer.mjs');

test("localizeTelemetryHtml translates the complete metrics hover card to Thai", () => {
  const metrics = {
    genIdx: 71,
    streamTps: 236.9,
    e2eTps: 120.6,
    streamTpsValid: true,
    last: {
      idx: 70,
      ctx: 238038,
      cacheWrite: 0,
      inTok: 3024,
      cacheRead: 235014,
      ttft: 1.1,
      stream: 8.89,
      totDur: 9.99,
      outTok: 2400,
      thinkTok: 500,
      respTok: 1900
    },
    lastCacheRate: "98.7",
    ctxPct: 46,
    contextLimitTokens: 512000,
    limitKStr: "512k",
    remainCtx: 273962,
    compactedPending: false,
    compactSummaryKb: 0,
    compactingNow: false,
    generatingPending: false,
    pendingRetrying: false,
    lastErrorMsg: "",
    turnSteps: 3,
    turnOut: 1200,
    turnThink: 200,
    turnResp: 1000,
    turnDur: 3.5,
    userStepsCount: 6,
    validCount: 71,
    totalIn: 3024,
    totalCacheWrite: 0,
    totalCache: 235014,
    totalPrompt: 238038,
    sessionCacheRate: "79.9",
    totalOut: 2400,
    totalThink: 500,
    totalResp: 1900
  };
  const tooltip = localizeTelemetryHtml(buildMetricsTooltipHtml(metrics), "th-TH");
  assert.match(tooltip, /สถิติการเรียกใช้ล่าสุด/);
  assert.match(tooltip, /ความเร็วสร้าง/);
  assert.match(tooltip, /เฉลี่ยรวม 120\.6/);
  assert.match(tooltip, /บริบท/);
  assert.match(tooltip, /อัตราแคชสะสม/);
  assert.match(tooltip, /ดูรายละเอียด/);
  assert.match(tooltip, /รวมรอบนี้/);
  assert.match(tooltip, /สตรีม/);
  assert.doesNotMatch(tooltip, /[\u3400-\u9fff]/);
  const sample = "本轮最新调用 · 生成速度 · 端到端 120.6 · Ctx 46% · Cache 79.9% · 展开明细";
  assert.equal(localizeTelemetryHtml(sample, "zh-CN"), sample);
});
function encodeVarint(num) {
  const bytes = [];
  let n = BigInt(num);
  while (n >= 0x80n) {
    bytes.push(Number((n & 0x7fn) | 0x80n));
    n >>= 7n;
  }
  bytes.push(Number(n));
  return Buffer.from(bytes);
}

function fieldVarint(fn, val) {
  return Buffer.concat([encodeVarint((fn << 3) | 0), encodeVarint(val)]);
}

function fieldBytes(fn, bufOrStr) {
  const buf = Buffer.isBuffer(bufOrStr) ? bufOrStr : Buffer.from(String(bufOrStr), 'utf8');
  return Buffer.concat([encodeVarint((fn << 3) | 2), encodeVarint(buf.length), buf]);
}

test('parseGenMetadataRow decodes token usage, TTFT, streaming duration, model name, and step indices', () => {
  const usage = Buffer.concat([
    fieldVarint(2, 2400),
    fieldVarint(3, 600),
    fieldVarint(4, 150),
    fieldVarint(5, 18000),
    fieldVarint(9, 250),
    fieldVarint(10, 350)
  ]);
  const ctxMeta = fieldVarint(4, 512000);
  const chatStart = fieldBytes(10, ctxMeta);
  const ttft = Buffer.concat([fieldVarint(1, 1), fieldVarint(2, 250000000)]);
  const stream = Buffer.concat([fieldVarint(1, 2), fieldVarint(2, 500000000)]);
  const meta17 = Buffer.concat([fieldVarint(5, 1), fieldBytes(3, 'Model unavailable')]);
  const chat = Buffer.concat([
    fieldBytes(4, usage),
    fieldBytes(9, chatStart),
    fieldBytes(11, ttft),
    fieldBytes(12, stream),
    fieldBytes(21, 'Gemini 4 Hydrogen (XHigh)'),
    fieldBytes(17, meta17)
  ]);
  const packedSteps = Buffer.concat([encodeVarint(14), encodeVarint(16), encodeVarint(15)]);
  const top = Buffer.concat([fieldBytes(1, chat), fieldBytes(2, packedSteps)]);

  const parsed = parseGenMetadataRow({ idx: 7, data: top });
  assert.equal(parsed.idx, 7);
  assert.equal(parsed.inTok, 2400);
  assert.equal(parsed.outTok, 600);
  assert.equal(parsed.cacheWrite, 150);
  assert.equal(parsed.cacheRead, 18000);
  assert.equal(parsed.ctx, 20550);
  assert.equal(parsed.maxCtx, 512000);
  assert.equal(parsed.maxStepIdx, 16);
  assert.equal(parsed.modelName, 'Gemini 4 Hydrogen (Extra High)');
  assert.equal(parsed.thinkTok, 250);
  assert.equal(parsed.respTok, 350);
  assert.equal(parsed.ttft, 1.25);
  assert.equal(parsed.stream, 2.5);
  assert.equal(parsed.totDur, 3.75);
  assert.equal(parsed.errCode, 1);
  assert.equal(parsed.errMsg, 'Model unavailable');
});

test('extractMaxStepIdx handles both single varint and packed varint buffer', () => {
  assert.equal(extractMaxStepIdx(42), 42);
  assert.equal(extractMaxStepIdx(Buffer.concat([encodeVarint(3), encodeVarint(99), encodeVarint(18)])), 99);
  assert.equal(extractMaxStepIdx(Buffer.alloc(0)), -1);
});

test('extractStep17Message extracts clean error leaf string and strips trailing UUID artifacts', () => {
  const uuid = 'a1a51091-fd1b-437d-a034-e4dbc428c4ca-17';
  const innerErr = Buffer.concat([
    fieldBytes(1, 'API error: TLS handshake timeout'),
    fieldBytes(2, uuid)
  ]);
  const payload = fieldBytes(1, innerErr);
  const leaves = extractProtoLeafStrings(payload);
  assert.ok(leaves.includes('API error: TLS handshake timeout'));
  assert.ok(!leaves.some((s) => s.includes(uuid)));

  const msg = extractStep17Message({ step_payload: payload });
  assert.equal(msg, 'API error: TLS handshake timeout');
});

test('isCancelText distinguishes user cancellations from real service errors', () => {
  assert.equal(isCancelText('context canceled'), true);
  assert.equal(isCancelText('rpc error: code = Canceled desc = context canceled'), true);
  assert.equal(isCancelText('Cancelled by user'), true);
  assert.equal(isCancelText('API request failed (503 Service Unavailable)'), false);
});

test('readRecentLsRetryInfo parses unanchored google.Init prefix lines and ignores telemetry noise', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ag-codex-log-'));
  const logFile = path.join(tmpDir, 'language_server.log');
  try {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mi = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const lines = [
      `ERROR: logging before google.Init: I${mm}${dd} ${hh}:${mi}:${ss}.123456 999 executor.go:42] Run: attempt 6 failed (Model unavailable), retrying in 13s`,
      `I${mm}${dd} ${hh}:${mi}:${ss}.999999 999 llm_monitor.go:10] play.googleapis.com/log CallWithRetry: attempt 1 failed (noise), retrying in 1s`
    ];
    fs.writeFileSync(logFile, lines.join('\n') + '\n', 'utf8');

    const info = readRecentLsRetryInfo(logFile, now.getTime() - 10000, now);
    assert.ok(info);
    assert.equal(info.attempt, 6);
    assert.equal(info.reason, 'Model unavailable');
    assert.equal(info.delay, '13s');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('buildInlineTelemetryHtml renders Codex compact layout by default and detailed layout on demand', () => {
  const dot = '<span class="ag-ctx-pending-dot ag-dot-idle"></span>';
  const compactHtml = buildInlineTelemetryHtml({
    telemetryLayout: 'compact',
    telemetryCacheMode: 'session',
    statusDotHtml: dot,
    displayTps: 220,
    ttft: 1.4,
    lastCtx: 230949,
    limitKStr: '512k',
    ctxClass: 'ag-ctx-warn',
    ctxPct: 45,
    compactedPending: false,
    outTok: 1540,
    lastCacheRate: '98.9',
    sessionCacheRate: '90.7'
  });
  assert.ok(compactHtml.includes('220 tok/s'));
  assert.ok(compactHtml.includes('Ctx <span class="ag-ctx-warn">45%</span>'));
  assert.ok(compactHtml.includes('Cache 90.7%'));
  assert.ok(!compactHtml.includes('TTFT'));

  const detailedHtml = buildInlineTelemetryHtml({
    telemetryLayout: 'detailed',
    telemetryCacheMode: 'step',
    statusDotHtml: dot,
    displayTps: 220,
    ttft: 1.4,
    lastCtx: 230949,
    limitKStr: '512k',
    ctxClass: 'ag-ctx-warn',
    ctxPct: 45,
    compactedPending: true,
    outTok: 1540,
    lastCacheRate: '98.9',
    sessionCacheRate: '90.7'
  });
  assert.ok(detailedHtml.includes('TTFT 1.4s'));
  assert.ok(detailedHtml.includes('Ctx 已压缩'));
  assert.ok(detailedHtml.includes('Out 1.5k'));
});

test('buildTurnSummaries localizes the payload for Thai, Chinese, and English', () => {
  const generations = [{
    idx: 0, inTok: 1000, outTok: 2000, cacheWrite: 200, cacheRead: 8800, ctx: 50000,
    maxCtx: 512000, maxStepIdx: 3, modelName: 'Gemini 4 Hydrogen (High)', thinkTok: 300,
    respTok: 1700, ttft: 1.1, stream: 15.6, totDur: 20.7
  }];
  const thaiDict = JSON.parse(fs.readFileSync(new URL('../core/locales/th-TH.json', import.meta.url), 'utf8'));
  const chineseDict = JSON.parse(fs.readFileSync(new URL('../core/i18n.json', import.meta.url), 'utf8'));
  const thai = buildTurnSummaries(generations, [1], 0, 512000, 'th-TH')[0];
  assert.ok(thai.badgeText.includes(thaiDict['Telemetry input'] + ' 9.8k'));
  assert.ok(thai.badgeText.includes(thaiDict['Telemetry output'] + ' 2.0k'));
  assert.ok(thai.badgeText.includes(thaiDict['Telemetry cache'] + ' 88.0%'));
  assert.ok(thai.badgeHtml.includes(thaiDict['Telemetry input'] + ' 9.8k'));
  assert.ok(thai.badgeTitle.includes(thaiDict['Current context']));
  assert.ok(thai.badgeTitle.includes('1 ' + thaiDict['Step count']));
  assert.ok(thai.badgeTitle.includes(thaiDict['Elapsed time'] + ' 20.7s'));
  assert.equal(thai.telemetryLabels['Current context'], thaiDict['Current context']);
  assert.doesNotMatch(thai.badgeText + thai.badgeTitle, /[\u3400-\u9fff]/);

  const chinese = buildTurnSummaries(generations, [1], 0, 512000, 'zh-CN')[0];
  assert.ok(chinese.badgeText.includes(chineseDict['Telemetry input'] + ' 9.8k'));
  assert.ok(chinese.badgeText.includes(chineseDict['Telemetry output'] + ' 2.0k'));
  assert.ok(chinese.badgeText.includes(chineseDict['Telemetry cache'] + ' 88.0%'));
  assert.ok(chinese.badgeTitle.includes(chineseDict['Current context']));

  const english = buildTurnSummaries(generations, [1], 0, 512000, 'en')[0];
  assert.match(english.badgeText, /In 9.8k/);
  assert.match(english.badgeText, /Out 2.0k/);
  assert.match(english.badgeText, /Cache 88\.0%/);
  assert.match(english.badgeTitle, /Current context/);
});
test('computeSegPcts & buildTurnSummaries compute balanced bar percentages and turn rollups', () => {
  const pcts = computeSegPcts([10, 990], 100, 2);
  assert.ok(pcts[0] >= 2);
  assert.ok(Math.abs(pcts[0] + pcts[1] - 100) < 0.3);

  const turns = buildTurnSummaries(
    [
      {
        idx: 0,
        inTok: 1000,
        outTok: 200,
        cacheWrite: 0,
        cacheRead: 9000,
        ctx: 10000,
        maxCtx: 512000,
        maxStepIdx: 3,
        modelName: 'Gemini 4 Hydrogen (XHigh)',
        thinkTok: 50,
        respTok: 150,
        ttft: 0.8,
        stream: 1.0,
        totDur: 1.8
      }
    ],
    [1],
    0,
    256000
  );
  assert.equal(turns.length, 1);
  assert.equal(turns[0].turnIndex, 1);
  assert.equal(turns[0].tps, 200);
  assert.equal(turns[0].cacheRate, '90.0%');
  assert.equal(fmtTok(1500), '1.5k');
  assert.equal(fmtTok(1500000), '1.50M');
});
