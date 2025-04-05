import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store';
import { useComponentVisible } from '@/hooks/useComponentShow';
import { selectUser } from '@/features/Authentication/selectors';

import { palette } from '@/components/constants';
import Text from '@/components/Text';

const WelcomeMessage = () => {
  const { t } = useTranslation('home');
  const user = useAppSelector(selectUser);

  const [shouldCheckPath, setShouldCheckPath] = useState(true);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);

  useEffect(() => {
    if (shouldCheckPath) {
      const fromAuth = sessionStorage.getItem('fromAuth') === 'true';
      if (fromAuth) {
        setIsComponentVisible(true);
      }
      sessionStorage.removeItem('fromAuth');
      setShouldCheckPath(false);
    }
  }, [shouldCheckPath, setIsComponentVisible]);

  if (!isComponentVisible) return null;

  return (
    <Container ref={ref}>
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
