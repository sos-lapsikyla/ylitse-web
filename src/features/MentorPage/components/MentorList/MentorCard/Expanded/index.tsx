import type { Mentor } from '@/features/MentorPage/models';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useEscape } from '@/hooks/useEscape';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/selectors';
import { getIsOlderThanDaysAgo } from '@/utils/utils';

import styled, { css } from 'styled-components';
import { Header } from './Header';
import { Content } from './Content';
import { palette, breakpoints } from '@/components/constants';

type Props = {
  onDismiss: () => void;
  mentor: Mentor;
};

export const MentorCard = ({ mentor, onDismiss }: Props) => {
  const { isTabletNarrow } = useGetLayoutMode();
  const currentUserId = useAppSelector(selectUserId);

  const isLessThan90DaysOld = getIsOlderThanDaysAgo(90, mentor.created);

  useEscape(() => onDismiss());

  return (
    <Container>
      <Card $isTabletNarrow={isTabletNarrow}>
        <Header
          mentor={mentor}
          isAvailable={!mentor.isVacationing}
          isMe={currentUserId === mentor.buddyId}
          isNew={isLessThan90DaysOld}
          onDismiss={onDismiss}
        />
        <Content
          isMe={currentUserId === mentor.buddyId}
          mentor={mentor}
          onDismiss={onDismiss}
        />
      </Card>
    </Container>
  );
};

const Card = styled.div<{ $isTabletNarrow: boolean }>`
  z-index: 100;
  background-color: ${palette.white};
  border-radius: 10px;
  opacity: 1;

  ${({ $isTabletNarrow }) =>
    $isTabletNarrow
      ? css`
          display: flex;
          flex: 1;
          flex-direction: column;
          max-width: 35rem;
          max-height: 50rem;
          margin: 1rem;
          margin-top: 4rem;
        `
      : css`
          position: fixed;
          top: 50%;
          left: 50%;
          display: flex;
          width: 65vw;
          height: fit-content;
          min-height: 57vh;
          max-height: 80vh;
          margin: auto;
          transform: translate(-50%, -50%);
        `}
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: ${palette.greyOverlay};

  @media screen and (max-width: ${breakpoints.tabletNarrow}) {
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
`;

export default MentorCard;
