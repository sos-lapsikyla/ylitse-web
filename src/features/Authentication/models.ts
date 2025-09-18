import * as D from 'io-ts/Decoder';
import { pipe } from 'fp-ts/lib/function';
import { mentorCodec } from '../MentorPage/models';

import type { ApiMentor } from '../MentorPage/models';

export const role = D.literal('mentee', 'mentor', 'admin');

const userCodec = D.struct({
  account_id: D.string,
  active: D.boolean,
  display_name: D.string,
  id: D.string,
  role: role,
});

const accountMandatory = D.struct({
  active: D.boolean,
  id: D.string,
  login_name: D.string,
  role: role,
});

const accountOptional = D.partial({
  email: D.string,
});

export const accountCodec = pipe(
  accountMandatory,
  D.intersect(accountOptional),
);

const commonResponse = D.struct({
  account: accountCodec,
  user: userCodec,
});

const mentorResponse = D.partial({
  mentor: mentorCodec,
});

export const myuserResponse = pipe(commonResponse, D.intersect(mentorResponse));

export type Account = D.TypeOf<typeof accountCodec>;
export type User = D.TypeOf<typeof userCodec>;

export type AppUser = {
  account: Account;
  mentor?: ApiMentor;
  user: User;
};

export const defaultAccount: Account = {
  active: false,
  email: '',
  id: '',
  login_name: '',
  role: 'mentee',
} as const;

export const defaultUser: User = {
  account_id: '',
  active: false,
  display_name: '',
  id: '',
  role: 'mentee',
} as const;

export const defaultMentor: ApiMentor = {
  account_id: '',
  active: false,
  birth_year: NaN,
  communication_channels: [],
  created: '',
  display_name: '',
  gender: '',
  id: '',
  is_vacationing: false,
  languages: [],
  region: '',
  skills: [],
  status_message: '',
  story: '',
  user_id: '',
};

export const defaultAppUser: AppUser = {
  account: defaultAccount,
  user: defaultUser,
};
