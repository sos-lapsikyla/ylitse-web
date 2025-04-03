import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { useAppSelector } from '@/store';
import { selectUser } from '@/features/Authentication/selectors';

const WelcomeMessage = () => {
  const { t } = useTranslation('home');
  const user = useAppSelector(selectUser);

  return (
    <Container>
      <Text variant="boldBaloo">{t('welcomeMessage', { user })}</Text>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  background-color: ${palette.blue2};
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  display: flex;
  opacity: 0.9;
  padding: 1.5rem 10rem 1.5rem 1.5rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: max-content;
`;

export default WelcomeMessage;
