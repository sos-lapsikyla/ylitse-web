import type { NavigationItem } from '../NavigationItems';

import styled from 'styled-components';
import { NAVIGATION_HEIGHT, palette } from '@/components/constants';

import Outsidelink from '@/static/icons/outsidelink.svg';
import Text from '@/components/Text';

export const InfoItem = ({ text, url }: NavigationItem) => (
  <Container>
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <Text variant="span" color="purple">
        {text}
      </Text>
    </a>
    <OutsideLinkLogo />
  </Container>
);

export const Container = styled.button`
  display: flex;
  gap: 0.5rem;
  height: ${NAVIGATION_HEIGHT};
  padding-left: 1rem;
  cursor: pointer;
  background: transparent;
  background-color: ${palette.white};
  border: none;
  border-right: 2px solid ${palette.purple};
  border-left: 2px solid ${palette.purple};

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

const OutsideLinkLogo = styled.span`
  flex: 0 0 auto;
  place-self: center flex-start;
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  background-color: transparent;
  background-image: url(${Outsidelink});
  background-repeat: no-repeat;
  background-size: contain;
`;
