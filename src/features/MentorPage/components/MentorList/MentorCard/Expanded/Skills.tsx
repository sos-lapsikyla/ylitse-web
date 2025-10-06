import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { SimpleChip } from '@/components/Chip';

type Props = {
  skills: Array<string>;
};

export const Skills = ({ skills }: Props) => {
  const { t } = useTranslation('mentors');
  return (
    <Container>
      <Header variant="h3">{t('card.skills')}</Header>
      <Chips>
        {skills.map(skill => (
          <SimpleChip key={skill} text={skill} />
        ))}
      </Chips>
    </Container>
  );
};

const Container = styled.div`
  height: fit-content;
`;

const Chips = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
  width: 100%;
  height: fit-content;
  margin-top: 1em;
  margin-bottom: 5vw;
  overflow: hidden;
`;

const Header = styled(Text)`
  margin-top: 3rem;
`;
