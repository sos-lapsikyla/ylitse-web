import { generateTotp } from 'cypress/support/api';
import { api } from '../support/api';

const SUPERADMIN_USER = Cypress.env('apiUser') || 'admin';
const SUPERADMIN_PASS = Cypress.env('apiPass') || '';
const SUPERADMIN_MFA = Cypress.env('mfaSecret') || '';

type Report = {
  id: string;
  reportedUserId: string;
  contactField: string;
  reportReason: string;
  created: string;
  status: string;
};

type ApiReport = {
  active: boolean;
  contact_field: string;
  created: string;
  id: string;
  report_reason: string;
  reported_user_id: string;
  status: string;
  updated: string;
};

describe('Reports page', () => {
  let reportsData: Report[] = [];

  beforeEach(() => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );

    cy.fixture('reports.json').then((data: { resources: ApiReport[] }) => {
      reportsData = data.resources.map((r: ApiReport) => ({
        id: r.id,
        reportedUserId: r.reported_user_id,
        contactField: r.contact_field,
        reportReason: r.report_reason,
        status: r.status,
        created: r.created,
      }));

      // Intercept GET request and respond with mapped data
      cy.intercept('GET', '**/api/reports', req => {
        req.reply({
          resources: reportsData.map(r => ({
            id: r.id,
            reported_user_id: r.reportedUserId,
            contact_field: r.contactField,
            report_reason: r.reportReason,
            status: r.status,
            active: true,
            updated: new Date().toISOString(),
            created: r.created,
          })),
        });
      }).as('getReports');
    });
  });
  after(() => {
    api.deleteAccounts();
  });

  it('Displays reports', () => {
    cy.get('[href="/reports"]').click();
    cy.wait('@getReports');
    cy.location('pathname').should('eq', '/reports');
    cy.getByText('Ilmiannot', 'h1').should('be.visible');
    cy.getByText('Ilmianto #', 'h3').should('be.visible');
    cy.getByText('Tila', 'p').should('be.visible');
    cy.getByText('Käsitelty', 'p').should('be.visible');
    cy.getByText('Lähetetty', 'p').should('be.visible');
    cy.getByText('11.11.2025', 'p').should('be.visible');
    cy.getByText('Syy ilmiantoon', 'p').should('be.visible');
    cy.getByText('Haluan raportoida mentorin', 'p').should('be.visible');
    cy.getByText('Yhteystiedot', 'p').should('be.visible');
    cy.getByText('email@email.email', 'p').should('be.visible');
    cy.getByText('Yhteystietoja ei annettu', 'p').should('be.visible');
  });
});
