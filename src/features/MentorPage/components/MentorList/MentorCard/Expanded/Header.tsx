import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import { breakpoints, palette } from '@/components/variables';
import { IconButton } from '@/components/Buttons';
import { BasicInfo } from './BasicInfo';
import { Tag, type Status } from './Tag';
import styled, { css } from 'styled-components';

type Props = {
  mentor: Mentor;
  isAvailable: boolean;
  isMe: boolean;
  isNew: boolean;
  onDismiss: () => void;
};

export const Header = ({
  mentor,
  isMe,
  isNew,
  isAvailable,
  onDismiss,
}: Props) => {
  // const availabilityMessage = mentor.isVacationing ? 'Ei tavoitettavissa' : '';
  const { isMobile } = useGetLayoutMode();

  const getStatus = (
    isMe: boolean,
    isAvailable: boolean,
    isNew: boolean,
  ): Status => {
    if (isMe) {
      return 'me';
    }
    if (!isAvailable) {
      return 'unavailable';
    }
    if (isNew) {
      return 'new';
    }
    return 'empty';
  };

  return isMobile ? (
    <Container isAvailable={!mentor.isVacationing} isMobile>
      <HeaderWrapper>
        <AvatarWrapper>
          {/* <Availability isShowing={availabilityMessage.length > 0}>
            {availabilityMessage}
          </Availability> */}
          <Tag status={getStatus(isMe, isAvailable, isNew)}></Tag>
          <ProfilePicture isMobile />
        </AvatarWrapper>
        <BasicInfo mentor={mentor} />
        <CloseButton
          onClick={onDismiss}
          variant="closeWithBackground"
          sizeInPx={38}
        />
      </HeaderWrapper>
    </Container>
  ) : (
    <Container isAvailable={!mentor.isVacationing} isMobile={false}>
      {/* <Availability isShowing={availabilityMessage.length > 0}>
        {availabilityMessage}
      </Availability> */}
      <Tag status={'new'}></Tag>
      <ProfilePicture isMobile={false} />
      <BasicInfo mentor={mentor} />
    </Container>
  );
};

const Container = styled.div<{ isAvailable: boolean; isMobile: boolean }>`
  background-color: ${({ isAvailable }) =>
    isAvailable ? palette.purple : palette.blueGrey};
  border-radius: 10px;
  flex: 0 0 21vw;
  ${({ isMobile }) => !isMobile && css`padding: 2rem;'`}
`;

const ProfilePicture = styled.div<{ isMobile: boolean }>`
  background-image: url(${ProfilePicPlaceholder});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 10vw;
  height: 10vw;
  margin: 2rem auto;
  width: 10vw;

  @media screen and (max-width: ${breakpoints.mobile}) {
    width: 20vw;
    height: 20vw;
    margin: 1rem 0.5rem;
    flex: 1;
  }
`;

// const Availability = styled(Text)<{ isShowing: boolean }>`
//   display: ${props => (props.isShowing ? `flex` : `none`)};
//   background-color: ${palette.blueWhite};
//   padding: 0.25rem 1rem;
//   border-radius: 0.25rem;
//   width: fit-content;
//           margin: -1rem auto;

//   @media screen and (max-width: ${breakpoints.mobile}) {
//     margin -1rem 1rem;
//   }
// `;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(IconButton)`
  align-self: flex-start;
  margin: 0.5rem;
`;
