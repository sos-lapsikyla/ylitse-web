import { useState } from 'react';

import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import {
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  palette,
  spacing,
} from '@/components/constants';
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
  const { isTabletNarrow } = useGetLayoutMode();
  const managedUsers = useAppSelector(selectAllManagedUsers());
  const { isLoading } = useGetManagedUsersQuery();
  const [selectedManagedUser, setSelectedManagedUser] =
    useState<ManagedUser | null>(null);

  console.log(selectedManagedUser);

  const PageContent = isLoading ? (
    <Spinner variant="large" />
  ) : (
    <>
      <PageHeader isMobile={isTabletNarrow}>
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
      <Container isMobile={isTabletNarrow}>{PageContent}</Container>
    </PageWithTransition>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  margin: ${OUTER_VERTICAL_MARGIN} auto;
  max-width: ${CONTENT_WIDTH};
  width: ${CONTENT_WIDTH};
  ${({ isMobile }) =>
    isMobile
      ? css`
          background-color: ${palette.blueLight};
          flex: 1;
          padding-bottom: 4rem;
          width: 100%;
        `
      : css`
          gap: 1rem;
          margin: ${OUTER_VERTICAL_MARGIN} auto;
          max-width: 92.5rem;
          width: ${CONTENT_WIDTH};
        `}
  @media screen and (max-width: 1500px) {
    max-width: calc(100vw - (${spacing.layout_spacing} * 2));
    width: 1130px;
  }
`;

const PageHeader = styled.div<{ isMobile: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  ${({ isMobile }) =>
    isMobile
      ? css`
          background-color: ${palette.blueLight};
          height: 6rem;
          margin-bottom: -2rem;
          width: 100%;
        `
      : css`
          background-color: ${palette.blue2};
          border-radius: 10px;
          height: 80px;
          max-height: 80px;
        `}
`;

export default UsersPage;
