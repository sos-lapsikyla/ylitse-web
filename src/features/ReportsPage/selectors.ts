import { createSelector } from 'reselect';
import { reportsApi } from './reportsApi';
import { toGroupedReportMessages } from './ChatInspection/mappers';

export const selectReports = reportsApi.endpoints.getReports.select();

export const selectReportsSorted = createSelector(
  selectReports,
  reportsQuery => {
    const reportsMap = reportsQuery.data ?? {};

    return Object.values(reportsMap)
      .slice()
      .sort((a, b) => {
        // show non-handled report first
        const statusOrder = {
          received: 0,
          handled: 1,
        };

        const aStatus = statusOrder[a.status];
        const bStatus = statusOrder[b.status];

        if (aStatus !== bStatus) {
          return aStatus - bStatus;
        }
        // show recently updated first
        return new Date(b.updated).getTime() - new Date(a.updated).getTime();
      });
  },
);

export const selectReportMessages = (senderId: string, recipientId: string) =>
  reportsApi.endpoints.getReportMessages.select({
    senderId,
    recipientId,
  });

// group messages by date
export const selectGroupedReportMessages = (
  senderId: string,
  recipientId: string,
) =>
  createSelector(
    [
      reportsApi.endpoints.getReportMessages.select({
        senderId,
        recipientId,
      }),
    ],
    result => {
      const messagesArray = Object.values(result.data?.messages ?? {});
      return toGroupedReportMessages(messagesArray);
    },
  );
