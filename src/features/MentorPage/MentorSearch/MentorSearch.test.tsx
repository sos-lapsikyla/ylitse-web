/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import MentorSearch from './MentorSearch';
import { BrowserRouter } from 'react-router-dom';

describe('<MentorSearch />', () => {
  it('Mentor search input is rendered correctly', () => {
    const { queryAllByLabelText } = render(
      <BrowserRouter>
        <MentorSearch />
      </BrowserRouter>,
    );
    expect(queryAllByLabelText('Etsi mentoria')).toBeTruthy();
  });
  it('Mentor search icon is rendered correctly', () => {
    const { queryAllByLabelText } = render(
      <BrowserRouter>
        <MentorSearch />
      </BrowserRouter>,
    );
    expect(queryAllByLabelText('Etsi mentoria icon')).toBeTruthy();
  });
});