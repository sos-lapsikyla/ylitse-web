import { useState } from 'react';

import { useComponentVisible } from '@/hooks/useComponentShow';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import links from '@/static/links.json';

import { selectHasUnreadMessages } from '@/features/Chat/selectors';
import { useAppSelector } from '@/store';

import {
  animations,
  MOBILE_NAVIGATION_BORDER_HEIGHT,
  NAVIGATION_HEIGHT,
  palette,
} from '@/components/constants';
import { Chevron } from '@/components/Icons/Chevron';
import { useLocation } from 'react-router';
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
    void i18n.changeLanguage(langCode);
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
            href={links.ylitseFeedbackUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Text variant="link" color="purple">
              {t('navigation.info.link.feedback.text')}
            </Text>
          </UnstyledLink>
          <UnstyledLink
            href={links.ylitseTermsUrl}
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
  all: unset;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  text-align: center;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-left: -2rem;
`;

const Menu = styled.div`
  position: absolute;
  top: ${NAVIGATION_HEIGHT};
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-top: ${MOBILE_NAVIGATION_BORDER_HEIGHT};
  text-align: left;
  background-color: ${palette.white};
  border-radius: 0 0 10px 10px;
  box-shadow: 1px 0.5px 15px ${palette.greyMid};
  transform-origin: top center;

  ${animations.growDown}
`;

const MobileContainer = styled.button`
  display: flex;
  gap: 0.5rem;
  height: ${NAVIGATION_HEIGHT};
  padding: 0 2rem;
  cursor: pointer;
  background: transparent;
  background-color: ${palette.white};
  border: none;
`;

const UnstyledLink = styled.a`
  height: ${NAVIGATION_HEIGHT};
  padding: 0 2rem;
  text-decoration: none;
`;

const Divider = styled.div`
  margin: 0.5rem 0;
  border-bottom: 1px solid ${palette.blue2};
`;

export default MobileDropdown;
