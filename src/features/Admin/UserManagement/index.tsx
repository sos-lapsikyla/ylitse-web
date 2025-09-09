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

const UsersPage = () => {
  const { t } = useTranslation('users');
  const { isTablet, isMobile } = useGetLayoutMode();
  const managedUsers = useAppSelector(selectAllManagedUsers());
  const { isLoading } = useGetManagedUsersQuery();
  const [selectedManagedUser, setSelectedManagedUser] =
    useState<ManagedUser | null>(null);

  console.log(selectedManagedUser);

  const PageContent = isLoading ? (
    <PageWithTransition>
      <Container isMobile={isTablet}></Container>
    </PageWithTransition>
  ) : (
    <>
      <Header isMobile={isTablet}>
        <Text variant="h1">{t('title')}</Text>
      </Header>
      <UserCardList
        managedUsers={managedUsers}
        setVisibleCard={setSelectedManagedUser}
      ></UserCardList>
    </>
  );

  return (
    <PageWithTransition>
      {isMobile ? (
        PageContent
      ) : (
        <Container isMobile={isTablet}>{PageContent}</Container>
      )}
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

const Header = styled.div<{ isMobile: boolean }>`
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
