import js from '@eslint/js'
import globals from 'globals'

export default [
  { 
    ignores: [
      'dist',
      'node_modules',
      '*.config.*',
      'coverage',
      // Ignore all TypeScript files for now since we don't have TS parser
      '**/*.{ts,tsx}'
    ] 
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
    },
  },
]