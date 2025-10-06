import {
  Toast,
  ToastType,
  resolveValue,
  toast as toastEffect,
} from 'react-hot-toast';
import styled from 'styled-components';

import { IconButton } from '../Buttons';
import { ICON_SIZES, palette } from '../constants';
import { Success } from '@/components/Icons/Success';
import Text from '../Text';
import { Warning } from '@/components/Icons/Warning';

type Props = {
  toast: Toast;
};

export const AppToast = ({ toast }: Props) => {
  const getToastStyle = (type: ToastType) => {
    switch (type) {
      case 'error': {
        return {
          mainColor: palette.red,
          Icon: <Warning color={'blueDark'} sizeInPx={ICON_SIZES.SMALL} />,
        };
      }

      case 'success': {
        return {
          mainColor: palette.blue,
          Icon: <Success color={'blueDark'} sizeInPx={ICON_SIZES.SMALL} />,
        };
      }

      default: {
        return {
          mainColor: palette.purple,
          Icon: <Warning color={'orange'} sizeInPx={ICON_SIZES.SMALL} />,
        };
      }
    }
  };

  const { mainColor, Icon } = getToastStyle(toast.type);

  return (
    <Container
      role="notification"
      $isVisible={toast.visible}
      $borderColor={mainColor}
    >
      <IconContainer $bgColor={mainColor}>{Icon}</IconContainer>
      <MessageContainer>
        <Text>{resolveValue(toast.message, toast)}</Text>
      </MessageContainer>
      <ButtonContainer>
        <IconButton
          variant="closeWithBackground"
          sizeInPx={ICON_SIZES.MEDIUM}
          onClick={() => toastEffect.dismiss(toast.id)}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div<{ $isVisible: boolean; $borderColor: string }>`
  display: flex;
  width: 560px;
  background-color: ${palette.white};
  border: solid 2px ${({ $borderColor }) => $borderColor};
  box-shadow: 0 4px 8px rgb(0 0 0 / 15%);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
`;

const IconContainer = styled.div<{ $bgColor: string }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ $bgColor }) => $bgColor};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex: 10;
  align-items: center;
  padding-left: 1rem;
  background-color: ${palette.white};
`;
