module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  };
  
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },