import styled from 'styled-components';
import { animations } from '../constants';

import Background from '@/static/img/loading-background.svg';

import Text from '@/components/Text';

const LoadingPage = () => {
  return (
    <Page>
      <Wrapper>
        <Loader />
        <LoadingText variant="boldBaloo" color="white">
          Ladataan Ylitse MentorApp -palvelua
        </LoadingText>
      </Wrapper>
    </Page>
  );
};

const Page = styled.div`
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background:
    linear-gradient(0deg, rgb(74 54 201 / 87%), rgb(74 54 201 / 87%)),
    url(${Background});
  background-position: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  width: 55px;
  height: 55px;
  border: 10px solid rgb(255 255 255 / 50%);
  border-top: 10px solid white;
  border-radius: 50%;

  ${animations.spin}
`;

const LoadingText = styled(Text)`
  width: 100%;
  text-align: center;
`;

export default LoadingPage;
