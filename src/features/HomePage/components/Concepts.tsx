import { useTranslation, Trans } from 'react-i18next';
import styled, { css } from 'styled-components';
import links from '@/static/links.json';

import { palette } from '@/components/constants';
import Text from '@/components/Text';

type Props = {
  isMobile?: boolean;
};

const Concepts = ({ isMobile = false }: Props) => {
  const { t } = useTranslation('home');

  return (
    <Container $isDesktop={!isMobile}>
      <Text variant="h2">{t('concepts.title')}</Text>
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
    </Container>
  );
};

const Container = styled.div<{ $isDesktop: boolean }>`
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  padding: ${({ $isDesktop }) =>
    $isDesktop ? '2rem 2rem 3rem 2rem' : '3rem 2rem 4rem 2rem'};

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    `}
`;

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
