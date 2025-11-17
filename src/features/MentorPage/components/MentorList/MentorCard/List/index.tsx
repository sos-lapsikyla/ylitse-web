import type { Mentor } from '@/features/MentorPage/models';

import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useAppSelector } from '@/store';
import { selectUserId } from '@/features/Authentication/selectors';
import { getIsOlderThanDaysAgo } from '@/utils/utils';

import styled, { css } from 'styled-components';
import { Header } from './Header';
import { Languages } from './Languages';
import { Skills } from './Skills';
import { Story } from './Story';
import { spacing, palette, CONTENT_WIDTH } from '@/components/constants';
import { ExpandButton } from '@/components/Buttons';
import { useTranslation } from 'react-i18next';

type Props = {
  isHomePage?: boolean;
  isForcedMobile?: boolean;
  setVisibleCard: (mentor: Mentor) => void;
  mentor: Mentor;
};

const ListCard: React.FC<Props> = ({
  isHomePage = false,
  isForcedMobile = false,
  setVisibleCard,
  mentor,
}) => {
  const { isMobile: isActualMobile } = useGetLayoutMode();
  const isMobile = isForcedMobile || isActualMobile;
  const { t } = useTranslation('mentors');
  const currentUserId = useAppSelector(selectUserId);
  const isLessThan90DaysOld = getIsOlderThanDaysAgo(
    90,
    new Date(mentor.created).getTime(),
  );
  const areLanguagesDisplayed = mentor.languages.length > 0;

  return (
    <Container $isHomePage={isHomePage} $isMobile={isMobile}>
      <Header
        name={mentor.name}
        age={mentor.age}
        region={mentor.region}
        isAvailable={!mentor.isVacationing}
        isMe={currentUserId == mentor.buddyId}
        isNew={isLessThan90DaysOld}
        message={mentor.statusMessage}
      />
      <CardContent $isMobile={isMobile}>
        <Story story={mentor.story} />
        {areLanguagesDisplayed && <Languages languages={mentor.languages} />}
        <Skills skills={mentor.skills} />
        <ExpandButton
          title={t('card.open')}
          onClick={() => setVisibleCard(mentor)}
        />
      </CardContent>
    </Container>
  );
};

const Container = styled.div<{ $isHomePage: boolean; $isMobile: boolean }>`
  background-color: ${palette.white};
  border-radius: 0.75rem;
  display: flex;
  filter: drop-shadow(-0.5rem 0 0.5rem rgba(0, 0, 0, 0.01))
    drop-shadow(0.5rem 0 0.5rem rgba(0, 0, 0, 0.01))
    drop-shadow(0 0.5rem 0.5rem rgba(0, 0, 0, 0.01));
  flex-direction: column;
  max-width: 450px;
  min-width: 300px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      margin: 1rem 0;
      max-height: 40%;
      scroll-behavior: smooth;
      scroll-snap-align: center;

      &:first-child {
        margin-left: 1.5rem;
      }

      &:last-child {
        margin-right: 1.5rem;
      }
    `}

  ${({ $isHomePage, $isMobile }) =>
    $isHomePage &&
    $isMobile &&
    css`
      flex-basis: 300px;
      flex-grow: 1;
    `}

  ${({ $isHomePage, $isMobile }) =>
    $isHomePage &&
    !$isMobile &&
    css`
      flex: 1;
    `}

  ${({ $isHomePage, $isMobile }) =>
    !$isHomePage &&
    !$isMobile &&
    css`
      flex: 0 0 30%;
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

const CardContent = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: space-between;
  padding: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '2.5rem')};
`;

export default ListCard;
