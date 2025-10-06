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
  padding: 3rem 2rem 4rem;
  background-color: ${palette.white};
`;

const Bullets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Bullet = styled.div`
  flex: 0 0 8px;
  width: 8px;
  height: 8px;
  margin-right: 1rem;
  background-color: ${palette.purple};
  border-radius: 50%;
`;

const BulletText = styled(Text)`
  margin: 0;
`;

const BoldText = styled.span`
  font-weight: 600;
`;

const DecorativeBar = styled.div`
  position: absolute;
  top: 8.5rem;
  left: -3rem;
  width: 79px;
  height: 4px;
  background-color: ${palette.purpleDark};
`;

const Container = styled.div`
  position: absolute;
  top: 3rem;
  left: 6rem;
  justify-content: center;
  max-width: 26rem;
  height: calc(37rem - ${NAVIGATION_HEIGHT} - 2rem);
  padding: 6rem 3rem 0 3.5rem;
  background-color: ${palette.blue2};
  border-bottom-right-radius: 333px;
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 20%);

  @media only screen and (width <= 1920px) {
    left: 6vw;
  }
`;

export default Info;
