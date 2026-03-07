- プロジェクト概要
  　　　個人用タスク管理Webアプリケーション
  　　　日々のタスクを記録し、完了・未完了を管理できるWebアプリです。

- 技術スタック
  　　 GitHub
  Git
  Node.js
  　　 Next.js 16（App Router）
  TypeScript
  Supabase
  Tailwind CSS
  Vercel

- セットアップ手順1. Next.js 16（App Router）プロジェクトを作成し、Supabaseと連携させる
  　　　　下記、Node.jsコマンドプロンプトに入力し実行した。
  npx create-next-app -e with-supabase
  .env.exampleを.env.localにリネームして、下記、追加した。
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable

　　　　実際の値は下記リンクのProject URLの項とPublishable keyの項からコピーペーストした。
　　　　Use Supabase Auth with Next.js | Supabase Docs

　　2. 1.のプロジェクト(my-app)をローカルサーバーで動作させる
　　　　下記、Node.jsコマンドプロンプトに入力し実行した。
　　　　　npm run dev

　　　　　これでローカルサーバが動作中となる。
次に、ブラウザからhttp://localhost:3000/へアクセスした。

    3. プロジェクトのappフォルダの構成を変更する
    	supabase authのおかげでログイン、ログアウトができるが、

　　　　仕様の画面一覧とURLが対応していないため合わせた。
　　　　　(1) authフォルダは中身をappに持っていき、authフォルダを消した。
　　　　　(2) sign-upフォルダはsignupにリネーム
（3） protectedフォルダはtasksにリネーム
(4) appフォルダ以下のコードと、インポートしているcomponentsフォルダのコードを編集し、
　　　　　　　辻褄を合わせた。

　　4. 未ログイン時に/loginへリダイレクトさせる
　　　　　appフォルダのpage.tsxでAuthButtonがコールされている。
　　　　　AuthButtonの処理では、ログイン中かそうでないかを判別しているため、
ログイン中でない時にredirect(“/login”)を追加し、実現した。
　　　　　（この方法がベストとは思えないが、一旦そうした。）

　　5. Vercelへデプロイするため、Githubにdevstep-task-managerという名称のpublicリポジトリを作成した
作業手順
　　　　　　(1) ローカルリポジトリを作成するため、下記、Git Bashに入力した。
git clone https://github.com/beagle-san/devstep-task-manager
(2) ローカルリポジトリ(devstep-task-managerフォルダ)にmy-appフォルダからファイルを全てコピーする
　　　　　　(3) devstep-task-managerフォルダでローカルサーバーを動かし、ブラウザから動作を確かめた。
　　　 　 (4) githubにpushするため、下記、Git Bashに入力した。
git add .
git commit -m “1st commit”
git push origin main

    	     (5) GitHubとVercelは連携させているため、Vercelからdevstep-task-managerプロジェクトを選択してデプロイした。

　　　　　　　この時、Supabaseで使用する環境変数を設定するため、.env.localをインポートして、環境変数を設定した。
(6) デプロイ完了後、https://devstep-task-manager-psi.vercel.app

　　　　　　　　へアクセスして、ローカルサーバと同様の動作か確かめた。
