import { createSelector } from 'reselect';
import { managedUsersApi } from './userManagementApi';

export const selectManagedUsers =
  managedUsersApi.endpoints.getManagedUsers.select();

export const selectAllManagedUsers = () =>
  createSelector(selectManagedUsers, managedUsersQuery => {
    const accounts = managedUsersQuery.data ?? {};
    const managedUsers = Object.values(accounts);
    return managedUsers;
  });
