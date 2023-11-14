import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { toSendMessage, NewMessage } from '@/features/Chat/chatPageApi';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';

import type { ChatBuddy } from '@/features/Chat/chatSlice';

import styled from 'styled-components';
import { IconButton } from '@/components/Buttons';
import { palette } from '@/components/variables';
import TextInput from '@/components/TextInput';

type Props = {
  chat: ChatBuddy;
  sendMessage: (msg: NewMessage) => void;
  isMessageSendLoading: boolean;
};

const MessageField = ({ chat, sendMessage, isMessageSendLoading }: Props) => {
  const { t } = useTranslation('chat');
  const [text, setText] = useState('');
  const userId = useAppSelector(selectUserId);

  const handleMessageSend = (buddyId: string, text: string) => {
    if (!userId || isMessageSendLoading) return;

    const message = toSendMessage(buddyId, userId, text);
    sendMessage({ userId, message });
    setText('');
  };

  return (
    <Container>
      <Input
        variant="textarea"
        color={text ? 'blueDark' : 'greyFaded'}
        onChange={setText}
        placeholder={t('input.placeholder')}
        value={text}
      />
      <SendButton
        id="send-message"
        variant="send"
        sizeInPx={46}
        onClick={() => handleMessageSend(chat.buddyId, text)}
      />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
`;

const Input = styled(TextInput)`
  box-sizing: border-box;
  flex: 1;
  height: 80px;
  margin: 20px 1.25rem 20px 40px;

  &:focus {
    outline: 1px solid ${palette.purple};
  }
`;

const SendButton = styled(IconButton)`
  margin-right: 1.25rem;
`;

export default MessageField;
