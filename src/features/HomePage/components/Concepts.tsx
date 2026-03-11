import { useTranslation, Trans } from 'react-i18next';
import styled, { css } from 'styled-components';
import links from '@/static/links.json';

import { palette } from '@/components/constants';
import Text from '@/components/Text';
import Widget from '@/components/Widget';

type Props = {
  isMobile?: boolean;
};

const Concepts = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  return (
    <Widget title={t('concepts.title')}>
      <Text>{t('concepts.description')} </Text>
      <InnerContainer>
        <Concept $isMobile={isMobile}>
          <Name variant="bold">{t('concepts.concept1.name')}</Name>
          <Equals>{t('concepts.equals')}</Equals>
          <Definition>{t('concepts.concept1.definition')}</Definition>
        </Concept>
        <Concept $isMobile={isMobile}>
          <Name variant="bold">{t('concepts.concept2.name')}</Name>
          <Equals>{t('concepts.equals')}</Equals>
          <Definition>
            <Trans
              t={t}
              i18nKey="concepts.concept2.definition"
              components={{
                a: (
                  <Text
                    color="purple"
                    variant="inlineLink"
                    url={links.sosLapsikylaSafespaceUrl}
                    isExternalUrl
                  />
                ),
              }}
            />
          </Definition>
        </Concept>
        <Concept $isMobile={isMobile}>
          <Name variant="bold">{t('concepts.concept3.name')}</Name>
          <Equals>{t('concepts.equals')}</Equals>
          <Definition>
            <Trans
              t={t}
              i18nKey="concepts.concept3.definition"
              components={{
                a1: (
                  <Text
                    color="purple"
                    variant="inlineLink"
                    url={links.ylitsePlayStoreUrl}
                    isExternalUrl
                  />
                ),
                a2: (
                  <Text
                    color="purple"
                    variant="inlineLink"
                    url={links.ylitseAppStoreUrl}
                    isExternalUrl
                  />
                ),
              }}
            />
          </Definition>
        </Concept>
      </InnerContainer>
    </Widget>
  );
};

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Concept = styled.div<{ $isMobile: boolean }>`
  background-color: ${palette.blueWhite};
  display: flex;
  padding: 1rem;
  ${({ $isMobile }) =>
    $isMobile &&
    css`
      flex-wrap: wrap;
    `}
`;

const Name = styled(Text)`
  white-space: nowrap;
`;

const Equals = styled(Text)`
  margin: 0 0.5rem;
`;

const Definition = styled(Text)`
  margin: 0;
`;

export default Concepts;
