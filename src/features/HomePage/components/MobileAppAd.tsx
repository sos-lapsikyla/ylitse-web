import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import AppDeviceImage from '@/static/img/ylitse-app-mockup-blue-transparent.svg';
import GooglePlayBadge from '@/static/img/google-play-badge.svg';
import AppStoreBadge from '@/static/img/appstore-badge.svg';
import links from '@/static/links.json';

import { BREAKPOINTS_BOOTSTRAP_MAX } from '@/components/constants';

type Props = {
  isMobile?: boolean;
};

const isAppleDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod|macintosh|mac os/.test(ua);
};

const MobileAppAd = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');
  const storeUrl = isAppleDevice()
    ? links.ylitseAppStoreUrl
    : links.ylitsePlayStoreUrl;

  return isMobile ? (
    <MobileContainer>
      <Text variant="h2">{t('mobileApp.heading')}</Text>
      <MobileDeviceImage src={AppDeviceImage} alt="" />
      <ButtonLink href={storeUrl} target="_blank" rel="noopener noreferrer">
        {t('mobileApp.downloadButton')}
      </ButtonLink>
    </MobileContainer>
  ) : (
    <Container>
      <InnerWrapper>
        <DeviceImage src={AppDeviceImage} alt="" />
        <Content>
          <Text variant="h2">{t('mobileApp.heading')}</Text>
          <DescriptionText>{t('mobileApp.text')}</DescriptionText>
          <AppButtons>
            <AppLink
              href={links.ylitsePlayStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BadgeImage
                src={GooglePlayBadge}
                alt={t('mobileApp.googlePlay')}
              />
            </AppLink>
            <AppLink
              href={links.ylitseAppStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BadgeImage src={AppStoreBadge} alt={t('mobileApp.appStore')} />
            </AppLink>
          </AppButtons>
        </Content>
      </InnerWrapper>
    </Container>
  );
};

const Container = styled.section`
  background-color: ${palette.blueCyan};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  overflow: hidden;
  padding: 0 6vw;
  width: 100%;
`;

const InnerWrapper = styled.div`
  align-items: center;
  display: flex;
  margin: -1.33rem auto;
  max-width: 100%;

  @media only screen and (max-width: ${BREAKPOINTS_BOOTSTRAP_MAX.lg}px) {
    margin: 0.89rem auto;
  }
`;

const MobileContainer = styled.section`
  align-items: center;
  background-color: ${palette.blueCyan};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.33rem;
  padding: 1.78rem 0.89rem;
  text-align: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.89rem;
`;

const DescriptionText = styled(Text)`
  margin-top: 0;
`;

const DeviceImage = styled.img`
  display: flex;
  height: auto;
  max-width: 42.27rem;
  min-width: 18rem;
  width: 100%;
`;

const MobileDeviceImage = styled.img`
  height: auto;
  margin: -70px 0 -60px;
  max-width: 100vw;

  @media only screen and (max-width: ${BREAKPOINTS_BOOTSTRAP_MAX.xs}px) {
    margin: -50px 0 -40px;
  }
`;

const AppButtons = styled.div`
  display: flex;
  gap: 1.07rem;
`;

const AppLink = styled.a`
  display: block;
`;

const BadgeImage = styled.img`
  display: flex;
  height: auto;
  max-height: 75px;
  width: 100%;
`;

const ButtonLink = styled.a`
  align-items: center;
  background-color: ${palette.purple};
  border: none;
  border-radius: 50px;
  color: ${palette.orange};
  cursor: pointer;
  display: inline-flex;
  font-family: 'Baloo 2';
  font-size: 1.056rem;
  font-weight: 700;
  line-height: 1.25;
  padding: 0.5rem 2rem;
  text-decoration: none;
  width: fit-content;

  &:hover {
    background-color: ${palette.purpleDark};
    opacity: 0.7;
  }

  &:focus {
    outline: 2px solid ${palette.purple};
    outline-offset: 3px;
  }
`;

export default MobileAppAd;
