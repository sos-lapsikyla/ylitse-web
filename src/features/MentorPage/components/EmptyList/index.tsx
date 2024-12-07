import NoMentors from './NoMentors';
import SearchTips from './SearchTips';
import styled from 'styled-components';

const EmptyMentorList = () => {
  return (
    <Container>
      <NoMentors></NoMentors>
      <SearchTips></SearchTips>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  margin: 2rem;
`;

export default EmptyMentorList;
