import { DropdownMenu } from '@/components/Dropdown';
import SearchBar from '@/components/SearchBar';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import styled, { css } from 'styled-components';
import {
  SortOrder,
  UserFilter,
} from '../selectors';
import { useTranslation } from 'react-i18next';

type Props = {
  search: string;
  onFilterChange: (f: UserFilter) => void;
  onSortChange: (s: SortOrder) => void;
  onSearchChange: (s: string) => void;
};

const FilterFunctions: React.FC<Props> = ({
  search,
  onFilterChange,
  onSearchChange,
  onSortChange,
}) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('users');

  const filterOptions = [
    { text: t('filterUsers.filterByRole.all'), value: 'all' },
    { text: t('filterUsers.filterByRole.mentees'), value: 'mentees' },
    { text: t('filterUsers.filterByRole.mentors'), value: 'mentors' },
    { text: t('filterUsers.filterByRole.both'), value: 'both' },
  ];
  const sortOptions = [
    { text: t('filterUsers.sort.newest'), value: 'newest' },
    { text: t('filterUsers.sort.oldest'), value: 'oldest' },
  ];

  return (
    <Container $isMobile={isMobile}>
      <ItemWrapper>
        <SearchBar
          onChange={onSearchChange}
          placeholder={t('filterUsers.search.placeholder')}
          value={search}
          variant="narrow"
          label={t('filterUsers.search.label')}
        ></SearchBar>
      </ItemWrapper>
      <ItemWrapper>
        <DropdownMenu
          placeholder={t('filterUsers.filterByRole.all')}
          options={filterOptions.map(o => o.text)}
          selectOption={option => {
            const selected = filterOptions.find(o => o.text === option);
            if (selected) {
              onFilterChange(selected.value as UserFilter);
            }
          }}
          label={t('filterUsers.filterByRole.label')}
        />
      </ItemWrapper>
      <ItemWrapper>
        <DropdownMenu
          placeholder={t('filterUsers.sort.newest')}
          options={sortOptions.map(o => o.text)}
          selectOption={option => {
            const selected = sortOptions.find(o => o.text === option);
            if (selected) {
              onSortChange(selected.value as SortOrder);
            }
          }}
          label={t('filterUsers.sort.label')}
        />
      </ItemWrapper>
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  justify-content: space-between;
  gap: 2rem;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      flex-direction: column;
      gap: 0;
      max-width: 100%;
    `}
`;

const ItemWrapper = styled.div`
  width: 100%;
`;

export default FilterFunctions;
