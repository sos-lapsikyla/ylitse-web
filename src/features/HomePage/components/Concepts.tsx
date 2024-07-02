import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

const Concepts = () => {
  const { t } = useTranslation('home');

  return (
    <Container>
      <Text variant="h2">{t('concepts.title')}</Text>
      <Text>{t('concepts.description')} </Text>
      <InnerContainer>
        <Concept>
          <Name variant="bold">{t('concepts.concept1.name')}</Name>
          <Equals>{t('concepts.equals')}</Equals>
          <Definition>{t('concepts.concept1.definition')}</Definition>
        </Concept>
        <Concept>
          <Name variant="bold">{t('concepts.concept2.name')}</Name>
          <Equals>{t('concepts.equals')}</Equals>
          <Definition>{t('concepts.concept2.definition')}</Definition>
        </Concept>
        <Concept>
          <Name variant="bold">{t('concepts.concept3.name')}</Name>
          <Equals>{t('concepts.equals')}</Equals>
          <Definition>{t('concepts.concept3.definition')}</Definition>
        </Concept>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${palette.white};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Concept = styled.div`
  background-color: ${palette.blueWhite};
  display: flex;
  padding: 1rem;
`;

const Name = styled(Text)`
  white-space: nowrap;
`;

const Equals = styled(Text)`
  margin: 0 0.5rem;
`;

const Definition = styled(Text)`
  margin: 0;
`;

export default Concepts;
