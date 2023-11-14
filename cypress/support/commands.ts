/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { createMentor } from './helpers';
import type { Mentor } from './helpers';

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

    cy.visit('/register');
    cy.fillInput('username', username);
    cy.fillInput('password', password);
    cy.fillInput('password-confirmation', password);
    cy.fillInput('display-name', 'exampleDisplayName');
    toggle('required-age');
    toggle('privacy-consent');
    cy.get(`button[id="submit"]`).click();
  },
);

Cypress.Commands.add(
  'loginUser',
  (username: string, password: string): void => {
    cy.visit('/login');
    cy.fillInput('username', username);
    cy.fillInput('password', password);
    cy.get('button[id="submit"]').click();
  },
);

Cypress.Commands.add('createMentor', (name: string): void => {
  const mentor: Mentor = {
    password: 'password',
    role: 'mentor',
    login_name: name,
    email: `${name}@mentor.com`,
    phone: '123-456',
    display_name: name,
    birth_year: 1990,
    gender: 'female',
    languages: ['fi', 'en'],
    region: 'HEL',
    skills: ['speaking', 'helping', 'empathy'],
    story: `Passionate about helping people.`,
    communication_channels: ['phone', 'chat'],
  };

  createMentor(mentor);
});

declare namespace Cypress {
  interface Chainable {
    switchLanguage(language: string): Chainable<void>;
    fillInput(id: string, value: string): Chainable<void>;
    registerUser(username: string, password: string): Chainable<void>;
    loginUser(username: string, password: string): Chainable<void>;
    createMentor(name: string): Chainable<void>;
  }
}
