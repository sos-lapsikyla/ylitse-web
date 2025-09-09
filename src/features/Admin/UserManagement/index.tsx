import { useState } from 'react';

import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import {
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  palette,
} from '@/components/constants';
import PageWithTransition from '@/components/PageWithTransition';
import Text from '@/components/Text';
import { useAppSelector } from '@/store';
import { selectAllManagedUsers } from '../UserManagement/selectors';
import { useGetManagedUsersQuery } from './userManagementApi';
import type { ManagedUser } from './models';
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  ${({ isMobile }) =>
    isMobile
      ? css`
          background-color: ${palette.white};
          padding-bottom: 8rem;
          padding-top: 3rem;
          width: 100%;
        `
      : css`
          gap: 1rem;
          margin: ${OUTER_VERTICAL_MARGIN} auto;
          max-width: 92.5rem;
          width: ${CONTENT_WIDTH};
        `}
`;

const PageHeader = styled.div<{ isMobile: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  ${({ isMobile }) =>
    !isMobile &&
    css`
      align-items: center;
      background-color: ${palette.blue2};
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      height: 4rem;
    `}
`;

export default UsersPage;
