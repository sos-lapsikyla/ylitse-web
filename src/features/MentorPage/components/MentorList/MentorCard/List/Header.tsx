import { getStatus } from '@/utils/utils';
import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { palette } from '@/components/constants';
import styled from 'styled-components';
import { WrappedText } from '../Expanded/BasicInfo';
import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import ProfilePicPlaceholderDark from '@/static/icons/chat-profilepic-dark.svg';
import ProfilePicPlaceholderVacation from '@/static/icons/profile-pic-vacation.svg';
import { Text } from '@/components/Text/Text';
import { Tag } from './Tag';

type Props = {
  name: string;
  age: number;
  region: string;
  isAvailable: boolean;
  isMe: boolean;
  isNew: boolean;
  message: string;
};

interface ProfilePictureProps {
  variation: string;
}

export const Header: React.FC<Props> = ({
  name,
  age,
  region,
  isAvailable,
  isMe,
  isNew,
  message,
}) => {
  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  const status = getStatus(isMe, isAvailable, isNew);

  const headerColorMap = {
    me: {
      headerColor: palette.blue,
      text: 'blueDark',
      profilePictureVariation: ProfilePicPlaceholderDark,
    },
    unavailable: {
      headerColor: palette.blueGrey,
      text: 'white',
      profilePictureVariation: ProfilePicPlaceholderVacation,
    },
    new: {
      headerColor: palette.purple,
      text: 'white',
      profilePictureVariation: ProfilePicPlaceholder,
    },
    empty: {
      headerColor: palette.purple,
      text: 'white',
      profilePictureVariation: ProfilePicPlaceholder,
    },
  } as const;

  const isDividerDisplayed = Boolean(age) && Boolean(region);

  return (
    <Container
      headerColor={headerColorMap[status].headerColor}
      isMobile={isMobile}
    >
      <Tag status={status}></Tag>
      <ProfilePicture
        variation={headerColorMap[status].profilePictureVariation}
      />
      <BasicInfo>
        <NameText variant="h2" color={headerColorMap[status].text}>
          {name}
        </NameText>
        <WrappedText color={headerColorMap[status].text}>
          {age}
          {t('card.age')}
          {isDividerDisplayed && <Divider>|</Divider>}
          {region}
        </WrappedText>
        <TruncateText isMobile={isMobile} color={headerColorMap[status].text}>
          {message}
        </TruncateText>
      </BasicInfo>
    </Container>
  );
};

const Container = styled.div<{ headerColor: string; isMobile: boolean }>`
  align-items: center;
  background-color: ${({ headerColor }) => headerColor}};
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: ${palette.white};
  display: flex;
  flex: 0 0 auto;
  height: 7.5rem;
  max-height: 7.5rem;
  padding: ${({ isMobile }) => (isMobile ? '1.5rem' : '2.5rem')};
  position: relative;
  width: 100%;
`;

const ProfilePicture = styled.div<ProfilePictureProps>`
  background-image: url(${props => props.variation});
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 4rem;
  height: 4rem;
  width: 4rem;
`;

const NameText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
