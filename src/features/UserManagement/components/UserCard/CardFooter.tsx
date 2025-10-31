import { IconButton } from '@/components/Buttons';
import { ICON_SIZES, palette } from '@/components/constants';
import styled from 'styled-components';

import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import { useDeleteManagedUserMutation } from '../../userManagementApi';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/store';
import { selectAccount } from '@/features/Authentication/selectors';

import { ManagedUser } from '../../models';

type Props = {
  managedUser: ManagedUser;
  onOpenEditModal: (user: ManagedUser) => void;
};

const CardFooter: React.FC<Props> = ({ managedUser, onOpenEditModal }) => {
  const { t } = useTranslation('users');
  const [deleteManagedUser] = useDeleteManagedUserMutation();
  const confirmDelete = useConfirmDelete();
  const { id: currentUserId } = useAppSelector(selectAccount);
  const id = managedUser.account_id;
  const isMe = currentUserId === managedUser.account_id;

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
          onClick={() => onOpenEditModal(managedUser)}
        />
        {isMe ? (
          <IconButton
            variant="deleteDisabled"
            isDisabled={true}
            sizeInPx={ICON_SIZES.LARGE}
          />
        ) : (
          <IconButton
            variant="deleteWithBackground"
            sizeInPx={ICON_SIZES.LARGE}
            onClick={() => {
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
        )}
      </ButtonContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2rem;
  width: 100%;
`;

const Container = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 0 0 0.75rem 0.75rem;
  display: flex;
  height: 3.75rem;
  justify-content: center;
  width: 100%;
`;

export default CardFooter;
