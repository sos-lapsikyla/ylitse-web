import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import { DIALOG_WIDTH } from '@/components/constants';
import { IconButton, TextButton } from '@/components/Buttons';
import IconSuccess from '@/static/icons/success.svg';
import Text from '@/components/Text';

type Props = {
  close: () => void;
};

const ReportSuccessDialog = ({ close }: Props) => {
  const { t } = useTranslation('chat');

  return (
    <Container borderColor={palette.blue}>
      <SuccessIcon src={IconSuccess} />
      <SuccessCloseButton
        variant="closeWithBackground"
        sizeInPx={DEFAULT_ICON_SIZE.MEDIUM}
        onClick={close}
      />
      <Text variant="h3">{t(`dialog.report.success.title`)}</Text>
      <Text>{t(`dialog.report.success.description`)}</Text>
      <ButtonContainer>
        <OkButton onClick={close} variant="dark">
          {t(`dialog.report.success.confirm`)}
        </OkButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div<{ borderColor: string }>`
  background-color: ${palette.white};
  border-left: ${({ borderColor }) => `110px solid ${borderColor}`};
  border-radius: 10px;
  box-sizing: border-box;
  height: 267px;
  left: 50%;
  padding: 1rem 3rem;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${DIALOG_WIDTH};
  z-index: 200;
`;

const SuccessIcon = styled.img`
  left: -79px;
  position: absolute;
  top: 56px;
`;

const SuccessCloseButton = styled(IconButton)`
  position: absolute;
  right: 13px;
  top: 13px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.75rem;
  justify-content: center;
`;

const OkButton = styled(TextButton)`
  width: 113px;
`;

export default ReportSuccessDialog;
