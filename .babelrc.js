module.exports = {
  env: {
    test: {
      presets: [['@babel/env', { targets: { node: 'current' } }]]
    }
  },
  presets: ['@babel/env']
};
