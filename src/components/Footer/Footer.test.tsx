import { render } from '@testing-library/react';
import Footer from './Footer';
import { BrowserRouter } from 'react-router';

describe('<Footer/>', () => {
  it('Footer bar is rendered correctly', () => {
    const { queryAllByText } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(queryAllByText('Palvelun tarjoaa')).toBeTruthy();
  });
});
