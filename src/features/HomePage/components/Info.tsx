import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { NAVIGATION_HEIGHT, palette } from '@/components/constants';
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
      <DecorativeBar />
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

const DecorativeBar = styled.div`
  background-color: ${palette.purpleDark};
  height: 4px;
  position: relative;
  right: 6rem;
  top: 3rem;
  width: 79px;
`;

const Container = styled.div`
  background-color: ${palette.blue2};
  border-bottom-right-radius: 333px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  height: calc(37rem - ${NAVIGATION_HEIGHT} - 2rem);
  justify-content: center;
  left: 6rem;
  max-width: 26rem;
  padding: 6rem 3rem 0 3.5rem;
  position: absolute;
  top: 3rem;

  @media only screen and (max-width: 1920px) {
    left: 6vw;
  }
`;

export default Info;
