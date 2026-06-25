// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
  type: 'app',

  react: true,
  typescript: true,

  formatters: true,

  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'single',
  },

  rules: {
    'no-console': 'warn',
    'no-alert': 'warn',
    'ts/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    'style/comma-dangle': ['error', 'always-multiline'],

    'style/object-curly-spacing': ['error', 'always'],

    'style/arrow-parens': ['error', 'always'],
  },
});
