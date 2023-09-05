
## 開発環境
"next": "13.4.19"    
"typescript": "5.2.2"

スタイル      
"tailwindcss": "3.3.3"


状態管理    
"@reduxjs/toolkit": "^1.9.5",

## ディレクトリ構成
```bash
src
├── app
│   ├── components
│   │   ├── elements
│   │   └── features
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── template
│       ├── hooks
│       └── page.tsx
├── model
├── store
│   ├── Provider.tsx
│   ├── features
│   ├── hook.ts
│   └── store.tsx
└── types
│
│
└──tailwind.config
(その他省略)
```


layout.tsx：全体の共通となるレイアウトを指定

globals.css：tailwindの設定ファイル

### /template：各機能

---

機能ごとにロジック→hooks

ページ：page.tsx

ページのUIは極力コンポーネントで管理

### /components：UI部分

---

UIのパーツをまとめる

---

### -/elements：パーツ

共通となる粒度が小さいパーツの元はここで管理する

---

### -/features：機能別のコンポーネント

---

機能ごとのパーツをまとめたもの(UI)

### model：モックデータ

---

各コンポーネントで受け取るpropsの仮データを格納

### store：グローバルステートを管理

---

グローバルステートを管理

/features：各機能ごとのSliceを配置

### types：型定義

---

型を管理する
各コンポーネントで受け取る型は、データ取得ができてない場合はmodelに定義しておく




