import { accounts, Mentee, Mentor } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('chat', () => {
  beforeEach(() => {
    api.deleteAccounts();
  });

  after(() => {
    api.deleteAccounts();
  });

  const signUpAndMessageMentor = (
    mentee: Mentee,
    mentor: Mentor,
    message: string,
  ) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const sender = {
          id: menteeResponse.body.id,
          loginName: mentee.loginName,
          password: mentee.password,
        };
        const reciever = { id: mentorResponse.body.user_id };

        // send message between users
        api.sendMessage({
          sender,
          reciever,
          content: message,
        });
      });
    });
  };

  it('can start a conversation with mentor', () => {
    const mentee = accounts.mentees[0];
    api.signUpMentee(mentee);
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    cy.loginUser(mentee.loginName, mentee.password);

    // go to mentors page
    cy.get('[href="/mentors"]').click();
    cy.getByText(mentor.displayName, 'h2').should('be.visible');

    // send message
    cy.getByText('Avaa kortti', 'button').scrollIntoView().click();
    cy.getByText('Aloita keskustelu', 'button').click();
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]')
      .click()
      .type('Hello there');
    cy.get('button[aria-label="send"]').click();

    // log out
    cy.clickLogout();
    // log in with mentor-user
    cy.loginUser(mentor.loginName, mentor.password);

    // message came
    cy.get('[href="/chat"]').click();
    cy.getByText('Hello there', 'p').should('be.visible');
  });

  it('can send message to existing conversation', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    const answer = 'How can I help you';
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const sender = {
          id: menteeResponse.body.id,
          loginName: mentee.loginName,
          password: mentee.password,
        };
        const reciever = { id: mentorResponse.body.user_id };

        // send message between users
        api.sendMessage({
          sender,
          reciever,
          content: message,
        });
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();
    cy.getByText(message, 'p').should('be.visible');

    // send message
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]')
      .click()
      .type(answer);
    cy.get('button[aria-label="send"]').click();

    // log in with original-user
    cy.clickLogout();
    cy.loginUser(mentee.loginName, mentee.password);

    // message came
    cy.get('[href="/chat"]').click();
    cy.getByText(answer, 'p').should('be.visible');
  });

  it('marks unseen messages seen', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(mentee, mentor, message);

    cy.loginUser(mentor.loginName, mentor.password);

    // see unseen-message-ball
    cy.get('div[aria-label="unseen-messages-dot"]').should('be.visible');
    // go to chat-page and mark message unseen
    cy.get('[href="/chat"]').click();
    cy.getByText(message, 'p').should('be.visible');
    cy.wait(1000);
    cy.get('[href="/mentors"]').click();

    // unseen-message-ball-disappears
    cy.get('div[aria-label="unseen-messages-dot"]').should('not.exist');
  });

  it('wont mark unseen if not visible', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'Huzzah';
    const numberOfMessages = 20;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const sender = {
          id: menteeResponse.body.id,
          loginName: mentee.loginName,
          password: mentee.password,
        };
        const reciever = { id: mentorResponse.body.user_id };

        api.sendMultipleMessage({
          sender,
          reciever,
          content: message,
          amountOfMessages: 20,
        });
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();

    // should scroll to last message
    cy.getByText(`${message} ${numberOfMessages}!`, 'p').should('be.visible');
    cy.wait(1000);
    cy.get('[href="/mentors"]').click();

    // see unseen-message-ball still
    cy.get('div[aria-label="unseen-messages-dot"]').should('be.visible');
  });

  it('will load all messages if multiple unseen', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'Huzzah';
    const numberOfMessages = 20;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const sender = {
          id: menteeResponse.body.id,
          loginName: mentee.loginName,
          password: mentee.password,
        };
        const reciever = { id: mentorResponse.body.user_id };

        api.sendMultipleMessage({
          sender,
          reciever,
          content: message,
          amountOfMessages: 20,
        });
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();

    // should scroll to last message
    cy.getByText(`${message} ${numberOfMessages}!`, 'p').should('be.visible');

    // scroll-up oldest message should be visible
    cy.getByText(`${message} 1!`, 'p').scrollIntoView().should('be.visible');
  });

  it('can archive and restore conversation', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(mentee, mentor, message);

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();
    cy.getByText(message, 'p').should('be.visible');

    // archive the chat
    cy.getByText('Arkistoi', 'button').click();
    cy.contains(
      `Haluatko arkistoida keskustelun käyttäjän ${mentee.displayName} kanssa?`,
    ).should('be.visible');
    cy.get('button[id="confirm-archive"]').click();

    // should show notification
    cy.contains('Keskustelu arkistoitu onnistuneesti').should('be.visible');

    // should not have message field anymore
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]').should(
      'not.exist',
    );

    // unarchive chat
    cy.getByText('Palauta keskustelu', 'button').click();
    cy.contains(
      `Haluatko palauttaa keskustelun käyttäjän ${mentee.displayName} kanssa?`,
    ).should('be.visible');
    cy.get('button[id="confirm-restore"]').click();

    // should show notification
    cy.contains('Keskustelu palautettu onnistuneesti').should('be.visible');

    // should display message field again
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]').should('exist');
  });

  it('will not show unseen dot for new messages in archived conversation', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const menteeId = menteeResponse.body.id;
        const mentorId = mentorResponse.body.user_id;

        const menteeSender = {
          id: menteeId,
          loginName: mentee.loginName,
          password: mentee.password,
        };

        const mentorSender = {
          id: mentorId,
          loginName: mentor.loginName,
          password: mentor.password,
        };

        const mentorReciever = { id: mentorId };

        // send message between users
        api
          .sendMessage({
            sender: menteeSender,
            reciever: mentorReciever,
            content: message,
          })
          .then(() =>
            // archive conversation
            api.updateChatStatus({
              sender: mentorSender,
              buddyId: menteeId,
              status: 'archived',
            }),
          );
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    cy.get('div[aria-label="unseen-messages-dot"]').should('not.exist');

    // go to archived conversations
    cy.get('[href="/chat"]').click();
    cy.get('button[aria-label="menuLines"]').click();
    cy.getByText('Arkistoidut keskustelut', 'a');
    cy.get('div[aria-label="unseen-messages-dot"]').should('not.exist');
  });

  it('can block and restore conversation', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(mentee, mentor, message);

    cy.loginUser(mentor.loginName, mentor.password);

    // go to chat-page
    cy.get('[href="/chat"]').click();
    cy.getByText(message, 'p').should('be.visible');

    // block the chat
    cy.getByText('Estä käyttäjä', 'button').click();
    cy.contains(`Haluatko estää käyttäjän ${mentee.displayName}?`).should(
      'be.visible',
    );
    cy.get('button[id="confirm-block"]').click();

    // should show notification
    cy.contains('Keskustelu estetty onnistuneesti').should('be.visible');

    // should not have message field anymore
    cy.contains('Kirjoita viestisi tähän').should('not.exist');

    // unarchive chat
    cy.getByText('Palauta keskustelu', 'button').click();
    cy.contains(
      `Haluatko palauttaa keskustelun käyttäjän ${mentee.displayName} kanssa?`,
    ).should('be.visible');
    cy.get('button[id="confirm-restore"]').click();

    // should show notification
    cy.contains('Keskustelu palautettu onnistuneesti').should('be.visible');

    // should display message field again
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]').should(
      'be.visible',
    );
  });

  it('will not show unseen dot for new messages in blocked conversation', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        const menteeId = menteeResponse.body.id;
        const mentorId = mentorResponse.body.user_id;

        const menteeSender = {
          id: menteeId,
          loginName: mentee.loginName,
          password: mentee.password,
        };

        const mentorSender = {
          id: mentorId,
          loginName: mentor.loginName,
          password: mentor.password,
        };

        const mentorReciever = { id: mentorId };

        // send message between users
        api
          .sendMessage({
            sender: menteeSender,
            reciever: mentorReciever,
            content: message,
          })
          .then(() =>
            // archive conversation
            api.updateChatStatus({
              sender: mentorSender,
              buddyId: menteeId,
              status: 'banned',
            }),
          );
      });
    });

    cy.loginUser(mentor.loginName, mentor.password);

    cy.get('div[aria-label="unseen-messages-dot"]').should('not.exist');

    // go to blocked conversations
    cy.get('[href="/chat"]').click();
    cy.get('button[aria-label="menuLines"]').click();
    cy.getByText('Estetyt keskustelut', 'a');
    cy.get('div[aria-label="unseen-messages-dot"]').should('not.exist');
  });

  it('can report mentor succesfully', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(mentee, mentor, message);

    cy.loginUser(mentee.loginName, mentee.password);
    cy.get('[href="/chat"]').click();

    // open report modal
    cy.getByText('Ilmianna', 'button').click();

    cy.getByText('Ilmianna käyttäjä', 'h1').should('be.visible');
    cy.getByText(
      'Ilmianna käyttäjä, jos epäilet tai havaitset mentorin käyttävän palvelua väärin.',
      'p',
    ).should('be.visible');
    cy.getByText('Lähetä', 'button').should('be.disabled');

    cy.fillInputByLabel('Syy ilmiantoon *', 'exampleReason');
    cy.fillInputByLabel(
      'Sähköposti tai puhelinumero yhteydenottoa varten',
      'exampleContactInfo',
    );

    // Send report
    cy.getByText('Lähetä', 'button').click();
    cy.wait(200);

    // should show success modal
    // cy.getByText('Käyttäjän ilmianto onnistui', 'h3').should('be.visible');
    cy.getByText(
      'SOS-Lapsikylän työntekijä selvittää tilanteen ja ottaa sinuun yhteyttä.',
      'p',
    ).should('be.visible');
  });

  it('will not show report button to mentor', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(mentee, mentor, message);

    cy.loginUser(mentor.loginName, mentor.password);
    cy.get('[href="/chat"]').click();

    // should show other buttons
    cy.getByText('Arkistoi', 'button').should('be.visible');
    cy.getByText('Estä käyttäjä', 'button').should('be.visible');

    cy.getByText('Ilmianna', 'button').should('not.exist');
  });
});
