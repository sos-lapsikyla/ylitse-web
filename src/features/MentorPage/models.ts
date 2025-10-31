import * as D from 'io-ts/Decoder';

export type ApiMentor = D.TypeOf<typeof mentorCodec>;

export const mentorCodec = D.struct({
  account_id: D.string,
  active: D.boolean,
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

export const mentorListResponseType = D.struct({
  resources: D.array(mentorCodec),
});
export type MentorsResponse = D.TypeOf<typeof mentorListResponseType>;

export type Mentor = ReturnType<typeof toMentor>;

export const toMentor = ({
  birth_year,
  communication_channels,
  created,
  display_name,
  gender,
  id,
  is_vacationing,
  languages,
  region,
  skills,
  status_message,
  story,
  user_id,
}: ApiMentor) => ({
  age: new Date().getFullYear() - birth_year,
  buddyId: user_id,
  communicationChannels: communication_channels,
  created,
  gender,
  isVacationing: is_vacationing,
  languages,
  mentorId: id,
  name: display_name,
  region,
  skills,
  statusMessage: status_message,
  story,
});

export const toMentorRecord = ({ resources }: MentorsResponse) =>
  resources.reduce((acc: Mentors, apiMentor) => {
    const mentor: Mentor = toMentor(apiMentor);
    return { ...acc, [mentor.buddyId]: mentor };
  }, {});

export type Mentors = Record<string, Mentor>;
