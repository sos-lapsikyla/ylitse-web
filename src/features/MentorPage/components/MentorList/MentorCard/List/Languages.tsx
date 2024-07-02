import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { Text } from '@/components/Text/Text';

export const Languages = ({ languages }: { languages: Array<string> }) => {
  const { t } = useTranslation('mentors');
  return (
    <Container>
      <Text variant="h3">{t('card.languages')}</Text>
      <Chips>
        {languages.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </Chips>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Chips = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: fit-content;
  justify-content: flex-start;
  max-height: 7rem;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
