import { useState } from 'react';
import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';

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
  const toggleAbout = () => setIsAboutVisible(!isAboutVisible);

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
            {...{
              text: t('navigation.info.link.feedback.text'),
              url: t('navigation.info.link.feedback.url'),
            }}
          />
          <InfoItem
            {...{
              text: t('navigation.info.link.termsAndPrivacy.text'),
              url: t('navigation.info.link.termsAndPrivacy.url'),
            }}
          />
          <Container onClick={() => toggleAbout()}>
            <Text variant="link" color="purple">
              {t('navigation.info.applicationInfo')}
            </Text>
          </Container>
        </Menu>
      )}
      {isAboutVisible && <About onDismiss={toggleAbout} />}
    </Anchor>
  );
};

export const Anchor = styled.div`
  position: relative;
`;

export const Menu = styled.div`
  animation: ${animations.growDown};
  display: flex;
  flex-direction: column;
  left: -2px;
  position: absolute;
  top: ${NAVIGATION_HEIGHT};
  transform-origin: top center;
  width: max-content;

  button:last-of-type {
    border-bottom: 2px solid ${palette.purple};
    border-radius: 0 0 16px 16px;
  }
`;

export default InfoDropdown;
