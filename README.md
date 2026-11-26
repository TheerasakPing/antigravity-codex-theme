<div align="center">

<h1>antigravity-codex-theme</h1>

<p><strong>ธีม Codex สำหรับ Google Antigravity ทั้งโหมดสว่างและมืด พร้อม UI หลายภาษา แผงตั้งค่าแบบ Native และระบบสถิติเซสชันแบบเรียลไทม์</strong></p>

<p>
  <a href="#ติดตั้งอย่างรวดเร็ว">ติดตั้งอย่างรวดเร็ว</a> ·
  <a href="#ติดตั้งเฉพาะโมดูล">ติดตั้งเฉพาะโมดูล</a> ·
  <a href="#รายละเอียดความสามารถ">รายละเอียดความสามารถ</a> ·
  <a href="#ปรับแต่งและถอนการติดตั้ง">ปรับแต่งและถอนการติดตั้ง</a> ·
  <a href="#เครดิตและสัญญาอนุญาต">เครดิตและสัญญาอนุญาต</a> ·
  <a href="#english-overview">English</a>
</p>

<p>
  ติดตั้งโดยไม่แก้ไขไฟล์แพ็กเกจของแอป ใช้ Local CDP ฉีดธีม Codex โหมดสว่าง/มืด UI หลายภาษา แผงตั้งค่าแบบฝังในแอป และสถิติการใช้งาน 4 สถานะแบบเรียลไทม์<br>
  แบ่งเป็น 34 โมดูลอิสระ รองรับการติดตั้งเฉพาะส่วนด้วย <code>--only</code> ตรวจสอบและอัปเดตได้จากแผงตั้งค่า พร้อมเปิดให้ Fork ไปปรับแต่งได้อย่างอิสระ
</p>

<p>
  <a href="https://github.com/nkjDSLcvanv/antigravity-codex-theme/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/nkjDSLcvanv/antigravity-codex-theme/ci.yml?branch=main&label=CI&labelColor=363636&logo=githubactions&logoColor=white" alt="CI"></a>
  <img src="https://img.shields.io/static/v1?label=Antigravity&message=2.30.x%20~%202.35.1%2B&color=2B7FFF&labelColor=363636" alt="Antigravity 2.30.x ~ 2.35.1+">
  <img src="https://img.shields.io/static/v1?label=Node.js&message=%3E%3D%2022.13.0&color=339933&labelColor=363636&logo=nodedotjs&logoColor=white" alt="Node.js >= 22.13.0">
  <img src="https://img.shields.io/static/v1?label=platform&message=macOS%20%C2%B7%20Windows%20%C2%B7%20Linux&color=4B5563&labelColor=363636" alt="macOS · Windows · Linux">
  <img src="https://img.shields.io/static/v1?label=version&message=v1.3.5&color=2B7FFF&labelColor=363636" alt="version v1.3.5">
  <a href="LICENSE"><img src="https://img.shields.io/static/v1?label=license&message=MIT&color=10B981&labelColor=363636" alt="MIT License"></a>
</p>

<p>
  <a href="#ติดตั้งผ่าน-command-line"><img src="https://img.shields.io/static/v1?label=CLI%20INSTALL&message=v1.3.5&color=2B7FFF&style=for-the-badge&labelColor=181818&logo=gnubash&logoColor=white" alt="CLI Install"></a>
  <a href="#ติดตั้งด้วย-ai-ในคลิกเดียว"><img src="https://img.shields.io/static/v1?label=AI%20ONE-CLICK&message=SKILL.md&color=0D9488&style=for-the-badge&labelColor=181818&logo=googlegemini&logoColor=white" alt="AI One-Click Install"></a>
  <a href="#ติดตั้งเฉพาะโมดูล"><img src="https://img.shields.io/static/v1?label=SELECTIVE%20INSTALL&message=--only&color=6366F1&style=for-the-badge&labelColor=181818&logo=codesandbox&logoColor=white" alt="Selective Install"></a>
</p>

</div>

https://github.com/user-attachments/assets/749990f3-f2ce-48e7-8f66-3d7c88a7d49d

![เปรียบเทียบธีม Codex โหมดสว่างและโหมดมืด](assets/light-dark-themes.png)

| โมดูล | ความสามารถหลัก | สถานะเริ่มต้น |
| :--- | :--- | :--- |
| **ธีม Codex สว่าง/มืด** | ธีมสว่างสีขาวสะอาดตา (`codex-pure-white`) และธีมมืดสีเทาถ่านแบบเป็นกลาง (`codex-dark`) ไม่ต้องพึ่งพาฟอนต์ภายนอก และปรับตามรูปลักษณ์ของ IDE โดยอัตโนมัติ | เปิดใช้งาน |
| **แผงตั้งค่า Native และระบบอัปเดต** | ฝังหน้า **Settings → Codex Theme** เพื่อจัดการโมดูล ระดับโมเดล `sshHosts` สั่งรีเฟรชด้วยตนเอง และ **ตรวจสอบพร้อมติดตั้งอัปเดตได้ทันที** | มีมาให้ในตัว |
| **สถานะเซสชันและสถิติการใช้งาน** | ตัวบ่งชี้สถานะ 4 รูปแบบ แผงแสดงการใช้งานระดับ 1/2 และการ์ดรายละเอียดเมื่อชี้แต่ละรอบการสนทนา รองรับแชตหลัก Side Question และ **SSH Remote** แบบเลือกเปิดใช้ | เปิดใช้งาน (SSH เป็นตัวเลือก) |
| **ระบบแปลภาษา UI** | รองรับ English, 简体中文 และภาษาไทย โดยภาษาไทยใช้สำนวนธรรมชาติที่เหมาะกับนักพัฒนา และคงคำศัพท์เทคนิค เช่น Agent / Token / Workspace / MCP | เปิดใช้งาน |
| **ระบบคาดการณ์ข้อความถัดไป** | แสดง Ghost Text ในช่องพิมพ์ที่ว่างหลัง AI ตอบเสร็จ กด `Tab` / `→` เพื่อเติมข้อความ พร้อมเมนูเลือกโมเดลแบบลำดับชั้น 2 ระดับผ่าน `agy models` | **ปิดไว้เป็นค่าเริ่มต้น** (เปิดเองได้) |

