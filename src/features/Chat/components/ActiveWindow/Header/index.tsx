import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ChatBuddy } from '@/features/Chat/mappers';
import type { ChatFolder } from '@/features/Chat/models';

import { clearActiveChat } from '@/features/Chat/chatSlice';
import { selectUserId } from '@/features/Authentication/selectors';
import { selectMentorById } from '@/features/MentorPage/selectors';
import { useAppDispatch, useAppSelector } from '@/store';
import { useConfirm } from '@/features/Confirmation/useConfirm';
import { useGetMentorsQuery } from '@/features/MentorPage/mentorPageApi';
import { useUpdateStatusMutation } from '@/features/Chat/chatPageApi';

import { palette } from '@/components/constants';

import ArchivedIcon from '@/static/icons/archived-chats.svg';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import ReportModal from '../ReportModal';
import Buttons from './Buttons';
import { ChatHeader } from '@/components/Chat';

type DialogVariant = 'archive' | 'block' | 'restore' | 'unblock';

const confirmDialogMap: Record<
  DialogVariant,
  { borderColor: string; targetFolder: ChatFolder }
> = {
  archive: { borderColor: palette.orange, targetFolder: 'archived' },
  block: { borderColor: palette.redSalmon, targetFolder: 'banned' },
  restore: { borderColor: palette.blue2, targetFolder: 'ok' },
  unblock: { borderColor: palette.redSalmon, targetFolder: 'ok' },
};

const iconMap = {
  ok: <ProfileIcon color="purpleDark" />,
  archived: <img src={ArchivedIcon} />,
  banned: <img src={BlockedIcon} />,
};

type Props = {
  chat: ChatBuddy;
};

const Header = ({ chat }: Props) => {
  const { t } = useTranslation('chat');
  const dispatch = useAppDispatch();
  const { getConfirmation } = useConfirm();
  const [updateChatStatus] = useUpdateStatusMutation();
  const userId = useAppSelector(selectUserId);

  // Clearing the active chat will return to the menu in tablet mode
  const returnToTabletMenu = () => dispatch(clearActiveChat());

  useGetMentorsQuery();

  const isChatBuddyMentor = chat.role === 'mentor';
  const mentor = useAppSelector(selectMentorById(chat.buddyId));

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const confirmAction = async (variant: DialogVariant) => {
    const isConfirmed = await getConfirmation({
      borderColor: confirmDialogMap[variant].borderColor,
      closeText: t('dialog.cancel'),
      confirmId: `confirm-${variant}`,
      confirmText: t(`dialog.${variant}.confirm`),
      description: t(`dialog.${variant}.description`, {
        buddyName: chat.displayName,
      }),
      title: t(`dialog.${variant}.title`),
    });
    if (isConfirmed) {
      await updateChatStatus({
        userId,
        buddyId: chat.buddyId,
        nextStatus: confirmDialogMap[variant].targetFolder,
        originalStatus: chat.status,
      }).unwrap();
      if (variant === 'block' || variant === 'archive')
        dispatch(clearActiveChat());
    }
  };

  return (
    <>
      <ChatHeader
        onBack={returnToTabletMenu}
        icon={iconMap[chat.status]}
        displayName={chat.displayName}
        isChatBuddyMentor={isChatBuddyMentor}
        mentorBio={mentor?.statusMessage}
      >
        {isReportModalOpen && (
          <ReportModal
            buddyId={chat.buddyId}
            close={() => setIsReportModalOpen(false)}
          />
        )}

        <Buttons
          chat={chat}
          confirmStatusChange={(variant: DialogVariant) => {
            void confirmAction(variant);
          }}
          openReportModal={() => setIsReportModalOpen(true)}
        />
      </ChatHeader>
    </>
  );
};

export default Header;
