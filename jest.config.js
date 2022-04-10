// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/', '<rootDir>/tests/unit/'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@unit/(.*)': '<rootDir>/tests/unit/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverageFrom: [
    '**/*.{js,ts,vue}',
    '!**/main.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: '<rootDir>/tests/unit_coverage',
  maxWorkers: '50%',
  testMatch: ['**/tests/unit/**/?(*.)+(spec|test).[jt]s?(x)'],
  testTimeout: 10000,
}
