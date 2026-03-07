# Devstep Task Manager

個人用のタスク管理 Web アプリケーションです。  
日々のタスクを記録し、完了・未完了を管理できます。  
Next.js（App Router）と Supabase を利用して構築しています。

---

## 🚀 プロジェクト概要

本アプリは、以下の機能を備えたシンプルなタスク管理ツールです。

- ユーザー認証（Supabase Auth）
- タスクの登録・一覧表示
- タスクの完了 / 未完了管理
- ログイン必須の保護ページ（tasks）

---

## 🛠 技術スタック

- **Next.js 16（App Router）**
- **TypeScript**
- **Supabase**
- **Tailwind CSS**
- **Node.js**
- **Git / GitHub**
- **Vercel（デプロイ）**

---

## 📦 セットアップ手順

### 1. Next.js プロジェクトの作成と Supabase 連携

以下のコマンドで Supabase 連携済みの Next.js プロジェクトを作成。

```bash
npx create-next-app -e with-supabase
```

作成された `.env.example` を `.env.local` にリネームし、Supabase の環境変数を設定。

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_key
```

値は Supabase ダッシュボードの  
**Project URL** と **Publishable key** からコピー。

---

### 2. ローカルサーバーの起動

```bash
npm run dev
```

ブラウザで以下にアクセスし動作確認。

```
http://localhost:3000/
```

---

### 3. app フォルダ構成の調整

初期テンプレートの画面構成を、仕様に合わせて以下のように変更。

- `auth` フォルダ → 中身を `app` 直下へ移動し、フォルダ削除
- `sign-up` → `signup` にリネーム
- `protected` → `tasks` にリネーム
- それに伴い、`app` 配下および `components` 内の import パスを修正

---

### 4. 未ログイン時の `/login` へのリダイレクト

`app/page.tsx` 内で `AuthButton` がログイン状態を判定しているため、  
未ログイン時に以下のようにリダイレクト処理を追加。

```ts
import { redirect } from "next/navigation";

if (!session) {
  redirect("/login");
}
```

（※ 今後、より適切な保護ルート実装に改善予定）

---

## 🚀 デプロイ手順（Vercel）

### 1. GitHub リポジトリの作成

GitHub 上に `devstep-task-manager`（public）を作成。

### 2. ローカルリポジトリの準備

```bash
git clone https://github.com/beagle-san/devstep-task-manager
```

クローンしたフォルダへ、`my-app` の全ファイルをコピー。

ローカルで動作確認：

```bash
npm run dev
```

### 3. GitHub へ push

```bash
git add .
git commit -m "1st commit"
git push origin main
```

### 4. Vercel でデプロイ

- GitHub と Vercel を連携済みのため、Vercel ダッシュボードから  
  `devstep-task-manager` を選択してデプロイ
- `.env.local` をインポートし、Supabase 用の環境変数を設定

デプロイ後の URL：

```
https://devstep-task-manager-psi.vercel.app
```

ローカルと同様に動作することを確認。
