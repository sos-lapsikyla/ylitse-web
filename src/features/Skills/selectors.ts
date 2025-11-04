import { createSelector } from 'reselect';
import { skillsApi } from './skillsApi';

export const selectSkills = skillsApi.endpoints.getSkills.select();

export const selectAllSkills = () =>
  createSelector(selectSkills, skillsQuery => {
    const skillsMap = skillsQuery.data ?? {};
    return Object.values(skillsMap);
  });

export const selectSkillNames = () =>
  createSelector(selectAllSkills(), skills =>
    Object.values(skills).map(skill => skill.name),
  );
