import type { Mentee, Mentor } from '../fixtures/accounts';
import { generateToken } from 'node-2fa';

const API_URL = Cypress.env('apiUrl') || 'http://127.0.0.1:8080';
const API_USER = Cypress.env('apiUser') || 'admin';
const API_PASS = Cypress.env('apiPass') || '';
const MFA_SECRET = Cypress.env('mfaSecret') || '';

/**
 * Get access_token for admin
 */
const adminAccessToken = () => {
  return accessToken(API_USER, API_PASS, MFA_SECRET);
};

/**
 * Get access_token
 */
const accessToken = (
  login_name: string,
  password: string,
  mfaSecret?: string,
) => {
  const newSecret = generateToken(mfaSecret ?? '');

  return cy
    .request({
      method: 'POST',
      url: `${API_URL}/login`,
      body: {
        login_name,
        password,
        ...(newSecret && { mfa_token: newSecret.token }),
      },
    })
    .then(response => {
      return response.body.tokens.access_token;
    });
};

const loginAdmin = () => {
  const token = generateToken(MFA_SECRET ?? '')?.token;
  cy.visit('/login/');
  cy.fillInput('username', API_USER);
  cy.fillInput('password', API_PASS);
  cy.get('a[id="show-mfa"]').click();
  if (token) {
    cy.fillInput('mfa_token', token);
    cy.get('button[id="submit"]').click();
  }
  cy.getByText('Ylitse MentorApp -vertaismentoripalvelu', 'p').should(
    'be.visible',
  );
};

/**
 * Get users from API
 */
