import { IconButton } from '@/components/Buttons';
import { ICON_SIZES, palette } from '@/components/constants';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import styled from 'styled-components';
import { useDeleteManagedUserMutation } from '../../userManagementApi';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import { selectAccount } from '@/features/Authentication/selectors';
import { ManagedUser } from '../../models';
import toast from 'react-hot-toast';

type Props = {
  managedUser: ManagedUser;
};

const Footer: React.FC<Props> = ({ managedUser }) => {
  const { t } = useTranslation('users');
  const [deleteManagedUser] = useDeleteManagedUserMutation();
  const confirmDelete = useConfirmDelete();
  const { id: currentUserId } = useAppSelector(selectAccount);
  const id = managedUser.account_id;

  return (
    <Container>
      <ButtonContainer>
        <IconButton
          variant="chatWithBackground"
          sizeInPx={ICON_SIZES.LARGE}
          onClick={() => console.log('TODO')}
        />
        <IconButton
          variant="edit"
          sizeInPx={ICON_SIZES.LARGE}
          onClick={() => console.log('TODO')}
        />
        <IconButton
          variant="deleteWithBackground"
          sizeInPx={ICON_SIZES.LARGE}
          onClick={() => {
            if (id === currentUserId) {
              toast.error(t('notification.failure.deleteSelf'), {
                id: 'self-delete-block',
              });
              return;
            }
            void confirmDelete({
              id,
              onDelete: deleteManagedUser,
              title: t('delete.title'),
              description: t('delete.description'),
              confirmId: 'confirm-delete',
              borderColor: palette.redSalmon,
              closeText: t('delete.cancel'),
              confirmText: t('delete.confirm'),
            });
          }}
        />
      </ButtonContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  padding: 0 2rem;
`;

const Container = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 0 0 0.75rem 0.75rem;
  display: flex;
  height: 5rem;
  justify-content: center;
  width: 100%;
`;

export default Footer;
