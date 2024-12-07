import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';

const NoMentors = () => {
  const { t } = useTranslation('mentors');

  return (
    <Container>
      <Text variant="h2">{t('empty.title')}</Text>
      <Text>{t('empty.description')}</Text>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: 159px;
  justify-content: center;
  width: 606px;
`;

export default NoMentors;
