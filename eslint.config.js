import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from 'eslint';  // Correcting the import for eslint-plugin-typescript

export default {
  ignores: ['dist'],  // Directly in the config

  extends: [
    js.configs.recommended, 
    'plugin:@typescript-eslint/recommended',  // Using a valid recommended config for TypeScript
    'plugin:react/recommended',  // Default React rules
  ],

  files: ['**/*.{ts,tsx}'],  // Correct file patterns for TypeScript

  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },

  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },

  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Add any custom rules here
  },
};
