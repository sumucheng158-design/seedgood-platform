# 善種 SeedGood — 公益活動平台

> 播種善意，共創美好。每個行動都是起點。

一個完整的公益活動平台靜態網站，包含完整的品牌設計系統、多頁面架構與流暢的報名流程。

---

## 🌱 品牌概覽

**品牌名稱**：善種 SeedGood  
**品牌主張**：播種善意，每個行動都是改變的起點  
**視覺調性**：自然大地 × 清晨森林 × 溫暖橙光  

### 主色系
| 色名 | Hex | 用途 |
|------|-----|------|
| 深森綠 | `#2D6A4F` | 主色、CTA按鈕 |
| 活力綠 | `#52B788` | 互動元素、成功狀態 |
| 溫暖橙 | `#F4A261` | 強調色、緊迫感 |
| 米白 | `#FEFAE0` | 背景色 |
| 深海藍 | `#264653` | 深色背景、深色區塊 |

---

## 📁 檔案結構

```
seedgood/
├── index.html          # 首頁（Hero + 活動預覽 + 影響力數據）
├── events.html         # 活動列表頁（篩選 + 分類 + 格/列視圖）
├── event-detail.html   # 活動詳情頁（三步驟報名流程）
├── impact.html         # 成果展示頁（數據視覺化）
├── about.html          # 關於我們（使命 + 團隊 + 夥伴）
├── css/
│   └── style.css       # 完整設計系統 CSS
├── js/
│   └── main.js         # 互動功能 JavaScript
└── README.md
```

---

## 🌐 頁面功能說明

### 首頁 `index.html`
- Hero 區塊：品牌主張 + 即時活動提醒 + 動態數字計數器
- 活動分類導航列
- 精選活動卡片（3 欄格狀）
- 影響力數據視覺化橫幅
- 參與者見證
- 電子報訂閱

### 活動列表 `events.html`
- 活動類型篩選標籤（全部 / 講座 / 工作坊 / 志工 / 社區 / 線上）
- 城市 / 日期 / 形式下拉篩選
- 格狀 / 列表切換視圖
- 活動卡片（顯示類型、日期、地點、剩餘名額）
- 載入更多按鈕

### 活動詳情 `event-detail.html`
- 三步驟報名流程：
  1. **基本資料**（姓名、信箱、手機）
  2. **選擇形式**（實體/線上，含場地說明）
  3. **確認報名**（摘要確認 + 同意條款）
- 報名進度條（座位剩餘視覺化）
- 活動流程時間軸
- 講者介紹卡片
- 分享功能（Facebook / LINE / 複製連結）

### 成果展示 `impact.html`
- 大型數字指標（動態計數動畫）
- 滿意度 / NPS 信任指標
- 活動類型分佈橫條圖
- 影響力故事卡片（案例研究）

### 關於我們 `about.html`
- 品牌故事與使命
- 核心價值觀
- 團隊成員介紹
- 合作夥伴展示
- 成為夥伴 CTA

---

## 🚀 部署到 GitHub Pages

### 方法 1：直接上傳
1. 建立 GitHub Repository（建議命名 `seedgood` 或 `charity-platform`）
2. 上傳所有檔案（維持目錄結構）
3. 進入 Settings > Pages
4. Source 選擇 `Deploy from a branch`，Branch 選 `main`，目錄選 `/root`
5. 儲存後等待 1–2 分鐘，即可訪問 `https://你的帳號.github.io/seedgood`

### 方法 2：使用 Git CLI
```bash
cd seedgood
git init
git add .
git commit -m "🌱 初始化善種公益平台"
git remote add origin https://github.com/你的帳號/seedgood.git
git push -u origin main
```

---

## 🔧 Canva 設計整合建議

以下素材建議使用 Canva 設計後，匯出 PNG/SVG 並放入 `images/` 資料夾：

| 素材 | Canva 建議尺寸 | 用途 |
|------|-------------|------|
| Logo | SVG / 200×60px | 導覽列 |
| 社群貼文 | 1080×1080px | Facebook / Instagram |
| 活動封面圖 | 1200×630px | 活動卡片 |
| OG Image | 1200×630px | 社群分享預覽 |
| 電子報標頭 | 600×200px | 電子報 |

**整合方式**：
1. 在 Canva 設計完成後，匯出 PNG 至 `images/` 資料夾
2. 在 HTML 中將活動卡片的 `background: linear-gradient(...)` 替換為 `background-image: url(images/活動名稱.png)`
3. 導覽列 Logo 可將 `&#9672; 善種` 替換為 Canva 設計的 SVG Logo

---

## 📱 響應式設計

| 斷點 | 佈局 |
|------|------|
| Desktop (≥1024px) | 3 欄活動格、完整導覽列 |
| Tablet (768–1023px) | 2 欄活動格、簡化佈局 |
| Mobile (<768px) | 1 欄、漢堡選單、垂直堆疊 |

---

## ✅ 技術規格

- **純靜態**：HTML + CSS + Vanilla JS，無需後端
- **字型**：Google Fonts（Noto Serif TC + Noto Sans TC）
- **無依賴**：不需要 Node.js / npm，直接在瀏覽器開啟
- **無障礙**：ARIA 標籤、語意化 HTML5、鍵盤可操作
- **Mobile First**：基於 RWD，優先手機體驗

---

## 📈 後續擴充建議

若需要完整後端功能，建議整合以下工具（均有免費方案）：

| 功能 | 建議工具 |
|------|---------|
| 報名表單收集 | Google Forms / Airtable |
| 電子報發送 | Mailchimp / Substack |
| 活動資料管理 | Notion / Airtable CMS |
| 線上付款 | ECPay / Stripe |
| 分析追蹤 | Google Analytics 4 |
| 直播整合 | YouTube Live / Zoom |
| 社群登入 | Firebase Auth |

---

## 📄 授權

本模板為公益用途設計，可自由修改與使用。  
若公開部署，請在頁面下方保留「設計靈感來源：善種 SeedGood」字樣。

---

*善種 SeedGood · 播種善意，共創美好 🌱*
