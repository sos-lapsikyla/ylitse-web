import { accounts } from 'cypress/fixtures/accounts';
import { api } from '../support/api';

describe('home', () => {
  beforeEach(() => {
    api.deleteAccounts();
  });

  after(() => {
    api.deleteAccounts();
  });

  it('displays right content for fresh mentee', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    api.signUpMentee(mentee);
    api.signUpMentor(mentor);
    cy.loginUser(mentee.loginName, mentee.password);

    cy.getByText('Tukea ja seuraa', 'h1').should('be.visible');
    cy.getByText(
      'Ylitse MentorApp -vertaismentoripalvelussa mentorit auttavat sinua henkilökohtaisessa tilanteessasi luottamuksellisesti. Voit valita sopivan mentorin ongelmasi perusteella ja saada apua ajasta ja paikasta riippumatta.',
      'p',
    ).should('be.visible');

    cy.getByText('Tervetuloa', 'p').should('be.visible');
    cy.getByText(mentee.displayName, 'p').should('be.visible');

    cy.getByText('Aloita etsimällä mentori', 'h2').should('be.visible');
    // assure that find mentor button works
    cy.getByText('Etsi mentori', 'button').click();
    cy.url().should('match', /mentors/);

    // return to home page
    cy.get('[href="/"]').click();

    // assure welcome-message is not visible when navigated back to home-page
    cy.getByText('Tervetuloa', 'p').should('not.exist');
    cy.getByText(mentee.displayName, 'p').should('not.exist');

    cy.getByText('Tiedotteet', 'h2').should('be.visible');
    cy.getByText('Mikä on Ylitse?', 'h2').should('be.visible');

    // assure that the newest mentor is displayed
    cy.getByText('Uusimmat mentorit', 'h2').should('be.visible');
    cy.getByText(mentor.displayName, 'h2').should('be.visible');
    cy.contains('Tarinani').should('be.visible');
    cy.contains(mentor.story).should('be.visible');
    cy.contains('Puhun näitä kieliä').should('be.visible');

    mentor.languages.forEach(lang => cy.contains(lang).should('be.visible'));
    mentor.skills.forEach(skill =>
      cy.contains(skill, { matchCase: false }).should('be.visible'),
    );

    cy.getByText('Vertaistukea nuorille ja aikuisille', 'h2').should(
      'be.visible',
    );
    // assure that find more mentors button works
    cy.getByText('Löydä lisää mentoreita', 'button').click();
    cy.url().should('match', /mentors/);
  });

  it('changes language on button press', () => {
    const mentee = accounts.mentees[0];
    api.signUpMentee(mentee);
    cy.loginUser(mentee.loginName, mentee.password);
    cy.switchLanguageAfterLogin('en');

    // should show texts in English
    cy.getByText(
      'Ylitse MentorApp -vertaismentoripalvelussa mentorit auttavat sinua henkilökohtaisessa tilanteessasi luottamuksellisesti. Voit valita sopivan mentorin ongelmasi perusteella ja saada apua ajasta ja paikasta riippumatta.',
      'p',
    ).should('not.exist');
    cy.getByText(
      'In the Ylitse MentorApp peer mentoring service, mentors help you with your personal situation confidentially. You can choose a suitable mentor based on your problem and get help regardless of time and place.',
      'p',
    ).should('be.visible');

    cy.switchLanguageAfterLogin('fi');

    // should show texts in Finnish again
    cy.getByText(
      'In the Ylitse MentorApp peer mentoring service, mentors help you with your personal situation confidentially. You can choose a suitable mentor based on your problem and get help regardless of time and place.',
      'p',
    ).should('not.exist');
    cy.getByText(
      'Ylitse MentorApp -vertaismentoripalvelussa mentorit auttavat sinua henkilökohtaisessa tilanteessasi luottamuksellisesti. Voit valita sopivan mentorin ongelmasi perusteella ja saada apua ajasta ja paikasta riippumatta.',
      'p',
    ).should('be.visible');
  });

  it('displays right content for mentee that has been chatting', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
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

    cy.loginUser(mentee.loginName, mentee.password);

    cy.getByText('Tukea ja seuraa', 'h1').should('be.visible');

    cy.getByText('Aloita etsimällä mentori', 'h2').should('not.exist');
    cy.getByText('Keskustele mentoreiden kanssa', 'h2').should('be.visible');

    // assure that go to chat button works
    cy.getByText('Siirry chattiin', 'button').click();
    cy.url().should('match', /chat/);
    cy.getByText(mentor.displayName, 'h2').should('be.visible');
  });

  it('displays right content for mentor', () => {
    const mentor = accounts.mentors[0];
    api.signUpMentor(mentor);
    cy.loginUser(mentor.loginName, mentor.password);

    cy.getByText('Tukea ja seuraa', 'h1').should('be.visible');

    cy.getByText('Tervetuloa', 'p').should('be.visible');
    cy.getByText(mentor.displayName, 'p').should('be.visible');

    //assure that welcome message disappers when page is refreshed
    cy.reload();
    cy.getByText('Tervetuloa', 'p').should('not.exist');
    cy.getByText(mentor.displayName, 'p').should('not.exist');

    // assure that there is no messages yet
    cy.get('[href="/chat"]').click();
    cy.url().should('match', /chat/);
    cy.getByText('Sinulla ei ole vielä keskusteluja', 'p').should('be.visible');
  });

  it('will display notification if there is unseen messages', () => {
    const mentee = accounts.mentees[0];
    const mentor = accounts.mentors[0];
    const message = 'I would like to talk to you';
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

    cy.getByText('Tukea ja seuraa', 'h1').should('be.visible');

    cy.getByText('Keskustele aktoreiden kanssa', 'h2').should('not.exist');
    cy.getByText('Sinulla on lukemattomia viestejä', 'h2').should('be.visible');

    // assure that go to chat button works
    cy.getByText('Siirry chattiin', 'button').click();
    cy.url().should('match', /chat/);
    cy.getByText(mentee.displayName, 'h2').should('be.visible');
  });

  it('will not display notification if there is unseen messages in an archived chat', () => {
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

    cy.getByText('Tukea ja seuraa', 'h1').should('be.visible');

    cy.getByText('Sinulla on lukemattomia viestejä', 'h2').should('not.exist');
    cy.getByText('Keskustele aktoreiden kanssa', 'h2').should('be.visible');
  });

  it('will not display notification if there is unseen messages in a blocked chat', () => {
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

    cy.getByText('Tukea ja seuraa', 'h1').should('be.visible');

    cy.getByText('Sinulla on lukemattomia viestejä', 'h2').should('not.exist');
    cy.getByText('Keskustele aktoreiden kanssa', 'h2').should('be.visible');
  });
});
