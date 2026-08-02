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
        // Prettier owns HTML formatting; ESLint owns correctness and a11y.
        // These five rules disagree with Prettier's output (it self-closes void
        // elements and keeps short inline spans on one line), so leaving them on
        // makes `lint` and `format:check` mutually unsatisfiable — which is why
        // this repo could never have both green at once.
        '@html-eslint/indent': 'off',
        '@html-eslint/require-closing-tags': 'off',
        '@html-eslint/no-extra-spacing-attrs': 'off',
        '@html-eslint/attrs-newline': 'off',
        '@html-eslint/element-newline': 'off',

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