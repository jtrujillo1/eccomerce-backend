module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^domain/(.*)$': '<rootDir>/domain/$1',
    '^handler/(.*)$': '<rootDir>/src/handler/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    'domain/**/*.{ts,js}',
    '!**/*.module.ts',
    '!**/main.ts',
    '!**/config/**',
    '!**/migrations/**',
    '!**/seeds/**',
    '!<rootDir>/node_modules/'
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['html', 'lcov', 'cobertura'],
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'report.xml' }],
  ],
  verbose: true,
};
