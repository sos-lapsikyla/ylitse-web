import styled from 'styled-components';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { DIALOG_WIDTH } from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import { ICON_SIZES, palette } from '@/components/constants';
import IconSuccess from '@/static/icons/success.svg';
import IconWarning from '@/static/icons/warning.svg';
import Text from '@/components/Text';
import ButtonGroup from './ButtonGroup';

export type IconVariant = 'success' | 'warning';

const iconMap: Record<IconVariant, string> = {
  success: IconSuccess,
  warning: IconWarning,
};

type Props = {
  borderColor: string;
  closeText: string;
  confirmId?: string;
  confirmText?: string;
  description: string;
  iconVariant?: IconVariant;
  isConfirmRequired?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
};

const Dialog = ({
  borderColor,
  closeText,
  confirmId,
  confirmText = '',
  description,
  iconVariant = 'warning',
  isConfirmRequired = true,
  onClose,
  onConfirm,
  title,
}: Props) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <>
      <Overlay />
      {isMobile ? (
        <MobileContainer>
          <MobileHeader $backgroundColor={borderColor}>
            <img src={iconMap[iconVariant]} />
            <Text variant="h3">{title}</Text>
          </MobileHeader>
          <MobileContent>
            <Text>{description}</Text>
            <ButtonGroup
              closeText={closeText}
              confirmId={confirmId}
              confirmText={confirmText}
              isConfirmRequired={isConfirmRequired}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          </MobileContent>
        </MobileContainer>
      ) : (
        <Container>
          <LeftBorder $backgroundColor={borderColor}>
            <Icon src={iconMap[iconVariant]} />
          </LeftBorder>
          <Content>
            <CloseButton
              variant="closeWithBackground"
              sizeInPx={ICON_SIZES.MEDIUM}
              onClick={onClose}
            />
            <Text variant="h3">{title}</Text>
            <Text>{description}</Text>
            <ButtonGroup
              closeText={closeText}
              confirmId={confirmId}
              confirmText={confirmText}
              isConfirmRequired={isConfirmRequired}
              onClose={onClose}
              onConfirm={onConfirm}
            />
          </Content>
        </Container>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--greyscale-overlay, rgb(57 57 57 / 75%));
`;

const MobileContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 200;
  box-sizing: border-box;
  width: 90%;
  height: fit-content;
  background-color: ${palette.white};
  border-radius: 10px;
  transform: translate(-50%, -50%);
`;

const MobileHeader = styled.div<{ $backgroundColor: string }>`
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 10px 10px 0 0;
`;

const MobileContent = styled.div`
  padding: 0 2rem 2rem;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 200;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: ${DIALOG_WIDTH};
  height: auto;
  background-color: ${palette.white};
  border-radius: 10px;
  transform: translate(-50%, -50%);
`;

const LeftBorder = styled.div<{ $backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  border-radius: 10px 0 0 10px;
`;

const Icon = styled.img`
  position: absolute;
  top: 33%;
  transform: translateY(-50%);
`;

const Content = styled.div`
  width: 100%;
  padding: 2rem 3rem;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export default Dialog;
