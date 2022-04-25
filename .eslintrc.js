module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    // The Follow config only works with eslint-plugin-vue v8.0.0+
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended', //
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier-vue/recommended',
    'prettier',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',

    requireConfigFile: false,
    parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: true,
    },
  },
  rules: {
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/require-prop-types': 'off',
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'beside',
        multiline: 'below',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 20,
        },
        multiline: {
          max: 1,
        },
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
