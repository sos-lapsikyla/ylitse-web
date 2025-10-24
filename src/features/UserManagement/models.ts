import * as D from 'io-ts/Decoder';
import { pipe } from 'fp-ts/lib/function';

import { Account, accountCodec } from '../Authentication/models';
import { mentorCodec, toMentor } from '../MentorPage/models';

export type ApiManagedUser = D.TypeOf<typeof managedUserCodec>;

const role = D.literal('mentee', 'mentor', 'admin');

// from users
export const managedUserMandatory = D.struct({
  id: D.string,
  display_name: D.string,
  role: role,
  account_id: D.string,
  active: D.boolean,
  created: D.string,
  updated: D.string,
});

const managedUserOptional = D.partial({
  user: accountCodec,
  mentor: mentorCodec,
});

export const managedUserCodec = pipe(
  managedUserMandatory,
  D.intersect(managedUserOptional),
);

export const toManagedUser = ({
  id,
  account_id,
  created,
  display_name,
  role,
  mentor,
  user,
}: ApiManagedUser) => {
  const account = {
    id,
    account_id,
    created: new Date(created).getTime(),
    nickname: display_name,
    role,
    user: user ? toAccount(user) : undefined,
  };
  if (role === 'mentor' && mentor) {
    return {
      ...account,
      mentor: toMentor(mentor),
    };
  }
  return account;
};
export type ManagedUser = ReturnType<typeof toManagedUser>;

export type ManagedUsersResponse = D.TypeOf<typeof managedUserListResponseType>;

export const managedUserListResponseType = D.struct({
  resources: D.array(managedUserCodec),
});

export const toManagedUserRecord = ({ resources }: ManagedUsersResponse) =>
  resources.reduce((acc: ManagedUsers, ApiManagedUser) => {
    const managedUser: ManagedUser = toManagedUser(ApiManagedUser);
    return { ...acc, [managedUser.id]: managedUser };
  }, {});

export type ManagedUsers = Record<string, ManagedUser>;

export const accountsListResponseType = D.struct({
  resources: D.array(accountCodec),
});

export type AccountsResponse = D.TypeOf<typeof accountsListResponseType>;
export type Accounts = Record<string, ReturnType<typeof toAccount>>;

export const toAccount = ({ id, login_name, email }: Account) => ({
  id,
  loginName: login_name,
  email,
});

export const toManagedAccountRecord = ({ resources }: AccountsResponse) =>
  resources.reduce((acc, apiAccount) => {
    const account = toAccount(apiAccount);
    return { ...acc, [account.id]: account };
  }, {});

export type CreatedAccountResponse = {
  account: {
    id: string;
    login_name: string;
    role: string;
    email?: string;
    active: boolean;
    created: string;
    updated: string;
  };
  user: {
    account_id: string;
    display_name: string;
    active: boolean;
    id: string;
    role: string;
    created: string;
    updated: string;
  };
  mentor?: {
    id: string;
    account_id: string;
    active: boolean;
    birth_year: string;
    communication_channels: string[];
    created: string;
    display_name: string;
    gender: string;
    is_vacationing: boolean;
    languages: string[];
    region: string;
    skills: string[];
    status_message: string;
    story: string;
    updated: string;
    user_id: string;
  };
};

export type NewAccountPayload = {
  account: {
    login_name: string;
    role: string;
    email?: string;
  };
  password: string;
};

export type NewUserPayload = {
  id: string;
  account_id: string;
  display_name: string;
  role: string;
};

export type MentorPayload = {
  id: string;
  user_id: string;
  account_id: string;
  birth_year: number;
  display_name: string;
  region: string;
  story: string;
  skills: string[];
  languages: string[];
  communication_channels: string[];
  gender: string;
};
