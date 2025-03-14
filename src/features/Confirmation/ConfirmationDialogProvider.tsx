import { createContext, ReactNode, useState } from 'react';
import Dialog from './Dialog';

import type { IconVariant } from './Dialog';

type ConfirmationDialogContextType = {
  confirmAction: (config: DialogConfig) => void;
};

export const ConfirmationDialogContext =
  createContext<ConfirmationDialogContextType>({
    confirmAction: () => {
      throw new Error('Function not implemented.');
    },
  });

export type Dialog = {
  borderColor: string;
  closeText: string;
  confirmId?: string;
  confirmText?: string;
  description: string;
  iconVariant?: IconVariant;
  isConfirmRequired?: boolean;
  title: string;
};

export type DialogConfig = Dialog & {
  actionCallback: (res: boolean) => void;
};

const defaultConfig: DialogConfig = {
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

  const confirmAction = (config: DialogConfig) => {
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
    <ConfirmationDialogContext.Provider value={{ confirmAction }}>
      {dialogOpen && (
        <Dialog
          borderColor={dialogConfig.borderColor}
          closeText={dialogConfig.closeText}
          confirmId={dialogConfig.confirmId}
          confirmText={dialogConfig.confirmText}
          description={dialogConfig.description}
          iconVariant={dialogConfig.iconVariant}
          isConfirmRequired={dialogConfig.isConfirmRequired}
          onClose={onClose}
          onConfirm={onConfirm}
          title={dialogConfig.title}
        />
      )}
      {children}
    </ConfirmationDialogContext.Provider>
  );
};
