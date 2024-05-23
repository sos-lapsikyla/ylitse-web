import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

import { NAVIGATION_HEIGHT, palette } from '@/components/variables';
import { selectChats } from '../Chat/chatSlice';
import { useAppSelector } from '@/store';

export type NavigationItem = {
  hasNotification?: boolean;
  text: string;
  url: string;
};

export const Item = ({ hasNotification, text, url }: NavigationItem) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCurrent = useLocation().pathname === url;

  return (
    <Link
      to={url}
      className="navbar-link"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {hasNotification && (
        <NotificationCircle withBorder={isHovered || isCurrent} />
      )}
    </Link>
  );
};

export const Items = ({ items }: { items: Array<NavigationItem> }) => {
  const unreadMessagesFound: boolean =
    useAppSelector(selectChats)
      .map(chat => chat.messages)
      .flat()
      .filter(message => !message.opened).length > 0;

  return (
    <>
      {items.map(item => (
        <Item
          key={item.text}
          hasNotification={item.url === '/chat' && unreadMessagesFound}
          text={item.text}
          url={item.url}
        />
      ))}
    </>
  );
};

export const Link = styled(RouterNavLink)`
  color: ${palette.white};
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  height: ${NAVIGATION_HEIGHT};
  line-height: ${NAVIGATION_HEIGHT};
  padding: 0 1rem;
  text-decoration: none;

  &.active,
  &:hover {
    background-color: ${palette.blue};
    color: ${palette.blueDark};
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  &.active {
    cursor: default;
  }
`;

const NotificationCircle = styled.div<{ withBorder: boolean }>`
  background-color: ${palette.orange};
  ${({ withBorder }) => withBorder && `border: 1px solid ${palette.blueDark};`}
  border-radius: 50%;
  height: 10px;
  left: 2.3rem;
  position: relative;
  top: -2rem;
  width: 10px;
`;
