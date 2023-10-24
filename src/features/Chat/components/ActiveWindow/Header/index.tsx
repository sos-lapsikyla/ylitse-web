import { useState } from 'react';

import {
  selectMentorById,
  useGetMentorsQuery,
} from '@/features/MentorPage/mentorPageApi';
import { useAppSelector } from '@/store';

import type { ChatBuddy } from '@/features/Chat/chatSlice';

import styled from 'styled-components';
import ArchivedIcon from '@/static/icons/archived-chats.svg';
import Buttons from './Buttons';
import BlockedIcon from '@/static/icons/blocked-chats.svg';
import { palette } from '@/components/variables';
import { Profile as ProfileIcon } from '@/components/Icons/Profile';
import { ROW_HEIGHT } from '@/features/Chat/constants';
import Search from './Search';
import Text from '@/components/Text';

type Props = {
  chat: ChatBuddy;
};

const Header = ({ chat }: Props) => {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const showSearch = () => setIsSearchShown(true);
  const hideSearch = () => setIsSearchShown(false);

  useGetMentorsQuery();

  const mentor = useAppSelector(selectMentorById(chat.buddyId));

  const icons = {
    ok: <ProfileIcon color="purpleDark" />,
    archived: <img src={ArchivedIcon} />,
    banned: <img src={BlockedIcon} />,
  };

  return (
    <Container>
      <ProfileInfo>
        {icons[chat.status]}
        <MentorName variant="h2">{chat.displayName}</MentorName>
        {mentor && <MentorBio variant="p">{mentor.statusMessage}</MentorBio>}
      </ProfileInfo>
      {isSearchShown ? (
        <Search hideSearch={hideSearch} />
      ) : (
        <Buttons chat={chat} showSearch={showSearch} />
      )}
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 1px solid ${palette.greyLight};
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  height: ${ROW_HEIGHT};
  justify-content: space-between;
  padding: 14px 40px;
`;

const ProfileInfo = styled.div`
  align-items: center;
  display: flex;
`;

const MentorName = styled(Text)`
  display: block;
  padding-left: 20px;
  padding-right: 30px;
  white-space: nowrap;
`;

const MentorBio = styled(Text)`
  display: block;
  white-space: nowrap;
`;

export default Header;