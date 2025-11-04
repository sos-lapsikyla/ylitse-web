import { generateTotp } from 'cypress/support/api';
import { api } from '../support/api';

const SUPERADMIN_USER = Cypress.env('apiUser') || 'admin';
const SUPERADMIN_PASS = Cypress.env('apiPass') || '';
const SUPERADMIN_MFA = Cypress.env('mfaSecret') || '';

type Skill = { id: number; name: string };

describe('Skills', () => {
  beforeEach(() => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );

    // Mock the RTK Query backend request
    cy.intercept('GET', '**/api/skills', { fixture: 'skills.json' }).as(
      'getSkills',
    );
  });

  after(() => {
    api.deleteAccounts();
  });

  it('lists skills', () => {
    cy.get('[href="/topics"]').click();

    cy.wait('@getSkills');

    cy.location('pathname').should('eq', '/topics');
    cy.getByText('Täällä voit hallinnoida mentoreiden aiheita.').should(
      'be.visible',
    );
    // skills are displayed
    cy.fixture('skills.json').then(({ resources }) => {
      resources.forEach((skill: Skill) => {
        cy.getByText(skill.name).should('be.visible');
      });
    });
  });

  it('deletes skill after confirmation', () => {
    cy.get('[href="/topics"]').click();
    cy.wait('@getSkills');
    cy.location('pathname').should('eq', '/topics');
    cy.getByText('React').click();
    cy.getByText('Poista aihe').should('be.visible');
    cy.getByText('Poista', 'button').click();
    cy.wait('@getSkills');
    cy.getByText('Aiheen poistaminen onnistui.').should('be.visible');
  });
});
