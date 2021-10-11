/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './jest/coverage',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  globals: {
    'ts-jest': {
      diagnostics: false,
      useESM: true,
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  testRegex: '/test/.+\\.test\\.jsx?$',
  verbose: false,
}
