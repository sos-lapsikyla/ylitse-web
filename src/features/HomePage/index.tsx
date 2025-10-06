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
import PageWithTransition from '@/components/PageWithTransition';
import ProfileWidget from './components/ProfileWidget';
import Welcome from './components/Welcome';
import WelcomeMessage from './components/WelcomeMessage';

const HomePage = () => {
  const hasUnreadMessages = useAppSelector(selectHasUnreadMessages);
  const { isTabletNarrow } = useGetLayoutMode();
  const mentor = useAppSelector(selectMyMentorProfile);

  return isTabletNarrow ? (
    <PageWithTransition>
      <Info isMobile />
      {hasUnreadMessages ? <NewMessages isMobile /> : <Welcome isMobile />}
      <Announcements isMobile />
      <NewestMentors isMobile />
      {mentor && <ProfileWidget mentor={mentor} isMobile />}
      <FindMentor isMobile />
      <Concepts isMobile />
    </PageWithTransition>
  ) : (
    <PageWithTransition>
      <TopContainer>
        <Info />
        <WelcomeMessage />
      </TopContainer>
      <MiddleContainer>
        <InnerContainer>
          {hasUnreadMessages ? <NewMessages /> : <Welcome />}
          {!mentor && <Announcements />}
          {mentor && <ProfileWidget mentor={mentor} />}
        </InnerContainer>
        <InnerContainer>
          {mentor && <Announcements />}
          <Concepts />
        </InnerContainer>
      </MiddleContainer>
      <BottomContainer>
        <NewestMentors />
      </BottomContainer>
    </PageWithTransition>
  );
};

const TopContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 110rem;
  height: 39rem;
  margin: 0 auto;
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
`;

const MiddleContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-self: center;
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
