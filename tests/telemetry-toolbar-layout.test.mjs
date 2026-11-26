/**
 * tests/telemetry-toolbar-layout.test.mjs — Status bar toolbar discovery, dropdown stability & hysteresis tests
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

class FakeClassList {
  constructor(el) {
    this.el = el;
  }
  _list() {
    return String(this.el.className || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }
  contains(cls) {
    return this._list().includes(cls);
  }
  add(...names) {
    const set = new Set(this._list());
    for (const n of names) if (n) set.add(n);
    this.el.className = Array.from(set).join(' ');
  }
  remove(...names) {
    const removeSet = new Set(names);
    this.el.className = this._list()
      .filter((c) => !removeSet.has(c))
      .join(' ');
  }
}

class FakeElement {
  constructor(tag, opts = {}) {
    this.nodeType = 1;
    this.tagName = String(tag || 'DIV').toUpperCase();
    this.id = opts.id || '';
    this.className = opts.className || '';
    this.attrs = new Map(Object.entries(opts.attrs || {}));
    if (this.id) this.attrs.set('id', this.id);
    this.children = [];
    this.parentElement = null;
    this.parentNode = null;
    this.style = { display: '' };
    this._computedStyle = Object.assign(
      { display: 'block', flexDirection: 'row' },
      opts.computedStyle || {}
    );
    this._width = typeof opts.width === 'number' ? opts.width : 0;
    this._height = typeof opts.height === 'number' ? opts.height : 28;
    this._scrollWidth = typeof opts.scrollWidth === 'number' ? opts.scrollWidth : 0;
    this._innerHTML = '';
    this.textContent = opts.textContent || '';
    this.classList = new FakeClassList(this);
  }

  get isConnected() {
    let cur = this;
    while (cur) {
      if (cur._isRoot) return true;
      cur = cur.parentElement;
    }
    return false;
  }

  get firstElementChild() {
    return this.children[0] || null;
  }

  get lastElementChild() {
    return this.children[this.children.length - 1] || null;
  }

  get nextSibling() {
    return this.nextElementSibling;
  }

  get nextElementSibling() {
    if (!this.parentElement) return null;
    const idx = this.parentElement.children.indexOf(this);
    return idx >= 0 && idx + 1 < this.parentElement.children.length
      ? this.parentElement.children[idx + 1]
      : null;
  }

  get scrollWidth() {
    return this._scrollWidth;
  }

  set scrollWidth(v) {
    this._scrollWidth = v;
  }

  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(html) {
    this._innerHTML = String(html || '');
    if (this.id === 'ag-live-metrics-pill' || this.classList.contains('ag-live-metrics-pill')) {
      const hasSpan = this.children.some((c) => c.classList.contains('ag-live-metrics-text'));
      if (!hasSpan && this._innerHTML.includes('ag-live-metrics-text')) {
        const span = new FakeElement('SPAN', {
          id: this.id === 'ag-live-metrics-pill' ? 'ag-live-metrics-text' : '',
          className: 'ag-live-metrics-text',
          scrollWidth: 190
        });
        this.appendChild(span);
      }
    }
  }

  appendChild(child) {
    if (child.parentElement) child.parentElement.removeChild(child);
    child.parentElement = this;
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  insertBefore(child, refNode) {
    if (child.parentElement) child.parentElement.removeChild(child);
    child.parentElement = this;
    child.parentNode = this;
    if (!refNode) {
      this.children.push(child);
      return child;
    }
    const idx = this.children.indexOf(refNode);
    if (idx === -1) {
      this.children.push(child);
    } else {
      this.children.splice(idx, 0, child);
    }
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) this.children.splice(idx, 1);
    child.parentElement = null;
    child.parentNode = null;
    return child;
  }

  remove() {
    if (this.parentElement) this.parentElement.removeChild(this);
  }

  prepend(child) {
    return this.insertBefore(child, this.children[0] || null);
  }

  contains(target) {
    let cur = target;
    while (cur) {
      if (cur === this) return true;
      cur = cur.parentElement;
    }
    return false;
  }

  setAttribute(k, v) {
    const val = String(v);
    this.attrs.set(k, val);
    if (k === 'id') this.id = val;
    if (k === 'class') this.className = val;
  }

  getAttribute(k) {
    if (k === 'id') return this.id || null;
    if (k === 'class') return this.className || null;
    return this.attrs.has(k) ? this.attrs.get(k) : null;
  }

  hasAttribute(k) {
    return this.getAttribute(k) !== null;
  }

  removeAttribute(k) {
    this.attrs.delete(k);
  }

  addEventListener() {}
  removeEventListener() {}

  getBoundingClientRect() {
    return {
      width: this._width,
      height: this._height,
      top: 600,
      bottom: 600 + this._height,
      left: 0,
      right: this._width
    };
  }

  matches(selector) {
    const parts = String(selector || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    for (const sel of parts) {
      if (sel.startsWith('.')) {
        if (this.classList.contains(sel.slice(1))) return true;
      } else if (sel.startsWith('#')) {
        if (this.id === sel.slice(1).replace(/\\/g, '')) return true;
      } else if (sel.startsWith('[') && sel.endsWith(']')) {
        const inner = sel.slice(1, -1);
        const eq = inner.indexOf('=');
        if (eq === -1) {
          if (this.hasAttribute(inner)) return true;
        } else {
          const attrName = inner.slice(0, eq).trim();
          const attrVal = inner.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
          if (this.getAttribute(attrName) === attrVal) return true;
        }
      }
    }
    return false;
  }

  closest(selector) {
    let cur = this;
    while (cur) {
      if (cur.matches(selector)) return cur;
      cur = cur.parentElement;
    }
    return null;
  }

  querySelectorAll(selector) {
    const out = [];
    const visit = (node) => {
      for (const ch of node.children) {
        if (ch.matches(selector)) out.push(ch);
        visit(ch);
      }
    };
    visit(this);
    return out;
  }

  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }
}

function buildComposerDom({ withExplicitFooter = true, boxWidth = 768, footerWidth = 754, modelWidth = 174, rightWidth = 256 } = {}) {
  const body = new FakeElement('BODY');
  body._isRoot = true;

  const cid = '58b8db37-d172-4d42-b1dd-19915dba962e';
  const convView = new FakeElement('DIV', {
    attrs: { 'data-testid': 'conversation-view', 'data-cascade-id': cid }
  });
  body.appendChild(convView);

  const inputBox = new FakeElement('DIV', {
    id: 'antigravity.agentSidePanelInputBox',
    className: 'surface-composer relative flex flex-col',
    computedStyle: { display: 'flex', flexDirection: 'column' },
    width: boxWidth
  });
  convView.appendChild(inputBox);

  const card = new FakeElement('DIV', {
    className: 'surface-composer-card relative flex flex-col',
    computedStyle: { display: 'flex', flexDirection: 'column' },
    width: boxWidth - 4
  });
  inputBox.appendChild(card);

  const editorRow = new FakeElement('DIV', {
    className: 'relative w-full',
    computedStyle: { display: 'block' },
    width: footerWidth
  });
  card.appendChild(editorRow);

  const footer = new FakeElement('DIV', {
    className: withExplicitFooter
      ? 'agy-composer-footer flex w-full items-center justify-between gap-1 p-0.5'
      : 'flex w-full items-center justify-between gap-1 p-0.5',
    attrs: withExplicitFooter ? { 'data-agent-composer-root': '' } : {},
    computedStyle: { display: 'flex', flexDirection: 'row' },
    width: footerWidth
  });
  card.appendChild(footer);

  const leftGroup = new FakeElement('DIV', {
    className: 'flex min-w-0 flex-1 items-center gap-0',
    computedStyle: { display: 'flex', flexDirection: 'row' },
    width: footerWidth - rightWidth - 8
  });
  footer.appendChild(leftGroup);

  const plusBtn = new FakeElement('BUTTON', { width: 28 });
  const hiddenInput = new FakeElement('INPUT', { className: 'hidden', width: 0 });
  leftGroup.appendChild(plusBtn);
  leftGroup.appendChild(hiddenInput);

  // Antigravity 2.34.0's 4 nested wrappers around [data-testid="model-selector-trigger"]
  const depth4 = new FakeElement('DIV', {
    className: 'flex items-center gap-0 min-w-0',
    computedStyle: { display: 'flex', flexDirection: 'row' },
    width: modelWidth
  });
  const depth3 = new FakeElement('DIV', {
    className: 'flex items-center gap-1 min-w-0',
    computedStyle: { display: 'flex', flexDirection: 'row' },
    width: modelWidth
  });
  const depth2 = new FakeElement('DIV', {
    className: 'min-w-0 no-focus-agent-input',
    computedStyle: { display: 'block', flexDirection: 'row' },
    width: modelWidth
  });
  const depth1 = new FakeElement('DIV', {
    className: 'min-w-0',
    computedStyle: { display: 'block', flexDirection: 'row' },
    width: modelWidth
  });
  const modelTrigger = new FakeElement('BUTTON', {
    attrs: { 'data-testid': 'model-selector-trigger' },
    computedStyle: { display: 'flex', flexDirection: 'row' },
    width: modelWidth,
    textContent: 'Gemini 4 Neon Extra High'
  });

  leftGroup.appendChild(depth4);
  depth4.appendChild(depth3);
  depth3.appendChild(depth2);
  depth2.appendChild(depth1);
  depth1.appendChild(modelTrigger);

  const rightGroup = new FakeElement('DIV', {
    className: 'shrink-0 flex items-center gap-0.5',
    computedStyle: { display: 'flex', flexDirection: 'row' },
    width: rightWidth
  });
  footer.appendChild(rightGroup);

  return { body, cid, inputBox, card, footer, leftGroup, rightGroup, depth4, depth3, depth2, depth1, modelTrigger };
}

function mountTelemetryBundle(dom, bootOverrides = {}, testOptions = {}) {
  const runtimeDir = path.join(ROOT_DIR, 'core', 'runtime');
  const parts = ['00-head.js', '30-antigravity-probe.js', '40-status-machine.js', '50-telemetry-ui.js', '90-tail.js'];
  const head = new FakeElement('HEAD');
  head._isRoot = true;

  const fakeDocument = {
    head,
    body: dom.body,
    hidden: false,
    documentElement: new FakeElement('HTML'),
    getElementById(id) {
      if (head.id === id) return head;
      const inHead = head.querySelector('#' + id);
      if (inHead) return inHead;
      return dom.body.querySelector('#' + id);
    },
    createElement(tag) {
      return new FakeElement(tag);
    },
    querySelector(sel) {
      return dom.body.querySelector(sel);
    },
    querySelectorAll(sel) {
      return dom.body.querySelectorAll(sel);
    },
    addEventListener() {},
    removeEventListener() {}
  };

  let roCallback = null;
  let rafQueue = [];
  const bootPayload = Object.assign(
    {
      version: 'test',
      modules: { theme: false, i18n: false, metrics: true, promptSuggestions: false, deadlockHealer: false, zoomShortcuts: false },
      themeMode: 'auto',
      i18nLocale: 'zh-CN',
      telemetryLayout: 'compact',
      css: '',
      i18n: { exact: {}, prefix: [], substring: [] }
    },
    bootOverrides
  );

  const fakeWindow = {
    document: fakeDocument,
    location: { pathname: '/c/' + dom.cid },
    navigator: { onLine: true },
    innerWidth: 1280,
    innerHeight: 800,
    history: { pushState() {}, replaceState() {} },
    getComputedStyle: (el) => (el && el._computedStyle) || { display: 'block', flexDirection: 'row' },
    addEventListener() {},
    removeEventListener() {},
    requestAnimationFrame: (fn) => {
      rafQueue.push(fn);
      return rafQueue.length;
    },
    cancelAnimationFrame: () => {},
    ResizeObserver: class {
      constructor(cb) {
        roCallback = cb;
      }
      observe() {}
      disconnect() {}
    },
    __ag_boot: bootPayload
  };
  fakeWindow.top = fakeWindow;

  const sandbox = {
    __AG_BOOT_PAYLOAD__: bootPayload,
    window: fakeWindow,
    document: fakeDocument,
    location: fakeWindow.location,
    navigator: fakeWindow.navigator,
    history: fakeWindow.history,
    getComputedStyle: fakeWindow.getComputedStyle,
    requestAnimationFrame: fakeWindow.requestAnimationFrame,
    cancelAnimationFrame: fakeWindow.cancelAnimationFrame,
    ResizeObserver: fakeWindow.ResizeObserver,
    MutationObserver: class {
      observe() {}
      disconnect() {}
    },
    setTimeout: () => 1,
    clearTimeout: () => {},
    setInterval: () => 1,
    clearInterval: () => {},
    console
  };

  let code = parts.map((p) => fs.readFileSync(path.join(runtimeDir, p), 'utf8')).join('\n');
  if (testOptions.exposeTurnFormatter) {
    const marker = '  let activeTurnBadgeEl = null;';
    if (!code.includes(marker)) throw new Error('Turn formatter test hook insertion point not found');
    code = code.replace(marker, '  window.__ag_test_formatTurnBadgeData = formatTurnBadgeData;\n' + marker);
  }
  vm.runInNewContext(code, sandbox);

  const flushRaf = () => {
    const q = rafQueue.slice();
    rafQueue = [];
    for (const fn of q) fn();
  };

  return {
    win: fakeWindow,
    doc: fakeDocument,
    triggerResize: () => {
      if (roCallback) roCallback();
      flushRaf();
    }
  };
}

test('Per-turn telemetry badges and details use server locale labels consistently', () => {
  const dom = buildComposerDom({ withExplicitFooter: true });
  const thaiDict = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'core/locales/th-TH.json'), 'utf8'));
  const chineseDict = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'core/i18n.json'), 'utf8'));
  const labelKeys = [
    'Telemetry input', 'Telemetry output', 'Telemetry cache', 'Current context', 'Turn output',
    'Thinking tokens', 'Text and tools', 'New tokens', 'Write cache', 'Read cache', 'Cache hit rate',
    'Turn input', 'End-to-end speed', 'Streaming time', 'Total time', 'Speed and duration',
    'Step count', 'Tokens per second'
  ];
  const labelsFor = (dict) => Object.fromEntries(labelKeys.map((key) => [key, dict[key]]));
  const turn = {
    model: 'Gemini 4 Hydrogen (High)', promptTok: 10000, promptStr: '10k', outTok: 2000, outStr: '2k',
    cacheRate: '80.0%', tps: 128, lastCtx: 50000, limitStr: '512k', ctxPct: 10, thinkTok: 300,
    respTok: 1700, inTok: 1000, cacheWrite: 200, cacheRead: 8800, e2eTps: 96.5,
    streamDur: 15.6, totDur: 20.7, steps: 3
  };
  const thaiTurn = Object.assign({}, turn, { telemetryLabels: labelsFor(thaiDict) });
  const thaiEnv = mountTelemetryBundle(dom, { locale: 'th-TH', i18nDict: {} }, { exposeTurnFormatter: true });
  const thai = thaiEnv.win.__ag_test_formatTurnBadgeData(thaiTurn);
  assert.ok(thai.html.includes(thaiDict['Telemetry input'] + ' 10k'));
  assert.ok(thai.html.includes(thaiDict['Telemetry output'] + ' 2k'));
  assert.ok(thai.html.includes(thaiDict['Telemetry cache'] + ' 80.0%'));
  for (const key of labelKeys.filter((key) => key !== 'Tokens per second')) assert.ok(thai.tooltipHtml.includes(thaiDict[key]), 'Thai tooltip should include ' + key);
  assert.doesNotMatch(thai.tooltipHtml, /[\u3400-\u9fff]/);
  assert.ok(thai.ariaLabel.includes(thaiDict['Telemetry input'] + ' 10k'));
  assert.ok(thai.ariaLabel.includes(thaiDict['Tokens per second']));

  const chineseTurn = Object.assign({}, turn, { telemetryLabels: labelsFor(chineseDict) });
  const chineseEnv = mountTelemetryBundle(dom, { locale: 'zh-CN', i18nDict: {} }, { exposeTurnFormatter: true });
  const chinese = chineseEnv.win.__ag_test_formatTurnBadgeData(chineseTurn);
  assert.ok(chinese.html.includes(chineseDict['Telemetry input'] + ' 10k'));
  assert.ok(chinese.tooltipHtml.includes(chineseDict['Current context']));
  assert.ok(chinese.tooltipHtml.includes(chineseDict['Turn output']));

  const englishEnv = mountTelemetryBundle(dom, { locale: 'en', i18nDict: {} }, { exposeTurnFormatter: true });
  const english = englishEnv.win.__ag_test_formatTurnBadgeData(Object.assign({}, turn, { telemetryLabels: {} }));
  assert.match(english.html, /In 10k/);
  assert.match(english.tooltipHtml, /Current context/);
  assert.match(english.tooltipHtml, /Turn output/);
});
test('Opening model selector dropdown or tooltip never hijacks toolbar row or moves pill into inner wrappers', () => {
  const dom = buildComposerDom({ withExplicitFooter: true });
  const env = mountTelemetryBundle(dom, { telemetryLayout: 'compact' });

  env.win.__ag_on_route_change();
  const pill = env.doc.getElementById('ag-live-metrics-pill');
  assert.ok(pill, 'pill should be mounted');
  assert.equal(pill.parentElement, dom.leftGroup);
  assert.equal(pill.getAttribute('data-ag-row-mode'), 'middle');
  assert.equal(dom.footer.getAttribute('data-ag-row-mode'), 'middle');

  // Simulate Base-UI opening the model selector menu / tooltip: siblings mount inside depth1 & depth3
  const focusGuard = new FakeElement('SPAN', { attrs: { 'data-base-ui-focus-guard': '' }, width: 0 });
  const agentBadge = new FakeElement('DIV', { className: 'agent-badge', width: 20 });
  dom.depth1.appendChild(focusGuard);
  dom.depth3.appendChild(agentBadge);

  for (let i = 0; i < 6; i++) {
    env.win.__ag_on_route_change();
    env.triggerResize();
  }

  assert.equal(pill.parentElement, dom.leftGroup, 'pill must stay inside canonical leftGroup');
  assert.equal(pill.getAttribute('data-ag-row-mode'), 'middle');
  assert.equal(dom.footer.getAttribute('data-ag-row-mode'), 'middle');
  for (const wrapper of [dom.depth1, dom.depth2, dom.depth3, dom.depth4]) {
    assert.equal(wrapper.getAttribute('data-ag-row-mode'), null, 'inner wrapper must never get data-ag-row-mode');
  }
});

test('Bundle initialization heals stale data-ag-row-mode attributes left on inner model-selector wrappers', () => {
  const dom = buildComposerDom({ withExplicitFooter: true });
  // Simulate pre-existing corruption from v1.3.0
  for (const wrapper of [dom.depth1, dom.depth2, dom.depth3, dom.depth4]) {
    wrapper.setAttribute('data-ag-row-mode', 'bottom');
  }

  const env = mountTelemetryBundle(dom, { telemetryLayout: 'compact' });
  env.win.__ag_on_route_change();

  for (const wrapper of [dom.depth1, dom.depth2, dom.depth3, dom.depth4]) {
    assert.equal(wrapper.getAttribute('data-ag-row-mode'), null, 'stale inner data-ag-row-mode must be stripped');
  }
  const pill = env.doc.getElementById('ag-live-metrics-pill');
  assert.equal(pill.parentElement, dom.leftGroup);
  assert.equal(dom.footer.getAttribute('data-ag-row-mode'), 'middle');
});

test('Structural fallback skips inner flex-row wrappers even if canonical footer class/attr are renamed', () => {
  const dom = buildComposerDom({ withExplicitFooter: false });
  const focusGuard = new FakeElement('SPAN', { attrs: { 'data-base-ui-focus-guard': '' }, width: 0 });
  const agentBadge = new FakeElement('DIV', { width: 24 });
  dom.depth1.appendChild(focusGuard);
  dom.depth3.appendChild(agentBadge);

  const env = mountTelemetryBundle(dom, { telemetryLayout: 'compact' });
  env.win.__ag_on_route_change();

  const pill = env.doc.getElementById('ag-live-metrics-pill');
  assert.ok(pill);
  assert.equal(pill.parentElement, dom.leftGroup);
  assert.equal(dom.footer.getAttribute('data-ag-row-mode'), 'middle');
  for (const wrapper of [dom.depth1, dom.depth2, dom.depth3, dom.depth4]) {
    assert.equal(wrapper.getAttribute('data-ag-row-mode'), null);
  }
});

test('Detailed mode always mounts in dedicated centered bottom row while compact mode adapts with hysteresis', () => {
  const dom = buildComposerDom({ withExplicitFooter: true, boxWidth: 960, footerWidth: 946, modelWidth: 174, rightWidth: 256 });
  const env = mountTelemetryBundle(dom, { telemetryLayout: 'detailed' });

  env.win.__ag_on_route_change();
  const pill = env.doc.getElementById('ag-live-metrics-pill');
  const textEl = pill.querySelector('.ag-live-metrics-text');
  textEl.scrollWidth = 316;

  env.win.__ag_render_metrics({
    cid: dom.cid,
    hasData: true,
    inlineHtml: '<span class="ag-ctx-pending-dot ag-dot-idle"></span><span>115 tok/s · TTFT 6.2s · Ctx 66k/512k (13%) · Out 5.6k</span>',
    tooltipHtml: '<div>ok</div>'
  });

  // Detailed mode stays consistently in the dedicated bottom row even on a wide composer
  assert.equal(pill.getAttribute('data-ag-row-mode'), 'bottom');
  assert.equal(dom.footer.getAttribute('data-ag-row-mode'), 'bottom');
  assert.equal(pill.parentElement, dom.card, 'detailed bottom-mode pill must sit in vertical card below footer');
  assert.equal(dom.footer.nextElementSibling, pill);

  // Compact mode adapts smoothly between middle and bottom with 24px hysteresis
  const compactDom = buildComposerDom({ withExplicitFooter: true, boxWidth: 768, footerWidth: 754, modelWidth: 174, rightWidth: 256 });
  const compactEnv = mountTelemetryBundle(compactDom, { telemetryLayout: 'compact' });
  compactEnv.win.__ag_on_route_change();
  const compactPill = compactEnv.doc.getElementById('ag-live-metrics-pill');
  const compactText = compactPill.querySelector('.ag-live-metrics-text');
  compactText.scrollWidth = 200; // neededWidth = 220

  // Wide composer: freeWidth = 754 - 202 - 256 - 16 = 280 >= 244 -> middle
  compactEnv.triggerResize();
  assert.equal(compactPill.getAttribute('data-ag-row-mode'), 'middle');
  assert.equal(compactPill.parentElement, compactDom.leftGroup);

  // Narrow sidebar: freeWidth = 650 - 202 - 256 - 16 = 176 < 220 -> bottom
  compactDom.inputBox._width = 664;
  compactDom.footer._width = 650;
  compactEnv.triggerResize();
  assert.equal(compactPill.getAttribute('data-ag-row-mode'), 'bottom');
  assert.equal(compactPill.parentElement, compactDom.card);

  // Slightly widen inside hysteresis band (freeWidth = 232: >= 220 stay-middle, < 244 enter-middle) -> holds bottom
  compactDom.inputBox._width = 720;
  compactDom.footer._width = 706;
  compactEnv.triggerResize();
  assert.equal(compactPill.getAttribute('data-ag-row-mode'), 'bottom', 'hysteresis must hold bottom mode until headroom >= needed+24');

  // Widen past threshold (freeWidth = 260 >= 244) -> returns to middle
  compactDom.inputBox._width = 748;
  compactDom.footer._width = 734;
  compactEnv.triggerResize();
  assert.equal(compactPill.getAttribute('data-ag-row-mode'), 'middle');
  assert.equal(compactPill.parentElement, compactDom.leftGroup);

  // Slightly narrow inside hysteresis band (freeWidth = 232 >= 220) -> holds middle
  compactDom.inputBox._width = 720;
  compactDom.footer._width = 706;
  compactEnv.triggerResize();
  assert.equal(compactPill.getAttribute('data-ag-row-mode'), 'middle', 'hysteresis must hold middle mode without flip-flopping');
});
