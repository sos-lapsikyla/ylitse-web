import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';

const SearchTips = () => {
  const { t } = useTranslation('mentors');

  return (
    <Container>
      <Text variant="h2">{t('empty.tips.title')}</Text>
      <InnerContainer>
        <Text variant="blueBox">{t('empty.tips.tip1')}</Text>
        <Text variant="blueBox">{t('empty.tips.tip2')}</Text>
        <Text variant="blueBox">{t('empty.tips.tip3')}</Text>
      </InnerContainer>
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
  height: 423px;
  justify-content: center;
  width: 642px;
`;
const InnerContainer = styled.div`
  width: 580px;
`;

export default SearchTips;
