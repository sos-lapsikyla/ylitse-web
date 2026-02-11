import { Fragment } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

import { ChatBody, ChatMessage, ChatWindowHeader } from '@/components/Chat';
import ChatWindow from '@/components/Chat/ChatWindow';
import DateDivider from '@/components/Chat/DateDivider';
import Checkbox from '@/components/Checkbox';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';

import { useTranslation } from 'react-i18next';
import { useGetReportMessagesQuery } from '../reportsApi';
import { useAppSelector } from '@/store';
import { selectGroupedReportMessages } from '../selectors';

import { palette } from '@/components/constants';
import styled from 'styled-components';

import { ManagedUser } from '@/features/UserManagement/models';

type Props = {
  onBack: () => void;
  senderId: string;
  recipientId: string;
  mentee: ManagedUser | undefined;
  toggleCheckbox: () => void;
  showMenteesIdentity: boolean;
};

const ReportedChatWindow: React.FC<Props> = ({
  recipientId,
  senderId,
  onBack,
  mentee,
  toggleCheckbox,
  showMenteesIdentity,
}) => {
  const { t } = useTranslation('reports');

  const { isLoading } = useGetReportMessagesQuery(
    senderId && recipientId ? { senderId, recipientId } : skipToken,
  );

  const groupedMessages = useAppSelector(
    selectGroupedReportMessages(senderId, recipientId),
  );
  return (
    <ChatWindow>
      <ChatWindowHeader
        onBack={onBack}
        icon={<ProfileIcon color="purpleDark" />}
        displayName={
          showMenteesIdentity && mentee
            ? mentee?.nickname
            : t('chatInspection.placeholderName')
        }
        isChatBuddyMentor={false}
      >
        <ButtonContainer>
          <Checkbox
            label={t('chatInspection.showIdentity')}
            isChecked={showMenteesIdentity}
            onChange={toggleCheckbox}
          />
        </ButtonContainer>
      </ChatWindowHeader>
      <ChatBody isLoading={isLoading}>
        {Object.keys(groupedMessages).map(date => (
          <Fragment key={date}>
            <DateDivider date={date} />
            <Messages>
              {groupedMessages[date].map(message => (
                <ChatMessage
                  key={message.id}
                  messagContent={message.content}
                  bubbleColor={palette.blueLight}
                  isSent={false}
                  created={message.created}
                  isSender={message.senderId === senderId}
                />
              ))}
            </Messages>
          </Fragment>
        ))}
      </ChatBody>
    </ChatWindow>
  );
};

export default ReportedChatWindow;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Messages = styled.div`
  padding-left: 40px;
  padding-right: 40px;
`;
