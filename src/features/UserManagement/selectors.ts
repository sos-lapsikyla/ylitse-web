import { createSelector } from 'reselect';
import { managedUsersApi } from './userManagementApi';
import { selectMentors } from '../MentorPage/selectors';

export const selectManagedUsers =
  managedUsersApi.endpoints.getManagedUsers.select();

export const selectAllManagedUsers = () =>
  createSelector(
    selectManagedUsers,
    selectMentors,
    (managedAccountsQuery, mentorsQuery) => {
      const accounts = managedAccountsQuery.data ?? {};
      const mentors = mentorsQuery.data ?? {};
      const managedUsers = Object.values(accounts).map(account => {
        // console.log('account',account)
        if (account.role === 'mentor') {
          //   console.log('tätä muutetaan', mentors[account.id])
          //  const mentor = { ...account, mentor: mentors[account.id] }
          //    console.log('muunnettu mentor account', mentor)
          return { ...account, mentor: mentors[account.id] };
        }
        return account;
      });
      // console.log('kaikki managedUserit', managedUsers)
      return managedUsers;
    },
  );
