import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { getStatus } from '@/utils/utils';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { Column, SpacedRow } from '@/components/common';
import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderForMe from '@/static/icons/chat-profilepic-me.svg';
import {
  breakpoints,
  DEFAULT_ICON_SIZE,
  palette,
} from '@/components/constants';
import { IconButton } from '@/components/Buttons';
import { BasicInfo } from './BasicInfo';
import { Tag } from './Tag';
import styled, { css } from 'styled-components';

type Props = {
  mentor: Mentor;
  isMe: boolean;
  isAvailable: boolean;
  isNew: boolean;
  onDismiss: () => void;
};

export const Header = ({
  mentor,
  isMe,
  isAvailable,
  isNew,
  onDismiss,
}: Props) => {
  const { isMobile } = useGetLayoutMode();

  const status = getStatus(isMe, isAvailable, isNew);

  const statusColors = {
    me: palette.blue,
    unavailable: palette.blueGrey,
    new: palette.purple,
    empty: palette.purple,
  };

  return isMobile ? (
    <Container statusColor={statusColors[status]} isMobile>
      <SpacedRow>
        <Column>
          <Tag status={status} />
          <ProfilePicture isMe={isMe} isMobile />
        </Column>
        <BasicInfo isMe={isMe} mentor={mentor} />
        <CloseButton
          onClick={onDismiss}
          variant="closeWithBackground"
          sizeInPx={DEFAULT_ICON_SIZE.MEDIUM}
        />
      </SpacedRow>
    </Container>
  ) : (
    <Container statusColor={statusColors[status]} isMobile={false}>
      <Tag status={status} />
      <ProfilePicture isMe={isMe} isMobile={false} />
      <BasicInfo isMe={isMe} mentor={mentor} />
    </Container>
  );
};

const Container = styled.div<{ statusColor: string; isMobile: boolean }>`
  background-color: ${({ statusColor }) => statusColor}};
  border-radius: 0.75rem;
  box-sizing: border-box;
  border-radius: 10px;
  display: ${({ isMobile }) => (isMobile ? 'flex' : '')}
  flex: 0 0 21vw;
  min-height: 7.5rem;
  ${({ isMobile }) => !isMobile && css`padding: 2rem;'`}
`;

const ProfilePicture = styled.div<{ isMe: boolean; isMobile: boolean }>`
  background-image: ${({ isMe }) =>
    `url(${isMe ? ProfilePicPlaceholderForMe : ProfilePicPlaceholder})`};
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 2 10vw;
  height: 10vw;
  margin: 2rem auto;
  width: 10vw;
  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 0 0 4rem;
    margin: 2rem 2rem 1rem 1rem;
    height: 5rem;
    width: 5rem;
  }
`;

const CloseButton = styled(IconButton)`
  align-self: flex-start;
  margin: 0.5rem;
`;
