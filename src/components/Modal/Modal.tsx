import styled from 'styled-components';
import { breakpoints, palette } from '../constants';
import { ReactNode } from 'react';

type ModalCardProps = {
  children: ReactNode;
};

const Modal: React.FC<ModalCardProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background-color: ${palette.greyOverlay};
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;

  @media screen and (max-width: ${breakpoints.mobile}) {
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
export default Modal;
