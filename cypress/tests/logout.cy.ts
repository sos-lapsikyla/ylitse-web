import { api } from 'cypress/support/api';
import { v4 as uuidv4 } from 'uuid';

describe('logout', () => {
  const username = `logout-${uuidv4()}`;

  before(() => {
    cy.registerUser(username, 'examplePassword');
  });

  beforeEach(() => {
    cy.loginUser(username, 'examplePassword');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('logout redirects user to landing page', () => {
    cy.clickLogout();
    cy.url().should('match', /landing/);
    cy.getByText('Kirjaudu sisään', 'a').should('be.visible');
  });

  it('logout ends session', () => {
    cy.clickLogout();
    cy.url().should('match', /landing/);
    cy.getByText('Kirjaudu sisään', 'a').should('be.visible');

    cy.visit('/');
    cy.url().should('match', /landing/);
    cy.getByText('Kirjaudu sisään', 'a').should('be.visible');
  });
});
