import styled from 'styled-components';
import Text from '../Text';
import { RefObject } from 'react';
import { palette } from '../constants';

const toReadable = (timestamp: string) =>
  new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

type Props = {
  messagContent: string;
  bubbleColor: string;
  isSent: boolean;
  isSender: boolean;
  created: string;
  ref?: RefObject<null>;
};

const ChatMessage: React.FC<Props> = ({
  messagContent,
  bubbleColor,
  isSent,
  isSender,
  created,
  ref,
}) => {
  return (
    <Container $isSender={isSender} ref={ref} id="message-bubble">
      <Bubble $bubbleColor={bubbleColor} $isSender={isSender}>
        <Content>{messagContent}</Content>
      </Bubble>
      <Timestamp $isSent={isSent}>{toReadable(created)}</Timestamp>
    </Container>
  );
};

const Container = styled.div<{ $isSender: boolean }>`
  align-items: ${({ $isSender }) => ($isSender ? 'flex-end' : 'flex-start')};
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const Bubble = styled.div<{
  $bubbleColor: string;
  $isSender: boolean;
}>`
  background-color: ${({ $bubbleColor, $isSender }) =>
    !$isSender ? `${palette.blueWhite}` : $bubbleColor};
  border-radius: 10px;
  box-sizing: border-box;
  max-width: 75%;
  padding: 14px 22px;
  text-align: left;
  word-break: break-word;
`;

const Content = styled(Text)`
  margin: 0;
  white-space: pre-wrap;
`;

const Timestamp = styled(Text)<{ $isSent: boolean }>`
  margin: 0;
  ${({ $isSent }) => ($isSent ? 'margin-right: 22px;' : 'margin-left: 22px;')}
  text-align: right;
`;

export default ChatMessage;
