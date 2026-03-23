const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.base.config');

module.exports = defineConfig({
  e2e: {
    ...baseConfig,
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      username: 'Tony1893@starkindustries.com',
      password: 'Tony1893@!',
      httpBasicAuthUsername: 'guest',
      httpBasicAuthPassword: 'welcome2qauto',
    },
  },
});