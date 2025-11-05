import { generateTotp } from 'cypress/support/api';
import { api } from '../support/api';

const SUPERADMIN_USER = Cypress.env('apiUser') || 'admin';
const SUPERADMIN_PASS = Cypress.env('apiPass') || '';
const SUPERADMIN_MFA = Cypress.env('mfaSecret') || '';

type Skill = { id: string; name: string };

describe('Skills', () => {
  let skillsData: Skill[] = [];

  beforeEach(() => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );

    cy.fixture('skills.json').then((data: { resources: Skill[] }) => {
      skillsData = [...data.resources];
    });

    cy.intercept('GET', '**/api/skills', req => {
      req.reply({
        resources: skillsData.map(s => ({
          id: s.id,
          name: s.name,
          active: true,
          updated: new Date().toISOString(),
          created: new Date().toISOString(),
        })),
      });
    }).as('getSkills');

    cy.intercept('POST', '**/api/skills', req => {
      const newSkill: Skill = {
        id: `${Date.now()}`,
        name: req.body.name,
      };
      skillsData.push(newSkill);
      req.reply({
        resource: {
          id: newSkill.id,
          name: newSkill.name,
          active: true,
          updated: new Date().toISOString(),
          created: new Date().toISOString(),
        },
      });
    }).as('addSkill');

    cy.intercept('DELETE', '**/api/skills/*', req => {
      const id = req.url.split('/').pop();
      skillsData = skillsData.filter(s => s.id !== id);
      req.reply({ success: true });
    }).as('deleteSkill');
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
    cy.wait('@deleteSkill');
    cy.wait('@getSkills');
    cy.getByText('Aiheen poistaminen onnistui.').should('be.visible');
    cy.getByText('React').should('not.exist');
    cy.reload();
  });

  it('can add a new skill', () => {
    cy.get('[href="/topics"]').click();
    cy.wait('@getSkills');
    cy.location('pathname').should('eq', '/topics');
    cy.getByText('Lisää uusi aihe').should('be.visible').click();
    cy.fillInputByLabel('Lisää uusi aihe', 'New skill');
    // can add by pressing button
    cy.getByText('Lisää', 'button').should('not.be.disabled');
    cy.getByText('Lisää', 'button').should('be.visible').click();
    cy.wait('@addSkill');
    cy.wait('@getSkills');
    cy.getByText('Aiheen lisääminen onnistui.').should('be.visible');
    cy.fillInputByLabel('Lisää uusi aihe', 'Other skill');
    // can add with pressing enter
    cy.getInputByLabel('Lisää uusi aihe').type('{enter}');
    cy.wait('@addSkill');
    cy.wait('@getSkills');
    cy.getByText('Aiheen lisääminen onnistui.').should('be.visible');
    cy.getByText('Other skill').should('be.visible');
  });
});
