const { sourceRoot } = require('./project.json');

/**
 * @typedef {import('rollup').RollupOptions} Config
 * @param {Config} config
 * @returns {Config}
 */
module.exports = (config) => {
  return {
    ...config,
    input:
      typeof config.input === 'object'
        ? {
            ...config.input,
            react: `${sourceRoot}/react`,
          }
        : config.input.concat(`${sourceRoot}/react`),
  };
};
