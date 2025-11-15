import { createSelector } from 'reselect';
import { reportsApi } from './reportsApi';

export const selectReports = reportsApi.endpoints.getReports.select();

export const selectAllReports = () =>
  createSelector(selectReports, reportsQuery => {
    const reportsMap = reportsQuery.data ?? {};
    return Object.values(reportsMap);
  });
