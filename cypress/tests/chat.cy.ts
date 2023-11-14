describe('chat', () => {
  before(() => {
    // cy.createMentor('chatTestMentor');
    // cy.registerUser('chatTestUsername', 'examplePassword');
  });

  beforeEach(() => {
    cy.loginUser('chatTestUsername', 'examplePassword');
    // Wait for the login to finish
    cy.wait(1000);
    cy.visit('/chat');

    // The Switch Language implementation only works before logging in.
    // This will be fixed when the Login/Register pages are refactored.
    // cy.switchLanguage('fi');
  });

  it('Opens chat page', () => {
    cy.location('pathname').should('contain', '/chat');
  });

  it('can start conversation with a mentor', () => {
    // Force is needed because of the "Open card" button being hidden due to an UI bug.
    cy.contains('Etsi mentoreita').click({ force: true });

    cy.url().should('include', '/mentors');
    // Searching for a search bar with the placeholder text
    cy.get('input[placeholder="Etsi mentoria"]').type('chatTestMentor');

    // Click on the "Open card" button
    cy.contains('Avaa kortti').click();

    // Click on the "Start conversation" button
    cy.contains('Aloita keskustelu').click();

    // Verify that we are redirected to the /chat page
    cy.url().should('include', '/chat');

    cy.get('textarea[placeholder="Kirjoita viestisi tähän"]').type('Hello!');

    cy.get('button[id="send-message"]').click({ force: true });
    cy.wait(1000);

    // Click on the "Open card" button
    cy.contains('Hello!');
  });

  it('archiving a chat moves it to the archived folder', () => {
    cy.contains('chatTestMentor').click();
    cy.contains('Arkistoi').click();
    cy.contains(
      'Haluatko arkistoida keskustelun käyttäjän chatTestMentor kanssa?',
    );
    cy.contains('Arkistoi keskustelu').click();

    cy.visit('/chat');
    cy.get('body').should('not.contain', 'ChatTestMentor');
    cy.get('button[open-folder-menu]').click();
    cy.contains('Arkistoidut keskustelut').click();
    cy.contains('chatTestMentor');
  });

  it('unarchiving a chat moves it to the active folder', () => {
    cy.get('button[open-folder-menu]').click();
    cy.contains('Arkistoidut keskustelut').click();
    cy.contains('chatTestMentor');
    cy.contains('Palauta keskustelu').click();
    cy.contains(
      'Haluatko palauttaa keskustelun käyttäjän chatTestMentor kanssa?',
    );
    cy.contains('Palauta keskustelu').click();
    cy.visit('/chat');
    cy.contains('ChatTestMentor');
  });
});
