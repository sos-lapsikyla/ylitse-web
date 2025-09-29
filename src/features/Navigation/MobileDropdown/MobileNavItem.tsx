import { palette } from '@/components/constants';
import styled, { css } from 'styled-components';

import { NavLink as RouterNavLink } from 'react-router';
import Text from '@/components/Text';

type Props = {
  currentLocation: string;
  hasNotification?: boolean;
  text: string;
  url: string;
};

export const NavigationItem: React.FC<Props> = ({
  currentLocation,
  hasNotification,
  text,
  url,
}) => {
  const isCurrentLocation = currentLocation === url;

  return (
    <UnstyledRouteLink to={url} $isCurrentLocation={isCurrentLocation}>
      <LinkText
        variant="link"
        color={isCurrentLocation ? 'blueDark' : 'purple'}
        $isCurrentLocation={isCurrentLocation}
      >
        {text}
      </LinkText>
      {hasNotification && (
        <UnseenDot
          $withBorder={isCurrentLocation}
          id="unseen-messages-dot-navigation"
        />
      )}
    </UnstyledRouteLink>
  );
};

const UnstyledRouteLink = styled(RouterNavLink)<{
  $isCurrentLocation: boolean;
}>`
  padding: 0 2rem;
  text-decoration: none;

  ${({ $isCurrentLocation }) =>
    $isCurrentLocation &&
    css`
      background-color: ${palette.blue2};
    `}
`;

const LinkText = styled(Text)<{ $isCurrentLocation: boolean }>`
  ${({ $isCurrentLocation }) =>
    $isCurrentLocation &&
    css`
      text-decoration: underline;
      text-underline-offset: 4px;
    `}
`;

const UnseenDot = styled.div<{ $withBorder: boolean }>`
  background-color: ${palette.orange};
  ${({ $withBorder }) =>
    $withBorder && `border: 1px solid ${palette.blueDark};`}
  border-radius: 50%;
  height: 10px;
  left: 2.4rem;
  position: relative;
  top: -2.2rem;
  width: 10px;
`;
