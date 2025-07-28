import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: [
      '.turbo',
      'node_modules',
      'dist',
      'build',
      'coverage',
      '.env',
      '*.md',
      '*.json',
      '*.css',
    ],
  },
  js.configs.recommended,
  ...tseslint.config({
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: [
          './apps/dashboard/tsconfig.node.json',
          './apps/dashboard/tsconfig.app.json',
        ],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // 你可以在这里添加自定义规则
    },
  }),
  prettier,
]
