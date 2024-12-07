import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import styled, { css } from 'styled-components';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';

const NoMentors = () => {
  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  return (
    <Container isMobile={isMobile}>
      <CenteredText variant="h2">{t('empty.title')}</CenteredText>
      <CenteredText>{t('empty.description')}</CenteredText>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 10rem;
  justify-content: center;
  width: 38rem;
  ${({ isMobile }) =>
    isMobile
      ? css`
          margin-top: -1rem;
          width: 90vw;
        `
      : css`
          width: 38rem;
        `}
`;

const CenteredText = styled(Text)`
  text-align: center;
`;

export default NoMentors;
