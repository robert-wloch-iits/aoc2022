// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/', '<rootDir>/tests/unit/'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/unit/mocks/fileMock.ts',
    '\\.(css|less)$': '<rootDir>/tests/unit/mocks/fileMock.ts',
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
    '!**/fileMock.ts',
  ],
  coverageDirectory: '<rootDir>/tests/unit_coverage',
  maxWorkers: '50%',
  testMatch: [
    '**/tests/unit/**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/tests/unit/**/example.(spec|test).[jt]s?(x)',
  ],
  testTimeout: 10000,
}
