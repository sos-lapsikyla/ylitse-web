import * as D from 'io-ts/Decoder';

const skillCodec = D.struct({
  id: D.string,
  name: D.string,
  active: D.boolean,
  updated: D.string,
  created: D.string,
});
type ApiSkill = D.TypeOf<typeof skillCodec>;

export const skillListResponseType = D.struct({
  resources: D.array(skillCodec),
});

type SkillsResponse = D.TypeOf<typeof skillListResponseType>;

export type Skill = ReturnType<typeof toSkill>;

const toSkill = ({ id, name }: ApiSkill) => ({
  id,
  name,
});

export type Skills = Record<string, Skill>;

export const toSkillMap = ({ resources }: SkillsResponse): Skills =>
  resources.reduce<Skills>((acc, apiSkill) => {
    const skill = toSkill(apiSkill);
    acc[skill.id] = skill;
    return acc;
  }, {});
