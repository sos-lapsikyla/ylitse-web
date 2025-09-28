import { generateTotp } from 'cypress/support/api';

const SUPERADMIN_USER = Cypress.env('apiUser') || 'admin';
const SUPERADMIN_PASS = Cypress.env('apiPass') || '';
const SUPERADMIN_MFA = Cypress.env('mfaSecret') || '';

describe('Admin', () => {
  beforeEach(() => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );
  });

  it('Displays right navigation items for admin', () => {
    cy.contains('Chat').should('be.visible');
    cy.contains('Mentorit').should('be.visible');
    cy.contains('Profiili').should('be.visible');
    cy.contains('Käyttäjät').should('be.visible');
    cy.contains('Tilastot').should('be.visible');
    cy.contains('Aiheet').should('be.visible');
    cy.contains('Ilmiannot').should('be.visible');
    cy.contains('Info').should('be.visible');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });

  it('displays correct content for admin', () => {
    cy.visit('/');
    cy.getByText('Hallinnoi käyttäjätilejä', 'h2').should('be.visible');
  });
});
