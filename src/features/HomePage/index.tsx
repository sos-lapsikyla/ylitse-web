import styled from 'styled-components';

import { selectHasUnreadMessages } from '@/features/Chat/selectors';
import { useAppSelector } from '@/store';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { selectMyMentorProfile } from '../MentorPage/selectors';

import Announcements from './components/Announcements';
import Background from '@/static/img/home-page-background.svg';
import { Column } from '@/components/common';
import Concepts from './components/Concepts';
import FindMentor from './components/FindMentor';
import Info from './components/Info';
import NewestMentors from './components/NewestMentors';
import NewMessages from './components/NewMessages';
import { OUTER_HORIZONTAL_MARGIN, palette } from '@/components/constants';
import ProfileWidget from './components/ProfileWidget';
import Welcome from './components/Welcome';
import WelcomeMessage from './components/WelcomeMessage';
import Feedback from './components/Feedback';
import MentorFeedback from './components/MentorFeedback';
import MobileAppAd from './components/MobileAppAd';

const HomePage = () => {
  const hasUnreadMessages = useAppSelector(selectHasUnreadMessages);
  const { isTabletNarrow } = useGetLayoutMode();
  const mentor = useAppSelector(selectMyMentorProfile);

  return isTabletNarrow ? (
    <>
      <Info isMobile />
      {hasUnreadMessages ? <NewMessages isMobile /> : <Welcome />}
      {!mentor && <Feedback />}
      {mentor && <MentorFeedback />}
      <NewestMentors isMobile />
      {mentor && <ProfileWidget mentor={mentor} isMobile />}
      <FindMentor isMobile />
      <Concepts isMobile />
      <MobileAppAd isMobile />
    </>
  ) : (
    <>
      <TopContainer>
        <Info />
        <WelcomeMessage />
      </TopContainer>
      <MiddleContainer>
        <InnerContainer>
          {hasUnreadMessages ? <NewMessages /> : <Welcome />}
          {!mentor && <Feedback />}
          {mentor && <Announcements />}
          {mentor && <ProfileWidget mentor={mentor} />}
        </InnerContainer>
        <InnerContainer>
          {mentor && <MentorFeedback />}
          <Concepts />
          {!mentor && <Announcements />}
        </InnerContainer>
      </MiddleContainer>
      <BottomContainer>
        <NewestMentors />
      </BottomContainer>
      <MobileAppAd />
    </>
  );
};

const TopContainer = styled.div`
  background-image: url(${Background});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  height: 39rem;
  margin: 0 auto;
  max-width: 110rem;
  position: relative;
  width: 100%;
`;

const MiddleContainer = styled.div`
  align-self: center;
  display: flex;
  gap: 2rem;
  max-width: 95rem;
  padding: 6rem ${OUTER_HORIZONTAL_MARGIN};
`;

const BottomContainer = styled.div`
  background-color: ${palette.blueWhite};
`;

const InnerContainer = styled(Column)`
  gap: 2rem;
`;

export default HomePage;
