import { breakpoints, palette } from '@/components/constants';
import { useEscape } from '@/hooks/useEscape';
import styled from 'styled-components';
import { Text } from '@/components/Text/Text';
import { useTranslation } from 'react-i18next';
import { TextButton } from '@/components/Buttons';

type Props = {
  onDismiss: () => void;
};

export const About = ({ onDismiss }: Props) => {
  const { t } = useTranslation('common');
  const handleClick = () => {
    console.log('todo');
  };

  useEscape(() => onDismiss());

  return (
    <Container>
      <AboutCard>
        <Text variant="h1">{t('about.title')} </Text>
        <LicenseButton onClick={handleClick}>
          {t('about.licenses')}
        </LicenseButton>
      </AboutCard>
    </Container>
  );
};

const AboutCard = styled.div`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 40vh;
  height: fit-content;
  justify-content: center;
  left: 50%;
  margin: auto;
  opacity: 1;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
`;

const Container = styled.div`
  background-color: ${palette.greyOverlay};
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;

  @media screen and (max-width: ${breakpoints.mobile}) {
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const LicenseButton = styled(TextButton)`
  height: 48px;
  width: fit-content;
`;

export default About;
