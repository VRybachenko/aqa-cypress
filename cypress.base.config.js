const { allureCypress } = require('allure-cypress/reporter');

module.exports = {
  setupNodeEvents(on, config) {
    const fs = require('fs');
    if (fs.existsSync('allure-results')) {
      fs.rmSync('allure-results', { recursive: true });
    }
    if (fs.existsSync('mochawesome-report')) {
      fs.rmSync('mochawesome-report', { recursive: true });
    }
    allureCypress(on, config, { resultsDir: 'allure-results' });
    return config;
  },
  supportFile: 'cypress/support/e2e.js',
  excludeSpecPattern: [
    'cypress/e2e/1-getting-started/**',
    'cypress/e2e/2-advanced-examples/**',
    'cypress/e2e/initialHomeWork/**',
  ],
  viewportWidth: 1440,
  viewportHeight: 900,
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  retries: { runMode: 2, openMode: 0 },
};