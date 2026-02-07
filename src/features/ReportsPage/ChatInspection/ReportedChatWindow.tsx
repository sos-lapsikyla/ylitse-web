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

// type Props = {

// };

const ReportedChatWindow = () => {
  const { t } = useTranslation('reports');
  //senderid and recipientid should be sent as props from opened report card
  // mentor's (reciever) name should be gotten as props as well
  const senderId = 'mdPx0f4VxoWqPG-As_IC8aSJ5B-nXMgvG1DGn7D_cyg';
  const recipientId = 'lwNHPWnfZIAY3bVoBJ2DWmM0HOYTqCJKcQHecqGYucc';

  const { isLoading } = useGetReportMessagesQuery(
    senderId && recipientId ? { senderId, recipientId } : skipToken,
  );

  const groupedMessages = useAppSelector(
    selectGroupedReportMessages(senderId, recipientId),
  );

  const [showMenteesIdentity, setShowMenteesIdentity] = useState(false);
  const toggleCheckbox = () => {
    setShowMenteesIdentity(!showMenteesIdentity);
  };

  return (
    <ChatWindow>
      <ChatHeader
        onBack={() => console.log('todo, return to opened report')}
        icon={<ProfileIcon color="purpleDark" />}
        displayName={'Aktori'}
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
