import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('chat', () => {
  const mentee = accounts.mentees[0];
  const mentor = accounts.mentors[0];

  beforeEach(() => {
    api.deleteAccounts();
  });

  after(() => {
    api.deleteAccounts();
  });

  const signUpAndMessageMentor = (message: string) => {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        // send message from mentee to mentor
        api.sendMessage({
          sender: {
            id: menteeResponse.body.id,
            loginName: mentee.loginName,
            password: mentee.password,
          },
          reciever: { id: mentorResponse.body.user_id },
          content: message,
        });
      });
    });
  };

  it('mentor can not start a conversation with themselves', () => {
    api.signUpMentor(mentor);
    cy.loginUser(mentor.loginName, mentor.password);

    // go to mentors page
    cy.get('[href="/mentors"]').click();
    cy.getByText(mentor.displayName, 'h2').should('be.visible');

    cy.getByText('Avaa kortti', 'button').scrollIntoView().click();
    cy.getByText('Aloita keskustelu', 'button').should('be.disabled');
  });

  it('can start a conversation with mentor', () => {
    api.signUpMentee(mentee);
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

  it('send button is disabled if input is only whitespace', () => {
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(message);

    cy.loginUser(mentor.loginName, mentor.password);

    cy.get('[href="/chat"]').click();
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]')
      .click()
      .type(' ');
    cy.get('button[aria-label="send"]').should('be.disabled');
  });

  it('can send message to existing conversation', () => {
    const message = 'I would like to talk to you';
    const answer = 'How can I help you';
    signUpAndMessageMentor(message);

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

  it('should clear drafted message when changing conversation', () => {
    const secondMentor = accounts.mentors[1];
    const message = 'I would like to talk to you';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      const sender = {
        id: menteeResponse.body.id,
        loginName: mentee.loginName,
        password: mentee.password,
      };

      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        // send message from mentee to mentor
        api.sendMessage({
          sender,
          reciever: { id: mentorResponse.body.user_id },
          content: message,
        });
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(secondMentor).then((mentorResponse: any) => {
        // send message from mentee to mentor
        api.sendMessage({
          sender,
          reciever: { id: mentorResponse.body.user_id },
          content: message,
        });
      });
    });

    // open chat with mentor
    cy.loginUser(mentee.loginName, mentee.password);
    cy.get('[href="/chat"]').click();
    cy.getByText(mentor.displayName, 'p').should('be.visible').click();
    cy.getByText(mentor.displayName, 'h2').should('be.visible');

    // draft a message
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]')
      .click()
      .type('Hello there');

    // change mentor
    cy.getByText(secondMentor.displayName, 'p').should('be.visible').click();
    cy.getByText(secondMentor.displayName, 'h2').should('be.visible');

    // verify the message field is cleared by checking that the placeholder is visible
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]').should(
      'have.value',
      '',
    );
  });

  it('marks unseen messages seen', () => {
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(message);

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
    const message = 'Huzzah';
    const numberOfMessages = 20;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        api.sendMultipleMessage({
          sender: {
            id: menteeResponse.body.id,
            loginName: mentee.loginName,
            password: mentee.password,
          },
          reciever: { id: mentorResponse.body.user_id },
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
    const message = 'Huzzah';
    const numberOfMessages = 20;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        api.sendMultipleMessage({
          sender: {
            id: menteeResponse.body.id,
            loginName: mentee.loginName,
            password: mentee.password,
          },
          reciever: { id: mentorResponse.body.user_id },
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
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(message);

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

    // should not show chat anymore
    cy.contains(mentee.displayName).should('not.exist');
    cy.getByText(message, 'p').should('not.exist');

    // should not have message field anymore
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]').should(
      'not.exist',
    );

    // go to the archived chat
    cy.get('button[aria-label="menuLines"]').click();
    cy.getByText('Arkistoidut keskustelut', 'a').click();
    cy.getByText(mentee.displayName, 'p').click();

    // unarchive chat
    cy.getByText('Palauta keskustelu', 'button').click();
    cy.contains(
      `Haluatko palauttaa keskustelun arkistosta käyttäjän ${mentee.displayName} kanssa?`,
    ).should('be.visible');
    cy.get('button[id="confirm-restore"]').click();

    // should show notification
    cy.contains('Keskustelu palautettu onnistuneesti').should('be.visible');

    // should display message field again
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]').should('exist');
  });

  it('will not show unseen dot for new messages in archived conversation', () => {
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
    const message = 'I would like to talk to you';
    signUpAndMessageMentor(message);

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

    // should not show chat anymore
    cy.contains(mentee.displayName).should('not.exist');
    cy.getByText(message, 'p').should('not.exist');

    // go to the blocked chat
    cy.get('button[aria-label="menuLines"]').click();
    cy.getByText('Estetyt keskustelut', 'a').click();
    cy.getByText(mentee.displayName, 'p').click();

    // unblock chat
    cy.getByText('Poista esto', 'button').click();
    cy.contains(
      `Haluatko poistaa eston ja palauttaa keskustelun käyttäjän ${mentee.displayName} kanssa?`,
    ).should('be.visible');
    cy.get('button[id="confirm-unblock"]').click();

    // should show notification
    cy.contains('Esto poistettu ja keskustelu palautettu onnistuneesti').should(
      'be.visible',
    );

    // should display message field again
    cy.get('textarea[placeholder*="Kirjoita viestisi tähän"]').should(
      'be.visible',
    );
  });

  it('will not show unseen dot for new messages in blocked conversation', () => {
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
    cy.getByText('Estetyt keskustelut', 'a').click();
    cy.get('div[aria-label="unseen-messages-dot"]').should('not.exist');
  });

  it('can use scroll-to-bottom-button to scroll to bottom', () => {
    const message = 'Huzzah';
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.signUpMentee(mentee).then((menteeResponse: any) => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      api.signUpMentor(mentor).then((mentorResponse: any) => {
        api.sendMultipleMessage({
          sender: {
            id: menteeResponse.body.id,
            loginName: mentee.loginName,
            password: mentee.password,
          },
          reciever: { id: mentorResponse.body.user_id },
          content: message,
          amountOfMessages: 20,
        });
      });
    });

    // go to chat page
    cy.loginUser(mentor.loginName, mentor.password);
    cy.get('[href="/chat"]').click();

    // initially we should see this message
    // newest message is `Huzzah 20`, but its also shown on the
    // left conversation-list -> thats why we want to make sure it is scrolled to the bottom
    cy.getByText(`${message} 19!`, 'p').should('be.visible');

    // then scroll up to see older message
    cy.getByText(`${message} 5!`, 'p').scrollIntoView().should('be.visible');

    // click scroll-to-bottom-button
    cy.get('button[aria-label="scroll-to-bottom-button"]').click();

    // when scrolled to bottom, this button should disappear
    cy.get('button[aria-label="scroll-to-bottom-button"]').should(
      'not.be.visible',
    );
    // and a bottom message should be visible
    cy.getByText(`${message} 19!`, 'p').should('be.visible');
  });
});
