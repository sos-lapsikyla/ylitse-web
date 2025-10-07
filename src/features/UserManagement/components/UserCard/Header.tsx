// import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import ProfilePicPlaceholderAdmin from '@/static/icons/admin-blueDark.svg';
import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderDark from '@/static/icons/chat-profilepic-dark.svg';
import ProfilePicPlaceholderVacation from '@/static/icons/profile-pic-vacation.svg';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';

import { getRoleStatus } from '@/utils/utils';
import RoleTag from './RoleTag';
import { ManagedUser } from '../../models';
import { useAppSelector } from '@/store';
import { selectAccount } from '@/features/Authentication/selectors';

type Props = {
  managedUser: ManagedUser;
  isMentor: boolean;
  isMentee: boolean;
  isVacationingMentor: boolean;
  isAdmin: boolean;
};

export const Header: React.FC<Props> = ({
  managedUser,
  isMentor,
  isMentee,
  isAdmin,
  isVacationingMentor,
}) => {
  const { isMobile } = useGetLayoutMode();
  const { id: currentUserId } = useAppSelector(selectAccount);
  const isMe = currentUserId === managedUser.account_id;

  const role = getRoleStatus(isMentor, isVacationingMentor, isMentee, isAdmin);

  const headerColorMap = {
    mentor: {
      header: palette.purple,
      text: 'white',
      profilePictureVariation: ProfilePicPlaceholder,
    },
    admin: {
      header: palette.orange,
      text: 'blueDark',
      profilePictureVariation: ProfilePicPlaceholderAdmin,
    },
    mentee: {
      header: palette.blue2,
      text: 'blueDark',
      profilePictureVariation: ProfilePicPlaceholderDark,
    },
    default: {
      header: palette.orangeDark,
      text: 'white',
      profilePictureVariation: ProfilePicPlaceholder,
    },
    vacationingMentor: {
      header: palette.blueGrey,
      text: 'white',
      profilePictureVariation: ProfilePicPlaceholderVacation,
    },
  } as const;

  return (
    <Container $headerColor={headerColorMap[role].header} $isMobile={isMobile}>
      <TagContainer>
        {isMe && <MeTag>Sinä</MeTag>}
        <RoleTag role={role} />
      </TagContainer>
      <ProfilePicture
        $variation={headerColorMap[role].profilePictureVariation}
      />
      <NameText variant="h2" color={headerColorMap[role].text}>
        {managedUser.nickname}
      </NameText>
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean; $headerColor: string }>`
  align-items: center;
  background-color: ${({ $headerColor }) => $headerColor};
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: ${palette.white};
  display: flex;
  flex: 0 0 auto;
  height: 7rem;
  max-height: 7rem;
  padding: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '2.5rem')};
  position: relative;
  width: 100%;
`;

const NameText = styled(Text)`
  overflow: hidden;
  padding-left: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfilePicture = styled.div<{ $variation: string }>`
  background-image: url(${({ $variation }) => $variation});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 4rem;
  height: 4rem;
  width: 4rem;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-1rem, -50%);
`;

const MeTag = styled(Text)`
  background-color: ${palette.blueLight};
  border-radius: 0.25rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  margin: 0;
  padding: 0.25rem 1rem;
`;
