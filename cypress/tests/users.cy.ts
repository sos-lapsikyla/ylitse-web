import { accounts } from 'cypress/fixtures/accounts';
import { api, generateTotp } from 'cypress/support/api';
import {
  NEW_BIRTH_YEAR,
  NEW_LOGIN_NAME,
  NEW_DISPLAY_NAME,
  NEW_PASSWORD,
  NEW_AREA,
  NEW_STORY,
  NEW_EMAIL,
} from 'cypress/fixtures/inputs';

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

  it('deletes account after confirmation', () => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );
    cy.get('[href="/users"]').click();
    cy.location('pathname').should('eq', '/users');
    cy.contains('Käyttäjät').should('be.visible');
    cy.contains(mentor.displayName).should('be.visible');
    cy.get('button[aria-label="deleteWithBackground"]')
      .eq(0)
      .click({ force: true });
    cy.contains(
      'Käyttäjän poistamista ei voi tämän jälkeen perua. Kaikki tämän käyttäjän käymät keskustelut poistetaan.',
    ).should('be.visible');
    cy.getByText('Poista', 'button').click();
    cy.contains('Käyttäjän poistaminen onnistui').should('be.visible');
    // assure deleted account is not displayed in userlisting
    cy.getByText(mentor.displayName, 'h2').should('not.exist');
  });
  it('does not let delete current account', () => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );
    cy.get('[href="/users"]').click();
    cy.location('pathname').should('eq', '/users');
    cy.contains('Käyttäjät').should('be.visible');
    // try to delete current user
    cy.get('button[aria-label="deleteDisabled"]').eq(0).click({ force: true });
    // assure account is still listed
    cy.contains(SUPERADMIN_USER).should('be.visible');
  });

  it('can create a new mentee', () => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );
    cy.get('[href="/users"]').click();
    cy.location('pathname').should('eq', '/users');
    cy.contains('Käyttäjät').should('be.visible');

    cy.getByText('Uusi käyttäjä', 'button').click();
    cy.getByText('Uusi käyttäjä', 'h2').should('be.visible');

    // Open dropdown
    cy.contains('div', 'Käyttäjätilin tyyppi *')
      .parent()
      .find('button')
      .click();

    // Select mentee from the dropdown
    cy.get('#dropdown-menu').contains('Aktori').should('be.visible').click();
    // Fill mentee fields
    cy.fillInputByLabel('Käyttäjätunnus *', NEW_LOGIN_NAME);
    cy.fillInputByLabel('Salasana *', NEW_PASSWORD);
    cy.fillInputByLabel('Toista salasana *', NEW_PASSWORD);
    cy.fillInputByLabel('Julkinen käyttäjänimi *', NEW_DISPLAY_NAME);
    cy.getByText('Luo uusi käyttäjä', 'button').click();
    cy.location('pathname').should('eq', '/users');
    cy.getByText(NEW_DISPLAY_NAME, 'h2').should('be.visible');
  });

  it('can create a new mentor', () => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );

    // Go to users page
    cy.get('[href="/users"]').click();
    cy.location('pathname').should('eq', '/users');
    cy.contains('Käyttäjät').should('be.visible');

    // Open new user form
    cy.getByText('Uusi käyttäjä', 'button').click();
    cy.contains('h2', /^Uusi käyttäjä$/);
    cy.contains('div', 'Käyttäjätilin tyyppi *')
      .parent()
      .find('button')
      .click();
    cy.get('#dropdown-menu').contains('Mentori').click();
    cy.contains('label', 'Käyttäjätunnus *')
      .scrollIntoView()
      .should('be.visible');
    cy.fillInputByLabel('Käyttäjätunnus *', NEW_LOGIN_NAME);
    cy.fillInputByLabel('Salasana *', NEW_PASSWORD);
    cy.fillInputByLabel('Toista salasana *', NEW_PASSWORD);
    cy.fillInputByLabel('Julkinen käyttäjänimi *', NEW_DISPLAY_NAME);

    // Wait until "Syntymävuosi *" appears
    cy.contains('label', 'Syntymävuosi *').should('exist').should('be.visible');
    cy.fillInputByLabel('Syntymävuosi *', NEW_BIRTH_YEAR);

    // Select gender
    cy.contains('div', 'Sukupuoli *').parent().find('button').click();
    cy.get('#dropdown-menu').contains('Muu').click();

    // Button should now be enabled
    cy.getByText('Luo uusi käyttäjä', 'button').should('not.be.disabled');

    // Fill optional mentor fields
    cy.contains('label', 'Alue').scrollIntoView().should('be.visible');
    cy.fillInputByLabel('Alue', NEW_AREA);
    cy.fillInputByLabel('Tarina', NEW_STORY);

    cy.getByText('Luo uusi käyttäjä', 'button').click();

    // Verify success and navigation
    cy.location('pathname').should('eq', '/users');
    cy.getByText(NEW_DISPLAY_NAME, 'h2').should('be.visible');
  });

  it('can edit mentee', () => {
    cy.loginUser(
      SUPERADMIN_USER,
      SUPERADMIN_PASS,
      generateTotp(SUPERADMIN_MFA).token,
    );

    // Go to users page
    cy.get('[href="/users"]').click();
    cy.location('pathname').should('eq', '/users');
    cy.contains('Käyttäjät').should('be.visible');

    // Open edit user form
    cy.get('button[aria-label="edit"]').eq(2).click({ force: true });
    cy.contains('h2', /^Muokkaa käyttäjätiliä$/);
    cy.getByText(mentee.role).should('be.visible');
    cy.getByText(mentee.loginName).should('be.visible');
    cy.getByText(mentee.displayName).should('be.visible');
    cy.fillInputByLabel('Sähköpostiosoite', NEW_EMAIL);
    cy.contains('Julkiset tiedot').scrollIntoView();
    cy.fillInputByLabel('Julkinen käyttäjänimi *', NEW_DISPLAY_NAME);
    // Button should now be enabled
    cy.getByText('Tallenna', 'button').should('not.be.disabled');
    cy.getByText('Tallenna', 'button').click();
    // Verify success and navigation
    cy.location('pathname').should('eq', '/users');
    cy.getByText('Profiili päivitetty onnistuneesti').should('be.visible');
    cy.getByText(NEW_DISPLAY_NAME, 'h2').should('be.visible');
  });
});
