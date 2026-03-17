import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Text from '@/components/Text';
import AppMockup from '@/static/img/ylitse-app-mockup-blue-transparent.svg';
import GooglePlayBadge from '@/static/img/google-play-badge.svg';
import AppStoreBadge from '@/static/img/appstore-badge.svg';

type Props = {
  isMobile?: boolean;
};

const GOOGLE_PLAY_URL =
  'https://play.google.com/store/apps/details?id=com.ylitse&hl=fi';
const APP_STORE_URL =
  'https://apps.apple.com/fi/app/ylitse-mentorapp/id1436844984';

const MobileAppAd = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  return isMobile ? (
    <MobileContainer>
      <Text variant="h2">{t('mobileApp.heading')}</Text>
      <MobileMockupImage src={AppMockup} alt="" />
      <MobileAppButtons>
        <AppLink
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <BadgeImage src={GooglePlayBadge} alt={t('mobileApp.googlePlay')} />
        </AppLink>
        <AppLink href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
          <BadgeImage src={AppStoreBadge} alt={t('mobileApp.appStore')} />
        </AppLink>
      </MobileAppButtons>
    </MobileContainer>
  ) : (
    <Container>
      <InnerWrapper>
        <MockupImage src={AppMockup} alt="" />
        <Content>
          <Text variant="h2">{t('mobileApp.heading')}</Text>
          <DescriptionText>{t('mobileApp.text')}</DescriptionText>
          <AppButtons>
            <AppLink
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BadgeImage
                src={GooglePlayBadge}
                alt={t('mobileApp.googlePlay')}
              />
            </AppLink>
            <AppLink
              href={APP_STORE_URL}
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
  background-color: #c2edfe;
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
  margin: -1.5rem auto;
  max-width: 100%;
`;

const MobileContainer = styled.section`
  align-items: center;
  background-color: #c2edfe;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1rem;
  text-align: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DescriptionText = styled(Text)`
  margin-top: 0;
`;

const MockupImage = styled.img`
  display: flex;
  height: auto;
  max-width: 47.56rem;
  min-width: 20.25rem;
  width: 100%;
`;

const MobileMockupImage = styled.img`
  height: auto;
  max-width: 100vw;
  padding: 0 2rem;
`;

const AppButtons = styled.div`
  display: flex;
  gap: 1.125rem;
`;

const MobileAppButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export default MobileAppAd;
