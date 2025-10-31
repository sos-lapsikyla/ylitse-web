import type { Mentor, Mentors } from './models';
import { createSelector } from 'reselect';
import { selectUserId } from '../Authentication/selectors';
import { mentorsApi } from './mentorPageApi';
import { selectSearchString, selectSelectedSkills } from './mentorsFilterSlice';

export const selectMentors = mentorsApi.endpoints.getMentors.select();

export const selectMyMentorProfile = createSelector(
  [selectMentors, selectUserId],
  (mentors, buddyId) => (buddyId ? mentors.data?.[buddyId] : undefined),
);

export const selectFilteredMentors = () =>
  createSelector(
    selectMentors,
    selectSelectedSkills,
    selectSearchString,
    (mentorsQuery, selectedSkills, searchString) => {
      const mentors = mentorsQuery.data ?? {};
      const filteredMentors = Object.values(mentors)
        .filter(withSkills(selectedSkills))
        .filter(withSearchString(searchString));
      return filteredMentors;
    },
  );

export const selectNewestMentors = (amount: number) =>
  createSelector(selectMentors, mentorsQuery => {
    const mentors = mentorsQuery.data ?? {};
    const sortedMentors = Object.values(mentors).sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
    return sortedMentors.slice(0, amount);
  });

export const selectMentorById = (buddyId: string | null) =>
  createSelector(selectMentors, mentors =>
    buddyId ? mentors.data?.[buddyId] : undefined,
  );

export const selectAllSkillOptions = () =>
  createSelector(selectMentors, mentorsQuery => {
    const mentors = mentorsQuery.data ?? {};
    const skills = Object.values(mentors).flatMap(mentor => mentor.skills);
    const uniqueSkills = Array.from(new Set(skills));
    return uniqueSkills;
  });

export const selectSkills = () =>
  createSelector(
    selectMentors,
    selectSelectedSkills,
    (mentorsResponse, selectedSkills) =>
      mapSkills(mentorsResponse.data ?? {}, selectedSkills),
  );

const withSkills =
  (selectedSkills: Array<string>) =>
  ({ skills: mentorSkills }: Mentor) =>
    selectedSkills.length > 0
      ? mentorSkills.some(skill => selectedSkills.includes(skill))
      : true;

const withSearchString =
  (searchString: string) =>
  ({ name, region, story, statusMessage, skills }: Mentor) =>
    searchString.length > 0
      ? [name, region, story, statusMessage, ...skills].some(value =>
          value.toLowerCase().includes(searchString.toLowerCase()),
        )
      : true;

export const mapSkills = (mentors: Mentors, selectedSkills: Array<string>) => {
  const allSkills = Object.values(mentors)
    .map(mentor => mentor.skills)
    .flat();

  const amountMap = allSkills.reduce<Record<string, number>>((acc, skill) => {
    const amount = (acc[skill] ?? 0) + 1;
    return { ...acc, [skill]: amount };
  }, {});

  return Object.entries(amountMap)
    .sort(bySelectionOrRarity(selectedSkills))
    .map(([skill]) => skill);
};

const bySelectionOrRarity =
  (selectedSkills: Array<string>) =>
  (
    [skillA, amountA]: [string, number],
    [skillB, amountB]: [string, number],
  ) => {
    const isASelected = selectedSkills.includes(skillA);
    const isBSelected = selectedSkills.includes(skillB);
    if (isASelected && !isBSelected) {
      return -1;
    }

    if (isBSelected && !isASelected) {
      return 1;
    }

    return amountB - amountA;
  };
