import { api } from 'cypress/support/api';
import { accounts } from 'cypress/fixtures/accounts';
import { v4 as uuidv4 } from 'uuid';

describe('login', () => {
  const username = `login-${uuidv4()}`;
  const menteeWithoutEmail = accounts.mentees[3];

  const testErrorVisible = () => {
    cy.get('[id="login-error"]').should('be.visible');
  };

  const clickLogin = (): void => {
    cy.get('button[id="submit"]').click();
  };

  before(() => {
    api.deleteAccounts();
    cy.registerUser(username, 'examplePassword');
    api.signUpMentee(menteeWithoutEmail);
  });

  beforeEach(() => {
    cy.visit('/login/');
    cy.getByText('Kirjaudu sisään', 'h1').should('be.visible');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('contains buttons', () => {
    cy.getByText('Rekisteröidy', 'a').should('be.visible'); // TODO: This should be a button
    cy.getByText('Kirjaudu', 'button').should('be.visible');
  });

  it('has right content', () => {
    cy.getByText('Kirjaudu sisään', 'h1').should('be.visible');
    cy.contains(
      'Uusi täällä? Palvelussa voit jutella SOS-Lapsikylän valmentamien vertaismentoreiden kanssa mistä tahansa mieltäsi painavasta asiasta. Palvelun käyttö on luottamuksellista ja täysin maksutonta.',
    ).should('be.visible');
    //cy.contains('Unohditko salasanasi?').should('be.visible');
  });

  it('changes language on button press', () => {
    cy.switchLanguageBeforeLogin('en');
    cy.getByText('Login', 'h1').should('be.visible');
    cy.switchLanguageBeforeLogin('fi');
    cy.getByText('Kirjaudu sisään', 'h1').should('be.visible');
  });

  it('shows error if empty username', () => {
    cy.fillInput('password', 'examplePassword');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if empty password', () => {
    cy.fillInput('username', 'exampleUsername');
    clickLogin();
    testErrorVisible();
  });

  it('shows error if no account exists', () => {
    cy.fillInput('username', 'wrongUsername');
    cy.fillInput('password', 'wrongPassword');
    clickLogin();
    testErrorVisible();
  });

  it('can log in with registered account', () => {
    cy.fillInput('username', username);
    cy.fillInput('password', 'examplePassword');
    clickLogin();
    cy.location('pathname').should('eq', '/');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });

  it('can log in with user that does not have email-address', () => {
    cy.fillInput('username', menteeWithoutEmail.loginName);
    cy.fillInput('password', menteeWithoutEmail.password);
    clickLogin();
    cy.location('pathname').should('eq', '/');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });
});
