module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^lib/(.*)$': '<rootDir>/dist/$1'
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(ol|labelgun|mapbox-to-ol-style|ol-mapbox-style)/).*/"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    '^.+\\.jsx?$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json'
    }
  }
};