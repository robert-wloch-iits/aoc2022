module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    // The Follow config only works with eslint-plugin-vue v8.0.0+
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended', // this maybe causes errors in defineEmits<{}>() ???
    // 'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:prettier-vue/recommended',
    'prettier',
  ],
  /* globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
  }, */
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  // plugins: ['@typescript-eslint'], // might not be needed
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
}
