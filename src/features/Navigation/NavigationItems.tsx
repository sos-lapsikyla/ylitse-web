import { NavLink as RouterNavLink, useLocation } from 'react-router';
import styled from 'styled-components';
import { useState } from 'react';

import { NAVIGATION_HEIGHT, palette } from '@/components/constants';
import { selectHasUnreadMessages } from '@/features/Chat/selectors';
import { useAppSelector } from '@/store';

export type NavigationItem = {
  hasNotification?: boolean;
  text: string;
  url: string;
};

export const Item = ({ hasNotification, text, url }: NavigationItem) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentLocation = useLocation().pathname === url;

  return (
    <Link
      to={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {hasNotification && (
        <UnseenDot
          $withBorder={isHovered || isCurrentLocation}
          id="unseen-messages-dot-navigation"
        />
      )}
    </Link>
  );
};

export const Items = ({ items }: { items: Array<NavigationItem> }) => {
  const hasUnreadMessages: boolean = useAppSelector(selectHasUnreadMessages);

  return (
    <>
      {items.map(item => (
        <Item
          key={item.text}
          hasNotification={item.url === '/chat' && hasUnreadMessages}
          text={item.text}
          url={item.url}
        />
      ))}
    </>
  );
};

export const Link = styled(RouterNavLink)`
  height: ${NAVIGATION_HEIGHT};
  padding: 0 1rem;
  font-family: 'Baloo 2', sans-serif;
  font-style: normal;
  font-weight: 700;
  line-height: ${NAVIGATION_HEIGHT};
  color: ${palette.white};
  text-decoration: none;

  &.active,
  &:hover {
    color: ${palette.blueDark};
    text-decoration: underline;
    text-underline-offset: 4px;
    background-color: ${palette.blue};
  }

  &.active {
    cursor: default;
  }
`;

const UnseenDot = styled.div<{ $withBorder: boolean }>`
  position: relative;
  top: -2rem;
  left: 2.3rem;
  width: 10px;
  height: 10px;
  background-color: ${palette.orange};
  border-radius: 50%;

  ${({ $withBorder }) =>
    $withBorder && `border: 1px solid ${palette.blueDark};`}
`;
