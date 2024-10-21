import { createContext, ReactNode, useState } from 'react';
import Dialog from '@/components/Dialog';

import type { IconVariant } from '@/components/Dialog/Dialog';

type ConfirmationDialogContextType = {
  openDialog: (config: DialogConfig) => void;
};

export const ConfirmationDialogContext =
  createContext<ConfirmationDialogContextType>({
    openDialog: () => {
      throw new Error('Function not implemented.');
    },
  });

export type Dialog = {
  borderColor: string;
  closeText: string;
  confirmId: string;
  confirmText?: string;
  description: string;
  iconVariant?: IconVariant;
  title: string;
};

export type DialogConfig = Dialog & {
  actionCallback: (res: boolean) => void;
};

const defaultConfig = {
  actionCallback: () => null,
  borderColor: '',
  closeText: '',
  confirmId: '',
  description: '',
  title: '',
};

type Props = {
  children: ReactNode;
};

export const ConfirmationDialogProvider = ({ children }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig>(defaultConfig);

  const openDialog = (config: DialogConfig) => {
    setDialogOpen(true);
    setDialogConfig(config);
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig(defaultConfig);
  };

  const onClose = () => {
    resetDialog();
    dialogConfig.actionCallback(false);
  };

  const onConfirm = () => {
    resetDialog();
    dialogConfig.actionCallback(true);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      {dialogOpen && (
        <Dialog
          borderColor={dialogConfig.borderColor}
          closeText={dialogConfig.closeText}
          confirmId={dialogConfig.confirmId}
          confirmText={dialogConfig.confirmText}
          description={dialogConfig.description}
          iconVariant={dialogConfig.iconVariant}
          onClose={onClose}
          onConfirm={onConfirm}
          title={dialogConfig.title}
        />
      )}
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
