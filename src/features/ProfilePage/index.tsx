import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { selectIsMentor } from '../Authentication/selectors';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import AccountInfo from './components/AccountInfo';
import {
  CONTENT_WIDTH,
  OUTER_VERTICAL_MARGIN,
  palette,
} from '@/components/constants';
import PageWithTransition from '@/components/PageWithTransition';
import PublicInfo from './components/PublicInfo';
import Text from '@/components/Text';

const ProfilePage = () => {
  const { t } = useTranslation('profile');
  const { isTablet } = useGetLayoutMode();
  const isMentor = useAppSelector(selectIsMentor);

  return (
    <PageWithTransition>
      {isMentor ? (
        <Container $isMobile={isTablet}>
          <Header $isMobile={isTablet}>
            <Text variant="h1">{t('title')}</Text>
          </Header>
          <Content $isMobile={isTablet}>
            <AccountInfo isMobile={isTablet} />
            <PublicInfo isMobile={isTablet} />
          </Content>
        </Container>
      ) : (
        <AccountInfo isMobile={isTablet} />
      )}
    </PageWithTransition>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 100%;
          padding-top: 3rem;
          padding-bottom: 8rem;
          background-color: ${palette.white};
        `
      : css`
          gap: 1rem;
          width: ${CONTENT_WIDTH};
          max-width: ${CONTENT_WIDTH};
          margin: ${OUTER_VERTICAL_MARGIN} auto;
        `}
`;

const Header = styled.div<{ $isMobile: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  ${({ $isMobile }) =>
    !$isMobile &&
    css`
      align-items: center;
      height: 4rem;
      background-color: ${palette.blue2};
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
    `}
`;

const Content = styled.div<{ $isMobile: boolean }>`
  display: flex;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          flex-direction: column;
        `
      : css`
          gap: 1.5rem;
        `}
`;

export default ProfilePage;