const getUsers = (access_token: string) => {
  return cy
    .request({
      method: 'GET',
      url: `${API_URL}/users`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(response => {
      return response.body.resources;
    });
};

/**
 * Makes HTTP API calls to delete all users except those with role 'admin'
 */
const deleteAccounts = () => {
  return adminAccessToken().then(access_token => {
    return getUsers(access_token).then(users => {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      users.forEach((user: any) => {
        if (user.role !== 'admin') {
          cy.request({
            method: 'DELETE',
            url: `${API_URL}/accounts/${user.account_id}`,
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
        }
      });
    });
  });
};

/**
 * Makes HTTP API calls to delete user
 */
const deleteAccount = (id: string) => {
  return adminAccessToken().then(access_token => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/accounts/${id}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};

/**
 * SignUp new mentee
 */
const signUpMentee = (mentee: Mentee) => {
  return cy
    .request({
      method: 'POST',
      url: `${API_URL}/accounts`,
      body: {
        password: mentee.password,
        account: {
          role: mentee.role,
          login_name: mentee.loginName,
          email: mentee.email,
        },
      },
    })
    .then(() => {
      return accessToken(mentee.loginName, mentee.password).then(
        access_token => {
          const headers = {
            Authorization: `Bearer ${access_token}`,
          };

          return cy
            .request({
              method: 'GET',
              url: `${API_URL}/myuser`,
              headers,
            })
            .then(response => {
              const myuser = response.body;

              return cy.request({
                method: 'PUT',
                url: `${API_URL}/users/${myuser.user.id}`,
                headers,
                body: {
                  display_name: mentee.displayName,
                  role: mentee.role,
                  account_id: myuser.account.id,
                  id: myuser.user.id,
                },
              });
            });
        },
      );
    });
};

/**
 * SignUp new mentor
 */
const signUpMentor = (mentor: Mentor) => {
  return adminAccessToken().then(admin_access_token => {
    const admin_headers = {
      Authorization: `Bearer ${admin_access_token}`,
    };

    return cy
      .request({
        method: 'POST',
        url: `${API_URL}/accounts`,
        headers: admin_headers,
        body: {
          password: mentor.password,
          account: {
            role: mentor.role,
            login_name: mentor.loginName,
            email: mentor.email,
            phone: mentor.phone,
          },
        },
      })
      .then(() => {
        return accessToken(mentor.loginName, mentor.password).then(
          access_token => {
            const headers = {
              Authorization: `Bearer ${access_token}`,
            };

            return cy
              .request({
                method: 'GET',
                url: `${API_URL}/myuser`,
                headers,
              })
              .then(response => {
                const myuser = response.body;

                return cy
                  .request({
                    method: 'PUT',
                    url: `${API_URL}/users/${myuser.user.id}`,
                    headers,
                    body: {
                      display_name: mentor.displayName,
                      role: mentor.role,
                      account_id: myuser.account.id,
                      id: myuser.user.id,
                      active: true,
                    },
                  })
                  .then(() => {
                    return cy.request({
                      method: 'PUT',
                      url: `${API_URL}/mentors/${myuser.mentor.id}`,
                      headers: admin_headers,
                      body: {
                        birth_year: mentor.birthYear,
                        display_name: mentor.displayName,
                        gender: mentor.gender,
                        languages: mentor.languages,
                        region: mentor.region,
                        skills: mentor.skills,
                        story: mentor.story,
                        communication_channels: mentor.communication_channels,
                        is_vacationing: mentor.is_vacationing,
                        status_message: mentor.status_message,
                        account_id: myuser.account.id,
                        user_id: myuser.user.id,
                        id: myuser.mentor.id,
                      },
                    });
                  });
              });
          },
        );
      });
  });
};

type Sender = {
  id: string;
  loginName: string;
  password: string;
};
type Reciever = Pick<Sender, 'id'>;
type SendData = {
  sender: Sender;
  reciever: Reciever;
  content: string;
};

const sendMessage = ({ sender, reciever, content }: SendData) => {
  return accessToken(sender.loginName, sender.password)
    .then(senderAccessToken =>
      cy.request({
        method: 'POST',
        url: `${API_URL}/users/${sender.id}/messages`,
        headers: {
          Authorization: `Bearer ${senderAccessToken}`,
        },
        body: {
          sender_id: sender.id,
          recipient_id: reciever.id,
          content,
          opened: false,
        },
      }),
    )
    .then(response => {
      return response.body;
    });
};

type SendMultiData = SendData & { amountOfMessages: number };
const sendMultipleMessage = ({
  sender,
  reciever,
  content,
  amountOfMessages,
}: SendMultiData) => {
  return accessToken(sender.loginName, sender.password).then(
    senderAccessToken => {
      const indices = Array.from({ length: amountOfMessages }, (_, i) => i + 1);

      cy.wrap(null)
        .then(() => {
          return indices.reduce((chain, i) => {
            return chain
              .then(() => {
                cy.task('log', `Sending message ${i}`);
                return cy.request({
                  method: 'POST',
                  url: `${API_URL}/users/${sender.id}/messages`,
                  headers: {
                    Authorization: `Bearer ${senderAccessToken}`,
                  },
                  body: {
                    sender_id: sender.id,
                    recipient_id: reciever.id,
                    content: `${content} ${i}!`,
                    opened: false,
                  },
                });
              })
              .then(() => {
                // dont hammer the backend
                cy.wait(500);
              });
          }, Cypress.Promise.resolve());
        })
        .then(() => {
          cy.task('log', 'All messages have been sent in order with delays!');
        });
    },
  );
};

type ChatStatus = 'archived' | 'banned' | 'ok';
type StatusUpdate = {
  sender: Sender;
  buddyId: string;
  status: ChatStatus;
};

const updateChatStatus = ({ sender, buddyId, status }: StatusUpdate) => {
  return accessToken(sender.loginName, sender.password)
    .then(senderAccessToken =>
      cy.request({
        method: 'PUT',
        url: `${API_URL}/users/${sender.id}/contacts/${buddyId}`,
        headers: {
          Authorization: `Bearer ${senderAccessToken}`,
        },
        body: {
          status,
        },
      }),
    )
    .then(response => {
      return response.body;
    });
};

export const api = {
  signUpMentee,
  signUpMentor,
  deleteAccount,
  deleteAccounts,
  sendMessage,
  sendMultipleMessage,
  updateChatStatus,
  loginAdmin,
};
