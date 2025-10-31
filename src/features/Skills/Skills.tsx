import styled from 'styled-components';
import { Skill } from './models';

type Props = {
  skills: Array<Skill>;
};

const Skills: React.FC<Props> = ({ skills }: Props) => {
  return (
    <Container>
      <ul>
        {Object.values(skills).map(skill => (
          <li key={skill.id}>{skill.name}</li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

export default Skills;
