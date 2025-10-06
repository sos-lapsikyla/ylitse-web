// Libraries
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

// Variables
import {
  CHAT_MIN_HEIGHT,
  CHAT_WINDOW_MIN_WIDTH,
} from '@/features/Chat/constants';
import { DESKTOP_CONTENT_HEIGHT, palette } from '@/components/constants';

// Components
import Text from '@/components/Text';
import { TextButton } from '@/components/Buttons';

const WelcomeWindow = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('chat');

  return (
    <Container>
      <UpperPart>
        <WelcomeText $isHeader variant="h2">
          {t('welcome.upper.title')}
        </WelcomeText>
        <WelcomeText>{t('welcome.upper.description')}</WelcomeText>
      </UpperPart>
      <LowerPart>
        <WelcomeText $isHeader variant="h2">
          {t('welcome.lower.title')}
        </WelcomeText>
        <WelcomeText>{t('welcome.lower.description')}</WelcomeText>
        <SearchButton onClick={() => navigate('/mentors')} size="large">
          {t('welcome.lower.button')}
        </SearchButton>
      </LowerPart>
    </Container>
  );
};

const Container = styled.div`
  min-width: ${CHAT_WINDOW_MIN_WIDTH};
  height: ${DESKTOP_CONTENT_HEIGHT};
  min-height: ${CHAT_MIN_HEIGHT};
`;

const UpperPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  background-color: ${palette.white};
  border-radius: 10px 10px 0 0;
`;

const LowerPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  background-color: ${palette.blue2};
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 4px rgb(0 0 0 / 3%);
`;

const WelcomeText = styled(Text)<{ $isHeader?: boolean }>`
  padding-right: 10%;
  padding-left: 10%;

  ${({ $isHeader }) =>
    $isHeader &&
    css`
      padding-bottom: 1rem;
      white-space: nowrap;
    `}
`;

const SearchButton = styled(TextButton)`
  align-self: center;
  width: 272px;
  height: 48px;
  margin-top: 2rem;
`;

export default WelcomeWindow;
