import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  NAVIGATION_HEIGHT,
  OUTER_HORIZONTAL_MARGIN,
  palette,
} from '@/components/variables';
import Text from '@/components/Text';

const Info = () => {
  const { t } = useTranslation('home');

  return (
    <Container>
      <Text variant="h1">{t('info.title')}</Text>
      <Text>{t('info.description1')}</Text>
      <Text>{t('info.description2')}</Text>
      <Text>{t('info.description3')}</Text>
      <Text>{t('info.description4')}</Text>
      <Text variant="bold">{t('info.description5')}</Text>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.blue2};
  border-bottom-right-radius: 275px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  height: calc(40rem - ${NAVIGATION_HEIGHT} - 2rem);
  left: calc(${OUTER_HORIZONTAL_MARGIN} - 2vw);
  max-width: 25vw;
  padding: 2rem;
  position: absolute;
  top: 2rem;
`;

export default Info;
