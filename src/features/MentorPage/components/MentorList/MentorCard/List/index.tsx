import type { Mentor } from '@/features/MentorPage/mentorPageApi';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/userSlice';
import { getIsOlderThanDaysAgo } from '@/utils/utils';

import styled, { css } from 'styled-components';
import { Header } from './Header';
import { Languages } from './Languages';
import { Skills } from './Skills';
import { Story } from './Story';
import { ExpandButton } from './ExpandButton';
import { spacing, palette, CONTENT_WIDTH } from '@/components/variables';

type Props = {
  isHomePage?: boolean;
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

export const ListCard: React.FC<Props> = ({
  isHomePage = false,
  setVisibleCard,
  mentor,
}) => {
  const { isMobile } = useGetLayoutMode();
  const currentUserId = useAppSelector(selectUserId);

  const isLessThan90DaysOld = getIsOlderThanDaysAgo(90, mentor.created);
  return (
    <Container isHomePage={isHomePage} isMobile={isMobile}>
      <Header
        name={mentor.name}
        age={mentor.age}
        region={mentor.region}
        isAvailable={!mentor.isVacationing}
        isMe={currentUserId == mentor.buddyId}
        isNew={isLessThan90DaysOld}
        message={mentor.statusMessage}
      />
      <CardContent isMobile={isMobile}>
        <Story story={mentor.story} />
        <Languages languages={mentor.languages} />
        <Skills skills={mentor.skills} />
        <ExpandButton setVisibleCard={setVisibleCard} mentor={mentor} />
      </CardContent>
    </Container>
  );
};

const Container = styled.div<{ isHomePage: boolean; isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;

  ${({ isMobile }) =>
    isMobile &&
    css`
      margin: 1rem 0;
      max-height: 40%;
      min-width: 80%;
      scroll-behavior: smooth;
      scroll-snap-align: center;

      &:first-child {
        margin-left: 1.5rem;
      }

      &:last-child {
        margin-right: 1.5rem;
      }
    `}

  ${({ isHomePage, isMobile }) =>
    isHomePage &&
    !isMobile &&
    css`
      flex: 1;
    `}

    ${({ isHomePage, isMobile }) =>
    !isHomePage &&
    !isMobile &&
    css`
      flex: 0 0 30%;
      flex-wrap: wrap;
      margin: ${spacing.layout_spacing};
      max-width: calc(
        ((${CONTENT_WIDTH} + ${spacing.layout_spacing} * 2) / 3) -
          (${spacing.layout_spacing} * 2)
      );

      @media screen and (min-width: 2550px) {
        flex: 0 0 20%;
        max-width: calc(
          ((${CONTENT_WIDTH} + ${spacing.layout_spacing} * 2) / 5) -
            (${spacing.layout_spacing} * 2)
        );
      }
      @media screen and (min-width: 1950px) {
        flex: 0 0 25%;
        max-width: calc(
          ((${CONTENT_WIDTH} + ${spacing.layout_spacing} * 2) / 4) -
            (${spacing.layout_spacing} * 2)
        );
      }
      @media screen and (max-width: 1500px) {
        flex: 0 0 30%;
        max-width: calc(
          ((1130px + (${spacing.layout_spacing} * 2)) / 3) -
            (${spacing.layout_spacing} * 2)
        );
      }
      @media screen and (max-width: 1200px) {
        flex: 0 0 50%;
        max-width: calc((100vw / 2) - (${spacing.layout_spacing} * 2));
      }
    `}
`;

const CardContent = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ isMobile }) => (isMobile ? '0.5rem' : '1.5rem')};
  justify-content: space-between;
  padding: 1.5rem;
`;

export default ListCard;
