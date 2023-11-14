// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = (on, config) => {
  // make environment variables available to Cypress
  config.env = config.env || {};
  config.env.ADMIN_USER = process.env.ADMIN_USER;
  config.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  return config;
};