## ติดตั้งอย่างรวดเร็ว

> **ข้อกำหนดก่อนติดตั้ง**: ต้องมี **Node.js >= 22.13.0** (ดู [package.json](package.json)) และ Google Antigravity รุ่น `2.30.x` ถึง `2.35.1+` ผ่านการทดสอบติดตั้งและถอนการติดตั้งบนเดสก์ท็อป **macOS / Windows / Linux** แล้ว Plugin จะติดตั้งเฉพาะใน `~/.gemini/antigravity/codex-theme` โดย **ไม่แก้ไขไฟล์แพ็กเกจของแอป** หากเปิดแอปไว้ก่อนติดตั้งโดยไม่มี Debug Port ให้รีสตาร์ตแอปหนึ่งครั้ง หรือรัน `node install.mjs relaunch` จาก Terminal ภายนอก

<details>
<summary>ดูรายละเอียดการทดสอบแต่ละแพลตฟอร์มและคำอธิบาย Debug Port สำหรับ Antigravity 2.33.0+</summary>

- **ขอบเขตการทดสอบบนเครื่องจริง**: ครอบคลุม Antigravity รุ่น `2.31.0` / `2.32.1` / `2.33.0` / `2.34.0` / `2.35.1` รวมถึง macOS `LaunchAgent`, Windows `schtasks` / VBS / Registry และการกำหนดพารามิเตอร์ในไฟล์ `.lnk`, Linux `systemd --user` และรายการเปิดแอปจาก `.desktop`; GitHub Actions CI ทำงานบน `ubuntu-latest` อย่างต่อเนื่อง โดยรัน `npm run check` และ `npm test`
- **การรองรับ Antigravity `2.33.0+`**: รุ่นใหม่ปิด `DevToolsActivePort` ภายในเครื่องไว้เป็นค่าเริ่มต้น จึงต้องเริ่มแอปพร้อม `--remote-debugging-port=0` บน macOS ใช้โหมดไอคอนเดียวเป็นค่าเริ่มต้น โดยบริการเบื้องหลังจะเติมพารามิเตอร์และส่งต่อการรีสตาร์ตเฉพาะช่วงก่อน Cold Start ไม่เกิน `12s` (หรือ `25s` เมื่อรีสตาร์ตจากการอัปเดตอัตโนมัติ) โดยไม่รบกวนเซสชันที่กำลังทำงาน ส่วน Windows และ Linux จะเพิ่มพารามิเตอร์ให้ Shortcut หรือไฟล์ `.desktop` โดยอัตโนมัติ และรองรับการเขียนค่าใน `~/.antigravity/argv.json`

</details>

### ติดตั้งผ่าน Command Line

```bash
git clone https://github.com/nkjDSLcvanv/antigravity-codex-theme.git
cd antigravity-codex-theme
node install.mjs install
node --disable-warning=ExperimentalWarning install.mjs doctor
```

### ติดตั้งด้วย AI ในคลิกเดียว

คัดลอก Prompt ด้านล่างแล้วส่งให้ Antigravity, Claude Code, Codex หรือ Cursor:

> โปรดอ่าน Repository จาก `https://github.com/nkjDSLcvanv/antigravity-codex-theme.git` แล้วใช้ `git clone --depth=1 --filter=blob:none --sparse` เพื่อดึงเฉพาะไฟล์หลัก (อ้างอิง `SKILL.md` ภายใน Repository และข้าม `assets/` กับ `tests/`; หากต้องการติดตั้งเฉพาะบางความสามารถ สามารถเพิ่มพารามิเตอร์ `--only` ได้) จากนั้นรัน `node install.mjs install`, `node --disable-warning=ExperimentalWarning install.mjs doctor` และ `verify` เพื่อติดตั้งและตรวจสอบว่าระบบ Inject ทำงานแบบเรียลไทม์ได้ตามปกติ

### ติดตั้งเฉพาะโมดูล

ใช้ `--only` เพื่อเลือกผสมโมดูลจาก `theme`, `i18n`, `metrics`, `fixes` (ติดตั้งเป็นค่าเริ่มต้น) และ `suggest` (โมดูลเสริม ปิดไว้เป็นค่าเริ่มต้น):

```bash
# ตัวอย่าง: เปิดเฉพาะ UI ภาษาจีนและสถิติการใช้งานแบบเรียลไทม์ โดยคงชุดสีดั้งเดิมของ Antigravity
node install.mjs install --only i18n,metrics
```

<details>
<summary>ดูรายการโมดูลและคำสั่ง Sparse Checkout สำหรับติดตั้งแบบลดขนาด (ไม่ดาวน์โหลดภาพหรือเลือกเพียงโมดูลเดียว)</summary>

| โมดูล | รายละเอียด |
| :--- | :--- |
| `theme` | ธีม Codex โหมดสว่าง (`codex-pure-white`) และโหมดมืด (`codex-dark`) |
| `i18n` | ระบบแปล UI หลายภาษา (1,900+ รายการ พร้อมการอัปเดตข้อความใน DOM ผ่าน `WeakMap`) |
| `metrics` | ตัวบ่งชี้สถานะเซสชันแบบเรียลไทม์ แผงแสดงการใช้งานระดับ 1/2 และสรุปสถิติท้ายแต่ละรอบ (รวม Side Question และ SSH Remote ที่เลือกเปิดใช้) |
| `fixes` | แก้ปัญหา Route Deadlock ในหน้าต่าง Settings และเพิ่มคีย์ลัดปรับขนาด UI `Cmd/Ctrl + -/=/0` |
| `suggest` | คาดการณ์ข้อความถัดไปในช่องพิมพ์ (Ghost Text + เติมข้อความด้วย `Tab` / `→`) ปิดไว้เป็นค่าเริ่มต้น |

