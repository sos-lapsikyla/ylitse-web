import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import links from '@/static/links.json';
import { useEscape } from '@/hooks/useEscape';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useGetApiVersionQuery } from './apiVersionApi';

import { breakpoints, palette } from '@/components/constants';
import { Text } from '@/components/Text/Text';
import { IconButton, TextButton } from '@/components/Buttons';
import styled, { css } from 'styled-components';

import LicenseModal from './LicenseList';
import version from '../../../package.json';

type Props = {
  onDismiss: () => void;
};

export const About = ({ onDismiss }: Props) => {
  const { isMobile } = useGetLayoutMode();
  const { t } = useTranslation('common');
  const [isLicenseModalVisible, setIsLicenseModalVisible] = useState(false);
  const toggleLicenseModal = () =>
    setIsLicenseModalVisible(!isLicenseModalVisible);

  const { data: apiVersion } = useGetApiVersionQuery();
  const uiVersion = `${version.version}+git:${COMMIT_HASH}`;

  useEscape(() => onDismiss());

  return (
    <Container>
      <AboutCard $isMobile={isMobile}>
        <CloseContainer>
          <IconButton
            onClick={onDismiss}
            variant="closeWithBackground"
            sizeInPx={38}
          />
        </CloseContainer>
        <AboutCardContent>
          <Text variant="h1">{t('about.title')}</Text>
          <Description $isMobile={isMobile}>
            <InfoText>
              <Trans
                t={t}
                i18nKey="about.description.paragraph1"
                components={{
                  a: (
                    <Text
                      color="purple"
                      variant="inlineLink"
                      url={links.sosLapsikylaYlitseUrl}
                      isExternalUrl
                    />
                  ),
                }}
              />
            </InfoText>
            <InfoText variant="p">{t('about.description.paragraph2')}</InfoText>
            <InfoText variant="p">{t('about.description.paragraph3')}</InfoText>
          </Description>
          <InfoText variant="p">{t('about.ui', { uiVersion })}</InfoText>
          <InfoText variant="p">{t('about.api', { apiVersion })} </InfoText>
          {isLicenseModalVisible && <LicenseModal />}
          <LicensesButton onClick={toggleLicenseModal}>
            {!isLicenseModalVisible ? t('about.open') : t('about.close')}
          </LicensesButton>
        </AboutCardContent>
      </AboutCard>
    </Container>
  );
};

const AboutCard = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem 2rem;
  margin: auto;
  background-color: ${palette.white};
  border-radius: 10px;
  opacity: 1;
  transform: translate(-50%, -50%);

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          width: 85vw;
          max-height: 90vh;
        `
      : css`
          width: 35vw;
          height: fit-content;
          max-height: 90vh;
        `}
`;

const AboutCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: calc(100% - 2rem);
  padding: 0 2rem 1rem;
  overflow-y: auto;
`;

const Description = styled.div<{ $isMobile: boolean }>`
  gap: 0.5rem;

  ${({ $isMobile }) =>
    $isMobile
      ? css`
          padding: 0.5rem 0.5rem 1rem;
        `
      : css`
          padding: 0.5rem 1.5rem 1rem;
        `}
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: ${palette.greyOverlay};

  @media screen and (max-width: ${breakpoints.mobile}) {
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

const CloseContainer = styled.div`
  align-self: flex-end;
`;

const LicensesButton = styled(TextButton)`
  width: fit-content;
  height: 48px;
  margin: 1rem;
`;

const InfoText = styled(Text)`
  padding: 0 1rem;
`;

export default About;
