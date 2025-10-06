import type { Mentor } from '@/features/MentorPage/models';

import { getStatus } from '@/utils/utils';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { Column, SpacedRow } from '@/components/common';
import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderForMe from '@/static/icons/chat-profilepic-dark.svg';
import { breakpoints, ICON_SIZES, palette } from '@/components/constants';
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
  const { isTabletNarrow } = useGetLayoutMode();

  const status = getStatus(isMe, isAvailable, isNew);

  const statusColors = {
    me: palette.blue,
    unavailable: palette.blueGrey,
    new: palette.purple,
    empty: palette.purple,
  };

  return isTabletNarrow ? (
    <Container $statusColor={statusColors[status]} $isTabletNarrow>
      <SpacedRow>
        <Column>
          <Tag status={status} />
          <ProfilePicture $isMe={isMe} $isTabletNarrow />
        </Column>
        <BasicInfo isMe={isMe} mentor={mentor} />
        <CloseButton
          onClick={onDismiss}
          variant="closeWithBackground"
          sizeInPx={ICON_SIZES.MEDIUM}
        />
      </SpacedRow>
    </Container>
  ) : (
    <Container $statusColor={statusColors[status]} $isTabletNarrow={false}>
      <Tag status={status} />
      <ProfilePicture $isMe={isMe} $isTabletNarrow={false} />
      <BasicInfo isMe={isMe} mentor={mentor} />
    </Container>
  );
};

const Container = styled.div<{
  $statusColor: string;
  $isTabletNarrow: boolean;
}>`
  box-sizing: border-box;
  min-height: 7.5rem;
  background-color: ${({ $statusColor }) => $statusColor};
  border-radius: 10px;
  ${({ $isTabletNarrow }) =>
    !$isTabletNarrow &&
    css`
      padding: 2rem;
    `}
`;

const ProfilePicture = styled.div<{ $isMe: boolean; $isTabletNarrow: boolean }>`
  flex: 0 2 10vw;
  width: 10vw;
  height: 10vw;
  margin: 2rem auto;
  background-image: ${({ $isMe }) =>
    `url(${$isMe ? ProfilePicPlaceholderForMe : ProfilePicPlaceholder})`};
  background-repeat: no-repeat;
  background-size: contain;

  @media screen and (max-width: ${breakpoints.mobile}) {
    flex: 0 0 4rem;
    width: 5rem;
    height: 5rem;
    margin: 2rem 2rem 1rem 1.5rem;
  }
`;

const CloseButton = styled(IconButton)`
  align-self: flex-start;
  margin: 0.5rem;
`;
