import { isContactInfoTooLong, isReportReasonTooLong } from './validators';

const CONTACT_INFO_MAX_LENGTH = 200;
const REPORT_REASON_MAX_LENGTH = 2000;

describe('isContactInfoTooLong', () => {
  it('should return false when contact info length is equal to the max length', () => {
    const contactInfo = 'a'.repeat(CONTACT_INFO_MAX_LENGTH);
    expect(isContactInfoTooLong(contactInfo)).toBe(false);
  });

  it('should return false when contact info length is less than the max length', () => {
    const contactInfo = 'a'.repeat(CONTACT_INFO_MAX_LENGTH - 1);
    expect(isContactInfoTooLong(contactInfo)).toBe(false);
  });

  it('should return true when contact info length exceeds the max length', () => {
    const contactInfo = 'a'.repeat(CONTACT_INFO_MAX_LENGTH + 1);
    expect(isContactInfoTooLong(contactInfo)).toBe(true);
  });
});

describe('isReportReasonTooLong', () => {
  it('should return false when report reason length is equal to the max length', () => {
    const reportReason = 'a'.repeat(REPORT_REASON_MAX_LENGTH);
    expect(isReportReasonTooLong(reportReason)).toBe(false);
  });

  it('should return false when report reason length is less than the max length', () => {
    const reportReason = 'a'.repeat(REPORT_REASON_MAX_LENGTH - 1);
    expect(isReportReasonTooLong(reportReason)).toBe(false);
  });

  it('should return true when report reason length exceeds the max length', () => {
    const reportReason = 'a'.repeat(REPORT_REASON_MAX_LENGTH + 1);
    expect(isReportReasonTooLong(reportReason)).toBe(true);
  });
});
