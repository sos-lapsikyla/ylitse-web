// import { useTranslation } from 'react-i18next';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

import ProfilePicPlaceholder from '@/static/icons/chat-profilepic.svg';
import { palette } from '@/components/constants';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';

type Props = {
  name: string;
};

export const Header: React.FC<Props> = ({ name }) => {
  const { isMobile } = useGetLayoutMode();

  return (
    <Container isMobile={isMobile}>
      <ProfilePicture />
      <NameText variant="h2" color="white">
        {name}
      </NameText>
    </Container>
  );
};

const Container = styled.div<{ isMobile: boolean }>`
  align-items: center;
  background-color: ${palette.purpleDark};
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

const NameText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfilePicture = styled.div`
  background-image: ${ProfilePicPlaceholder};
  background-repeat: no-repeat;
  background-size: contain;
  flex: 0 0 4rem;
  height: 4rem;
  width: 4rem;
`;
