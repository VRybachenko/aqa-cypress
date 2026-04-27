const { defineConfig } = require('cypress');
const baseConfig = require('./cypress.base.config');

module.exports = defineConfig({
  e2e: {
    ...baseConfig,
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      httpBasicAuthUsername: process.env.HTTP_BASIC_AUTH_USERNAME,
      httpBasicAuthPassword: process.env.HTTP_BASIC_AUTH_PASSWORD,
    },
  },
});