**1. ข้าม `assets/` และ `tests/` เพื่อดึงเฉพาะ Source Code หลัก (ใช้ได้ทุกแพลตฟอร์ม):**

```bash
git clone --depth=1 --filter=blob:none --sparse https://github.com/nkjDSLcvanv/antigravity-codex-theme.git
cd antigravity-codex-theme
git sparse-checkout set core user
node install.mjs install --only i18n,metrics
```

**2. ดาวน์โหลดเฉพาะไฟล์ของโมดูลที่ต้องการ (ใช้ `--no-cone` สำหรับ Sparse Checkout รายไฟล์ เหมาะกับ macOS / Linux / Git Bash):**

```bash
# ตัวอย่าง: ดาวน์โหลดและติดตั้งเฉพาะโมดูลภาษา UI (i18n)
git clone --depth=1 --filter=blob:none --sparse https://github.com/nkjDSLcvanv/antigravity-codex-theme.git
cd antigravity-codex-theme
git sparse-checkout set --no-cone \
  /install.mjs /package.json /SKILL.md /LICENSE \
  /user/config.json /user/custom.css /user/custom.js /user/i18n.override.json /user/i18n.th-TH.override.json \
  /core/daemon.mjs /core/shared.mjs /core/manifest.json /core/installer \
  /core/daemon/paths.mjs /core/daemon/cdp-bridge.mjs /core/daemon/cdp-relaunch.mjs /core/daemon/updater.mjs \
  /core/styles/45-settings-ui.css /core/runtime/00-head.js /core/runtime/75-settings-ui.js /core/runtime/90-tail.js \
  /core/i18n.json /core/locales /core/runtime/60-i18n-engine.js
node install.mjs install --only i18n --minimal
```

สามารถใช้ `node install.mjs sparse-paths --only theme,metrics` เพื่อดูรายการพาธไฟล์ที่ต้องใช้สำหรับชุดโมดูลที่เลือกได้เช่นกัน

</details>

<details>
<summary>ดูคำสั่งดูแลระบบ อัปเดต ย้อนกลับเวอร์ชัน และทดสอบที่ใช้บ่อย</summary>

| คำสั่ง | รายละเอียดการทำงาน |
| :--- | :--- |
| `node install.mjs install [--channel auto\|stable\|insiders] [--only <features>] [--minimal] [--with-launcher] [--sync-user]` | ติดตั้ง Plugin และลงทะเบียนบริการเริ่มทำงานอัตโนมัติในเบื้องหลัง |
| `node install.mjs update [--check] [--ref <branch\|tag>]` | ตรวจสอบอัปเดตจาก GitHub และติดตั้งเวอร์ชันใหม่โดยตรง (ตรวจสอบความสมบูรณ์ของไฟล์ สำรอง `core.prev/` อัตโนมัติ และเก็บ `user/` ไว้) |
| `node install.mjs relaunch [--channel auto\|stable\|insiders] [--force]` | รีสตาร์ต Antigravity พร้อม `--remote-debugging-port=0` และตรวจสอบการ Inject (มีระบบป้องกันเซสชันที่กำลังทำงาน 15 วินาที) |
| `node --disable-warning=ExperimentalWarning install.mjs doctor` | ตรวจสอบเวอร์ชัน Node, สถานะ CDP, Hash ของ `core/manifest.json` และสถานะการ Mount เข้ากับหน้า UI |
| `node --disable-warning=ExperimentalWarning install.mjs verify [--safe-mode]` | Inject หนึ่งครั้งและตรวจสอบผล โดย `--safe-mode` จะข้ามสคริปต์ปรับแต่งใน `user/` เพื่อช่วยวิเคราะห์ปัญหา |
| `node install.mjs sparse-paths --only <features>` | แสดงรายการพาธไฟล์ของชุดโมดูลที่เลือก |
| `node install.mjs rollback` | ย้อนกลับไปใช้ `core/` เวอร์ชันที่สำรองไว้ก่อนหน้า |
| `node install.mjs uninstall` | หยุดบริการ ล้างรายการเริ่มทำงานอัตโนมัติและพารามิเตอร์เริ่มแอป พร้อมคืน UI ภาษาอังกฤษและ Style ดั้งเดิม |
| `npm run check` / `npm test` | ตรวจ Syntax ของไฟล์ `.mjs` ทั้งหมดและ Frontend Script ที่ประกอบแล้ว พร้อมรัน Unit Test จำนวน 82 รายการด้วย `node:test` |

</details>

## รายละเอียดความสามารถ

### แผงตั้งค่าแบบฝังในแอปและระบบอัปเดตในคลิกเดียว

ฝังแท็บ **Codex Theme** ลงใน Sidebar ของหน้าต่าง Settings ดั้งเดิมของ Antigravity (ใต้เมนู `Built-in Browser`) เพื่อให้ปรับการทำงานประจำวันได้โดยไม่ต้องแก้ไฟล์ JSON ด้วยตนเอง:

