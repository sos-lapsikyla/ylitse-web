import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ChatBuddy } from '@/features/Chat/mappers';
import { selectUserId } from '@/features/Authentication/userSlice';
import {
  toSendMessage,
  useSendMessageMutation,
} from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { DEFAULT_ICON_SIZE, palette } from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import TextInput from '@/components/TextInput';

type Props = {
  chat: ChatBuddy;
};

const MessageField = ({ chat }: Props) => {
  const { t } = useTranslation('chat');
  const { isMobile } = useGetLayoutMode();
  const userId = useAppSelector(selectUserId);
  const [sendMessage] = useSendMessageMutation();

  const [text, setText] = useState('');
  const [isLoadingNewMessage, setIsLoadingNewMessage] = useState(false);

  const handleMessageSend = async (buddyId: string, text: string) => {
    if (!userId || isLoadingNewMessage) return;

    setIsLoadingNewMessage(true);
    const message = toSendMessage(buddyId, userId, text);

    try {
      await sendMessage({ userId, message }).unwrap();
    } catch (error) {
      setIsLoadingNewMessage(false);
    }
  };

  useEffect(() => {
    if (isLoadingNewMessage) {
      setText('');
      setIsLoadingNewMessage(false);
    }
  }, [chat.messages]);

  return (
    <Container>
      <Input
        variant="textarea"
        color={text ? 'blueDark' : 'greyFaded'}
        isDisabled={isLoadingNewMessage}
        onChange={setText}
        placeholder={t('input.placeholder')}
        value={text}
        isMobile={isMobile}
      />
      <SendButton
        variant="send"
        isDisabled={isLoadingNewMessage}
        sizeInPx={DEFAULT_ICON_SIZE.HUGE}
        onClick={() => handleMessageSend(chat.buddyId, text)}
      />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
`;

const Input = styled(TextInput)<{ isMobile: boolean }>`
  flex: 1;
  margin: 1rem 1rem 1rem 2rem;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

const SendButton = styled(IconButton)`
  margin-right: 1.25rem;
`;

export default MessageField;
