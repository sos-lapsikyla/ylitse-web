import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isMobile?: boolean;
};

const Announcements = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  return (
    <Container isDesktop={!isMobile}>
      <Text variant="h2">{t('announcements.title')}</Text>
      <Announcement>{t('announcements.notice1')}</Announcement>
    </Container>
  );
};

const Container = styled.div<{ isDesktop: boolean }>`
  background-color: ${palette.white};
  padding: ${({ isDesktop }) => (isDesktop ? '2rem' : '3rem')};

  ${({ isDesktop }) =>
    isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    `}
`;

const Announcement = styled(Text)`
  background-color: ${palette.blueWhite};
  border-left: 10px white solid;
  box-shadow: -10px 0 0 0 ${palette.blue};
  left: 10px;
  margin-top: 1rem;
  padding: 1rem;
  position: relative;
`;

export default Announcements;
