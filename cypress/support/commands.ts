/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

type LangCode = 'en' | 'fi';

Cypress.Commands.add('switchLanguageBeforeLogin', (lang: LangCode) => {
  if (document.documentElement.lang !== lang) {
    cy.get(`a[id="${lang}-button"]`).click({ force: true });
  }
});

Cypress.Commands.add('switchLanguageAfterLogin', (lang: LangCode) => {
  if (document.documentElement.lang !== lang) {
    cy.get('button[id="lang-dropdown-button"]').click();

    const langButtonText = lang === 'fi' ? 'FI - Suomeksi' : 'EN - In English';
    cy.getByText(langButtonText, 'button').click({ force: true });
  }
});

Cypress.Commands.add('registerUser', (username: string, password: string) => {
  const toggle = (input: string) => {
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
  cy.wait(500);

  cy.getByText('Ylitse MentorApp -vertaismentoripalvelu', 'p').should(
    'be.visible',
  );
});

Cypress.Commands.add('loginUser', (username: string, password: string) => {
  cy.visit('/login/');
  cy.fillInput('username', username);
  cy.fillInput('password', password);
  cy.get('button[id="submit"]').should('be.visible').click();

  cy.location('pathname').should('not.include', '/login');
  cy.getByText('Ylitse MentorApp -vertaismentoripalvelu', 'p').should(
    'be.visible',
  );
});

Cypress.Commands.add('clickLogout', () => {
  cy.get('a[href="/logout"]').click();
});

Cypress.Commands.add('fillInput', (id: string, value: string) => {
  cy.get(`input[id="${id}"]`).clear().type(value).blur();
});

Cypress.Commands.add('getByText', (text: string, selector = '*') => {
  return cy.get(selector).contains(text);
});

Cypress.Commands.add('getInputByLabel', (labelText: string) => {
  return cy
    .contains('label', labelText)
    .invoke('attr', 'for')
    .then(inputId => cy.get(`#${inputId}`));
});

Cypress.Commands.add('fillInputByLabel', (labelText: string, value: string) => {
  cy.getInputByLabel(labelText)
    .should('exist')
    .should('be.visible')
    .clear()
    .type(value)
    .blur();
});

Cypress.Commands.add(
  'fillNumberInputByLabel',
  (labelText: string, value: string) => {
    cy.getInputByLabel(labelText)
      .should('exist')
      .should('be.visible')
      .type('{selectall}')
      .type(value)
      .blur();
  },
);

declare namespace Cypress {
  interface Chainable {
    switchLanguageBeforeLogin(language: LangCode): Chainable<void>;
    switchLanguageAfterLogin(language: LangCode): Chainable<void>;
    registerUser(username: string, password: string): Chainable<void>;
    loginUser(username: string, password: string): Chainable<void>;
    clickLogout(): Chainable<void>;
    fillInput(id: string, value: string): Chainable<void>;
    getByText(text: string, selector?: string): Chainable<JQuery<HTMLElement>>;
    getInputByLabel(labelText: string): Chainable<JQuery<HTMLElement>>;
    fillInputByLabel(
      labelText: string,
      value: string,
    ): Chainable<JQuery<HTMLElement>>;
    fillNumberInputByLabel(
      labelText: string,
      value: string,
    ): Chainable<JQuery<HTMLElement>>;
  }
}
