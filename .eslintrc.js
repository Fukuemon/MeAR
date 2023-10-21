module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended'
  ],
  plugins: ['unused-imports'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'import/order': [
      'error',
      {
        // インポートを以下のカテゴリに分類
        groups: [
          'builtin', // Node.jsの組み込みモジュール
          'external', // node_modulesからのインポート
          'internal', // 同じパッケージ内の他のモジュールからのインポート
          'parent', // 現在のディレクトリの親ディレクトリからのインポート
          'sibling', // 同じディレクトリ内の他のモジュールからのインポート
          'index', // 現在のディレクトリのインデックスファイルからのインポート
          'object', // オブジェクトのインポート
          'type' // TypeScriptの型のインポート
        ],
        // 特定のインポートパターンをカスタムグループに分類
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}', // このパターンに一致するインポート
            group: 'builtin', // 上記のインポートをbuiltinグループとして扱う。
            position: 'before' // そのグループの前に配置
          }
        ],
        // pathGroupsの設定から特定のインポートタイプを除外します。
        pathGroupsExcludedImportTypes: ['builtin'], // builtinタイプのインポートを除外。
        // インポート文のアルファベット順にソート
        alphabetize: {
          order: 'asc' //
        }
      }
    ]
  }
}
