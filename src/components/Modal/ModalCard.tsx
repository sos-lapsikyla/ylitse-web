import styled, { css } from 'styled-components';
import { palette } from '../constants';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { IconButton } from '../Buttons';
import { ReactNode } from 'react';
import Text from '../Text';

type ModalCardProps = {
  onDismiss: () => void;
  title: string;
  children?: ReactNode;
};

const ModalCard: React.FC<ModalCardProps> = ({
  onDismiss,
  children,
  title,
}: ModalCardProps) => {
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
      <CardContent>{children}</CardContent>
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
          width: 85vw;
        `
      : css`
          max-height: 90vh;
          width: 30vw;
        `}
`;

const CardContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem 4rem;
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

export default ModalCard;
