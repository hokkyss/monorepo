module.exports = {
  '*.{ts,tsx,js,jsx,json}': [() => 'yarn lint'],
  '*.{ts,tsx,js,jsx}': [() => 'yarn test'],
};
