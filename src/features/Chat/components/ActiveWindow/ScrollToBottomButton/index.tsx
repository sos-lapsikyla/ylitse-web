import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonProps, IconButton } from '@/components/Buttons';
import { palette } from '@/components/constants';

type Props = ButtonProps<'button'> & {
  isVisible: boolean;
  hasUnreadMessagesAtBottom: boolean;
};

const ScrollToBottomButton = React.forwardRef<HTMLDivElement, Props>(
  ({ isVisible, hasUnreadMessagesAtBottom, ...props }, ref) => {
    return (
      <ButtonContainer ref={ref} isVisible={isVisible}>
        <IconButton {...props} aria-label="scroll-to-bottom-button" />
        {hasUnreadMessagesAtBottom && (
          <UnseenDot aria-label="unseen-messages-dot" />
        )}
      </ButtonContainer>
    );
  },
);

const ButtonContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  z-index: 10;
  ${({ isVisible }) =>
    isVisible &&
    css`
      display: none;
    `}
`;

const UnseenDot = styled.div`
  background-color: ${palette.orange};
  border: 1px solid ${palette.blueDark};
  border-radius: 50%;
  height: 10px;
  left: 1.15rem;
  position: relative;
  top: -2rem;
  width: 10px;
`;

// forward-ref thing
ScrollToBottomButton.displayName = 'ScrollToBottomButton';

export default ScrollToBottomButton;
