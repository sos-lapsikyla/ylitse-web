import { generateTotp } from 'cypress/support/api';
import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

const SUPERADMIN_USER = Cypress.env('apiUser') || 'admin';
const SUPERADMIN_PASS = Cypress.env('apiPass') || '';
const SUPERADMIN_MFA = Cypress.env('mfaSecret') || '';

const mentor = accounts.mentors[0];

describe('Skills', () => {
  beforeEach(() => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );
  });

  after(() => {
    api.deleteAccounts();
  });

  it('lists skills', () => {
    cy.get('[href="/topics"]').click();
    cy.location('pathname').should('eq', '/topics');
    cy.getByText('Täällä voit hallinnoida mentoreiden aiheita.').should(
      'be.visible',
    );
    cy.getByText(mentor.skills[0]).should('be.visible');
    cy.getByText(mentor.skills[1]).should('be.visible');
    cy.getByText(mentor.skills[2]).should('be.visible');
  });
});
