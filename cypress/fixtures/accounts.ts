export type Mentee = {
  loginName: string;
  displayName: string;
  password: string;
  email?: string;
  role: 'mentee';
};
export type Mentor = {
  loginName: string;
  displayName: string;
  password: string;
  email?: string;
  role: 'mentor';
  birthYear: number;
  phone: string;
  story: string;
  languages: Array<string>;
  skills: Array<string>;
  communication_channels: Array<string>;
  gender: string;
  region: string;
  status_message?: string;
  is_vacationing?: boolean;
};

export type Admin = {
  loginName: string;
  displayName: string;
  password: string;
  email?: string;
  role: 'admin';
};

const mentees: Array<Mentee> = [
  {
    loginName: 'mentee',
    displayName: 'mentee_nick',
    password: 'Menteementee!',
    email: 'mentee@mentee.mentee',
    role: 'mentee',
  },
  {
    loginName: 'mentee1',
    displayName: 'mentee_fiona',
    password: 'Menteementee!',
    email: 'mentee1@mentee.mentee',
    role: 'mentee',
  },
  {
    loginName: 'mentee2',
    displayName: 'mentee_seppo',
    password: 'Menteementee!',
    email: 'mentee2@mentee.mentee',
    role: 'mentee',
  },
  {
    loginName: 'userNoEmail',
    displayName: 'user_no_email',
    password: 'usernoemail1',
    email: undefined,
    role: 'mentee',
  },
];

const mentors: Array<Mentor> = [
  {
    loginName: 'mentor',
    displayName: 'mentor_paavo',
    password: 'mentormentor',
    email: 'mentor1@mentor.mentor',
    birthYear: 1980,
    phone: '555-1234',
    story: 'my story',
    languages: ['fi', 'se'],
    skills: ['kimble', 'pictionary', 'chess'],
    communication_channels: ['phone', 'email'],
    gender: 'other',
    region: 'Tampesteri',
    status_message: 'On vacation 1.9.-20.9.',
    role: 'mentor',
  },
  {
    loginName: 'mentor1',
    displayName: 'mentor_myy',
    password: 'mentormentor2',
    email: 'mentor2@mentor.mentor',
    birthYear: 1982,
    phone: '555-12342',
    story: 'my story 2',
    languages: ['fi', 'se'],
    skills: ['champagne', 'steaks', 'wine'],
    communication_channels: ['phone', 'email'],
    gender: 'other',
    region: 'Tampesteri',
    role: 'mentor',
  },
  {
    loginName: 'mentor3',
    displayName: 'mentor3_nick',
    password: 'mentormentor3',
    email: 'mentor3@mentor.mentor',
    birthYear: 1983,
    phone: '555-12343',
    story: 'my story',
    languages: ['fi', 'se'],
    skills: ['vim', 'c++', 'python'],
    communication_channels: ['phone', 'email'],
    gender: 'other',
    region: 'Tampesteri',
    is_vacationing: true,
    status_message: 'Gone gardening',
    role: 'mentor',
  },
];

const admins: Array<Admin> = [
  {
    loginName: 'admin1',
    displayName: 'admin1',
    password: 'Adminadmin!',
    email: 'admin@admin.admin',
    role: 'admin',
  },
];

export const accounts = { mentees, mentors, admins };
