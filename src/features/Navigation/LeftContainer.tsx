import styled from 'styled-components';

import SvgLogo from '@/static/img/logo.svg';
import Text from '@/components/Text';

export const LeftContainer = () => (
  <Container>
    <Logo />
    <Text variant="logo" color="white">
      YLITSE
    </Text>
  </Container>
);

const Logo = styled.div`
  background-image: url(${SvgLogo});
  background-size: contain;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  margin-left: 12%;
  margin-right: 1rem;
  background-color: transparent;
`;

const Container = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
  flex: 1;
  max-width: fit-content;
`;