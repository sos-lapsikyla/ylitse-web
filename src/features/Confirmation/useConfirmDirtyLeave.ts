import { useBlocker } from 'react-router';
import { useEffect } from 'react';

import { useConfirm } from '@/features/Confirmation/useConfirm';

import type { Dialog } from '@/features/Confirmation/ConfirmationDialogProvider';

export const useConfirmDirtyLeave = (isDirty: boolean, config: Dialog) => {
  const { getConfirmation } = useConfirm();
  const blocker = useBlocker(() => isDirty);

  useEffect(() => {
    const confirmLeave = async () => {
      const isConfirmed = await getConfirmation({
        borderColor: config.borderColor,
        closeText: config.closeText,
        confirmId: config.confirmId,
        confirmText: config.confirmText,
        description: config.description,
        title: config.title,
      });
      if (isConfirmed) {
        if (blocker.state === 'blocked') blocker.proceed();
      } else {
        if (blocker.state === 'blocked') blocker.reset();
      }
    };

    if (blocker.state === 'blocked') void confirmLeave();
  }, [blocker.state]);
};
