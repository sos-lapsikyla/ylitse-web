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
      $headerColor={headerColorMap[status].headerColor}
      $isMobile={isMobile}
    >
      <Tag status={status}></Tag>
      <ProfilePicture
        $variation={headerColorMap[status].profilePictureVariation}
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
        <TruncateText color={headerColorMap[status].text}>
          {message}
        </TruncateText>
      </BasicInfo>
    </Container>
  );
};

const Container = styled.div<{ $headerColor: string; $isMobile: boolean }>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  width: 100%;
  height: 7.5rem;
  max-height: 7.5rem;
  padding: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '2.5rem')};
  color: ${palette.white};
  background-color: ${({ $headerColor }) => $headerColor};
  border-radius: 0.75rem;
`;

const ProfilePicture = styled.div<{ $variation: string }>`
  flex: 0 0 4rem;
  width: 4rem;
  height: 4rem;
  background-image: url(${({ $variation }) => $variation});
  background-repeat: no-repeat;
  background-size: contain;
`;

const NameText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BasicInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  max-width: calc(100% - 3.8rem);
  padding-left: 1rem;
`;

const Divider = styled.span`
  padding-right: 1rem;
  padding-left: 1rem;
`;

const TruncateText = styled(Text)`
  width: 100%;
  margin: 0 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
