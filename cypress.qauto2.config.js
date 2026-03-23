const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.base.config');

module.exports = defineConfig({
  e2e: {
    ...baseConfig,
    baseUrl: 'https://qauto2.forstudy.space',
    env: {
      username: 'wanda@avengers.com',
      password: 'Avengers@1893!',
      httpBasicAuthUsername: 'guest',
      httpBasicAuthPassword: 'welcome2qauto',
    },
  },
});