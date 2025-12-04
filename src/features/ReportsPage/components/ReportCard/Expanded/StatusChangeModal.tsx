import { TextButton } from '@/components/Buttons';
import LabeledInput from '@/components/LabeledInput';
import { Modal } from '@/components/Modal';
import { Report } from '@/features/ReportsPage/models';
import { useUpdateReportMutation } from '@/features/ReportsPage/reportsApi';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReportStatus } from '.';

type Props = {
  report: Report;
  onDismiss: () => void;
  onSaved: () => void;
  nextStatus: ReportStatus;
};

const StatusChangeModal: React.FC<Props> = ({
  report,
  onDismiss,
  onSaved,
  nextStatus,
}) => {
  const { t } = useTranslation('reports');
  const [updateReport] = useUpdateReportMutation();
  const nextIsHandled = nextStatus === 'handled';
  const [comment, setComment] = useState('');

  const changeStatus = async (nextStatus: ReportStatus) => {
    try {
      await updateReport({
        id: report.id,
        body: {
          status: nextStatus,
          comment: comment,
        },
      }).unwrap();
      onDismiss();
      onSaved();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      onDismiss={onDismiss}
      title={
        nextIsHandled
          ? t('reportCard.state.markAsHandled')
          : t('reportCard.state.markAsReceived')
      }
    >
      <Container>
        <LabeledInput
          label={t('reportCard.state.addComment')}
          onChange={value => setComment(value)}
          value={comment}
        />
        <ButtonContainer>
          <TextButton onClick={onDismiss} variant="outlinePurple">
            {t('reportCard.state.cancel')}
          </TextButton>
          <TextButton
            variant="dark"
            onClick={() => nextStatus && void changeStatus(nextStatus)}
          >
            {t('reportCard.state.save')}
          </TextButton>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0 2rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
`;

export default StatusChangeModal;
