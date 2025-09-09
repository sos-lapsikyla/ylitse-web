import * as D from 'io-ts/Decoder';
import { pipe } from 'fp-ts/lib/function';

export type ApiManagedUser = D.TypeOf<typeof managedUserCodec>;

export const role = D.literal('mentee', 'mentor', 'admin');

const managedUserMandatory = D.struct({
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
});

export const managedUserCodec = pipe(
  managedUserMandatory,
  D.intersect(managedUserOptional),
);

export const managedUserListResponseType = D.struct({
  resources: D.array(managedUserCodec),
});

export type ManagedUsersResponse = D.TypeOf<typeof managedUserListResponseType>;

export type ManagedUser = ReturnType<typeof toManagedUser>;

const toManagedUser = ({ id, login_name, role, created }: ApiManagedUser) => ({
  id,
  name: login_name,
  role,
  created: new Date(created).getTime(),
});

export const toManagedUsertRecord = ({ resources }: ManagedUsersResponse) =>
  resources.reduce((acc: ManagedUsers, ApiManagedUser) => {
    const managedUser: ManagedUser = toManagedUser(ApiManagedUser);
    return { ...acc, [managedUser.id]: managedUser };
  }, {});

export type ManagedUsers = Record<string, ManagedUser>;
