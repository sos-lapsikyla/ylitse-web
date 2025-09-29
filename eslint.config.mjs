import { defineConfig } from 'eslint/config';

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import globals from 'globals';

// import importPlugin from 'eslint-plugin-import';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

import jestPlugin from 'eslint-plugin-jest';
// import cypressPlugin from 'eslint-plugin-cypress';

import jsonc from 'eslint-plugin-jsonc';
import jsoncParser from 'jsonc-eslint-parser';

import prettierConfig from 'eslint-config-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import betterStyled from 'eslint-plugin-better-styled-components';

export default defineConfig([
  {
    ignores: ['dist/**', 'coverage/**', '**/node_modules/**', 'licenses.json'],
  },
  // TypeScript
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ['**/*.{cts,mts,ts,tsx}'],
  })),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
        projectService: {
          // Config files etc.
          allowDefaultProject: ['*.js', '*.mjs', '*.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
      '@typescript-eslint/no-require-imports': [
        'error',
        { allow: ['/licenses.json$'] },
      ],
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'no-nested-ternary': 'error',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
    },
  },
  // JavaScript
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    rules: {
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },
  // Import rules
  // {
  //   files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  //   plugins: { import: importPlugin },
  //   settings: {
  //     'import/resolver': {
  //       typescript: {
  //         project: true,
  //       },
  //     },
  //     'import/internal-regex': '^@/',
  //   },
  //   rules: {
  //     'import/named': 'error',
  //     'import/no-unresolved': 'error',
  //     'import/no-duplicates': 'error',
  //     'import/order': [
  //       'error',
  //       {
  //         alphabetize: { order: 'asc', caseInsensitive: true },
  //         groups: [
  //           'builtin',
  //           'external',
  //           'internal',
  //           ['parent', 'sibling', 'index'],
  //           'object',
  //           'type',
  //         ],
  //         'newlines-between': 'always',
  //         pathGroups: [
  //           { pattern: '@/**', group: 'internal', position: 'after' },
  //         ],
  //         pathGroupsExcludedImportTypes: ['builtin'],
  //       }
  //     ],
  //   },
  // },
  // React
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'better-styled-components': betterStyled,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'better-styled-components/sort-declarations-alphabetically': 'error',
    },
    settings: { react: { version: 'detect' } },
  },
  // Jest
  {
    files: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    plugins: { jest: jestPlugin },
    rules: { ...jestPlugin.configs['flat/recommended'].rules },
    languageOptions: { globals: { ...globals.jest } },
  },
  // Cypress
  {
    files: ['cypress/**/*.{js,jsx,ts,tsx}'],
    // TODO: enable cypress plugin!
    // plugins: { cypress: cypressPlugin },
    rules: {
      // ...cypressPlugin.configs.recommended.rules,
      // TODO: enable these as well!
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  // JSON
  {
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
    languageOptions: { parser: jsoncParser },
    plugins: { jsonc },
    rules: {
      ...jsonc.configs['recommended-with-jsonc'].rules,
      // 'jsonc/sort-keys': [
      //   'error',
      //   {
      //     pathPattern: '^$',
      //     order: { type: 'asc' },
      //   },
      // ],
      'jsonc/no-comments': 'error',
    },
  },
  // Webpack
  {
    files: ['webpack.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  // Prettier
  prettierRecommended,
  prettierConfig,
]);
