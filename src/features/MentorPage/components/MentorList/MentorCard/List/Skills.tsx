import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { palette } from '@/components/variables';
import Text from '@/components/Text';

export const Skills = ({ skills }: { skills: Array<string> }) => {
  const { t } = useTranslation('mentors');
  return (
    <Container>
      <Text variant="h3">{t('card.skills')}</Text>
      <Chips>
        {skills.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </Chips>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: fit-content;
  max-height: 8.6rem;
`;

const Chips = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  height: 6rem;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
  width: 100%;
  &:after {
    background: linear-gradient(transparent, ${palette.white});
    content: '';
    display: block;
    height: 2.5rem;
    position: absolute;
    top: 3.5rem;
    width: 100%;
  }
`;
