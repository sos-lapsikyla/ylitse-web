export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: ['stylelint-order'],
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  rules: {
    'declaration-empty-line-before': null,
  },
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
      rules: {
        'media-query-no-invalid': null,
        'nesting-selector-no-missing-scoping-root': null,
        'no-invalid-double-slash-comments': null,
        'no-descending-specificity': null,
        'block-no-empty': null,
      },
    },
    {
      files: ['**/*.css'],
      rules: {
        'nesting-selector-no-missing-scoping-root': true,
      },
    },
  ],
  ignoreFiles: [
    'dist/**',
    'coverage/**',
    '**/node_modules/**',
    // TODO: Remove this and fix CSSs
    'src/**/*.css',
  ],
};
