import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('<Pagination />', () => {
  it('returns null when only one page', () => {
    const { container } = render(
      <Pagination
        totalCount={5}
        currentPage={1}
        pageSize={10}
        onPageChange={jest.fn()}
      />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders page buttons', () => {
    const { getAllByLabelText } = render(
      <Pagination
        totalCount={30}
        currentPage={1}
        pageSize={10}
        onPageChange={jest.fn()}
      />,
    );
    expect(getAllByLabelText('pagination.page')).toHaveLength(3);
  });

  it('does not show prev button on first page', () => {
    const { queryByLabelText, getByLabelText } = render(
      <Pagination
        totalCount={30}
        currentPage={1}
        pageSize={10}
        onPageChange={jest.fn()}
      />,
    );
    expect(queryByLabelText('pagination.previous')).not.toBeInTheDocument();
    expect(getByLabelText('pagination.next')).toBeInTheDocument();
  });

  it('does not show next button on last page', () => {
    const { getByLabelText, queryByLabelText } = render(
      <Pagination
        totalCount={30}
        currentPage={3}
        pageSize={10}
        onPageChange={jest.fn()}
      />,
    );
    expect(getByLabelText('pagination.previous')).toBeInTheDocument();
    expect(queryByLabelText('pagination.next')).not.toBeInTheDocument();
  });

  it('calls onPageChange when a page button is clicked', async () => {
    const onPageChange = jest.fn();
    const { getAllByLabelText } = render(
      <Pagination
        totalCount={30}
        currentPage={1}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );
    await userEvent.click(getAllByLabelText('pagination.page')[1]);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when next is clicked', async () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination
        totalCount={30}
        currentPage={1}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );
    await userEvent.click(getByLabelText('pagination.next'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with prev page when prev is clicked', async () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <Pagination
        totalCount={30}
        currentPage={2}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );
    await userEvent.click(getByLabelText('pagination.previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('marks current page with aria-current', () => {
    const { getAllByLabelText } = render(
      <Pagination
        totalCount={30}
        currentPage={2}
        pageSize={10}
        onPageChange={jest.fn()}
      />,
    );
    expect(getAllByLabelText('pagination.page')[1]).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(getAllByLabelText('pagination.page')[0]).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('renders nav with aria-label', () => {
    const { getByRole } = render(
      <Pagination
        totalCount={30}
        currentPage={1}
        pageSize={10}
        onPageChange={jest.fn()}
      />,
    );
    expect(
      getByRole('navigation', { name: 'pagination.label' }),
    ).toBeInTheDocument();
  });
});
