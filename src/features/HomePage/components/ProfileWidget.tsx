import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { type Mentor } from '@/features/MentorPage/models';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { Link } from 'react-router';

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
    <Container $isDesktop={!isMobile}>
      <Text variant="h2">{t('profileWidget.title')}</Text>
      <MiddleContainer $isDesktop={!isMobile}>
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
          <LinkText variant="span" color="purple">
            {t('profileWidget.link')}
          </LinkText>
        </Link>
      </Text>
    </Container>
  );
};

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  padding: 0 0 1rem;
  margin: 1rem 0;
  background-color: ${palette.blueWhite};
`;

const InfoBoxTitle = styled(Text)`
  padding: 1.5rem 0 0 1.5rem;
`;

const InfoBoxText = styled(Text)`
  padding: 0 1.5rem;
`;

const MiddleContainer = styled.div<{ $isDesktop: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;

  ${({ $isDesktop }) =>
    !$isDesktop &&
    css`
      flex-direction: column;
      gap: 0;
      ${InfoBox} {
        width: 100%;
        margin-bottom: 0;
      }
    `}
`;

const Container = styled.div<{ $isDesktop: boolean }>`
  gap: 1rem;
  padding: ${({ $isDesktop }) => ($isDesktop ? '2rem' : '3rem 2rem 2rem 2rem')};
  background-color: ${palette.white};

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      box-sizing: border-box;
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);
    `}
`;

const LinkText = styled(Text)`
  white-space: nowrap;
`;

export default ProfileWidget;