- **ควบคุมทุกโมดูลผ่าน UI**: จัดการโมดูลหลักเป็นกลุ่ม (ธีมสว่าง/มืด / ภาษา UI / สถิติเรียลไทม์) และโมดูลเสริม (คาดการณ์ข้อความพร้อมตัวเลือกโมเดลแบบลำดับชั้น 2 ระดับผ่าน `agy models`, SSH Remote และป้ายกำกับโฮสต์ `sshHosts`) รวมถึงความหนาแน่นของ Status Bar และรูปแบบการนับ Cache เมื่อปิดการแปลภาษา หน้า Settings จะสลับกลับเป็นภาษาอังกฤษตามไปด้วย
- **แถบทางลัดด้านบน**: มีปุ่ม **รีเฟรชด้วยตนเอง (`↻`)** ข้างชื่อหน้า เพื่อสั่งสร้าง UI ใหม่และ Hot Reload หน้าต่างปัจจุบันทันที มุมขวาบนมีลิงก์ไปยัง GitHub Repository และช่องทางส่ง Feedback
- **ตรวจสอบและอัปเดตได้โดยตรง**: การ์ด **เวอร์ชันและการอัปเดต** ด้านล่างรองรับการตรวจสอบเวอร์ชันใหม่จาก GitHub หรือเปรียบเทียบความแตกต่างกับ `main` เมื่อกด **อัปเดตทันที** ระบบจะตรวจสอบความสมบูรณ์ของไฟล์ สำรอง `core.prev/` และ `backups/` เก็บการตั้งค่าส่วนบุคคลใน `user/` ไว้ จากนั้นรีสตาร์ตบริการเบื้องหลังและ Hot Reload อย่างราบรื่น โดยไม่ต้องรีสตาร์ต Antigravity ทั้งแอป

![แผงตั้งค่า Codex Theme แบบ Native และตัวเลือกโมเดล 2 ระดับ](assets/settings-panel.png)

### ระบบคาดการณ์ข้อความถัดไปในช่องพิมพ์ (ตัวเลือกเสริม)

เมื่อ AI ตอบเสร็จ ระบบจะใช้บริบทของบทสนทนาปัจจุบันคาดการณ์คำสั่งหรือข้อความถัดไป แล้วแสดงเป็นตัวอักษรสีเทาจางแบบ Ghost Text ในช่องพิมพ์ที่ยังว่าง:

- **ปิดไว้เป็นค่าเริ่มต้น ไม่ใช้ทรัพยากรเพิ่ม**: เมื่อไม่ได้เปิดใช้ จะไม่มีการเริ่ม Process `agy` เบื้องหลังและไม่ใช้โควตาโมเดล สามารถเปิดหรือปิดได้จาก **Settings → Codex Theme** หรือเปิดระหว่างติดตั้งด้วย `--only suggest` เมื่อปิดใช้งาน ระบบจะหยุด Process เบื้องหลังทันที
- **เติมข้อความด้วยคีย์ลัดและเลือกโมเดลได้**: กด `Tab`, `→` หรือคลิกป้าย `Tab` เพื่อเติมข้อความลงในช่องพิมพ์ เริ่มพิมพ์หรือกด `Esc` เพื่อซ่อนข้อความแนะนำ สามารถเลือกโมเดลคาดการณ์ตาม Base Model และระดับ `Thinking effort` ได้จากแผง Settings (ค่าแนะนำเริ่มต้นคือ `Gemini 3.8 Flash Low`)

![ระบบคาดการณ์ข้อความถัดไปด้วย Ghost Text และการเติมข้อความผ่าน Tab](assets/prompt-suggestions.png)

### สถานะเซสชันและสถิติการใช้งานแบบเรียลไทม์

ฝังจุดแสดงสถานะขนาดกะทัดรัดและสรุปตัวชี้วัดแบบเรียลไทม์ไว้ตรงกลางแถบเครื่องมือด้านล่างของช่องพิมพ์ (เช่น `● 248 tok/s · Ctx 42% · Cache 90.9%`) เลื่อนเมาส์เพื่อดูแผงสรุประดับแรก และคลิกเพื่อขยายรายละเอียดหรือปักหมุดแผงไว้:

| สถานะเซสชัน | รูปแบบไฟแสดงสถานะ | เงื่อนไขการเปลี่ยนสถานะ |
| :--- | :--- | :--- |
| พร้อมใช้งาน | **สีน้ำเงินติดค้าง** | เชื่อมต่อสำเร็จและไม่มีงานทำงานอยู่ เมื่อผู้ใช้ยกเลิกการสร้างคำตอบ สถานะจะกลับมาพร้อมใช้งานทันที |
| กำลังทำงาน | **สีน้ำเงินกะพริบ** | โมเดลกำลังส่งผลลัพธ์แบบ Streaming, กำลังย่อบริบทด้วย `/compact` หรือกำลังเรียกใช้เครื่องมือ |
| รอหรือกำลังลองใหม่ | **สีเหลืองเต้นเป็นจังหวะ** | รอ First Token หรือรอขั้นตอนใดขั้นตอนหนึ่งตั้งแต่ `>= 60s` (เช่น คำนวณ KV Cache ใหม่เมื่อใช้ `/compact` ข้ามโมเดล), โมเดลกำลัง Retry อัตโนมัติ หรือใช้เวลาสร้างการเชื่อมต่อ `3s ~ 11s` |
| การเชื่อมต่อหรือการทำงานผิดปกติ | **สีแดงเต้นเป็นจังหวะ** | เครือข่ายออฟไลน์, เชื่อมต่อเกิน `>= 12s`, API/ขั้นตอนทำงานผิดพลาด (ไม่นับการยกเลิกโดยผู้ใช้) หรือ Heartbeat จากบริการเบื้องหลังขาดหายเกิน `>= 90s` |

![สถานะเซสชัน 4 รูปแบบ: พร้อมใช้งาน กำลังทำงาน รอหรือ Retry และผิดปกติ](assets/led-status-states.png)

