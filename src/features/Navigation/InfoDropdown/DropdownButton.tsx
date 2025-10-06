import styled, { css } from 'styled-components';

import { useHover } from '@/hooks/useHover';

import { Chevron } from '@/components/Icons/Chevron';
import { NAVIGATION_HEIGHT, palette } from '@/components/constants';
import Text from '@/components/Text';

type Props = {
  id?: string;
  isComponentVisible: boolean;
  setIsComponentVisible: (next: boolean) => void;
  text: string;
};

export const DropdownButton: React.FC<Props> = ({
  id,
  isComponentVisible,
  setIsComponentVisible,
  text,
}) => {
  const { ref, isHovering } = useHover();
  const color = isHovering || isComponentVisible ? 'blueDark' : 'white';

  return (
    <Button
      id={id}
      $isExpanded={isComponentVisible}
      onClick={() => setIsComponentVisible(!isComponentVisible)}
      ref={ref}
    >
      <Text variant="link" color={color}>
        {text}
      </Text>
      <Chevron variant={isComponentVisible ? 'up' : 'down'} color={color} />
    </Button>
  );
};

const Button = styled.button<{ $isExpanded?: boolean }>`
  position: relative;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  height: ${NAVIGATION_HEIGHT};
  padding: 0 1rem;
  text-align: center;
  cursor: pointer;
  background: transparent;
  border: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    background-color: ${palette.blue2};
    border-bottom: 2px solid ${palette.blue2};
  }

  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      background-color: ${palette.white};
    `}
`;
