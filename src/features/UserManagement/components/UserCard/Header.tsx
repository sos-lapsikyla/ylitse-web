// import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderDark from '@/static/icons/chat-profilepic-dark.svg';
import ProfilePicPlaceholderVacation from '@/static/icons/profile-pic-vacation.svg';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';

import { getRoleStatus } from '@/utils/utils';
import RoleTag from './RoleTag';

type Props = {
  name: string;
  isMentor: boolean;
  isMentee: boolean;
  isVacationingMentor: boolean;
  isAdmin: boolean;
};

export const Header: React.FC<Props> = ({
  name,
  isMentor,
  isMentee,
  isAdmin,
  isVacationingMentor,
}) => {
  const { isMobile } = useGetLayoutMode();

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
      profilePictureVariation: ProfilePicPlaceholderDark,
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
      <RoleTag role={role} />
      <ProfilePicture
        $variation={headerColorMap[role].profilePictureVariation}
      />
      <NameText variant="h2" color={headerColorMap[role].text}>
        {name}
      </NameText>
    </Container>
  );
};

const Container = styled.div<{ $isMobile: boolean; $headerColor: string }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  width: 100%;
  height: 7rem;
  max-height: 7rem;
  padding: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '2.5rem')};
  color: ${palette.white};
  background-color: ${({ $headerColor }) => $headerColor};
  border-radius: 0.75rem;
`;

const NameText = styled(Text)`
  padding-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfilePicture = styled.div<{ $variation: string }>`
  flex: 0 0 4rem;
  width: 4rem;
  height: 4rem;
  background-image: url(${({ $variation }) => $variation});
  background-repeat: no-repeat;
  background-size: contain;
`;
