import AppToaster from '@/components/Toaster';
import MentorPage from '.';
import { server } from '@/test/server';
import { renderWithProviders } from '@/test/testStore';
import { http, delay, HttpResponse } from 'msw';

const mentorsResponse = {
  resources: [
    {
      account_id: 'account_id_1',
      active: true,
      birth_year: 1991,
      communication_channels: [],
      created: '2020-01-01T00:00:00.000000',
      display_name: 'Nick',
      gender: 'male',
      id: 'id_1',
      is_vacationing: false,
      languages: ['fi'],
      region: 'Helsinki',
      skills: ['Belly dancing'],
      status_message: `I'm here`,
      story: `I'm a mentor`,
      user_id: 'user_id_1',
    },
    {
      account_id: 'account_id_2',
      active: true,
      birth_year: 1998,
      communication_channels: [],
      created: '2022-02-02T00:00:00.000000',
      display_name: 'Duffel',
      gender: 'female',
      id: 'id_2',
      is_vacationing: true,
      languages: ['fi'],
      region: 'Vantaa',
      skills: ['Juggling'],
      status_message: `I'm back next week`,
      story: 'I help',
      user_id: 'user_id_2',
    },
  ],
};

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => {
      return {
        matches: true,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    }),
  });
});

// Disable API mocking after the tests are done.
afterAll(() => server.close());

server.use(
  http.get('api/mentors', async () => {
    await delay(1000);
    return HttpResponse.json(mentorsResponse);
  }),
);

describe('<MentorPage />', () => {
  it('displays fetched mentors in list and can open the card for more information', async () => {
    const {
      user,
      getByRole,
      queryByRole,
      findByRole,
      getByText,
      getAllByRole,
    } = renderWithProviders(
      <>
        <MentorPage />
        <AppToaster />
      </>,
    );

    // should be loading initially
    expect(await findByRole('progressbar')).toBeInTheDocument();

    // after some time, the mentors should be received
    expect(await findByRole('heading', { name: 'title' })).toBeInTheDocument();

    // no error notification is displayed on screen
    expect(queryByRole('notification')).not.toBeInTheDocument();

    // see that mentorResponse-mentor is found from list
    const mentorText = getByText(mentorsResponse.resources[0].display_name);
    expect(mentorText).toBeInTheDocument();

    // open the card for more information
    const openMentorCardButtons = getAllByRole('button', {
      name: 'card.open',
    });
    await user.click(openMentorCardButtons[0]);
    const openChatButton = getByText('card.chat');
    expect(openChatButton).toBeInTheDocument();

    // close the mentorcard again
    const closeButton = getByRole('button', { name: 'closeWithBackground' });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  it('displays fetched mentors in list and can filter by skills', async () => {
    const {
      user,
      getByRole,
      findByRole,
      findByText,
      queryByText,
      findAllByRole,
    } = renderWithProviders(<MentorPage />);

    // should be loading initially
    expect(await findByRole('progressbar')).toBeInTheDocument();

    // after some time, the mentors should be received
    expect(await findByRole('heading', { name: 'title' })).toBeInTheDocument();

    // show the filters
    const showFiltersButton = getByRole('button', { name: /filter/i });
    user.click(showFiltersButton);
    await findByText(/filters.clear/i);

    // click the skill
    // There is one pill in the skill-list, and one in the mentor-card
    const skillPills = await findAllByRole('button', {
      name: mentorsResponse.resources[0].skills[0],
    });

    await user.click(skillPills[0]);

    // other mentor is shown on the list, but other one is not
    const mentorWithSkill = queryByText(
      mentorsResponse.resources[0].display_name,
    );
    expect(mentorWithSkill).toBeInTheDocument();

    const mentorWithoutSkill = queryByText(
      mentorsResponse.resources[1].display_name,
    );
    expect(mentorWithoutSkill).not.toBeInTheDocument();
  });

  it('displays fetched mentors in list and can filter by searchString', async () => {
    const { user, findByRole, queryByText } = renderWithProviders(
      <MentorPage />,
    );

    // should be loading initially
    expect(await findByRole('progressbar')).toBeInTheDocument();

    // after some time, the mentors should be received
    expect(await findByRole('heading', { name: 'title' })).toBeInTheDocument();

    // write a search-string
    const searchInput = await findByRole('textbox');
    await user.click(searchInput);
    await user.keyboard(mentorsResponse.resources[1].display_name);

    // other mentor is shown on the list, but other one is not
    const foundMentor = queryByText(mentorsResponse.resources[1].display_name);
    expect(foundMentor).toBeInTheDocument();

    const notFoundMentor = queryByText(
      mentorsResponse.resources[0].display_name,
    );
    expect(notFoundMentor).not.toBeInTheDocument();
  });

  it('wont display mentors if response is not correct', async () => {
    server.use(
      http.get('api/mentors', async () => {
        await delay(1000);
        return HttpResponse.json([{ resources: [{ wrong: 'data' }] }]);
      }),
    );

    const { findByRole, queryAllByRole } = renderWithProviders(
      <>
        <MentorPage />
        <AppToaster />
      </>,
    );

    // should be loading initially
    expect(await findByRole('progressbar')).toBeInTheDocument();

    // the error notification is displayed on screen
    expect(await findByRole('notification')).toBeVisible();
    // and no mentors are shown
    expect(await findByRole('heading', { name: 'title' })).toBeInTheDocument();

    // no cards are rendered
    const openMentorCardButtons = queryAllByRole('button', {
      name: 'card.open',
    });

    expect(openMentorCardButtons.length).toBe(0);
  });
});
