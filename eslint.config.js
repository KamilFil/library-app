import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import parser from '@typescript-eslint/parser';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['dist, build, .eslint.config.js'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      '@tanstack/query': tanstackQueryPlugin,
    },
    rules: {
      ...tanstackQueryPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
        },
      ],
      eqeqeq: 'error',
      'import/no-default-export': 'error',
      'import/no-named-as-default': 'error',
      'import/no-duplicates': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
];
