import { ChatHeader, ChatBody, ChatMessage } from '@/components/Chat';
import ChatWindow from '@/components/Chat/ChatWindow';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import styled from 'styled-components';
import { useGetReportMessagesQuery } from '../reportsApi';
import { Fragment, useState } from 'react';
import DateDivider from '@/components/Chat/DateDivider';
import { useAppSelector } from '@/store';
import { skipToken } from '@reduxjs/toolkit/query';
import { selectGroupedReportMessages } from '../selectors';
import { palette } from '@/components/constants';
import Checkbox from '@/components/Checkbox';
import { useTranslation } from 'react-i18next';
import { selectManagedUserById } from '@/features/UserManagement/selectors';
import { useGetManagedUsersQuery } from '@/features/UserManagement/userManagementApi';

type Props = {
  onBack: () => void;
  senderId: string;
  recipientId: string;
};

const ReportedChatWindow: React.FC<Props> = ({
  recipientId,
  senderId,
  onBack,
}) => {
  const { t } = useTranslation('reports');

  const { isLoading } = useGetReportMessagesQuery(
    senderId && recipientId ? { senderId, recipientId } : skipToken,
  );

  const groupedMessages = useAppSelector(
    selectGroupedReportMessages(senderId, recipientId),
  );

  useGetManagedUsersQuery();
  const mentee = useAppSelector(selectManagedUserById(senderId));

  const [showMenteesIdentity, setShowMenteesIdentity] = useState(false);
  const toggleCheckbox = () => {
    setShowMenteesIdentity(!showMenteesIdentity);
  };

  return (
    <ChatWindow>
      <ChatHeader
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
      </ChatHeader>
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
