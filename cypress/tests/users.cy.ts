import { accounts } from 'cypress/fixtures/accounts';
import { api, generateTotp } from 'cypress/support/api';

const SUPERADMIN_USER = Cypress.env('apiUser') || 'admin';
const SUPERADMIN_PASS = Cypress.env('apiPass') || '';
const SUPERADMIN_MFA = Cypress.env('mfaSecret') || '';

describe('Users page', () => {
  const mentor = accounts.mentors[0];
  const mentee = accounts.mentees[0];

  beforeEach(() => {
    api.deleteAccounts().then(() => {
      api.signUpMentor(mentor);
      api.signUpMentee(mentee);
    });
  });

  it('Allows admin to visit users page', () => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );
    // Click link to users-page
    cy.get('[href="/users"]').click();
    // Assert URL and content
    cy.location('pathname').should('eq', '/users');
    cy.contains('Käyttäjät').should('be.visible');
  });

  it('does not allow mentor to users-page', () => {
    cy.loginUser(mentor.loginName, mentor.password);
    // try to visit users page
    cy.visit('/users');
    cy.contains('Käyttäjät').should('not.exist');
  });
  it('does not allow mentee to users-page', () => {
    cy.loginUser(mentee.loginName, mentee.password);
    // try to visit users page
    cy.visit('/users');
    cy.contains('Käyttäjät').should('not.exist');
  });

  it('Displays cards for all users', () => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );
    cy.get('[href="/users"]').click();
    cy.location('pathname').should('eq', '/users');
    cy.contains('Käyttäjät').should('be.visible');
    // All different user cards are displayed
    cy.contains('Admin').should('be.visible');
    cy.contains('Mentori').should('be.visible');
    cy.contains('Aktori').should('be.visible');

    // Cards display correct information
    cy.getByText('Käyttäjätunnus').should('be.visible');
    cy.getByText(mentor.loginName, 'p').should('be.visible');
    cy.getByText(mentee.loginName, 'p').should('be.visible');
    cy.getByText('Julkinen käyttäjänimi').should('be.visible');
    cy.getByText(mentor.displayName, 'p').should('be.visible');
    cy.getByText(mentee.displayName, 'p').should('be.visible');
    cy.getByText('Sähköposti').should('be.visible');
    cy.getByText('Luotu').should('be.visible');
  });
});
