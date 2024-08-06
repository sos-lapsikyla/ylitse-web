import { getIsOlderThanDaysAgo } from '@/utils/utils';

const mentors = {
  user_id_1: {
    age: 21,
    buddyId: '',
    communicationChannels: [],
    created: '2022-12-31T00:00:00.000000',
    gender: '',
    isVacationing: true,
    languages: [],
    mentorId: '',
    name: '',
    region: '',
    skills: [],
    statusMessage: '',
    story: '',
  },
  user_id_2: {
    age: 21,
    buddyId: '',
    communicationChannels: [],
    created: '2024-01-01T00:00:00.000000',
    gender: '',
    isVacationing: true,
    languages: [],
    mentorId: '',
    name: '',
    region: '',
    skills: [],
    statusMessage: '',
    story: '',
  },
  user_id_3: {
    age: 21,
    buddyId: '',
    communicationChannels: [],
    created: '2023-12-31T00:00:00.000000',
    gender: '',
    isVacationing: true,
    languages: [],
    mentorId: '',
    name: '',
    region: '',
    skills: [],
    statusMessage: '',
    story: '',
  },
};

describe('getIsOlderThanDaysAgo-function', () => {
  it('mentor created on Dec 31st 2022 is more than 90 days old', () => {
    const lessThan90DaysOld = getIsOlderThanDaysAgo(
      90,
      mentors.user_id_1.created,
    );
    expect(lessThan90DaysOld).toBe(false);
  });

  it('mentor created on Jan 1st 2024 is less than 90 days old', () => {
    const lessThan90DaysOld = getIsOlderThanDaysAgo(
      90,
      mentors.user_id_2.created,
    );
    expect(lessThan90DaysOld).toBe(false);
  });

  it('mentor created on Dec 31st 2023 is less than 90 days old', () => {
    const lessThan90DaysOld = getIsOlderThanDaysAgo(
      90,
      mentors.user_id_3.created,
    );
    expect(lessThan90DaysOld).toBe(false);
  });
});
