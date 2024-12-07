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
  const isEmpty: boolean = mentors.length === 0;

  return (
    <>
      {isEmpty && <EmptyMentorList />}
      <CardsList isMobile={isMobile} data-testid="mentor-cards-container">
        {mentors.map(mentor => (
          <ListCard
            key={mentor.buddyId}
            mentor={mentor}
            setVisibleCard={setVisibleCard}
          />
        ))}
      </CardsList>
    </>
  );
};

const CardsList = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: 1;
  ${({ isMobile }) =>
    isMobile
      ? css`
          gap: 1.5rem;
          overflow: auto;
          scroll-snap-type: x mandatory;
          white-space: nowrap;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          flex-wrap: wrap;
          height: auto;
          justify-content: stretch;
          margin-left: calc(${spacing.layout_spacing} * -1);
          margin-top: ${spacing.layout_spacing};
          width: calc(${CONTENT_WIDTH} + (${spacing.layout_spacing} * 2));
        `}

  @media screen and (max-width: 1500px) {
    width: calc(1130px + (${spacing.layout_spacing} * 2));
    max-width: 100vw;
  }
`;

export default MentorList;
