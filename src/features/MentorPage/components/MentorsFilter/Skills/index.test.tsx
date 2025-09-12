import { renderWithProviders } from '@/test/testStore';
import SkillChips from './index';

describe('<MentorChips />', () => {
  const items: Array<string> = [
    'Juggling',
    'Bowling',
    'Belly dancing',
    'Hiking',
    'Snowboarding',
    'Sailing',
    'Soccer',
    'Communication',
    'Horseback riding',
    'Fax machinge repairing',
  ];

  const props = { onFiltersClose: jest.fn(), skills: items };

  it('Mentor chips are rendered correctly', () => {
    const { getAllByRole } = renderWithProviders(<SkillChips {...props} />);

    expect(getAllByRole('button').length).toBe(12);
  });

  it('Selecting skill will change the state', async () => {
    const { getByText, store, user } = renderWithProviders(
      <SkillChips {...props} />,
    );

    const skillPill = getByText(items[0]);

    await user.click(skillPill);

    expect(
      store.getState().mentorsFilter.selectedSkills.includes(items[0]),
    ).toEqual(true);
  });

  it('Selected chips are rendered correctly', () => {
    const { getByText } = renderWithProviders(<SkillChips {...props} />, {
      preloadedState: {
        mentorsFilter: { searchString: '', selectedSkills: [items[0]] },
      },
    });

    const selectedSkillPill = getByText(items[0]).closest('button');
    const notSelectedSkillPill = getByText(items[1]).closest('button');

    expect(selectedSkillPill).toHaveAttribute('aria-pressed', 'true');
    expect(notSelectedSkillPill).toHaveAttribute('aria-pressed', 'false');
  });
});
