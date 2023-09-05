module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/**/__tests__/**/?(*.)(spec|test).js',
    '<rootDir>/**/?(*.)(spec|test).js',
  ],
  coveragePathIgnorePatterns: ['node_modules'],
  collectCoverage: true,
};

