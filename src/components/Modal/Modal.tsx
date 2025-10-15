import styled, { css } from 'styled-components';
import { palette } from '../constants';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { IconButton } from '../Buttons';
import { ReactNode } from 'react';
import Text from '../Text';

type ModalProps = {
  onDismiss: () => void;
  title: string;
  children?: ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  onDismiss,
  children,
  title,
}: ModalProps) => {
  const { isMobile } = useGetLayoutMode();
  return (
    <Card $isMobile={isMobile}>
      <Header>
        <Text variant="h2" color="white">
          {title}
        </Text>
        <CloseContainer>
          <IconButton
            onClick={onDismiss}
            variant="closeWithBackground"
            sizeInPx={38}
          />
        </CloseContainer>
      </Header>
      <CardContent $isMobile={isMobile}>{children}</CardContent>
    </Card>
  );
};

const Card = styled.div<{ $isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: flex-start;
  left: 50%;
  margin: auto;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          max-height: 90vh;
          width: 90vw;
        `
      : css`
          max-height: 90vh;
          max-width: 667px;
          width: 90vw;
        `}
`;

const CardContent = styled.div<{ $isMobile: boolean }>`
  flex: 1;
  overflow-y: auto;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          padding: 1rem 2rem;
        `
      : css`
          padding: 2rem 4rem;
        `}
`;

const CloseContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-shrink: 0;
  height: 8rem;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export default Modal;
