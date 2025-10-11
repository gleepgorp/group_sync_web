export default [
  {
    ignores: ['node_modules/**', 'dist/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'never']
    }
  }
]