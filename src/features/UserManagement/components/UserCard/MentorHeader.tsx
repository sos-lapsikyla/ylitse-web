// import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderDark from '@/static/icons/chat-profilepic-dark.svg';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import RoleTag from './RoleTag';
import { getRoleStatus } from '@/utils/utils';
import { useTranslation } from 'react-i18next';

type Props = {
  name: string;
  age: number;
  region: string;
  message: string;
  isMentor: boolean;
  isMentee: boolean;
  isVacationingMentor: boolean;
  isAdmin: boolean;
};

interface ProfilePictureProps {
  variation: string;
}

export const MentorHeader: React.FC<Props> = ({
  name,
  age,
  region,
  message,
  isMentor,
  isMentee,
  isAdmin,
  isVacationingMentor,
}) => {
  const { t } = useTranslation('users');
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
      profilePictureVariation: ProfilePicPlaceholder,
    },
  } as const;

  const isDividerDisplayed = Boolean(age) && Boolean(region);

  return (
    <Container headerColor={headerColorMap[role].header} isMobile={isMobile}>
      <RoleTag role={role} />
      <ProfilePicture
        variation={headerColorMap[role].profilePictureVariation}
      />
      <BasicInfo>
        <NameText variant="h2" color={headerColorMap[role].text}>
          {name}
        </NameText>
        <WrappedText color={headerColorMap[role].text}>
          {age} {t('card.age')}
          {isDividerDisplayed && <Divider>|</Divider>}
          {region}
        </WrappedText>
        <TruncateText isMobile={isMobile} color={headerColorMap[role].text}>
          {message}
        </TruncateText>
      </BasicInfo>
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
  padding-top: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfilePicture = styled.div<ProfilePictureProps>`
  background-image: url(${props => props.variation});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 4rem;
  height: 4rem;
  width: 4rem;
`;

export const WrappedText = styled(Text)`
  display: flex;
  flexwrap: wrap;
  margin: 0px;
`;

const BasicInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 0 0 100%;
  flex-direction: column;
  max-width: calc(100% - 3.8rem);
  padding-left: 1rem;
`;

const Divider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const TruncateText = styled(Text)<{ isMobile: boolean }>`
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
