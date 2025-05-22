import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { type Mentor } from '@/features/MentorPage/models';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { Link } from 'react-router-dom';

type Props = {
  isMobile?: boolean;
  mentor: Mentor;
};

const ProfileWidget: React.FC<Props> = ({
  isMobile = false,
  mentor,
}: Props) => {
  const { t } = useTranslation('home');

  return (
    <Container isDesktop={!isMobile}>
      <Text variant="h2">{t('profileWidget.title')}</Text>
      <MiddleContainer>
        <InfoBox>
          <InfoBoxTitle variant="boldBaloo">
            {t('profileWidget.statusMessage')}
          </InfoBoxTitle>
          <InfoBoxText variant="p">{mentor.statusMessage}</InfoBoxText>
        </InfoBox>
        <InfoBox>
          <InfoBoxTitle variant="boldBaloo">
            {t('profileWidget.status.availability')}
          </InfoBoxTitle>
          <InfoBoxText>
            {mentor.isVacationing
              ? t('profileWidget.status.unavailable')
              : t('profileWidget.status.available')}
          </InfoBoxText>
        </InfoBox>
      </MiddleContainer>
      <Text variant="p">
        {t('profileWidget.text')}
        <Link to="/profile">
          <Text variant="span" color="purple">
            {t('profileWidget.link')}
          </Text>
        </Link>
      </Text>
    </Container>
  );
};

const InfoBox = styled.div`
  background-color: ${palette.blueWhite};
  display: flex;
  flex-direction: column;
  margin: 1rem 0 1rem 0;
  padding: 0 0 1rem 0;
  width: 49%;
`;

const InfoBoxTitle = styled(Text)`
  padding: 1.5rem 0 0 1.5rem;
`;

const InfoBoxText = styled(Text)`
  padding: 0 1.5rem 0 1.5rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: space-between;
`;

const Container = styled.div<{ isDesktop: boolean }>`
  background-color: ${palette.white};
  gap: 1rem;
  padding: ${({ isDesktop }) => (isDesktop ? '2rem' : '3rem')};

  ${({ isDesktop }) =>
    isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    `}
`;

export default ProfileWidget;
