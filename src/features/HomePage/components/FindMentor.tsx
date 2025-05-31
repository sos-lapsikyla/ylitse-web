import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

type Props = {
  isMobile?: boolean;
};

const FindMentor = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const navigateToMentors = () => navigate('/mentors');

  return (
    <Container isDesktop={!isMobile}>
      <TextContainer>
        <Text variant="h2" color="white">
          {t('newestMentors.info.title')}
        </Text>
        <Text color="white">{t('newestMentors.info.text')}</Text>
        <Button variant="outlineOrange" onClick={navigateToMentors}>
          {t('newestMentors.info.button')}
        </Button>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div<{ isDesktop: boolean }>`
  align-items: center;
  align-self: center;
  background-color: ${palette.purple};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ isDesktop }) => (isDesktop ? '4rem' : '3rem')};

  ${({ isDesktop }) =>
    isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      max-width: 33rem;
      min-height: 26rem;
      min-width: 20rem;
    `}
`;

const TextContainer = styled.div`
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled(TextButton)`
  align-self: center;
  margin-top: 1rem;
`;

export default FindMentor;
