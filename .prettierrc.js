const alloyPrettier = require('eslint-config-alloy/.prettierrc');

/**
 * @type {import('prettier').Config}
 */
module.exports = {
  ...alloyPrettier,
  singleQuote: true,
};
