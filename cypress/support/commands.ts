/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

Cypress.Commands.add('switchLanguage', (language: string): void => {
  if (document.documentElement.lang !== language) {
    cy.get(`[id="language-buttons"]`).should('be.visible');
    cy.get(`a[id="${language}-button"]`).click({ force: true });
  }
});

Cypress.Commands.add('fillInput', (id: string, value: string): void => {
  cy.get(`input[id="${id}"]`).type(value).blur();
});

Cypress.Commands.add(
  'registerUser',
  (username: string, password: string): void => {
    const toggle = (input: string): void => {
      cy.get(`input[id="${input}"]`).parent().click();
    };

    cy.visit('/register/');
    cy.fillInput('username', username);
    cy.fillInput('password', password);
    cy.fillInput('password-confirmation', password);
    cy.fillInput('display-name', 'exampleDisplayName');
    toggle('required-age');
    toggle('privacy-consent');
    cy.get(`button[id="submit"]`).click();
    cy.contains(/Login|Kirjaudu sisään/g).should('be.visible');
  },
);

Cypress.Commands.add(
  'loginUser',
  (username: string, password: string): void => {
    cy.visit('/login/');
    cy.contains(/Login|Kirjaudu sisään/g).should('be.visible');
    cy.fillInput('username', username);
    cy.fillInput('password', password);
    cy.get('button[id="submit"]').click();
    cy.contains('KOTISIVU').should('be.visible');
  },
);

declare namespace Cypress {
  interface Chainable {
    switchLanguage(language: string): Chainable<void>;
    fillInput(id: string, value: string): Chainable<void>;
    registerUser(username: string, password: string): Chainable<void>;
    loginUser(username: string, password: string): Chainable<void>;
  }
}