- **แผงการใช้งานระดับ 1/2 และการแจ้งเตือน Context**: แผงระดับแรกแสดงความเร็วในการสร้างผลลัพธ์ (รวมค่าเฉลี่ยแบบ End-to-End), สัดส่วน Context และความจุที่เหลือ, อัตรา Cache Hit สะสม และแถบความคืบหน้าแบบแบ่งช่วง คลิกอีกครั้งหรือเลือก “แสดงรายละเอียด” เพื่อเปิดแผงระดับที่สอง ซึ่งแสดง First Token Latency (TTFT), การแยกปริมาณ Thinking/ข้อความตอบกลับ, สรุปการใช้งานหลาย Step ในรอบปัจจุบัน และยอดรวมสะสมของเซสชัน เมื่อ Context ถึง `>= 75%` จะแจ้งเตือนสีเหลือง และเมื่อถึง `>= 90%` จะแจ้งเตือนสีแดง ระหว่าง `/compact` จะแสดงสถานะการย่อบริบทแบบเรียลไทม์ พร้อมสรุปขนาดบริบทหลังทำงานเสร็จ

![ภาพรวมระดับ 1 รายละเอียดระดับ 2 การแจ้งเตือน Context และสถิติท้ายแต่ละรอบ](assets/telemetry-bento-panels.png)

- **Status Bar ปรับ Layout อัตโนมัติ**: รองรับ 2 รูปแบบ ได้แก่ `compact` (กะทัดรัด เป็นค่าเริ่มต้น) และ `detailed` (แสดงรายละเอียด) — ในโหมด `compact` จะแสดงกึ่งกลางแถบเครื่องมือเมื่อพื้นที่กว้างเพียงพอ หาก Sidebar แคบหรือพื้นที่ของ Side Question ไม่เพียงพอ ระบบจะย้ายไปแสดงเป็นแถวเส้นประตรงกลางด้านล่างโดยอัตโนมัติ ส่วนโหมด `detailed` จะตรึงข้อมูลเป็นแถวแยกตรงกลางด้านล่าง แสดง `TTFT`, ค่า Context ที่แม่นยำ และ `Out` ได้ครบ โดยไม่เบียดปุ่มดั้งเดิม และจัดแนวแกนกลางเดียวกับแผงรายละเอียดแบบ Hover (พื้นที่ตอบสนองต่อเมาส์จำกัดอยู่เฉพาะส่วนข้อความ เพื่อลดการคลิกพลาดบริเวณว่างด้านข้าง)

![ตัวอย่าง Status Bar ทั้ง 3 รูปแบบการจัดวางแบบปรับตามพื้นที่](assets/telemetry-layouts.png)

- **สถิติท้ายแต่ละรอบการสนทนา**: เพิ่มสรุปการใช้งานของรอบนั้นไว้ด้านซ้ายของแถบเครื่องมือข้อความตอบกลับ เลื่อนเมาส์เพื่อเปิดการ์ดรายละเอียด ซึ่งแสดงจำนวน Step, สัดส่วน Context, การแยก Thinking/ข้อความ/Tool, ปริมาณ Input Cache ใหม่และ Cache ที่อ่านซ้ำ รวมถึงเวลาที่ใช้แบบ Streaming และเวลารวมทั้งหมด

![สถิติท้ายแต่ละรอบและการ์ดรายละเอียดเมื่อเลื่อนเมาส์](assets/turn-hover-card.png)

#### สถิติ SSH Remote แบบอ่านอย่างเดียว

เมื่อต้องเชื่อมต่อเครื่องพัฒนาระยะไกล สามารถเปิด **SSH Remote – สถิติระยะไกลแบบอ่านอย่างเดียว** ใน **Settings → Codex Theme** และเพิ่มชื่อโฮสต์ที่อนุญาตได้ (ปิดไว้เป็นค่าเริ่มต้น และจะไม่สแกน `~/.ssh/config`) บริการเบื้องหลังใช้ SSH Session แบบคงอยู่เพียงหนึ่ง Session เพื่อเรียก `~/.gemini/antigravity/codex-theme-remote/metrics_reader.py --serve` (สคริปต์อ่านข้อมูลอย่างเดียวแบบ Plain Text ไม่มี `base64` / `exec` / `-c` เหมาะกับสภาพแวดล้อมองค์กรที่มี HIDS) จากนั้นใช้ `sqlite3` โหมด `mode=ro` อ่านข้อมูล WAL ล่าสุด โดย **ตัดเนื้อหาข้อความทั้งหมด, Prompt และข้อความ Checkpoint ออกจากข้อมูลบนเครื่องปลายทาง** ส่งกลับมาเฉพาะ Metadata เชิงตัวเลขที่ผ่านการลดการระบุตัวตน แล้วประมวลผลในหน่วยความจำของเครื่องต้นทางเท่านั้น ไม่มีการเรียก `scp` และไม่มีการคัดลอกหรือทิ้งไฟล์ `.db` ไว้ในเครื่องต้นทาง

<details>
<summary>ดูตัวอย่างการตั้งค่า SSH Remote ด้วยตนเอง (user/config.json)</summary>

ข้อกำหนดเบื้องต้น: เครื่องปลายทางต้องมี `python3` และเครื่องต้นทางต้องเชื่อมต่อ SSH ได้โดยไม่ต้องกรอกรหัสผ่าน:

```json
{
  "modules": {
    "sshRemote": true
  },
  "sshHosts": ["node032"]
}
```

</details>

### ระบบแปลภาษา UI

