import * as D from 'io-ts/Decoder';

export type ApiManagedUser = D.TypeOf<typeof managedUserCodec>;

export const managedUserCodec = D.struct({
  id: D.string,
  login_name: D.string,
  role: D.string,
  active: D.boolean,
  updated: D.string,
  created: D.string,
});

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
