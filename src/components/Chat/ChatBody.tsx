import { ReactNode, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { palette } from '../constants';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import Spinner from '../Spinner';
import ScrollToBottomButton from '@/features/Chat/components/ActiveWindow/ScrollToBottomButton';
import { useBottomAction } from '@/features/Chat/components/ActiveWindow/ScrollToBottomButton/useBottomAction';

type Props = {
  children: ReactNode;
  isLoading: boolean;
  hasUnread?: boolean;
};

const ChatBody: React.FC<Props> = ({
  hasUnread = false,
  isLoading,
  children: messages,
}) => {
  const { isTablet } = useGetLayoutMode();
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<HTMLDivElement | null>(null);
  const offsets = useMemo(() => ({ bottom: 20, right: 20 }), []);
  const { isScrolled, handleBottomActionClick } = useBottomAction(
    historyRef,
    buttonRef,
    offsets,
  );

  return (
    <Container>
      {isLoading && (
        <SpinnerContainer>
          <Spinner variant="small" isDark isInline />
        </SpinnerContainer>
      )}
      {messages}
      <ScrollToBottomButton
        ref={buttonRef}
        sizeInPx={isTablet ? 48 : 32}
        variant="down"
        onClick={handleBottomActionClick}
        isVisible={isScrolled}
        hasUnreadMessagesAtBottom={hasUnread}
      />
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  flex: 1;
  overflow: auto;
  padding-bottom: 10px;
  position: relative;
`;

const SpinnerContainer = styled.div`
  padding-top: 1rem;
`;

export default ChatBody;
