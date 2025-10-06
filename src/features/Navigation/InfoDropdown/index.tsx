import { useState } from 'react';
import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';
import links from '@/static/links.json';

import { animations, NAVIGATION_HEIGHT, palette } from '@/components/constants';
import styled from 'styled-components';
import { InfoItem, Container } from './InfoItem';
import { DropdownButton } from './DropdownButton';
import Text from '@/components/Text';
import About from '@/features/About';

const InfoDropdown = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false);
  const { t } = useTranslation('common');
  const [isAboutVisible, setIsAboutVisible] = useState(false);

  return (
    <Anchor ref={ref}>
      <DropdownButton
        isComponentVisible={isComponentVisible}
        setIsComponentVisible={setIsComponentVisible}
        text={t('navigation.info.title')}
      />

      {isComponentVisible && (
        <Menu>
          <InfoItem
            text={t('navigation.info.link.feedback.text')}
            url={links.ylitseFeedbackUrl}
          />
          <InfoItem
            text={t('navigation.info.link.termsAndPrivacy.text')}
            url={links.ylitseTermsUrl}
          />
          <Container
            onClick={() => {
              setIsComponentVisible(false);
              setIsAboutVisible(true);
            }}
          >
            <Text variant="link" color="purple">
              {t('navigation.info.applicationInfo')}
            </Text>
          </Container>
        </Menu>
      )}
      {isAboutVisible && <About onDismiss={() => setIsAboutVisible(false)} />}
    </Anchor>
  );
};

export const Anchor = styled.div`
  position: relative;
`;

export const Menu = styled.div`
  position: absolute;
  top: ${NAVIGATION_HEIGHT};
  left: -2px;
  display: flex;
  flex-direction: column;
  width: max-content;
  transform-origin: top center;

  button:last-of-type {
    border-bottom: 2px solid ${palette.purple};
    border-radius: 0 0 16px 16px;
  }

  ${animations.growDown}
`;

export default InfoDropdown;
