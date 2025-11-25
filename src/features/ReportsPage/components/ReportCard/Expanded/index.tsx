import { Modal, ModalBackground } from '@/components/Modal';
import { Report } from '@/features/ReportsPage/models';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button, TextButton } from '@/components/Buttons';
import { useDeleteReportMutation } from '@/features/ReportsPage/reportsApi';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { palette } from '@/components/constants';
import ExpandedCardContent from './ExpandedCardContent';

type Props = {
  report: Report;
  reportNumber: number;
  onDismiss: () => void;
};

const ExpandedReportCard: React.FC<Props> = ({
  report,
  reportNumber,
  onDismiss,
}) => {
  const { t } = useTranslation('reports');
  const [deleteReport] = useDeleteReportMutation();
  const confirmDelete = useConfirmDelete();

  return (
    <ModalBackground>
      <Modal
        onDismiss={() => onDismiss()}
        title={t('reportCard.title', { number: reportNumber })}
      >
        <Container>
          <ExpandedCardContent report={report} />
          <Button
            sizeInPx={18}
            leftIcon="delete"
            onClick={() => {
              void confirmDelete({
                id: report.id,
                onDelete: deleteReport,
                title: t('delete.title'),
                description: t('delete.description'),
                confirmId: 'confirm-delete',
                borderColor: palette.redSalmon,
                closeText: t('delete.cancel'),
                confirmText: t('delete.confirm'),
              });
            }}
            text={{
              color: 'redDark',
              text: t('reportCard.delete'),
              variant: 'link',
            }}
          />
          <ButtonContainer>
            <TextButton size="normal" onClick={onDismiss} variant="light">
              {t('reportCard.cancel')}
            </TextButton>
            <TextButton
              size="normal"
              onClick={() => console.log('todo')}
              variant="disabled"
            >
              {t('reportCard.openConversation')}
            </TextButton>
          </ButtonContainer>
        </Container>
      </Modal>
    </ModalBackground>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  padding: 2rem 0 1.75rem 0;
`;

const Container = styled.div`
  padding-top: 2rem;
`;

export default ExpandedReportCard;
