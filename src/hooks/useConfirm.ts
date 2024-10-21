import { useContext } from 'react';
import { ConfirmationDialogContext } from '@/features/Confirmation/ConfirmationDialogProvider';
import type { Dialog } from '@/features/Confirmation/ConfirmationDialogProvider';

export const useConfirm = () => {
  const { openDialog } = useContext(ConfirmationDialogContext);

  const getConfirmation = (config: Dialog) =>
    new Promise(res => {
      openDialog({ actionCallback: res, ...config });
    });

  return { getConfirmation };
};
