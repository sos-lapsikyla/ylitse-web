import type { Mentor } from '@/features/MentorPage/models';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import styled, { css } from 'styled-components';
import { CONTENT_WIDTH, spacing } from '@/components/constants';
import ListCard from './MentorCard/List';
import EmptyMentorList from '../EmptyList';

type Props = {
  mentors: Array<Mentor>;
  setVisibleCard: (mentor: Mentor) => void;
};

const MentorList: React.FC<Props> = ({ setVisibleCard, mentors }) => {
  const { isMobile } = useGetLayoutMode();
  const isMentorsEmpty: boolean = mentors.length === 0;

  return isMentorsEmpty ? (
    <EmptyMentorList />
  ) : (
    <CardsList $isMobile={isMobile} data-testid="mentor-cards-container">
      {mentors.map(mentor => (
        <ListCard
          key={mentor.buddyId}
          mentor={mentor}
          setVisibleCard={setVisibleCard}
        />
      ))}
    </CardsList>
  );
};

const CardsList = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex: 1;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 1.5rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding-top: 1.5rem;
          scroll-padding-inline: 1.5rem;
          scroll-snap-type: x mandatory;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          align-content: stretch;
          align-items: stretch;
          flex-wrap: wrap;
          height: auto;
          justify-content: flex-start;
          margin-left: calc(${spacing.layout_spacing} * -1);
          margin-top: ${spacing.layout_spacing};
          width: calc(${CONTENT_WIDTH} + (${spacing.layout_spacing} * 2));
        `}

  @media screen and (max-width: 1500px) {
    max-width: 100vw;
    width: calc(1130px + (${spacing.layout_spacing} * 2));
  }
`;

export default MentorList;
