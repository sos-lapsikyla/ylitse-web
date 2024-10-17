const CONTACT_INFO_MAX_LENGTH = 200;
const REPORT_REASON_MAX_LENGTH = 2000;

export const isContactInfoTooLong = (contactInfo: string) =>
  contactInfo.length > CONTACT_INFO_MAX_LENGTH;

export const isReportReasonTooLong = (reportReason: string) =>
  reportReason.length > REPORT_REASON_MAX_LENGTH;
