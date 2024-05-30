// @ts-check
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    rules: {
      'node/prefer-global/process': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unused-imports/no-unused-vars': 'off',
      'regexp/no-obscure-range': 'off',
      'prefer-promise-reject-errors': 'off',
      'ts/ban-types': 'off',
    },
  },
)
