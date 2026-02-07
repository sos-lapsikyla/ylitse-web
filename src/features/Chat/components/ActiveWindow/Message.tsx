import { useEffect, useRef } from 'react';
import { type AppMessage, type ChatFolder } from '@/features/Chat/models';

import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/selectors';
import { useIsVisible } from '@/hooks/useIsVisible';

import { toPutMessage, useMarkSeenMutation } from '@/features/Chat/chatPageApi';

import { messageColors } from '@/features/Chat/constants';
import { ChatMessage } from '@/components/Chat';

type Props = {
  folder: ChatFolder;
  buddyId: string;
  message: AppMessage;
};

export const Message = ({ folder, buddyId, message }: Props) => {
  const [markSeen] = useMarkSeenMutation();
  const userId = useAppSelector(selectUserId);
  const ref = useRef(null);
  const isVisible = useIsVisible<HTMLDivElement>(ref);

  const handleMarkSeen = () => {
    if (!userId) return;

    void markSeen({ userId, message: toPutMessage(message, buddyId, userId) });
  };

  useEffect(() => {
    const shouldMarkUnseen = !message.isSent && !message.opened && isVisible;
    if (shouldMarkUnseen) {
      handleMarkSeen();
    }
  }, [isVisible]);

  const background =
    messageColors[folder][message.isSent ? 'sent' : 'received'];

  return (
    <ChatMessage
      ref={ref}
      messagContent={message.content}
      bubbleColor={background}
      isSent={message.isSent}
      isSender={message.isSent}
      created={message.created}
    />
  );
};
