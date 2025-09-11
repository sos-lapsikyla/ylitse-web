// import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import RoleTag from './RoleTag';
import { getRoleStatus } from '@/utils/utils';

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

  const headerColor = {
    mentor: palette.purpleDark,
    admin: palette.orange,
    mentee: palette.blue,
    default: palette.orangeDark,
    vacationingMentor: palette.blueGrey,
  };

  return (
    <Container headerColor={headerColor[role]} isMobile={isMobile}>
      <RoleTag role={role} />
      <ProfilePicture />
      <NameText variant="h2" color="white">
        {name}
      </NameText>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean; headerColor: string }>`
  align-items: center;
  background-color:  ${({ headerColor }) => headerColor}};
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: ${palette.white};
  display: flex;
  flex: 0 0 auto;
  height: 7rem;
  max-height: 7rem;
  padding: ${({ isMobile }) => (isMobile ? '1.5rem' : '2.5rem')};
  position: relative;
  width: 100%;
`;

const NameText = styled(Text)`
  overflow: hidden;
  padding-left: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfilePicture = styled.div`
  background-image: url(${ProfilePicPlaceholder});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 4rem;
  height: 4rem;
  width: 4rem;
`;
