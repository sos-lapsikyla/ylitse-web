import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { selectUserId } from '@/features/Authentication/userSlice';
import { setConversation } from '@/features/Chat/chatSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { breakpoints, DEFAULT_ICON_SIZE } from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import { Languages } from './Languages';
import { Skills } from './Skills';
import { Text } from '@/components/Text/Text';
import { TextButton } from '@/components/Buttons';

import type { Mentor } from '@/features/MentorPage/mentorPageApi';

type Props = {
  mentor: Mentor;
  isMe: boolean;
  onDismiss: () => void;
};

export const Content = ({
  mentor: { skills, story, languages, buddyId, name, mentorId },
  onDismiss,
}: Props) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('mentors');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserId = useAppSelector(selectUserId);

  const handleClick = () => {
    dispatch(setConversation({ name, buddyId }));
    navigate('/chat');
  };

  return (
    <Container isMobile={isMobile}>
      {!isMobile && (
        <CloseContainer>
          <IconButton
            onClick={onDismiss}
            variant="closeWithBackground"
            sizeInPx={DEFAULT_ICON_SIZE.MEDIUM}
          />
        </CloseContainer>
      )}
      <StoryHeader isMobile={isMobile} variant="h3">
        {t('card.bio')}
      </StoryHeader>
      <Text>{story}</Text>
      {isMobile && (
        <Languages
          isMe={currentUserId === mentorId}
          languages={languages}
          isMobile={isMobile}
        />
      )}
      <Skills skills={skills} />
      <OpenConversationButton onClick={handleClick}>
        {t('card.chat')}
      </OpenConversationButton>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  padding: ${({ isMobile }) => (isMobile ? '1rem' : '1rem 1rem 2rem 2rem')};
`;

const CloseContainer = styled.div`
  align-self: flex-end;
`;

const StoryHeader = styled(Text)<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    css`
      flex-grow: 1;
    `};
`;

const OpenConversationButton = styled(TextButton)`
  align-self: center;
  bottom: 0;
  margin-top: auto;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 3rem;
  }
`;
