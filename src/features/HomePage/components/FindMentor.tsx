import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router';
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
    <Container $isDesktop={!isMobile}>
      <TextContainer>
        <Text variant="h2" color="white">
          {t('newestMentors.info.title')}
        </Text>
        <Text color="white">{t('newestMentors.info.text')}</Text>
        <Button
          size="large"
          variant="outlineOrange"
          onClick={navigateToMentors}
        >
          {t('newestMentors.info.button')}
        </Button>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div<{ $isDesktop: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
  padding: ${({ $isDesktop }) => ($isDesktop ? '4rem' : '3rem 2rem 4rem 2rem')};
  background-color: ${palette.purple};

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      box-sizing: border-box;
      max-width: 33rem;
      min-height: 26rem;
      margin-top: 4rem;
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
    `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${palette.white};
`;

const Button = styled(TextButton)`
  align-self: center;
  margin-top: 1rem;
`;

export default FindMentor;
