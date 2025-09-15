import { useState } from 'react';

import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { OUTER_VERTICAL_MARGIN, palette } from '@/components/constants';
import PageWithTransition from '@/components/PageWithTransition';
import Text from '@/components/Text';
import { useAppSelector } from '@/store';
import { selectAllManagedUsers } from '../UserManagement/selectors';
import { useGetManagedUsersQuery } from '././userManagementApi';
import type { ManagedUser } from '../UserManagement/models';
import UserCardList from './components/List';
import Spinner from '@/components/Spinner';

const UsersPage = () => {
  const { t } = useTranslation('users');
  const { isMobile } = useGetLayoutMode();
  const managedUsers = useAppSelector(selectAllManagedUsers());
  const { isLoading } = useGetManagedUsersQuery();
  const [selectedManagedUser, setSelectedManagedUser] =
    useState<ManagedUser | null>(null);

  console.log(selectedManagedUser);

  const PageContent = isLoading ? (
    <Spinner variant="large" />
  ) : (
    <>
      <PageHeader isMobile={isMobile}>
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
      <Container isMobile={isMobile}>{PageContent}</Container>
    </PageWithTransition>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: 95rem;
  width: 100%;

  ${({ isMobile }) =>
    isMobile
      ? css`
          background-color: ${palette.blueLight};
          flex: 1;
          padding-bottom: 4rem;
        `
      : css`
          gap: 1rem;
          width: 90vw;
        `}
`;

const PageHeader = styled.div<{ isMobile: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  max-width: 95rem;
  width: 100%;

  ${({ isMobile }) =>
    isMobile
      ? css`
          background-color: ${palette.blueLight};
          height: 6rem;
          margin-bottom: -2rem;
        `
      : css`
          background-color: ${palette.blue2};
          border-radius: 10px;
          height: 80px;
          max-height: 80px;
        `}
`;

export default UsersPage;
