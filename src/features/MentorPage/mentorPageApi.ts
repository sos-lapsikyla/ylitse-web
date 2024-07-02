import { createSelector } from 'reselect';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as D from 'io-ts/Decoder';
import { validateAndTransformTo } from '@/utils/http';
import { selectSelectedSkills, selectSearchString } from './mentorsFilterSlice';
import { capitalize } from '@/utils/utils';

type ApiMentor = D.TypeOf<typeof apiMentorType>;

const apiMentorType = D.struct({
  birth_year: D.number,
  communication_channels: D.array(D.string),
  created: D.string,
  display_name: D.string,
  gender: D.string,
  id: D.string,
  is_vacationing: D.boolean,
  languages: D.array(D.string),
  region: D.string,
  skills: D.array(D.string),
  status_message: D.string,
  story: D.string,
  user_id: D.string,
});

const mentorListResponseType = D.struct({ resources: D.array(apiMentorType) });
type MentorsResponse = D.TypeOf<typeof mentorListResponseType>;

export type Mentor = ReturnType<typeof toMentor>;

const toMentor = ({
  birth_year,
  communication_channels,
  created,
  display_name,
  id,
  is_vacationing,
  skills,
  status_message,
  user_id,
  ...props
}: ApiMentor) => ({
  ...props,
  age: new Date().getFullYear() - birth_year,
  buddyId: user_id,
  communicationChannels: communication_channels,
  created: new Date(created).getTime(),
  isVacationing: is_vacationing,
  mentorId: id,
  name: display_name,
  skills: skills.map(skill => capitalize(skill)),
  statusMessage: status_message,
});

export type Mentors = Record<string, Mentor>;

const toMentorRecord = ({ resources }: MentorsResponse) =>
  resources.reduce((acc: Mentors, apiMentor) => {
    const mentor: Mentor = toMentor(apiMentor);
    return { ...acc, [mentor.buddyId]: mentor };
  }, {});

export const mentorsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  reducerPath: 'mentors',

  endpoints: builder => ({
    getMentors: builder.query<Mentors, void>({
      query: () => 'mentors',
      transformResponse: (response: unknown) =>
        validateAndTransformTo(
          response,
          mentorListResponseType,
          { resources: [] },
          toMentorRecord,
        ),
    }),
  }),
});

const selectMentors = mentorsApi.endpoints.getMentors.select();

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
      (a, b) => b.created - a.created,
    );
    return sortedMentors.slice(0, amount);
  });

export const selectMentorById = (buddyId: string) =>
  createSelector(
    selectMentors,
    mentors => mentors.data?.[buddyId] ?? undefined,
  );

export const { useGetMentorsQuery } = mentorsApi;