เลือกภาษาได้ที่ **Settings → Codex Theme → Interface language** โดยรองรับ **English / 简体中文 / ไทย** ภาษาจีนตัวย่อยังคงใช้ Dictionary เดิม ส่วนภาษาไทยใช้ Dictionary แยกที่ `core/locales/th-TH.json` ซึ่งครอบคลุม Key ทั้ง 1,937 รายการจาก Dictionary ต้นฉบับ พร้อม Formatter ภาษาไทยสำหรับข้อความ Quota, เวลา, สถานะงาน และ Accessibility Labels คำแปลเน้นสำนวนที่เป็นธรรมชาติและเหมาะกับนักพัฒนา โดยคงคำศัพท์ที่ใช้กันทั่วไป เช่น Agent, Workspace, Context, Token, Prompt, MCP, API, Terminal, IDE, CLI, Plugin และ Skills ไว้ตามความเหมาะสม สามารถปรับคำแปลภาษาไทยเพิ่มเติมได้ผ่าน `user/i18n.th-TH.override.json`

Dictionary ภาษาจีนตัวย่อมีคำแปลในตัวมากกว่า `1,900+` รายการ ครอบคลุม Settings Panel ของ Antigravity รุ่น `2.30.x` ถึง `2.35.1+` (รวมการตั้งค่า Orchestrator, คีย์ลัดส่งข้อความในช่องพิมพ์ และสิทธิ์ Sandbox), เมนู, ตัวเลือกสิทธิ์, Sidebar, Side Question, การจัดการ Plugin, สถานะการอนุมัติ Tool รวมถึง **ข้อความแจ้งเตือนแบบไดนามิกเมื่อ Quota ของโมเดลหมดหรือ AI Credits ไม่เพียงพอ** ซึ่งประกอบข้อความเวลา/จำนวนเครดิตโดยอัตโนมัติ พร้อมคงชื่อโมเดลและระดับ Thinking เป็นภาษาเดิม ระบบใช้ `WeakMap` เพื่ออัปเดต Text Node โดยตรงโดยไม่ทำลาย React Binding สามารถกำหนดคำแปลเองผ่าน [user/i18n.override.json](user/i18n.override.json) หรือปิดการแปลภาษาได้จาก Settings Panel เพื่อกลับไปใช้ภาษาอังกฤษ

### ธีม Codex โหมดสว่าง/มืดและการแก้ไขปัญหาที่พบบ่อย

- **โหมดสว่าง (`codex-pure-white`)**: Canvas หลักสี `#FFFFFF`, Sidebar สี `#F9F9F9`, รายการที่เลือกสี `#EFEFEF`, ปุ่มหลักสี `#2B7FFF` พร้อมช่องพิมพ์มุมโค้งซ้อนชั้น โดยใช้ Outer Tray สี `#F7F7F8` และ Inner Card สี `#FFFFFF`
- **โหมดมืด (`codex-dark`)**: ชุดสีเทาถ่านแบบเป็นกลาง ประกอบด้วย Canvas หลัก `#181818`, Sidebar `#232323`, รายการที่เลือก `#353535`, Outer Tray `#262626`, Input Card `#363636` และปุ่มหลัก `#2C67C5`
- **การแก้ไขปัญหาและเพิ่มความสะดวก**: แก้ปัญหา Route Deadlock ในหน้าต่าง Settings เพิ่มคีย์ลัดปรับ Zoom บน macOS (`Cmd + -/=/0`) และ Windows/Linux (`Ctrl + -/=/0`) พร้อมรองรับการส่งต่อพารามิเตอร์อัตโนมัติในขั้นตอน Cold Start แบบไอคอนเดียวของ Antigravity `2.33.0+`

## ปรับแต่งและถอนการติดตั้ง

### การตั้งค่าทั่วไปและการปรับแต่งขั้นสูง (`user/`)

แนะนำให้จัดการการเปิด/ปิดโมดูล การเปลี่ยนโมเดล รายชื่อโฮสต์ที่อนุญาต และรูปแบบ Status Bar ผ่าน **Settings → Codex Theme** โดยตรง เมื่อบันทึก ระบบจะเขียนค่าลงใน `~/.gemini/antigravity/codex-theme/user/config.json` และ Hot Reload ให้มีผลทันที การอัปเดต Plugin จะไม่เขียนทับไดเรกทอรี `user/`

<details>
<summary>ดูโครงสร้างไดเรกทอรี user/ และรายละเอียดฟิลด์ขั้นสูงใน config.json</summary>

- [user/config.json](user/config.json)
  - `locale`: `"en"`, `"zh-CN"` หรือ `"th-TH"` (ภาษาของ UI; หากไม่มีการกำหนด จะคงพฤติกรรมภาษา Simplified Chinese แบบเดิม)
  - `preset`: `"codex-pure-white"` หรือ `"codex-dark"`
  - `themeVars`: กำหนดค่า CSS Variable เองตามต้องการ เช่น `--background`, `--sidebar`, `--primary`, `--ag-composer-*`, `--ag-dark-*`
  - `telemetryLayout`: `"compact"` (ค่าเริ่มต้น) หรือ `"detailed"`
  - `telemetryCacheMode`: `"session"` (อัตรา Cache Hit สะสมของเซสชัน) หรือ `"step"` (อัตรา Cache Hit ต่อ Step)
  - `modules`: เปิด/ปิดโมดูลแยกกัน ได้แก่ `theme`, `i18n`, `metrics`, `sshRemote`, `promptSuggestions`, `deadlockHealer`, `zoomShortcuts`, `cdpAutoRelaunch`, `customCss` และ `customJs`
  - `promptSuggestionModel`: ID ของโมเดลสำหรับคาดการณ์ข้อความถัดไป (ค่าเริ่มต้น `"gemini-3.8-flash-low"`)
  - `sshHosts`: รายชื่อโฮสต์ SSH ระยะไกลที่อนุญาตให้ตรวจสอบอย่างชัดเจน เช่น `["node032"]`
