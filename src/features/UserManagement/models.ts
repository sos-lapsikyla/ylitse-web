import { pipe } from 'fp-ts/lib/function';
import * as D from 'io-ts/Decoder';
import { mentorCodec, toMentor } from '../MentorPage/models';
import { Account, accountCodec } from '../Authentication/models';

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
  role,
  display_name,
  created,
  mentor,
  user,
}: ApiManagedUser) => {
  const account = {
    id,
    account_id,
    role,
    nickname: display_name,
    created: new Date(created).getTime(),
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

export type AccountsRecord = Record<string, ReturnType<typeof toAccount>>;

export const toManagedAccountRecord = ({
  resources,
}: AccountsResponse): AccountsRecord =>
  resources.reduce((acc, apiAccount) => {
    const account = toAccount(apiAccount);
    return { ...acc, [account.id]: account };
  }, {});
