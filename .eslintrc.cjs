module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  ignorePatterns: [
    'node_modules/**',
    'lib/**',
    'dist/**',
    'coverage/**',
    '*.min.js',
    '**/*.umd.js',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx', '*.vue'],
      rules: {
        'vue/attribute-hyphenation': 'off',
        'no-useless-escape': 'off',
        'semi': 'off',
        'vue/no-lone-template': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/prefer-import-from-vue': 'off',
        'vue/require-default-prop': 'off',
        'vue/no-v-html': 'off',
        'vue/one-component-per-file': 'off'
      }
    }
  ],
};
