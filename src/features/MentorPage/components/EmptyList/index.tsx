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
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

export default EmptyMentorList;
