module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    requireConfigFile: false,
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ["next/core-web-vitals", "eslint:recommended"],
};
