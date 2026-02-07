import { DESKTOP_CONTENT_HEIGHT, palette } from '@/components/constants';
import { Row } from '@/features/Chat/components/Menu/Row';
import { CHAT_MENU_WIDTH, CHAT_MIN_HEIGHT } from '@/features/Chat/constants';
import BackArrowIcon from '@/static/icons/back-arrow.svg';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Text from '../Text';

type Props = {
  header: string;
  navigateBackText?: string;
  onClick: () => void;
  children?: ReactNode;
};

const ChatListContainer: React.FC<Props> = ({
  children,
  header,
  navigateBackText,
  onClick,
}) => {
  return (
    <Container>
      <HeaderRow>
        <Title variant="h1">{header}</Title>
      </HeaderRow>
      <LinkRow onClick={onClick}>
        <Link>
          <BackToActiveIcon src={BackArrowIcon} />
          <Text variant="bold" color="purple">
            {navigateBackText}
          </Text>
        </Link>
      </LinkRow>
      {children}
    </Container>
  );
};

const BaseContainer = styled.div`
  background-color: ${palette.white};
`;

// const TabletContainer = styled(BaseContainer)`
//   left: 0;
//   position: absolute;
//   right: 0;
// `;
const Container = styled(BaseContainer)`
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  height: ${DESKTOP_CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
  min-width: ${CHAT_MENU_WIDTH};
  width: ${CHAT_MENU_WIDTH};
`;

const HeaderRow = styled(Row)`
  border-radius: 10px 10px 0 0;
`;

const Title = styled(Text)`
  flex: 1;
`;

const LinkRow = styled(Row)`
  cursor: pointer;

  &:hover {
    background-color: ${palette.blueWhite};
  }
`;

const Link = styled.a`
  align-items: center;
  display: flex;
  padding-right: 40px;
`;
const BackToActiveIcon = styled.img`
  padding-right: 20px;
`;

export default ChatListContainer;
