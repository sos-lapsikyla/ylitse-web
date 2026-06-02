import { getPopularSkills } from './selectors';
import { type Mentors } from './models';

const mentors: Mentors = {
  user_1: {
    age: 30,
    buddyId: 'user_1',
    communicationChannels: [],
    created: '2024-01-01',
    gender: 'other',
    isVacationing: false,
    languages: ['fi'],
    mentorId: 'mentor_1',
    name: 'Mentor A',
    region: 'Helsinki',
    skills: ['Ahdistus', 'Masennus', 'Ahdistus'],
    statusMessage: '',
    story: '',
  },
  user_2: {
    age: 25,
    buddyId: 'user_2',
    communicationChannels: [],
    created: '2024-01-02',
    gender: 'other',
    isVacationing: false,
    languages: ['Finnish'],
    mentorId: 'mentor_2',
    name: 'Mentor B',
    region: 'Tampere',
    skills: ['Ahdistus', 'Itsenäistyminen'],
    statusMessage: '',
    story: '',
  },
  user_3: {
    age: 28,
    buddyId: 'user_3',
    communicationChannels: [],
    created: '2024-01-03',
    gender: 'other',
    isVacationing: false,
    languages: ['en'],
    mentorId: 'mentor_3',
    name: 'Mentor C',
    region: 'Oulu',
    skills: ['Loneliness', 'Depression'],
    statusMessage: '',
    story: '',
  },
  user_4: {
    age: 35,
    buddyId: 'user_4',
    communicationChannels: [],
    created: '2024-01-04',
    gender: 'other',
    isVacationing: false,
    languages: ['English'],
    mentorId: 'mentor_4',
    name: 'Mentor D',
    region: 'Turku',
    skills: ['Depression', 'Eating disorders'],
    statusMessage: '',
    story: '',
  },
};

describe('getPopularSkills', () => {
  it('returns skills from all mentors when no language is provided', () => {
    const result = getPopularSkills(mentors, 10);

    expect(result).toContain('Ahdistus');
    expect(result).toContain('Masennus');
    expect(result).toContain('Itsenäistyminen');
    expect(result).toContain('Loneliness');
    expect(result).toContain('Depression');
    expect(result).toContain('Eating disorders');
    expect(result.length).toBe(6);
  });

  it('returns skills sorted by frequency', () => {
    const result = getPopularSkills(mentors, 10);

    expect(result[0]).toBe('Ahdistus');
    expect(result[1]).toBe('Depression');
    expect(result[2]).toBe('Masennus');
  });

  it('limits results to the requested amount', () => {
    const result = getPopularSkills(mentors, 2);

    expect(result.length).toBe(2);
  });

  it('filters by locale code (e.g. fi)', () => {
    const result = getPopularSkills(mentors, 10, 'fi');

    expect(result).toContain('Ahdistus');
    expect(result).toContain('Masennus');
    expect(result).toContain('Itsenäistyminen');
    expect(result).not.toContain('Loneliness');
    expect(result).not.toContain('Eating disorders');
  });

  it('matches full language name (e.g. Finnish) for locale code fi', () => {
    const result = getPopularSkills(mentors, 10, 'fi');

    // Mentor B has languages: ['Finnish'] and should match locale 'fi'
    expect(result).toContain('Itsenäistyminen');
  });

  it('filters by English locale code', () => {
    const result = getPopularSkills(mentors, 10, 'en');

    expect(result).toContain('Loneliness');
    expect(result).toContain('Depression');
    expect(result).toContain('Eating disorders');
    expect(result).not.toContain('Ahdistus');
    expect(result).not.toContain('Itsenäistyminen');
  });

  it('returns empty array when no mentors match the language', () => {
    const result = getPopularSkills(mentors, 10, 'sv');

    expect(result).toEqual([]);
  });

  it('returns empty array when there are no mentors', () => {
    const result = getPopularSkills({}, 10, 'fi');

    expect(result).toEqual([]);
  });
});
