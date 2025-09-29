import { defineConfig } from 'cypress';
import 'dotenv/config';

export default defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'http://localhost:8082',
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      config.env.apiUrl = process.env.YLITSE_API_URL;
      config.env.apiUser = process.env.YLITSE_API_USER;
      config.env.apiPass = process.env.YLITSE_API_PASS;
      config.env.mfaSecret = process.env.YLITSE_MFA_SECRET;
      return config;
    },
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  screenshotOnRunFailure: false,
  video: false,
  viewportWidth: 1600,
});
