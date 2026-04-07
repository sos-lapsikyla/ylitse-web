import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useAppSelector } from '@/store';
import {
  selectFilteredAndSortedUsers,
  SortOrder,
  UserFilter,
} from './selectors';
import {
  useGetManagedAccountsQuery,
  useGetManagedUsersQuery,
} from './userManagementApi';
import { useGetMentorsQuery } from '../MentorPage/mentorPageApi';

import { OUTER_VERTICAL_MARGIN, palette } from '@/components/constants';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';

import UserCardList from './components/List';
import { TextButton } from '@/components/Buttons';
import NewUserModal from './components/NewUserModal';
import { useEffect, useState } from 'react';
import FilterFunctions from './components/FilterFunctions';
import { Pagination, DEFAULT_PAGE_SIZE } from '@/components/Pagination';

const UsersPage = () => {
  const { t } = useTranslation('users');
  const { isMobile } = useGetLayoutMode();

  const { isLoading: isMentorsQueryLoading } = useGetMentorsQuery();
  const { isLoading: isManagedAccountsQueryLoading } =
    useGetManagedAccountsQuery();
  const { isLoading: isAccountsQueryLoading } = useGetManagedUsersQuery();

  const [filter, setFilter] = useState<UserFilter>('all');
  const [sort, setSort] = useState<SortOrder>('newest');
  const [search, setSearch] = useState('');

  const managedUsers = useAppSelector(
    selectFilteredAndSortedUsers(filter, sort, search),
  );
  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => setCurrentPage(1), [filter, sort, search]);

  const paginatedUsers = managedUsers.slice(
    (currentPage - 1) * DEFAULT_PAGE_SIZE,
    currentPage * DEFAULT_PAGE_SIZE,
  );

  const isLoading =
    isMentorsQueryLoading ||
    isAccountsQueryLoading ||
    isManagedAccountsQueryLoading;

  const PageContent = isLoading ? (
    <Spinner variant="large" />
  ) : (
    <>
      <PageHeader $isMobile={isMobile}>
        <TitleWrapper $isMobile={isMobile}>
          <Text variant="h1">{t('title')}</Text>
        </TitleWrapper>
        <ButtonWrapper $isMobile={isMobile}>
          <TextButton
            leftIcon="add"
            size="normal"
            onClick={() => setIsNewUserModalVisible(true)}
          >
            {t('newUser.title')}
          </TextButton>
        </ButtonWrapper>
      </PageHeader>
      <FilterContainer $isMobile={isMobile}>
        <FilterFunctions
          search={search}
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
          onSearchChange={setSearch}
        />
      </FilterContainer>
      {isNewUserModalVisible && (
        <NewUserModal
          onDismiss={() => setIsNewUserModalVisible(false)}
        ></NewUserModal>
      )}
      <UserCardList managedUsers={paginatedUsers}></UserCardList>
      <Pagination
        totalCount={managedUsers.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );

  return <Container $isMobile={isMobile}>{PageContent}</Container>;
};

const Container = styled.div<{ $isMobile: boolean }>`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: 95rem;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 100%;
        `
      : css`
          width: 90%;
        `}
`;

const FilterContainer = styled.div<{ $isMobile: boolean }>`
  background-color: white;
  border-radius: 0 0 10px 10px;
  max-height: 8rem;
  width: 100%;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          max-height: 20rem;
          padding-top: -1rem;
        `
      : css`
          padding-top: 1rem;
        `}
`;

const PageHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  margin-bottom: -1rem;
  max-width: 95rem;
  position: relative;
  width: 100%;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          background-color: ${palette.white};
          flex-direction: column;
          gap: 2rem;
          margin-top: -3rem;
          padding: 2rem 6rem;
        `
      : css`
          align-items: center;
          background-color: ${palette.blue2};
          border-radius: 10px;
          height: 80px;
          justify-content: center;
          max-height: 80px;
        `}
`;

const TitleWrapper = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    !$isMobile
      ? css`
          left: 50%;
          position: absolute;
          transform: translateX(-50%);
        `
      : css`
          padding-left: 2rem;
        `};
`;

const ButtonWrapper = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    !$isMobile &&
    css`
      margin-left: auto;
      padding-right: 2rem;
    `}
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      margin: 0 auto;
    `}
`;

export default UsersPage;
