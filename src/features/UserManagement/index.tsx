import { useState } from 'react';

import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useAppSelector } from '@/store';
import { selectAllManagedUsers } from '../UserManagement/selectors';
import {
  useGetManagedAccountsQuery,
  useGetManagedUsersQuery,
} from '././userManagementApi';
import { useGetMentorsQuery } from '../MentorPage/mentorPageApi';

import { OUTER_VERTICAL_MARGIN, palette } from '@/components/constants';
import PageWithTransition from '@/components/PageWithTransition';
import Text from '@/components/Text';
import Spinner from '@/components/Spinner';

import type { ManagedUser } from '../UserManagement/models';
import UserCardList from './components/List';

const UsersPage = () => {
  const { t } = useTranslation('users');
  const { isMobile } = useGetLayoutMode();
  const { isLoading: isMentorsQueryLoading } = useGetMentorsQuery();
  const { isLoading: isManagedAccountsQueryLoading } =
    useGetManagedAccountsQuery();
  const { isLoading: isAccountsQueryLoading } = useGetManagedUsersQuery();
  const managedUsers = useAppSelector(selectAllManagedUsers());
  const [selectedManagedUser, setSelectedManagedUser] =
    useState<ManagedUser | null>(null);

  const isLoading =
    isMentorsQueryLoading ||
    isAccountsQueryLoading ||
    isManagedAccountsQueryLoading;
  console.log(selectedManagedUser);

  const PageContent = isLoading ? (
    <Spinner variant="large" />
  ) : (
    <>
      <PageHeader $isMobile={isMobile}>
        <Text variant="h1">{t('title')}</Text>
      </PageHeader>
      <UserCardList
        managedUsers={managedUsers}
        setVisibleCard={setSelectedManagedUser}
      ></UserCardList>
    </>
  );

  return (
    <PageWithTransition>
      <Container $isMobile={isMobile}>{PageContent}</Container>
    </PageWithTransition>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 95rem;
  margin: ${OUTER_VERTICAL_MARGIN} auto;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          flex: 1;
          padding-bottom: 4rem;
          background-color: ${palette.blueLight};
        `
      : css`
          gap: 1rem;
          width: 90vw;
        `}
`;

const PageHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 95rem;
  margin-bottom: 1rem;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          height: 6rem;
          margin-bottom: -2rem;
          background-color: ${palette.blueLight};
        `
      : css`
          height: 80px;
          max-height: 80px;
          background-color: ${palette.blue2};
          border-radius: 10px;
        `}
`;

export default UsersPage;
