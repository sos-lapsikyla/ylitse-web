import styled from 'styled-components';
import { SimpleChip } from '../../../../../components/Chip';
import { Text } from '../../../../../components/Text/Text';
import * as cssVariables from '../../../../../components/variables';

export const Skills = ({ skills }: { skills: Array<string> }) => {
  return (
    <Container>
      <Text variant="h3" style={{ margin: '1.5rem 0 0 0' }}>
        Voin auttaa myös näissä
      </Text>
      <SkillChips>
        {skills.map(item => (
          <SimpleChip key={item} text={item} />
        ))}
      </SkillChips>
    </Container>
  );
};

const Container = styled.div`
  height: fit-content;
  max-height: 8.6rem;
`;

const SkillChips = styled.div`
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  position: relative;
  height: 6rem;
  &:after {
    width: 100%;
    height: 2.5rem;
    content: '';
    display: block;
    position: absolute;
    top: 3.5rem;
    background: linear-gradient(transparent, ${cssVariables.palette.white});
  }
`;