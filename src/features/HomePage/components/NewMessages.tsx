import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { clearActiveChat } from '@/features/Chat/chatSlice';
import { useAppDispatch } from '@/store';

import NewMessagesImage from '@/static/img/new-messages.svg';
import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

type Props = {
  isMobile?: boolean;
};

const NewMessages = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToNewMessages = () => {
    dispatch(clearActiveChat());
    navigate('/chat');
  };

  return (
    <Container $isDesktop={!isMobile}>
      <TextContainer>
        <Text variant="h2" color="white">
          {t('newMessages.title')}
        </Text>
        <Text color="white">{t('newMessages.text')}</Text>
        <Button
          size="large"
          variant="outlineOrange"
          onClick={navigateToNewMessages}
        >
          {t('newMessages.button')}
        </Button>
      </TextContainer>
      {!isMobile && <Image src={NewMessagesImage} />}
    </Container>
  );
};

const Container = styled.div<{ $isDesktop: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: ${palette.purple};

  ${({ $isDesktop }) =>
    $isDesktop
      ? css`
          position: relative;
          box-sizing: border-box;
          justify-content: center;
          min-height: 16rem;
          padding: 4rem 16rem 4rem 4rem;
          border-radius: 10px;
          box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
        `
      : css`
          justify-content: center;
          padding: 3rem;
        `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Button = styled(TextButton)`
  margin-top: 1rem;
`;

const Image = styled.img`
  position: absolute;
  right: -4rem;
  bottom: 0;
  transform: translateY(0.5px);
`;

export default NewMessages;