- [user/i18n.override.json](user/i18n.override.json): เพิ่มหรือเขียนทับคำแปลภาษาจีนตัวย่อ
- `user/i18n.th-TH.override.json`: เพิ่มหรือเขียนทับคำแปลภาษาไทย
- [user/custom.css](user/custom.css) และ [user/custom.js](user/custom.js): Inject CSS และ JavaScript Hook สำหรับปรับแต่งเอง ระบบจะล้างผลข้างเคียงจากสคริปต์เดิมโดยอัตโนมัติเมื่อ Hot Reload

</details>

### ปรับแต่ง Source Code (`core/`)

Source Code หลักแบ่งออกเป็น 34 โมดูลอิสระ พร้อม Unit Test จำนวน 82 รายการด้วย `node:test`:

| ส่วนที่ต้องการปรับแต่ง | ไฟล์ที่เกี่ยวข้อง |
| :--- | :--- |
| ชุดสีและ Layout ของธีมสว่าง/มืด | [core/styles/00-base.css](core/styles/00-base.css), [10-light-codex.css](core/styles/10-light-codex.css), [20-dark-codex.css](core/styles/20-dark-codex.css) |
| แผงตั้งค่า Native และระบบอัปเดตตัวเอง | [core/runtime/75-settings-ui.js](core/runtime/75-settings-ui.js), [core/styles/45-settings-ui.css](core/styles/45-settings-ui.css), [core/daemon/updater.mjs](core/daemon/updater.mjs) |
| State Machine และแผงสถิติการใช้งาน | [core/runtime/40-status-machine.js](core/runtime/40-status-machine.js), [core/daemon/telemetry-renderer.mjs](core/daemon/telemetry-renderer.mjs), [core/styles/30-telemetry.css](core/styles/30-telemetry.css) |
| ระบบคาดการณ์ข้อความและการวิเคราะห์โมเดล | [core/daemon/prompt-suggest.mjs](core/daemon/prompt-suggest.mjs), [core/runtime/70-prompt-suggestions.js](core/runtime/70-prompt-suggestions.js) |
| Dictionary และการจัดกลุ่มโมดูลสำหรับติดตั้งเฉพาะส่วน | [core/i18n.json](core/i18n.json), [core/runtime/60-i18n-engine.js](core/runtime/60-i18n-engine.js), [core/installer/features.mjs](core/installer/features.mjs) |

หลังแก้ไขไฟล์ใน `core/` ให้รันคำสั่งต่อไปนี้เพื่อสร้าง Hash Manifest ใหม่ ตรวจสอบโค้ด รันทดสอบทั้งหมด และติดตั้งลงในเครื่อง:

```bash
node install.mjs build-manifest && npm run check && npm test && node install.mjs install
```

<details>
<summary>ดูโครงสร้างไดเรกทอรีของ Repository</summary>

```text
antigravity-codex-theme/
├── assets/                     # ภาพประกอบที่ใช้ใน README
├── core/
│   ├── daemon/                 # บริการซิงก์เบื้องหลัง (Hot Reload / Protobuf / Retry Log / Renderer / SQLite / SSH Remote / Next Prompt / Updater / CDP / 2.33.0 Relay)
│   ├── runtime/                # Frontend Script สำหรับ Inject ตามลำดับ (Lifecycle / Fixes / Theme Sync / State Machine / Metrics UI / Localization / Prompt Suggestion / Embedded Settings)
│   ├── styles/                 # โมดูล Style (พื้นฐาน / สว่าง / มืด / สถานะและสถิติ / คาดการณ์ข้อความ / Settings Panel)
│   ├── installer/              # จัดกลุ่มโมดูล / ตรวจสอบและจัดแพ็กเกจ Manifest / ตรวจสอบสภาพแวดล้อม / จัดการ Auto-start และ CDP ข้ามแพลตฟอร์ม
│   ├── daemon.mjs              # จุดเริ่มต้นของบริการเบื้องหลัง
│   ├── shared.mjs              # ฟังก์ชันเครื่องมือส่วนกลาง
│   ├── i18n.json               # Dictionary UI ภาษาจีนตัวย่อ 1,900+ รายการ
│   ├── locales/                 # Dictionary หลายภาษา (ปัจจุบันมี th-TH)
│   └── manifest.json           # Hash Manifest สำหรับตรวจสอบความสมบูรณ์ของไฟล์ core/
├── tests/                      # Unit Test จำนวน 82 รายการด้วย node:test
├── user/                       # ไดเรกทอรีการตั้งค่าส่วนบุคคลและ Hot Reload
├── install.mjs                 # CLI สำหรับติดตั้ง อัปเดต รีสตาร์ต และดูแลระบบ
├── SKILL.md                    # คู่มือการทำงานสำหรับ AI Agent
└── LICENSE                     # สัญญาอนุญาต MIT
```

</details>

### ถอนการติดตั้งและข้อมูลที่ยังคงเก็บไว้

รัน `node install.mjs uninstall` เพื่อถอนการติดตั้ง จากนั้นระบบจะดำเนินการดังนี้:

- **ลบส่วนที่ติดตั้งและคืนค่าระบบ**: หยุด Process เบื้องหลัง ลบรายการเริ่มทำงานอัตโนมัติของระบบ (macOS `LaunchAgent`, Linux `systemd --user`, Windows Scheduled Tasks/Startup Scripts) และพารามิเตอร์ CDP ที่ Plugin เป็นผู้จัดการ พร้อมคืนหน้าต่างปัจจุบันให้ใช้ UI ภาษาอังกฤษและ Style ดั้งเดิม
- **ข้อมูลที่เก็บไว้เป็นค่าเริ่มต้น**: ยังคงเก็บการตั้งค่าส่วนบุคคลใน `~/.gemini/antigravity/codex-theme/user/`, โฟลเดอร์สำรอง `backups/` และ `core.prev/` รวมถึงฟิลด์ `"remote-debugging-port"` ใน `~/.antigravity/argv.json` หากต้องการลบข้อมูลทั้งหมด ให้ลบรายการเหล่านี้ด้วยตนเอง

