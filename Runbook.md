# 本機啟動 Runbook

---

## 1) 需求工具與版本

| 工具         | 版本建議      | 來源檔案與行數                          |
|--------------|--------------|------------------------------------------|
| Node.js      | ^18（建議 18.x） | [`package.json`](package.json ) 第1行、`"engines"` 未指定，依 React/Vite/TypeScript 相容性建議 |
| npm          | ^9（建議 9.x 以上） | [`package.json`](package.json )（未指定，依 Vite/React 相容性建議） |
| 其他         | 無           | -                                        |

- **包管理工具**：npm（未偵測到 yarn.lock、pnpm-lock.yaml）
- **Docker**：未偵測到 Dockerfile 或 docker-compose.yml
- **資料庫/快取**：無（純前端專案）

---

## 2) 安裝步驟與一鍵啟動指令

請依下列步驟操作：

1. 安裝依賴
    ```sh
    npm install
    ```
2. 啟動開發伺服器
    ```sh
    npm run dev
    ```
3. 建置專案（產生靜態檔案於 dist/，可選）
    ```sh
    npm run build
    ```

> 若需預覽建置產物，可執行：  
> `npm run preview`

---

## 3) 環境變數地圖

| 名稱 | 用途 | 出現位置 | 是否必填 | 預設值建議 |
|------|------|----------|----------|------------|
| 無   | 無需環境變數 | 全專案未用到 | 否         | 無         |

### `.env.example`

（本專案目前無需任何環境變數）

---

## 4) 資料庫/快取

- **未偵測到任何資料庫、快取、migrate/seed/連線檢查指令。**

---

## 5) Docker

- **未偵測到 Dockerfile 或 docker-compose.yml，無法直接使用 Docker 啟動。**
- 若需容器化，建議後續可補上 Dockerfile。

---

**總結：本專案為純前端 React + Vite 專案，僅需 Node.js 與 npm，無需資料庫與環境變數，三步即可啟動。**
