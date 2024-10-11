import { useState } from 'react';

import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { selectHasUnreadMessages } from '@/features/Chat/selectors';
import { useAppSelector } from '@/store';

import {
  animations,
  MOBILE_NAVIGATION_BORDER_HEIGHT,
  NAVIGATION_HEIGHT,
  palette,
} from '@/components/constants';
import { Chevron } from '@/components/Icons/Chevron';
import { useLocation } from 'react-router-dom';
import { LanguageItem } from './MobileLangItem';
import { NavigationItem } from './MobileNavItem';
import Text from '@/components/Text';

import type { LangCode } from '../LanguageDropdown';
import type { NavigationItem as NavItemType } from '../NavigationItems';

import About from '@/features/About';

type Props = {
  items: Array<NavItemType>;
};

const MobileDropdown: React.FC<Props> = ({ items }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLButtonElement>(false);
  const { t, i18n } = useTranslation('common');
  const { pathname } = useLocation();

  const isSelected = (langCode: LangCode): boolean =>
    i18n.language === langCode;

  const changeLanguage = (langCode: LangCode): void => {
    i18n.changeLanguage(langCode);
  };

  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const toggleAbout = () => setIsAboutVisible(!isAboutVisible);

  const hasUnreadMessages: boolean = useAppSelector(selectHasUnreadMessages);

  return (
    <Dropdown
      ref={ref}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
    >
      <Row>
        <Text variant="link" color="white">
          {t('navigation.mobile.menu')}
        </Text>
        <Chevron
          variant={isComponentVisible ? 'up' : 'down'}
          color="white"
          isLarge
        />
      </Row>

      {isComponentVisible && (
        <Menu>
          {items.map(item => (
            <NavigationItem
              key={item.url}
              hasNotification={item.url === '/chat' && hasUnreadMessages}
              text={item.text}
              url={item.url}
              currentLocation={pathname}
            />
          ))}

          <Divider />

          <UnstyledLink
            href={t(`navigation.info.link.feedback.url`)}
            target="_blank"
            rel="noreferrer"
          >
            <Text variant="link" color="purple">
              {t('navigation.info.link.feedback.text')}
            </Text>
          </UnstyledLink>
          <UnstyledLink
            href={t(`navigation.info.link.termsAndPrivacy.url`)}
            target="_blank"
            rel="noreferrer"
          >
            <Text variant="link" color="purple">
              {t('navigation.info.link.termsAndPrivacy.text')}
            </Text>
          </UnstyledLink>

          <MobileContainer onClick={() => toggleAbout()}>
            <Text variant="link" color="purple">
              {t('navigation.info.applicationInfo')}
            </Text>
          </MobileContainer>

          <Divider />

          <LanguageItem
            changeLang={() => changeLanguage('en')}
            isSelected={isSelected('en')}
            text={t(`navigation.language.en.long`)}
          />
          <LanguageItem
            changeLang={() => changeLanguage('fi')}
            isSelected={isSelected('fi')}
            text={t(`navigation.language.fi.long`)}
          />

          <Divider />

          <NavigationItem
            text={t('navigation.logout')}
            url={'/logout'}
            currentLocation={pathname}
          />
        </Menu>
      )}
      {isAboutVisible && <About onDismiss={toggleAbout} />}
    </Dropdown>
  );
};

const Dropdown = styled.button`
  align-items: center;
  all: unset;
  cursor: pointer;
  display: flex;
  gap: 4px;
  justify-content: center;
  padding: 0 3rem;
  text-align: center;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
  gap: 6px;
  margin-left: -2rem;
`;

const Menu = styled.div`
  animation: ${animations.growDown};
  background-color: ${palette.white};
  border-radius: 0 0 10px 10px;
  box-shadow: 1px 0.5px 15px ${palette.greyMid};
  display: flex;
  flex-direction: column;
  left: 0;
  margin-top: ${MOBILE_NAVIGATION_BORDER_HEIGHT};
  position: absolute;
  right: 0;
  text-align: left;
  top: ${NAVIGATION_HEIGHT};
  transform-origin: top center;
  width: 100vw;
`;

const MobileContainer = styled.button`
  background: transparent;
  background-color: ${palette.white};
  border: none;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  height: ${NAVIGATION_HEIGHT};
  padding: 0 2rem;
`;

const UnstyledLink = styled.a`
  height: ${NAVIGATION_HEIGHT};
  padding: 0 2rem;
  text-decoration: none;
`;

const Divider = styled.div`
  border-bottom: 1px solid ${palette.blue2};
  margin: 0.5rem 0;
`;

export default MobileDropdown;
