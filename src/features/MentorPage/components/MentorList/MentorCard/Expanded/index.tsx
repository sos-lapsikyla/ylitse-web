import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useEscape } from '@/hooks/useEscape';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';
import { getIsOlderThanDaysAgo } from '@/utils/utils';

import styled, { css } from 'styled-components';
import { Header } from './Header';
import { Content } from './Content';
import { palette, breakpoints } from '@/components/variables';

type Props = {
  onDismiss: () => void;
  mentor: Mentor;
};

export const MentorCard = ({ mentor, onDismiss }: Props) => {
  const { isMobile } = useGetLayoutMode();
  const currentUserId = useAppSelector(selectUserId);

  const isLessThan90DaysOld = getIsOlderThanDaysAgo(90, mentor.created);
  useEscape(() => onDismiss());

  return (
    <Container>
      <Card isMobile={isMobile}>
        <Header
          mentor={mentor}
          isAvailable={!mentor.isVacationing}
          isMe={currentUserId == mentor.buddyId}
          isNew={isLessThan90DaysOld}
          onDismiss={onDismiss}
        />
        <Content mentor={mentor} onDismiss={onDismiss} />
      </Card>
    </Container>
  );
};

const Card = styled.div<{ isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 10px;
  opacity: 1;
  z-index: 100;

  ${({ isMobile }) =>
    isMobile
      ? css`
          display: flex;
          flex: 1;
          flex-direction: column;
          margin: 0.5rem;
        `
      : css`
          display: flex;
          height: fit-content;
          left: 50%;
          margin: auto;
          max-height: 80vh;
          min-height: 57vh;
          position: fixed;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 65vw;
        `}
`;

const Container = styled.div`
  background-color: ${palette.greyOverlay};
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;

  @media screen and (max-width: ${breakpoints.mobile}) {
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default MentorCard;
