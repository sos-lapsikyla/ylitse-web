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

import UserCardList from './components/List';
import { TextButton } from '@/components/Buttons';
import NewUserModal from './components/NewUserModal';
import { useState } from 'react';

const UsersPage = () => {
  const { t } = useTranslation('users');
  const { isMobile } = useGetLayoutMode();

  const { isLoading: isMentorsQueryLoading } = useGetMentorsQuery();
  const { isLoading: isManagedAccountsQueryLoading } =
    useGetManagedAccountsQuery();
  const { isLoading: isAccountsQueryLoading } = useGetManagedUsersQuery();
  const managedUsers = useAppSelector(selectAllManagedUsers());
  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);

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
      {isNewUserModalVisible && (
        <NewUserModal
          onDismiss={() => setIsNewUserModalVisible(false)}
        ></NewUserModal>
      )}
      <UserCardList managedUsers={managedUsers}></UserCardList>
    </>
  );

  return (
    <PageWithTransition>
      <Container $isMobile={isMobile}>{PageContent}</Container>
    </PageWithTransition>
  );
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

const PageHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  margin-bottom: 1rem;
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
