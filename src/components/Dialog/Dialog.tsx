import styled from 'styled-components';

import { DIALOG_WIDTH } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import IconWarning from '@/static/icons/warning.svg';
import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import Text from '@/components/Text';

type Props = {
  borderColor: string;
  closeText: string;
  confirmId: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
  description: string;
  title: string;
};

export const Dialog = ({
  borderColor,
  closeText,
  confirmId,
  confirmText,
  onClose,
  onConfirm,
  description,
  title,
}: Props) => (
  <>
    <Overlay />
    <Container borderColor={borderColor}>
      <WarningIcon src={IconWarning} />
      <CloseButton
        variant="closeWithBackground"
        sizeInPx={DEFAULT_ICON_SIZE.MEDIUM}
        onClick={onClose}
      />
      <Text variant="h3">{title}</Text>
      <Text>{description}</Text>
      <ButtonContainer>
        <TextButton onClick={onClose} variant="light">
          {closeText}
        </TextButton>
        <TextButton id={confirmId} onClick={onConfirm} variant="dark">
          {confirmText}
        </TextButton>
      </ButtonContainer>
    </Container>
  </>
);

const Overlay = styled.div`
  background: var(--greyscale-overlay, rgba(57, 57, 57, 0.75));
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const Container = styled.div<{ borderColor: string }>`
  background-color: ${palette.white};
  border-left: ${({ borderColor }) => `110px solid ${borderColor}`};
  border-radius: 10px;
  box-sizing: border-box;
  height: 223px;
  left: 50%;
  padding: 1rem 3rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${DIALOG_WIDTH};
  z-index: 200;
`;

const WarningIcon = styled.img`
  left: -79px;
  position: absolute;
  top: 56px;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  right: 13px;
  top: 13px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  justify-content: center;
`;
