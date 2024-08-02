import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { clearActiveChat } from '@/features/Chat/chatSlice';
import { useAppDispatch } from '@/store';

import NewMessagesImage from '@/static/img/new-messages.svg';
import { palette } from '@/components/variables';
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
    <Container isDesktop={!isMobile}>
      <TextContainer>
        <Text variant="h2" color="white">
          {t('newMessages.title')}
        </Text>
        <Text color="white">{t('newMessages.text')}</Text>
        <Button variant="outline" onClick={navigateToNewMessages}>
          {t('newMessages.button')}
        </Button>
      </TextContainer>
      {!isMobile && <Image src={NewMessagesImage} />}
    </Container>
  );
};

const Container = styled.div<{ isDesktop: boolean }>`
  align-items: center;
  background-color: ${palette.purple};
  display: flex;

  ${({ isDesktop }) =>
    isDesktop
      ? css`
          border-radius: 10px;
          box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
          box-sizing: border-box;
          min-height: 16rem;
          padding: 4rem 16rem 4rem 4rem;
          position: relative;
        `
      : css`
          justify-content: center;
          padding: 3rem;
        `}
`;

const TextContainer = styled.div`
  align-items: center;
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Button = styled(TextButton)`
  margin-top: 1rem;
`;

const Image = styled.img`
  bottom: 0;
  position: absolute;
  right: -4rem;
`;

export default NewMessages;
