module.exports = {
  root: true,
  extends: ["plugin:@typescript-eslint/recommended", "next/core-web-vitals"],
  plugins: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "error", //宣言されてるけど使用されてない変数をエラーに
    "@typescript-eslint/no-explicit-any": "warn", // any型の場合に警告を出す
    "@typescript-eslint/no-unsafe-call": "error", // 型安全性が確保されてない関数を呼び出した場合にエラーに
    "@typescript-eslint/no-unsafe-member-access": "error", //オブジェクトのメンバーへの型安全性が確保されていないアクセスを検出
    "@typescript-eslint/no-unsafe-return": "error", // 型安全性が確保されていない値の返却を検出
  },
};
