## 開発環境

### Dependencies

| name            | description                                      |
| --------------- | ------------------------------------------------ |
| TypeScript      | -                                                |
| Next.js         | ApRouter使用                                     |
| TailwindCSS     | -                                                |
| Shadcn ui       | RemixとTailwindCSS製のカスタマイズコンポーネント |
| ESLint          | 静的解析                                         |
| Prettier        | コード整形                                       |
| Husky           | Gitフックの設定                                  |
| clsx            | 動的なクラスの使い分けなど                       |
| Axios           | api通信                                          |
| Storybook       | UIコンポーネントのテスト・管理                   |
| Jest            | テストツール                                     |
| Testing library | テストツール                                     |

### npm scripts

| name       | action           | command                                        |
| ---------- | ---------------- | ---------------------------------------------- |
| dev        | 開発モード実行   | next dev                                       |
| build      | ビルド           | next build                                     |
| start      | 本番モードの起動 | next start                                     |
| lint       | コードチェック   | next lint —dir src/app                         |
| lint:fix   | コード精鋭       | next lint —fix —dir src/app                    |
| format     | フォーマット実行 | prettier --write './\*_/_.{js,jsx,ts,tsx,json} |
| story-book | Storybookの起動  | storybook dev -p 6006                          |
| test       | テストの実行     | jest --watch                                   |

# Lint・Format・Commitルール

## ESLint

TailwindCSSのLinterにより、プロパティの自動整形
import/orderにより、import文の自動整形
unused-importsにより、不要なimport文の削除

## Prettier

- 行の最大幅は 120 文字
- JSX 式は新しい行に
- インデントは2スペース
- 配列などの末尾のカンマは削除
- 文末のセミコロンは削除
- クォーテーションはシングルクォーテーションを使用

## commitメッセージ制約

```
<gitmoji><Prefix>：<#issue番号><内容>
```

### gitmoji と prefix の種類

| 絵文字 | prefix   | 内容                                                 |
| ------ | -------- | ---------------------------------------------------- |
| ✨     | feat     | 新機能の実装                                         |
| ⚡️    | perf     | パフォーマンスの改善                                 |
| 🔥     | fire     | 機能・ファイルの削除                                 |
| 🐛     | fix      | バグの修正                                           |
| 🩹     | typo     | ちょっとした修正(小さなミス・誤字など)               |
| 📝     | docs     | コードと関係ない部分(Readme・コメントなど)           |
| 💄     | style    | スタイル関係のファイル(CSS・UI のみの変更など）      |
| ♻️     | refactor | コードのリファクタリング                             |
| 🎨     | art      | コードのフォーマットを整える(自動整形されたのも含む) |
| 🔧     | config   | 設定ファイルの追加・更新(linter など)                |
| ✅     | test     | テストファイル関連(追加・更新など)                   |
| 🚚     | move     | ファイルやディレクトリの移動                         |
| 🎉     | start    | プロジェクトの開始                                   |
| 🚀     | deploy   | デプロイする                                         |

## ブランチルール

(※バージョン1.1以降対応)
Git flowを参考に、以下のルールで行う</br>
流れとしては

1. issueを立てる
2. issueに紐づくfeatureブランチを作成する
3. PRを作成する
4. developブランチにmergeする

### main

本番環境のブランチ

### develop

featureブランチの変更を反映しmergeして動作の確認を行う。

```
develop/{version}
```

例：最初のバージョンのリリース

```
develop/1.0
```

### feature

developブランチから派生させる
全ての開発はこのブランチで行う。
基本的に新機能の場合はfeature/{#issue番号}

##### (カテゴリ)

| name        | description                    |
| ----------- | ------------------------------ |
| environment | 環境構築・設定周りの作業       |
| refactoring | コードのリファクタリングを行う |
| improvement | 実装済みの機能改善を行う       |

新機能開発の場合

```
feature/#<issue番号>
```

例：issue：全体のレイアウト構成の作成 #2

```
feature/#2
```

カテゴリを含む場合

```
feature/<category>/#<issue番号>
```

例：issue：環境構築 #1

```
feature/environment/#1
```

### release

(TBD)
developからmergeする
mainブランチにmergeする前に確認する作業を行う

### hotfix

(TBD)
mainブランチから派生する
リリース後に起きた緊急のバグ対応を行う
