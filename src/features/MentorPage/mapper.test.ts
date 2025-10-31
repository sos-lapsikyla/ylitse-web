import { mapSkills } from './selectors';
import { type Mentors } from '@/features/MentorPage/models';

const mentors: Mentors = {
  user_id_1: {
    age: 21,
    buddyId: '',
    communicationChannels: [],
    created: '',
    gender: '',
    isVacationing: true,
    languages: [],
    mentorId: '',
    name: '',
    region: '',
    skills: ['Belly dancing', 'ATK'],
    statusMessage: '',
    story: '',
  },
  user_id_2: {
    age: 21,
    buddyId: '',
    communicationChannels: [],
    created: '',
    gender: '',
    isVacationing: true,
    languages: [],
    mentorId: '',
    name: '',
    region: '',
    skills: ['Juggling', 'Yoga'],
    statusMessage: '',
    story: '',
  },
  user_id_4: {
    age: 21,
    buddyId: '',
    communicationChannels: [],
    created: '',
    gender: '',
    isVacationing: true,
    languages: [],
    mentorId: '',
    name: '',
    region: '',
    skills: ['Belly dancing', 'Juggling'],
    statusMessage: '',
    story: '',
  },
  user_id_5: {
    age: 21,
    buddyId: '',
    communicationChannels: [],
    created: '',
    gender: '',
    isVacationing: true,
    languages: [],
    mentorId: '',
    name: '',
    region: '',
    skills: ['Juggling', 'Frisbee throwing'],
    statusMessage: '',
    story: '',
  },
};

describe('mapSkills-function', () => {
  it('orders skills based on rarity', () => {
    const skills = mapSkills(mentors, []);
    expect(skills[0]).toBe('Juggling');
    expect(skills[1]).toBe('Belly dancing');
  });

  it('selected skills always first', () => {
    const skills = mapSkills(mentors, ['Frisbee throwing']);
    expect(skills[0]).toBe('Frisbee throwing');
  });

  it('if selected skill that is not on any mentor, it wont show up', () => {
    const skills = mapSkills(mentors, ['Non existing']);
    expect(skills[0]).not.toBe('Frisbee throwing');
    expect(skills.includes('Non existing')).toBe(false);
  });

  it('all skills are mapped once', () => {
    const skills = mapSkills(mentors, []);
    expect(skills.length).toBe(5);
  });

  it('if no mentors, no skills', () => {
    const skills = mapSkills({}, []);
    expect(skills.length).toBe(0);
  });

  it('if no skills, no skills', () => {
    const skills = mapSkills(
      Object.values(mentors).reduce((mentors, current) => {
        const updated = { ...current, skills: [] };
        return { ...mentors, [current.buddyId]: updated };
      }, {}),
      [],
    );
    expect(skills.length).toBe(0);
  });
});
