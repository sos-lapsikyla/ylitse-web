import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NewMessagesImage from '@/static/img/new-messages.svg';
import { palette } from '@/components/variables';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

const NewMessages = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const navigateToChat = () => navigate('/chat');

  return (
    <Container>
      <TextContainer>
        <Text variant="h2" color="white">
          {t('newMessages.title')}
        </Text>
        <Text color="white">{t('newMessages.text')}</Text>
        <Button variant="outline" onClick={navigateToChat}>
          {t('newMessages.button')}
        </Button>
      </TextContainer>
      <Image src={NewMessagesImage} />
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: ${palette.purple};
  border-radius: 10px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  height: 16rem;
  padding: 4rem 16rem 4rem 4rem;
  position: relative;
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
