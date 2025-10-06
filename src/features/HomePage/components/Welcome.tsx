import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import process from 'process';

import { selectAppRole } from '@/features/Authentication/selectors';
import { useAppSelector } from '@/store';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

type Props = {
  isMobile?: boolean;
};

const roleNavigation = {
  admin:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/'
      : '/admin',
  freshMentor: '/mentors',
  freshMentee: '/mentors',
  mentor: '/chat',
  mentee: '/chat',
};
type Role = keyof typeof roleNavigation;

const Welcome = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');
  const userRole = useAppSelector(selectAppRole) as Role | undefined;
  const navigate = useNavigate();

  if (!userRole || userRole === 'freshMentor') return null;

  const navigateBasedOnRole = () => {
    if (userRole == 'admin') {
      location.href = roleNavigation[userRole];
      return null;
    }

    userRole && navigate(roleNavigation[userRole]);
  };

  return (
    <Container $isDesktop={!isMobile}>
      <TextContainer>
        <Text variant="h2" color="white">
          {t(`welcome.${userRole}.title`)}
        </Text>
        <Text color="white">{t(`welcome.${userRole}.text`)}</Text>
        <Button
          size="large"
          variant="outlineOrange"
          onClick={navigateBasedOnRole}
        >
          {t(`welcome.${userRole}.button`)}
        </Button>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div<{ $isDesktop: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ $isDesktop }) => ($isDesktop ? '4rem' : '3rem 2rem 4rem 2rem')};
  background-color: ${palette.purple};

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      box-sizing: border-box;
      min-height: 16rem;
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
    `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${palette.white};
  text-align: center;
`;

const Button = styled(TextButton)`
  margin-top: 1rem;
`;

export default Welcome;