## เครดิตและสัญญาอนุญาต

ขอขอบคุณผู้มีส่วนร่วมจากชุมชนที่ช่วยพัฒนาโครงการผ่าน Pull Request:

- [@isdou](https://github.com/isdou) ([PR #1](https://github.com/nkjDSLcvanv/antigravity-codex-theme/pull/1)): เพิ่มระบบคาดการณ์ข้อความถัดไปในช่องพิมพ์ (Ghost Text + เติมข้อความด้วย `Tab` / `→`)
- [@xiaoxiami-zyx](https://github.com/xiaoxiami-zyx) ([PR #3](https://github.com/nkjDSLcvanv/antigravity-codex-theme/pull/3)): เพิ่มการดึง Metadata สถิติ SSH Remote แบบอ่านอย่างเดียว และประมวลผลในหน่วยความจำ
- [@chunbin1](https://github.com/chunbin1) ([PR #6](https://github.com/nkjDSLcvanv/antigravity-codex-theme/pull/6)): เพิ่มกลไก Retry แบบ Backoff สำหรับ Cold Start เพื่อแก้ปัญหาการ Attach เข้าหน้าต่างหลักไม่สำเร็จจนทำให้ Heartbeat Timeout

ในช่วงศึกษาการ Inject ผ่าน CDP Runtime ของ Antigravity, การแทนที่ข้อความใน DOM โดยใช้ `WeakMap`, การอ่าน SQLite แบบ Incremental และกลไกส่งต่อการเริ่มแอปด้วย `--remote-debugging-port=0` สำหรับรุ่น `2.33.0` โครงการนี้ได้รับแรงบันดาลใจและอ้างอิงแนวทางจาก [Anarcadia/chuanban-antigravity-theme-patch](https://github.com/Anarcadia/chuanban-antigravity-theme-patch) (MIT) จึงขอขอบคุณไว้ ณ ที่นี้ด้วย

โครงการนี้ได้เขียนสถาปัตยกรรมหลักขึ้นใหม่และต่อยอดความสามารถเพิ่มเติม ได้แก่ 34 โมดูลอิสระ พร้อม Unit Test 82 รายการและ CI, ธีม Codex สว่าง/มืดที่ไม่พึ่งพาฟอนต์ภายนอก, แผงตั้งค่า **Codex Theme** แบบฝังในแอปพร้อมระบบตรวจสอบอัปเดต, State Machine สถานะเซสชัน 4 รูปแบบ พร้อมแผงสถิติระดับ 1/2 และการ์ดรายละเอียดแบบ Hover ในแต่ละรอบ, SSH Remote แบบอ่านอย่างเดียวและระบบคาดการณ์ข้อความที่เลือกเปิดใช้ได้ รวมถึงการติดตั้งเฉพาะโมดูลด้วย `--only` และการแยกการตั้งค่าส่วนบุคคลใน `user/` เพื่อรองรับ Hot Reload

เผยแพร่ภายใต้ [MIT License](LICENSE) สามารถ Fork และนำไปปรับแต่งต่อได้ตามต้องการ

## English Overview

`antigravity-codex-theme` brings Codex light and dark themes, Chinese and Thai UI localization, an embedded native Settings panel, and live session telemetry to Google Antigravity (`2.30.x` – `2.35.1+`) without modifying the application bundle. Built as 34 independent modules under `core/` with 82 `node:test` test cases (requires Node.js `>= 22.13.0`).

- **Codex Light & Dark Themes**: Pure white (`codex-pure-white`) and charcoal dark (`codex-dark`) palettes with zero external font dependencies and automatic light/dark switching.
- **Embedded Settings Panel & Self-Updater**: Mounts directly under **Settings → Codex Theme** to toggle modules, select prompt-suggestion models & thinking effort tiers via a 2-level `agy models` cascading menu, edit `sshHosts`, trigger manual hot-reloads, and check/apply in-panel updates (`node install.mjs update`) with integrity verification and automatic `core.prev/` rollback backups while preserving `user/`.
- **Live Session Status & Telemetry**: Bottom 4-state indicator (ready, running, waiting/retrying, error), expandable L1/L2 usage panels, adaptive layouts (`compact` centered inline with narrow-pane auto-wrap; `detailed` as a dedicated centered bottom row aligned with the hover card), and per-turn hover breakdown cards across main chats, Side Question panes, and opt-in read-only SSH Remote sessions (zero local `.db` copy).
- **Chinese Localization & Opt-In Prompt Suggestions**: `1,900+` `WeakMap` in-place UI translations (including dynamic quota-exhausted & AI Credits banners while preserving model names), plus opt-in Ghost Text + `Tab` prompt suggestions (`--only suggest`, off by default).

Thanks to community contributors [@isdou](https://github.com/isdou) ([PR #1](https://github.com/nkjDSLcvanv/antigravity-codex-theme/pull/1)), [@xiaoxiami-zyx](https://github.com/xiaoxiami-zyx) ([PR #3](https://github.com/nkjDSLcvanv/antigravity-codex-theme/pull/3)), and [@chunbin1](https://github.com/chunbin1) ([PR #6](https://github.com/nkjDSLcvanv/antigravity-codex-theme/pull/6)). Early CDP injection and `2.33.0` launch relay research drew inspiration from [Anarcadia/chuanban-antigravity-theme-patch](https://github.com/Anarcadia/chuanban-antigravity-theme-patch) (MIT). Licensed under the [MIT License](LICENSE).
