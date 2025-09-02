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

const UsersPage = () => {
  const { t } = useTranslation('users');
  const { isTablet } = useGetLayoutMode();

  return (
    <PageWithTransition>
      <Container isMobile={isTablet}>
        <Header isMobile={isTablet}>
          <Text variant="h1">{t('title')}</Text>
        </Header>
      </Container>
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
          max-width: ${CONTENT_WIDTH};
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
