import { breakpoints, palette } from '@/components/constants';
import { useEscape } from '@/hooks/useEscape';
import styled, { css } from 'styled-components';
import { Text } from '@/components/Text/Text';
import { useTranslation } from 'react-i18next';
import { IconButton, TextButton } from '@/components/Buttons';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

type Props = {
  onDismiss: () => void;
};

export const About = ({ onDismiss }: Props) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('common');

  const handleClick = () => {
    console.log('TODO');
  };

  useEscape(() => onDismiss());

  return (
    <Container>
      <AboutCard isMobile={isMobile}>
        <CloseContainer>
          <IconButton
            onClick={onDismiss}
            variant="closeWithBackground"
            sizeInPx={38}
          />
        </CloseContainer>
        <Text variant="h1">{t('about.title')} </Text>
        <Text variant="p">UI version</Text>
        <Text variant="p">API version</Text>
        <LicensesButton onClick={handleClick}>
          {t('about.licenses')}
        </LicensesButton>
      </AboutCard>
    </Container>
  );
};

const AboutCard = styled.div<{ isMobile: boolean }>`
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: center;
  left: 50%;
  margin: auto;
  opacity: 1;
  padding: 1rem 1rem 2rem 1rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  ${({ isMobile }) =>
    isMobile
      ? css`
          width: 80vw;
        `
      : css`
          width: 35vw;
        `}
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

const CloseContainer = styled.div`
  align-self: flex-end;
`;

const LicensesButton = styled(TextButton)`
  height: 48px;
  margin: 1rem;
  width: fit-content;
`;

export default About;
