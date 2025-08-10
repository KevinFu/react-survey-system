import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: [
      '**/.turbo/**',
      '**/.next/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.env*',
      '**/*.md',
      '**/*.json',
      '**/*.css',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
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
  }),
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        module: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
  {
    files: ['apps/portal/**/*.ts', 'apps/portal/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['apps/portal/tsconfig.json'],
      },
    },
  },
  {
    files: ['apps/core-api/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['apps/core-api/tsconfig.json'],
      },
    },
  },
  prettier,
]
