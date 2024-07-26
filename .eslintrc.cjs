module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'warn',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'react/jsx-pascal-case': 'error',
    camelcase: ['error', { properties: 'never' }],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPropPrefix: 'on',
      },
    ],
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    eqeqeq: 'error',
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-useless-rename': 'error',
    'object-shorthand': 'error',
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
