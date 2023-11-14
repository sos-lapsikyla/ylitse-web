const API_URL = '/api';
const ADMIN_USER = Cypress.env('ADMIN_USER');
const ADMIN_PASSWORD = Cypress.env('ADMIN_PASSWORD');

type CommunicationChannels = 'phone' | 'email' | 'chat';
type Gender = 'female' | 'male' | 'other';
type Language = 'fi' | 'se' | 'en';
type Region = 'HEL' | 'Tampesteri' | 'other';
type Role = 'mentor' | 'mentee';

export type Mentor = {
  password: string;
  role: Role;
  login_name: string;
  email: string;
  phone: string;
  display_name: string;
  birth_year: number;
  gender: Gender;
  languages: Language[];
  region: Region;
  skills: string[];
  story: string;
  communication_channels: CommunicationChannels[];
};

const apiAccessToken = async (
  loginName: string,
  password: string,
): Promise<string> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login_name: loginName,
      password: password,
    }),
  });

  const data = await response.json();
  return data.tokens.access_token;
};

const apiAuthHeader = (accessToken: string): Headers => {
  return new Headers({
    Authorization: `Bearer ${accessToken}`,
  });
};

const apiAdminAuthHeaders = async (): Promise<Headers> => {
  const adminAccessToken = await apiAccessToken(ADMIN_USER, ADMIN_PASSWORD);
  return apiAuthHeader(adminAccessToken);
};

export const createMentor = async (mentor: Mentor) => {
  const adminHeaders = await apiAdminAuthHeaders();

  await fetch(`${API_URL}/accounts`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({
      password: mentor.password,
      account: {
        role: mentor.role,
        login_name: mentor.login_name,
        email: mentor.email,
        phone: mentor.phone,
      },
    }),
  });

  const token = await apiAccessToken(mentor.login_name, mentor.password);
  const mentorHeaders = await apiAuthHeader(token);

  const myuserResponse = await fetch(`${API_URL}/myuser`, {
    headers: mentorHeaders,
  });
  const myuser = await myuserResponse.json();

  await fetch(`${API_URL}/users/${myuser.user.id}`, {
    method: 'PUT',
    headers: mentorHeaders,
    body: JSON.stringify({
      display_name: mentor.display_name,
      role: mentor.role,
      account_id: myuser.account.id,
      id: myuser.user.id,
      active: true,
      created: myuser.user.created,
    }),
  });

  await fetch(`${API_URL}/mentors/${myuser.mentor.id}`, {
    method: 'PUT',
    headers: adminHeaders,
    body: JSON.stringify({
      birth_year: mentor.birth_year,
      display_name: mentor.display_name,
      gender: mentor.gender,
      languages: mentor.languages,
      region: mentor.region,
      skills: mentor.skills,
      story: mentor.story,
      communication_channels: mentor.communication_channels,
      account_id: myuser.account.id,
      user_id: myuser.user.id,
      id: myuser.mentor.id,
      created: myuser.mentor.created,
      active: true,
    }),
  });
};
