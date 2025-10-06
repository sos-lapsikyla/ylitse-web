import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { SimpleChip } from '@/components/Chip';
import { palette } from '@/components/constants';
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
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
  width: 100%;
  height: 6rem;
  overflow: hidden;

  &::after {
    position: absolute;
    top: 3.5rem;
    display: block;
    width: 100%;
    height: 2.5rem;
    content: '';
    background: linear-gradient(transparent, ${palette.white});
  }
`;
