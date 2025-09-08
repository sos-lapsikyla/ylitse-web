import { createSelector } from 'reselect';
import { managedUsersApi } from './userManagementApi';

export const selectManagedUsers =
  managedUsersApi.endpoints.getManagedUsers.select();

export const selectAllManagedUsers = () =>
  createSelector(selectManagedUsers, managedUsersQuery => {
    const managedUsers = managedUsersQuery.data ?? {};
    console.log('kk' + typeof managedUsersQuery);
    return managedUsers;
  });
