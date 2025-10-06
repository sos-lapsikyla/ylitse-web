import styled from 'styled-components';

import SvgLogo from '@/static/img/ylitse-logo-small-new.svg';
import { MOBILE_THRESHOLD } from '@/components/constants';

export const LogoContainer = () => {
  return (
    <Container>
      <a href="/">
        <Logo />
      </a>
    </Container>
  );
};

const Logo = styled.div`
  width: 143px;
  height: 37px;
  background-color: transparent;
  background-image: url(${SvgLogo});
  background-repeat: no-repeat;
  background-size: contain;
`;

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  max-width: fit-content;
  height: 50px;
  margin-left: 10%;
  color: white;

  @media screen and (width <= 830px) {
    margin-left: 4%;
  }

  @media screen and (max-width: ${MOBILE_THRESHOLD}px) {
    margin-left: 0;
  }
`;
