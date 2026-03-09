import { createSelector } from 'reselect';
import { managedUsersApi } from './userManagementApi';
import { selectMentors } from '../MentorPage/selectors';

export const selectManagedUsers =
  managedUsersApi.endpoints.getManagedUsers.select();

export const selectAccounts =
  managedUsersApi.endpoints.getManagedAccounts.select();

export const selectAllManagedUsers = () =>
  createSelector(
    selectManagedUsers,
    selectAccounts,
    selectMentors,
    (managedUsersQuery, accountsQuery, mentorsQuery) => {
      const users = managedUsersQuery.data ?? {};
      const accounts = accountsQuery.data ?? {};
      const mentors = mentorsQuery.data ?? {};

      const managedUsers = Object.values(users).map(user => {
        if (user.role === 'mentor') {
          return {
            ...user,
            user: accounts[user.account_id],
            mentor: mentors[user.id],
          };
        }
        return { ...user, user: accounts[user.account_id] };
      });
      return managedUsers;
    },
  );

export const selectManagedUsersData = createSelector(
  selectManagedUsers,
  managedUsersQuery => managedUsersQuery.data ?? {},
);

export const selectManagedUserById = (userId: string | null) =>
  createSelector(selectManagedUsersData, users =>
    userId ? users[userId] : undefined,
  );
