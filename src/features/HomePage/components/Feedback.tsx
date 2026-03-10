import { Trans, useTranslation } from 'react-i18next';
import links from '@/static/links.json';
import styled from 'styled-components';

import Widget from '@/components/Widget';
import Text from '@/components/Text';

const Feedback = () => {
  const { t } = useTranslation('home');

  return (
    <Widget title={t('feedback.mentee.title')} variant="centered">
      <Description $isMobile>
        <Trans
          t={t}
          i18nKey="feedback.mentee.description"
          components={{
            a: (
              <Text
                color="purple"
                variant="inlineLink"
                url={links.ylitseFeedbackUrl}
                isExternalUrl
              />
            ),
          }}
        />
      </Description>
    </Widget>
  );
};

const Description = styled(Text)<{ $isMobile: boolean }>`
  padding: ${({ $isMobile }) => ($isMobile ? '0 2rem' : '0 3rem')};
`;

export default Feedback;
