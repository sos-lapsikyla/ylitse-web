import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/constants';
import Text from '@/components/Text';

type Props = {
  isMobile?: boolean;
};

const Announcements = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  return (
    <Container $isDesktop={!isMobile}>
      <Text variant="h2">{t('announcements.title')}</Text>
      <Text variant="blueBox">{t('announcements.notice1')}</Text>
    </Container>
  );
};

const Container = styled.div<{ $isDesktop: boolean }>`
  background-color: ${palette.white};
  gap: 1rem;
  padding: ${({ $isDesktop }) => ($isDesktop ? '2rem' : '3rem 2rem 4rem 2rem')};

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    `}
`;

export default Announcements;
