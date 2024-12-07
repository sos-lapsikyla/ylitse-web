import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';

const SearchTips = () => {
  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  return (
    <Container isMobile={isMobile}>
      <Text variant="h2">{t('empty.tips.title')}</Text>
      <InnerContainer isMobile={isMobile}>
        <Text variant="blueBox">{t('empty.tips.tip1')}</Text>
        <Text variant="blueBox">{t('empty.tips.tip2')}</Text>
        <Text variant="blueBox">{t('empty.tips.tip3')}</Text>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 26.5rem;
  justify-content: center;
  padding: 0 0 0 3rem;
  ${({ isMobile }) =>
    isMobile
      ? css`
          padding-top: 2rem;
          width: 100vw;
        `
      : css`
          border-radius: 10px;
          box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
          width: 40rem;
        `}
`;
const InnerContainer = styled.div<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 90vw;
        `
      : css`
          width: 36rem;
        `}
`;

export default SearchTips;
