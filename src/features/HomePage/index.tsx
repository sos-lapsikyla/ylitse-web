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
import { OUTER_HORIZONTAL_MARGIN } from '@/components/constants';
import PageWithTransition from '@/components/PageWithTransition';
import ProfileWidget from './components/ProfileWidget';
import Welcome from './components/Welcome';

const HomePage = () => {
  const hasUnreadMessages = useAppSelector(selectHasUnreadMessages);
  const { isTablet } = useGetLayoutMode();
  const mentor = useAppSelector(selectMyMentorProfile);

  return isTablet ? (
    <PageWithTransition>
      <Info isMobile />
      {hasUnreadMessages ? <NewMessages isMobile /> : <Welcome isMobile />}
      <Announcements isMobile />
      <NewestMentors isMobile />
      <FindMentor isMobile />
      <Concepts isMobile />
    </PageWithTransition>
  ) : (
    <PageWithTransition>
      <TopContainer>
        <Info />
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
      <NewestMentors />
    </PageWithTransition>
  );
};

const TopContainer = styled.div`
  background: url(${Background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 40rem;
  position: relative;
`;

const MiddleContainer = styled.div`
  align-self: center;
  display: flex;
  gap: 2rem;
  padding: 4rem ${OUTER_HORIZONTAL_MARGIN};
`;

const InnerContainer = styled(Column)`
  gap: 2rem;
`;

export default HomePage;
