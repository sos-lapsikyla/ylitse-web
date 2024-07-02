import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

const Announcements = () => {
  const { t } = useTranslation('home');

  return (
    <Container>
      <Text variant="h2">{t('announcements.title')}</Text>
      <Announcement>{t('announcements.notice1')}</Announcement>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 2rem;
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
