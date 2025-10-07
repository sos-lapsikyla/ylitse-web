import { useConfirm } from '@/features/Confirmation/useConfirm';

type ConfirmDeleteOptions = {
  id: string;
  onDelete: (id: string) => Promise<unknown> | void;
  title: string;
  description: string;
  confirmId: string;
  borderColor: string;
  closeText: string;
  confirmText: string;
};

export const useConfirmDelete = () => {
  const { getConfirmation } = useConfirm();

  const confirmDelete = async ({
    borderColor,
    closeText,
    confirmId,
    confirmText,
    description,
    title,
    id,
    onDelete,
  }: ConfirmDeleteOptions): Promise<void> => {
    const isConfirmed = await getConfirmation({
      borderColor: borderColor,
      closeText: closeText,
      confirmId: confirmId,
      confirmText: confirmText,
      description: description,
      title: title,
    });
    if (isConfirmed) {
      await onDelete(id);
    }
  };
  return confirmDelete;
};
