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
  background-color: transparent;
  background-image: url(${SvgLogo});
  background-repeat: no-repeat;
  background-size: contain;
  height: 37px;
  width: 143px;
`;

const Container = styled.div`
  color: white;
  display: flex;
  gap: 0.5rem
  height: 50px;
  margin-left: 10%;
  max-width: fit-content;

  @media screen and (max-width: 830px) {
    margin-left: 4%;
  }

  @media screen and (max-width: ${MOBILE_THRESHOLD}px) {
    margin-left: 0;
  }
`;
