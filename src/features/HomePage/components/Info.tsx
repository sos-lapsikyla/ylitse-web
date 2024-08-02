import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  NAVIGATION_HEIGHT,
  OUTER_HORIZONTAL_MARGIN,
  palette,
} from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isMobile?: boolean;
};

const Info = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  return isMobile ? (
    <MobileContainer>
      <Text variant="h1">{t('info.title')}</Text>
      <Text>{t('info.description')}</Text>
      <Bullets>
        <Row>
          <Bullet />
          <BulletText>{t('info.bullet1')}</BulletText>
        </Row>
        <Row>
          <Bullet />
          <BulletText>{t('info.bullet2')}</BulletText>
        </Row>
        <Row>
          <Bullet />
          <BulletText>
            {`${t('info.bullet3')} `}
            <BoldText>{t('info.bullet3Bold')}</BoldText>
          </BulletText>
        </Row>
      </Bullets>
    </MobileContainer>
  ) : (
    <Container>
      <Text variant="h1">{t('info.title')}</Text>
      <Text>{t('info.description')}</Text>
      <Text>{`- ${t('info.bullet1')}`}</Text>
      <Text>{`- ${t('info.bullet2')}`}</Text>
      <Text>
        {`- ${t('info.bullet3')} `}
        <BoldText>{t('info.bullet3Bold')}</BoldText>
      </Text>
    </Container>
  );
};

const MobileContainer = styled.div`
  background-color: ${palette.white};
  padding: 3rem;
`;

const Bullets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
`;

const Bullet = styled.div`
  background-color: ${palette.purple};
  border-radius: 50%;
  height: 8px;
  margin-right: 1rem;
  min-width: 8px;
`;

const BulletText = styled(Text)`
  margin: 0;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const Container = styled.div`
  background-color: ${palette.blue2};
  border-bottom-right-radius: 275px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  height: calc(40rem - ${NAVIGATION_HEIGHT} - 2rem);
  left: calc(${OUTER_HORIZONTAL_MARGIN} - 2vw);
  max-width: 25vw;
  padding: 2rem;
  position: absolute;
  top: 2rem;
`;

export default Info;
