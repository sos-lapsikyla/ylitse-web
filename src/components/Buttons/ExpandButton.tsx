import styled from 'styled-components';
import { TextButton } from '@/components/Buttons';

type CenteredTextButtonProps = {
  title: string;
  onClick: () => void;
};

const ExpandButton = ({ title, onClick }: CenteredTextButtonProps) => (
  <Container>
    <TextButton onClick={onClick}>{title}</TextButton>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
`;

export default ExpandButton;
