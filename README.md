# Nest.js + Swagger サンプルプロジェクト

このプロジェクトは、**Nest.js** フレームワークを使用して構築された REST API に  
**Swagger (OpenAPI)** を導入し、ブラウザから API ドキュメントを確認できるサンプルです。

---

## 🧩 使用技術

- **[Nest.js](https://nestjs.com/)**  
  TypeScript で構築された Node.js 向けのフレームワーク。  
  モジュール構造やDI（依存性注入）などを備え、堅牢でスケーラブルなサーバーアプリケーションを簡単に構築できます。

- **[Swagger (OpenAPI)](https://swagger.io/specification/)**  
  REST API の仕様を記述し、API ドキュメントを自動生成するためのツール。  
  Nest.js では `@nestjs/swagger` パッケージを使うことで簡単に統合できます。

---

## 🚀 セットアップ手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/your-username/nest-swagger-sample.git
cd nest-swagger-sample
```

### 2. 依存パッケージのインストール

```bash
npm install
```


### 3. サーバーの起動

```bash
npm run start:dev
```

### 4. swaggerドキュメントの確認
ブラウザで
http://localhost:3000/swaggerDocument
と入力するとswaggerのドキュメントが確認できます。