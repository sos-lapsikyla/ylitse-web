import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';
import { useTranslation } from 'react-i18next';

import {
  MOBILE_NAVIGATION_BORDER_HEIGHT,
  NAVIGATION_HEIGHT,
  palette,
} from '@/components/constants';
import styled, { css } from 'styled-components';

import { Items, Item } from './NavigationItems';
import { LogoContainer } from './LogoContainer';
import InfoDropdown from './InfoDropdown';
import MobileDropdown from './MobileDropdown';
import LangDropdown from './LanguageDropdown';
import { useAppSelector } from '@/store';
import { selectIsAdmin } from '../Authentication/selectors';

export const Navbar = () => {
  const { isTablet } = useGetLayoutMode();
  const { t } = useTranslation('common');
  const isAdmin = useAppSelector(selectIsAdmin);

  const navigationItems = !isAdmin
    ? [
        {
          text: t('navigation.home'),
          url: '/',
        },
        {
          text: t('navigation.mentors'),
          url: '/mentors',
        },
        {
          text: t('navigation.chat'),
          url: '/chat',
        },
        { text: t('navigation.profile'), url: '/profile' },
      ]
    : [
        {
          text: t('navigation.home'),
          url: '/',
        },
        {
          text: t('navigation.mentors'),
          url: '/mentors',
        },
        {
          text: t('navigation.chat'),
          url: '/chat',
        },
        {
          text: t('navigation.users'),
          url: '/users',
        },
        {
          text: t('navigation.statistics'),
          url: '/statistics',
        },
        {
          text: t('navigation.topics'),
          url: '/topics',
        },
        {
          text: t('navigation.reports'),
          url: '/reports',
        },
        { text: t('navigation.profile'), url: '/profile' },
      ];

  return isTablet ? (
    <Container $isTablet={isTablet}>
      <LogoContainer />
      <MobileDropdown items={navigationItems} />
    </Container>
  ) : (
    <Container>
      <LogoContainer />
      <RightContainer>
        <Items items={navigationItems} />
        <InfoDropdown />
        <LangDropdown />
        <Item text={t('navigation.logout')} url="/logout" />
      </RightContainer>
    </Container>
  );
};

export const Container = styled.div<{ $isTablet?: boolean }>`
  align-items: center;
  background-color: ${palette.purple};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: ${NAVIGATION_HEIGHT};
  justify-content: space-between;
  position: relative;
  width: 100%;
  z-index: 10;

  ${({ $isTablet }) =>
    $isTablet &&
    css`
      border-bottom: solid ${MOBILE_NAVIGATION_BORDER_HEIGHT} ${palette.blue2};
      padding: 0 1.5rem;
    `}
`;

export const RightContainer = styled.div`
  display: flex;
  margin-right: 10%;

  @media screen and (max-width: 830px) {
    margin-right: 0;
  }

  @media screen and (max-width: 650px) {
    margin-right: 4%;
  }
`;
