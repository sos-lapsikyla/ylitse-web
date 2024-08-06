import { getIsOlderThanDaysAgo } from '@/utils/utils';

describe('getIsOlderThanDaysAgo-function', () => {
  it('Dec 31st 2023 is less than 90 days ago', () => {
    const lessThan90DaysAgo = getIsOlderThanDaysAgo(
      90,
      new Date('2023-12-31').getTime(),
    );
    expect(lessThan90DaysAgo).toBe(false);
  });

  it('Jan 1st 2024 is less than 90 days ago', () => {
    const lessThan90DaysAgo = getIsOlderThanDaysAgo(
      90,
      new Date('2024-01-01').getTime(),
    );
    expect(lessThan90DaysAgo).toBe(false);
  });

  it('Today is less than 90 days ago', () => {
    const lessThan90DaysAgo = getIsOlderThanDaysAgo(90, new Date().getTime());
    expect(lessThan90DaysAgo).toBe(true);
  });

  it('Does not crash when given unvalid parameters', () => {
    const lessThan90DaysOld = getIsOlderThanDaysAgo(30, 'not date');
    expect(lessThan90DaysOld).toBe(false);
  });
});
