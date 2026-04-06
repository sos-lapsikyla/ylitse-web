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

export type UserFilter = 'mentees' | 'mentors' | 'both' | 'all';
export type SortOrder = 'newest' | 'oldest';

export const selectFilteredAndSortedUsers = (
  filter: UserFilter,
  sort: SortOrder,
  search: string,
) =>
  createSelector(selectAllManagedUsers(), users => {
    let result = [...users];

    // Filter
    if (filter === 'mentees') {
      result = result.filter(
        user => !('mentor' in user) && user.role === 'mentee',
      );
    }
    if (filter === 'mentors') {
      result = result.filter(user => 'mentor' in user);
    }
    if (filter === 'both') {
      result = result.filter(
        user => user.role === 'mentee' || 'mentor' in user,
      );
    }
    // Search
    if (search.trim()) {
      const searchLower = search.toLowerCase();

      result = result.filter(user => {
        const login = user.user?.loginName?.toLowerCase() ?? '';
        const email = user.user?.email?.toLowerCase() ?? '';
        const nickname = user.nickname?.toLowerCase() ?? '';

        return (
          login.includes(searchLower) ||
          email.includes(searchLower) ||
          nickname.includes(searchLower)
        );
      });
    }

    // Sort
    result.sort((a, b) => {
      const aTime = new Date(a.created ?? 0).getTime();
      const bTime = new Date(b.created ?? 0).getTime();

      return sort === 'newest' ? bTime - aTime : aTime - bTime;
    });

    return result;
  });

export const selectManagedUsersSorted = () =>
  createSelector(selectAllManagedUsers(), managedUsers =>
    [...managedUsers].sort((a, b) => {
      const aTime = new Date(a.created ?? 0).getTime();
      const bTime = new Date(b.created ?? 0).getTime();
      return bTime - aTime;
    }),
  );
