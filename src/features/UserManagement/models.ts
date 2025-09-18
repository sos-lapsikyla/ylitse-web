import { pipe } from 'fp-ts/lib/function';
import * as D from 'io-ts/Decoder';
import { mentorCodec, toMentor } from '../MentorPage/models';

export type ApiManagedUser = D.TypeOf<typeof managedUserCodec>;

const role = D.literal('mentee', 'mentor', 'admin');

// from /accounts
const userCodec = D.struct({
  login_name: D.string,
});

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
  email: D.string,
  phone: D.string,
  user: userCodec,
  mentor: mentorCodec,
});

export const managedUserCodec = pipe(
  managedUserMandatory,
  D.intersect(managedUserOptional),
);

export const toManagedUser = ({
  id,
  role,
  display_name,
  // user,
  created,
  email,
  mentor,
}: ApiManagedUser) => {
  const account = {
    id,
    role,
    username: display_name,
    nickname: display_name,
    email,
    created: new Date(created).getTime(),
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
