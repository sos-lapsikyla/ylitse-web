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
  align-items: center;
  background-color: ${palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 50%;
  margin: auto;
  opacity: 1;
  padding: 1rem 1rem 2rem 1rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          max-height: 90vh;
          width: 85vw;
        `
      : css`
          height: fit-content;
          max-height: 90vh;
          width: 35vw;
        `}
`;

const AboutCardContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 2rem);
  overflow-y: auto;
  padding: 0 2rem 1rem 2rem;
  width: 100%;
`;

const Description = styled.div<{ $isMobile: boolean }>`
  gap: 0.5rem;
  ${({ $isMobile }) =>
    $isMobile
      ? css`
          padding: 0.5rem 0.5rem 1rem 0.5rem;
        `
      : css`
          padding: 0.5rem 1.5rem 1rem 1.5rem;
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

const InfoText = styled(Text)`
  padding: 0 1rem 0 1rem;
`;

export default About;
