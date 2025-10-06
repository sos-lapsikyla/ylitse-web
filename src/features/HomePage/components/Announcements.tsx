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
  gap: 1rem;
  padding: ${({ $isDesktop }) => ($isDesktop ? '2rem' : '3rem 2rem 4rem 2rem')};
  background-color: ${palette.white};

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
    `}
`;

export default Announcements;
