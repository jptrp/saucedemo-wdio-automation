import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config({
  ignores: ['node_modules/', 'reports/', 'allure-results/', 'allure-report/', '*.js'],
  files: ['**/*.ts'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: tseslint.parser,
    globals: {
      ...globals.node,
      ...globals.mocha,
      browser: 'readonly',
      $: 'readonly',
      $$: 'readonly',
      expect: 'readonly'
    }
  },
  rules: {
    'no-console': 'off', // Allow console in test framework
    'no-debugger': 'error'
  }
})
