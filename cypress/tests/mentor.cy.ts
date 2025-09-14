import { accounts } from 'cypress/fixtures/accounts';
import { api } from 'cypress/support/api';
import {
  INVALID_BIRTH_YEARS,
  NEW_BIRTH_YEAR,
  NEW_DISPLAY_NAME,
  NEW_PASSWORD,
  NEW_STATUS_MESSAGE,
  TOO_SHORT_DISPLAY_NAME,
} from 'cypress/fixtures/inputs';

describe('mentor profile', () => {
  const mentor = accounts.mentors[0];

  beforeEach(() => {
    api.deleteAccounts();
    api.signUpMentor(mentor);
    cy.loginUser(mentor.loginName, mentor.password);
    cy.visit('/profile');
  });

  after(() => {
    api.deleteAccounts();
  });

  it('displays right content on profile page', () => {
    cy.getByText('Profiili', 'h1').should('be.visible');
    cy.getByText('Tilin tiedot', 'h2').should('be.visible');
    cy.getByText('Mentori', 'p').should('be.visible');
    cy.getByText(mentor.loginName, 'p').should('be.visible');
    cy.getByText(mentor.email!, 'p').should('be.visible');

    cy.getByText('Julkiset tiedot', 'h2').should('be.visible');
    cy.getInputByLabel('Julkinen nimimerkki *').should(
      'have.value',
      mentor.displayName,
    );
    cy.getInputByLabel('Syntymävuosi *').should(
      'have.value',
      String(mentor.birthYear),
    );
    cy.getInputByLabel('Alue').should('have.value', mentor.region);
    cy.getInputByLabel('Tilaviesti').should(
      'have.value',
      mentor.status_message,
    );
    cy.getByText('Tavoitettavissa', 'label').should('be.visible');
    cy.get('textarea').should('have.value', mentor.story);

    mentor.skills.forEach(skill => {
      cy.getByText(skill, 'button').should('be.visible');
    });
  });

  it('password is changed if provided inputs are valid', () => {
    cy.get('button[id="open-password-editor"]').click();
    cy.getByText('Nykyinen salasana *', 'label').should('be.visible');
    cy.getByText('Uusi salasana *', 'label').should('be.visible');
    cy.getByText('Toista uusi salasana *', 'label').should('be.visible');
    cy.getByText('Näytä salasana', 'button').should('be.visible');
    cy.contains('Salasana on liian lyhyt').should('not.exist');
    cy.contains('Salasanat eivät täsmää').should('not.exist');
    cy.getByText('Tallenna', 'button').should('be.disabled');

    // provide inputs
    cy.fillInputByLabel('Nykyinen salasana *', mentor.password);
    cy.fillInputByLabel('Uusi salasana *', NEW_PASSWORD);
    cy.wait(200);
    cy.fillInputByLabel('Toista uusi salasana *', NEW_PASSWORD);
    cy.getByText('Tallenna', 'button').click();

    // should show notification
    cy.contains('Salasana päivitetty onnistuneesti').should('be.visible');

    // should not show editor
    cy.getByText('Nykyinen salasana *', 'label').should('not.exist');
    cy.getByText('Uusi salasana *', 'label').should('not.exist');
    cy.getByText('Toista uusi salasana *', 'label').should('not.exist');

    // log out
    cy.getByText('Kirjaudu ulos').click();

    // go to login page
    cy.getByText('Kirjaudu sisään', 'a').click();

    // old password should not work
    cy.fillInput('username', mentor.loginName);
    cy.fillInput('password', mentor.password);
    cy.get('button[id="submit"]').click();
    cy.get('[id="login-error"]').should('be.visible');

    // new password should work
    cy.loginUser(mentor.loginName, NEW_PASSWORD);
    cy.location('pathname').should('eq', '/');
    cy.contains('Kirjaudu ulos').should('be.visible');
  });

  it('public info is changed if provided inputs are valid', () => {
    cy.fillInputByLabel('Julkinen nimimerkki *', NEW_DISPLAY_NAME);
    cy.fillNumberInputByLabel('Syntymävuosi *', NEW_BIRTH_YEAR);
    cy.getInputByLabel('Alue').clear();
    cy.fillInputByLabel('Tilaviesti', NEW_STATUS_MESSAGE);
    cy.getByText('Tallenna', 'button').click();

    // check that values were updated
    cy.reload();
    cy.getInputByLabel('Julkinen nimimerkki *').should(
      'have.value',
      NEW_DISPLAY_NAME,
    );
    cy.getInputByLabel('Syntymävuosi *').should('have.value', NEW_BIRTH_YEAR);
    cy.getInputByLabel('Alue').should('not.have.value');
    cy.getInputByLabel('Tilaviesti').should('have.value', NEW_STATUS_MESSAGE);
  });

  it('public info changes are discarded after button press', () => {
    cy.fillInputByLabel('Julkinen nimimerkki *', NEW_DISPLAY_NAME);
    cy.fillNumberInputByLabel('Syntymävuosi *', NEW_BIRTH_YEAR);
    cy.getInputByLabel('Alue').clear();
    cy.fillInputByLabel('Tilaviesti', NEW_STATUS_MESSAGE);
    cy.getByText('Hylkää muutokset', 'button').click();

    // check that values were discarded
    cy.reload();
    cy.getInputByLabel('Julkinen nimimerkki *').should(
      'have.value',
      mentor.displayName,
    );
    cy.getInputByLabel('Syntymävuosi *').should(
      'have.value',
      String(mentor.birthYear),
    );
    cy.getInputByLabel('Alue').should('have.value', mentor.region);
    cy.getInputByLabel('Tilaviesti').should(
      'have.value',
      mentor.status_message,
    );
  });

  it('confirmation is needed to leave profile page with unsaved changes', () => {
    cy.fillInputByLabel('Julkinen nimimerkki *', NEW_DISPLAY_NAME);

    // try to navigate away
    cy.getByText('Mentorit', 'a').click();
    cy.wait(200);

    // should show notification
    cy.contains('Sinulla on tallentamattomia muutoksia').should('be.visible');

    // should stay on profile page after canceling dialog
    cy.getByText('Peruuta', 'button').click();
    cy.url().should('match', /profile/);
    cy.getInputByLabel('Julkinen nimimerkki *').should(
      'have.value',
      NEW_DISPLAY_NAME,
    );

    // confirming leave discards changes
    cy.getByText('Mentorit', 'a').click();
    cy.wait(200);
    cy.getByText('Poistu tallentamatta', 'button').click();
    cy.wait(200);
    cy.url().should('match', /mentors/);

    cy.get('[href="/profile"]').click();
    cy.getInputByLabel('Julkinen nimimerkki *').should(
      'have.value',
      mentor.displayName,
    );
  });

  it('display name error message is shown for invalid inputs ', () => {
    cy.fillInputByLabel('Julkinen nimimerkki *', TOO_SHORT_DISPLAY_NAME);
    cy.wait(200);
    cy.contains('Nimimerkki on liian lyhyt').should('be.visible');
    cy.getByText('Tallenna', 'button').should('be.disabled');
  });

  it('birth year error message is shown for invalid inputs', () => {
    INVALID_BIRTH_YEARS.forEach(invalidYear => {
      cy.fillNumberInputByLabel('Syntymävuosi *', invalidYear);
      cy.wait(200);
      cy.contains('Syntymävuosi on virheellinen').should('be.visible');
      cy.getByText('Tallenna', 'button').should('be.disabled');
    });
  });

  it('region error message is shown for too long input', () => {
    cy.fillNumberInputByLabel('Alue', 'A'.repeat(101));
    cy.wait(200);
    cy.contains('Syöte on liian pitkä').should('be.visible');
    cy.getByText('Tallenna', 'button').should('be.disabled');
  });

  it('skills held by another mentor can be found and added to profile', () => {
    // register a second mentor
    const secondMentor = accounts.mentors[1];
    api.signUpMentor(secondMentor);

    const skillSearch = cy.get('input[placeholder*="Lisää uusi aihe"]');
    // only skills held by other mentors should be found in the dropdown
    secondMentor.skills.forEach(skill => {
      cy.wait(200);
      // skill should be found in unfiltered dropdown
      skillSearch.focus();
      cy.getByText(skill, '#skill-dropdown p').should('be.visible');

      // skill should still be found after typing it in the search bar
      skillSearch.clear().type(skill);

      cy.getByText(skill, '#skill-dropdown p').should('be.visible').click();
      cy.wait(200);

      // skill should now be found as a skill chip button
      cy.getByText(skill, 'button').should('be.visible');

      // skill should not be found in dropdown anymore
      skillSearch.clear().focus();

      cy.get('body').then(body => {
        // the dropdown only exists when there are more skills to add
        if (body.find('#skill-dropdown').length) {
          // check that the skill should not be present
          cy.getByText(skill, '#skill-dropdown p').should('not.exist');
        }
      });
    });

    // save changes
    cy.getByText('Tallenna', 'button').click();

    // check that values were updated correctly
    cy.reload();
    // mentor should now have both the original skills and the skills from the second mentor
    mentor.skills.forEach(skill => {
      cy.getByText(skill, 'button').should('be.visible');
    });
    secondMentor.skills.forEach(skill => {
      cy.getByText(skill, 'button').should('be.visible');
    });
  });

  it('skills can be removed from profile', () => {
    const skillSearch = cy.get('input[placeholder*="Lisää uusi aihe"]');

    mentor.skills.forEach(skill => {
      // remove skill
      cy.getByText(skill, 'button').should('be.visible').click();
      cy.wait(200);

      // skill chip button should be gone
      cy.getByText(skill, 'button').should('not.exist');

      // skill should now be found in the dropdown
      skillSearch.focus();
      cy.getByText(skill, 'p').should('be.visible');
    });

    // check that values were updated correctly
    cy.reload();
    // mentor should not have any of the former skills
    mentor.skills.forEach(skill => {
      cy.getByText(skill, 'button').should('not.exist');
    });
  });
});
