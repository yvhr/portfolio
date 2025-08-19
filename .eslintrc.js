module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  overrides: [
    {
      files: ['*.html'],
      parser: '@html-eslint/parser',
      plugins: ['@html-eslint'],
      extends: [
        'plugin:@html-eslint/recommended',
      ],
      rules: {
        '@html-eslint/indent': ['error', 2],
        '@html-eslint/require-doctype': 'error',
        '@html-eslint/require-lang': 'error',
        '@html-eslint/require-meta-charset': 'error',
        '@html-eslint/require-meta-viewport': 'error',
        '@html-eslint/no-duplicate-attrs': 'error',
        '@html-eslint/no-inline-styles': 'off',
        '@html-eslint/require-title': 'error',
        '@html-eslint/no-target-blank': 'error',
        '@html-eslint/require-img-alt': 'error',
        '@html-eslint/no-obsolete-tags': 'error',
        '@html-eslint/require-meta-description': 'off',
      },
    },
    {
      files: ['*.js'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
      },
      rules: {
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-unused-vars': 'warn',
        'no-console': 'warn',
      },
    },
  ],
};