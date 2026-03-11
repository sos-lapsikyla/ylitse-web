import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import process from 'process';

import { selectAppRole } from '@/features/Authentication/selectors';
import { useAppSelector } from '@/store';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';
import Widget from '@/components/Widget';

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

const Welcome = () => {
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
    <Widget variant="callToAction" title={t(`welcome.${userRole}.title`)}>
      <TextContainer>
        <Text color="white">{t(`welcome.${userRole}.text`)}</Text>
        <Button
          size="large"
          variant="outlineOrange"
          onClick={navigateBasedOnRole}
        >
          {t(`welcome.${userRole}.button`)}
        </Button>
      </TextContainer>
    </Widget>
  );
};

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

export default Welcome;
