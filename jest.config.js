if (process.argv.includes('frontend')) {
  module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    testMatch: [
      '**/tests/frontend/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    coveragePathIgnorePatterns: ['<rootDir>/tests/helpers/'],
  };
} else {
  module.exports = {
    testMatch: [
      '**/tests/backend/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
  };
}
