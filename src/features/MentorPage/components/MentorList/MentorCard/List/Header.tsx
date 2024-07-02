import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import { palette } from '@/components/variables';
import styled from 'styled-components';
import { TruncateText, WrappedText } from '../Expanded/BasicInfo';
import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import { Text } from '@/components/Text/Text';

type Props = {
  name: string;
  age: number;
  region: string;
  isAvailable: boolean;
  message: string;
};

export const Header: React.FC<Props> = ({
  name,
  age,
  region,
  isAvailable,
  message,
}) => {
  const { t } = useTranslation('mentors');
  const { isMobile } = useGetLayoutMode();

  const availabilityMessage = isAvailable ? '' : t('card.unavailable');

  return (
    <Container isAvailable={isAvailable} isMobile={isMobile}>
      <Availability isShowing={!isAvailable}>
        {availabilityMessage}
      </Availability>
      <ProfilePicture />
      <BasicInfo>
        <NameText variant="h2" color="white">
          {name}
        </NameText>
        <WrappedText color="white">
          {age} {t('card.age')} <Divider>|</Divider>
          {region}
        </WrappedText>
        <TruncateText color="white">{message}</TruncateText>
      </BasicInfo>
    </Container>
  );
};

const Container = styled.div<{ isAvailable: boolean; isMobile: boolean }>`
  align-items: center;
  background-color: ${({ isAvailable }) =>
    isAvailable ? palette.purple : palette.blueGrey};
  border-radius: 0.75rem;
  box-sizing: border-box;
  color: ${palette.white};
  display: flex;
  flex: 0 0 auto;
  height: 7.5rem;
  max-height: 7.5rem;
  padding: ${({ isMobile }) => (isMobile ? '1rem' : '1.9rem')};
  position: relative;
  width: 100%;
`;

const ProfilePicture = styled.div`
  background-image: url(${ProfilePicPlaceholder});
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
  padding-left: 1.9rem;
`;

const Divider = styled.span`
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Availability = styled(Text)<{ isShowing: boolean }>`
  background-color: ${palette.blueWhite};
  border-radius: 0.25rem;
  display: ${props => (props.isShowing ? `flex` : `none`)};
  margin: 0;
  padding: 0.25rem 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-1rem, -50%);
`;
