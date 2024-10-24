import Navigation from './Navigation';
import { server } from '@/test/server';
import { rest } from 'msw';
import { renderWithStoreProvider } from '@/test/testStore';
import { act } from '@testing-library/react';
import { mentorsApi } from '../MentorPage/mentorPageApi';

const mentorsResponse = {
  resources: [],
};

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
  //eslint-disable-next-line no-global-assign
  window = Object.assign(window, { innerWidth: 1600 });
});

// Disable API mocking after the tests are done.
afterAll(() => {
  server.close();
  jest.useRealTimers();
});

server.use(
  rest.get(`api/mentors`, (_req, res, ctx) => {
    return res(ctx.json(mentorsResponse), ctx.delay(0));
  }),
);

describe('<Navigation/>', () => {
  it('Can navigate to other page', async () => {
    const { getByRole, findByRole, user, store } = renderWithStoreProvider(
      <Navigation />,
    );

    act(() => {
      store.dispatch(mentorsApi.endpoints.getMentors.initiate());
      jest.advanceTimersByTime(1000);
    });

    // Go to Chat-page
    const link = getByRole('link', { name: 'navigation.mentors' });
    user.click(link);

    // the mentors should be received
    const heading = await findByRole('heading', { name: 'title' });
    expect(heading).toBeInTheDocument();
  });
});
