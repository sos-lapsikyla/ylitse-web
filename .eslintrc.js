module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'react',
      'import'
    ],
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'prettier/@typescript-eslint',
      'prettier/react'
    ],
    settings: {
        'react': {
            'version': 'detect'
        },
    },
    rules: {
        'eqeqeq': ['error', 'smart'],
        'no-console': 'off',
        'curly': 'error',
        'prefer-const': 'error',
        'guard-for-in': 'error',
        'radix': 'error',
        'import/no-unresolved': [2, { commonjs: true }]
    }
  };
