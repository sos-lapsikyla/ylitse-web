import * as D from 'io-ts/Decoder';

const status = D.literal('handled', 'received');

const reportCodec = D.struct({
  active: D.boolean,
  contact_field: D.string,
  created: D.string,
  id: D.string,
  report_reason: D.string,
  reported_user_id: D.string,
  status: status,
  updated: D.string,
});
type ApiReport = D.TypeOf<typeof reportCodec>;

export const reportListResponseType = D.struct({
  resources: D.array(reportCodec),
});

type ReportsResponse = D.TypeOf<typeof reportListResponseType>;

export type Report = ReturnType<typeof toReport>;

const toReport = ({
  id,
  created,
  contact_field,
  report_reason,
  reported_user_id,
  status,
}: ApiReport) => ({
  id,
  created,
  contactField: contact_field,
  reportReason: report_reason,
  reportedUserId: reported_user_id,
  status,
});

export type Reports = Record<string, Report>;

export const toReportMap = ({ resources }: ReportsResponse): Reports =>
  resources.reduce<Reports>((acc, apiReport) => {
    const report = toReport(apiReport);
    acc[report.id] = report;
    return acc;
  }, {});
