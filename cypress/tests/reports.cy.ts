import { generateTotp } from 'cypress/support/api';
import { api } from '../support/api';

const SUPERADMIN_USER = Cypress.env('apiUser') || 'admin';
const SUPERADMIN_PASS = Cypress.env('apiPass') || '';
const SUPERADMIN_MFA = Cypress.env('mfaSecret') || '';

type Report = {
  id: string;
  reportedUserId: string;
  reporterUserId: string;
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
  reporter_user_id: string;
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
        reporterUserId: r.reporter_user_id,
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
            reporter_user_id: r.reporterUserId,
            contact_field: r.contactField,
            report_reason: r.reportReason,
            status: r.status,
            active: true,
            updated: new Date().toISOString(),
            created: r.created,
          })),
        });
      }).as('getReports');

      cy.intercept('DELETE', '**/api/reports/*', req => {
        const id = req.url.split('/').pop();
        reportsData = reportsData.filter(r => r.id !== id);
        req.reply({ success: true });
      }).as('deleteReport');

      cy.intercept('PATCH', '**/api/reports/*', req => {
        const id = req.url.split('/').pop()!;

        expect(req.body.comment).to.be.a('string');

        reportsData = reportsData.map(r =>
          r.id === id ? { ...r, status: 'handled' } : r,
        );

        const updated = reportsData.find(r => r.id === id)!;

        req.reply({
          id: updated.id,
          reported_user_id: updated.reportedUserId,
          reporter_user_id: updated.reporterUserId,
          contact_field: updated.contactField,
          report_reason: updated.reportReason,
          status: updated.status,
          active: true,
          updated: new Date().toISOString(),
          created: updated.created,
        });
      }).as('updateReport');
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

  it('Displays non-handled report first', () => {
    cy.get('[href="/reports"]').click();
    cy.wait('@getReports');
    cy.location('pathname').should('eq', '/reports');
    // First report card has status recieved
    cy.get('p:contains("Tila")')
      .first()
      .next()
      .should('contain', 'Ei käsitelty');
  });

  it('can delete report', () => {
    cy.get('[href="/reports"]').click();
    cy.wait('@getReports');
    cy.location('pathname').should('eq', '/reports');
    cy.getByText('Haluan raportoida mentorin', 'p').should('be.visible');
    cy.getByText('Avaa ilmianto', 'button')
      .first()
      .should('be.visible')
      .click();
    cy.getByText('Ilmianto #1', 'h3').should('be.visible');
    cy.getByText('Poista ilmianto', 'button').should('be.visible').click();
    cy.getByText('Poista', 'button').click();
    cy.wait('@deleteReport');
    cy.reload();
    cy.get('body').should('not.contain.text', 'Haluan raportoida mentorin');
  });

  it('can opens modal again if deleting report is cancelled', () => {
    cy.get('[href="/reports"]').click();
    cy.wait('@getReports');
    cy.location('pathname').should('eq', '/reports');
    cy.getByText('Haluan raportoida mentorin', 'p').should('be.visible');
    cy.getByText('Avaa ilmianto', 'button')
      .first()
      .should('be.visible')
      .click();
    cy.getByText('Ilmianto #1', 'h3').should('be.visible');
    cy.getByText('Poista ilmianto', 'button').should('be.visible').click();
    // assure modal is opened again if deleting is cancelled
    cy.getByText('Peruuta', 'button').should('be.visible').click();
    cy.getByText('Ilmianto #1', 'h3').should('be.visible');
    cy.reload();
    cy.get('body').should('contain.text', 'Haluan raportoida mentorin');
  });

  it('can update reports status', () => {
    cy.get('[href="/reports"]').click();
    cy.wait('@getReports');
    cy.location('pathname').should('eq', '/reports');
    cy.getByText('Ei käsitelty', 'p').should('be.visible');
    cy.getByText('Avaa ilmianto', 'button')
      .first()
      .should('be.visible')
      .click();
    cy.getByText('Ilmianto #1', 'h3').should('be.visible');
    cy.getByText('Merkitse käsitellyksi', 'button')
      .should('be.visible')
      .click();
    cy.getInputByLabel('Lisää kommentti').type('Ilmianto käsitelty');
    cy.getByText('Tallenna', 'button').should('be.visible').click();
    cy.wait('@updateReport');
    cy.getByText('Ilmiannon päivittäminen onnistui.').should('be.visible');
  });
});
