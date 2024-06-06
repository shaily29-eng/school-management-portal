module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
  };
  
  module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
  