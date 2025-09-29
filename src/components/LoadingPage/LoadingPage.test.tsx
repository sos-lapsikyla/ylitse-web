import { render } from '@testing-library/react';
import LoadingPage from './LoadingPage';

it('Loading page is rendered correctly', () => {
  const { queryAllByText } = render(<LoadingPage />);
  expect(queryAllByText('Ladataan Ylitse MentorApp -palvelua')).toBeTruthy();
});
