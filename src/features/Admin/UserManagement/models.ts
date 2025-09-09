import { pipe } from 'fp-ts/lib/function';
import * as D from 'io-ts/Decoder';

export type ApiManagedUser = D.TypeOf<typeof managedUserCodec>;

const role = D.literal('mentee', 'mentor', 'admin');

// nested user object
const userCodec = D.struct({
  id: D.string,
  displayName: D.string, // nickname
  role: role,
  accountId: D.string,
});

// nested mentor object
const mentorCodec = D.partial({
  birthYear: D.number,
  languages: D.array(D.string),
});

// Main managedUser object
export const managedUserMandatory = D.struct({
  id: D.string,
  login_name: D.string,
  role: role,
  active: D.boolean,
  created: D.string,
  updated: D.string,
});

const managedUserOptional = D.partial({
  email: D.string,
  phone: D.string,
  area: D.string,
  story: D.string,
  skills: D.array(D.string),
  languages: D.array(D.string),
  user: userCodec,
  mentor: mentorCodec,
});

export const managedUserCodec = pipe(
  managedUserMandatory,
  D.intersect(managedUserOptional),
);

const toManagedUser = ({
  id,
  role,
  login_name,
  user,
  created,
  mentor,
  email,
  area,
  story,
}: ApiManagedUser) => ({
  id,
  role,
  birthYear: mentor?.birthYear,
  username: user?.displayName ?? login_name,
  nickname: login_name,
  email,
  area,
  story,
  created: new Date(created).getTime(),
});

export type ManagedUser = ReturnType<typeof toManagedUser>;

export type ManagedUsersResponse = D.TypeOf<typeof managedUserListResponseType>;

// Response decoder
export const managedUserListResponseType = D.struct({
  resources: D.array(managedUserCodec),
});

export const toManagedUserRecord = ({ resources }: ManagedUsersResponse) =>
  resources.reduce((acc: ManagedUsers, ApiManagedUser) => {
    const managedUser: ManagedUser = toManagedUser(ApiManagedUser);
    return { ...acc, [managedUser.id]: managedUser };
  }, {});

export type ManagedUsers = Record<string, ManagedUser>;
