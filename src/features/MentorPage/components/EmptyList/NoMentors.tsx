import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';

const NoMentors = () => {
  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  return (
    <Container $isMobile={isMobile}>
      <InnerContainer $isMobile={isMobile}>
        <CenteredText variant="h2">{t('empty.title')}</CenteredText>
        <CenteredText>{t('empty.description')}</CenteredText>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 38rem;
  height: 10rem;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 90vw;
          margin-top: -1rem;
        `
      : css`
          width: 38rem;
        `}
`;

const CenteredText = styled(Text)`
  text-align: center;
`;

const InnerContainer = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          padding: 0 1rem;
        `
      : css`
          padding: 0;
        `}
`;

export default NoMentors;
