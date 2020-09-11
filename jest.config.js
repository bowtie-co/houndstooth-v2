module.exports = {
  globals: {
    API_KEY: 'abc123',
    BASE_URL: 'http://localhost:3000',
    REACT_APP_AIRBRAKE_ID: '123',
    REACT_APP_AIRBRAKE_KEY: 'airbrakesecretkey'
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
};
