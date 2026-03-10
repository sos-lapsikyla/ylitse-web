import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { type Mentor } from '@/features/MentorPage/models';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import { Link } from 'react-router';
import Widget from '@/components/Widget';

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
    <Widget title={t('profileWidget.title')}>
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
    </Widget>
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
        margin-bottom: 0;
        width: 100%;
      }
    `}
`;

const LinkText = styled(Text)`
  white-space: nowrap;
`;

export default ProfileWidget;
