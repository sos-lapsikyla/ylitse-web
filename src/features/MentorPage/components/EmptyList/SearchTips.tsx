import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation, Trans } from 'react-i18next';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';

const SearchTips = () => {
  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  return (
    <Container $isMobile={isMobile}>
      <Text variant="h2">{t('empty.tips.title')}</Text>
      <InnerContainer $isMobile={isMobile}>
        <Text variant="blueBox">
          <Trans t={t} i18nKey="empty.tips.tip1" />
        </Text>
        <Text variant="blueBox">{t('empty.tips.tip2')}</Text>
        <Text variant="blueBox">{t('empty.tips.tip3')}</Text>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
  height: 26.5rem;
  padding: 0 0 0 3rem;
  background-color: ${palette.white};

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 100vw;
          padding-top: 2rem;
        `
      : css`
          width: 40rem;
          border-radius: 10px;
          box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%);
        `}
`;
const InnerContainer = styled.div<{ $isMobile: boolean }>`
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 88vw;
        `
      : css`
          width: 36rem;
        `}
`;

export default SearchTips;
