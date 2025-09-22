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
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 4px;
  height: ${NAVIGATION_HEIGHT};
  justify-content: center;
  padding: 0 1rem;
  position: relative;
  text-align: center;

  ${({ $isExpanded }) =>
    $isExpanded &&
    css`
      background-color: ${palette.white};
    `}

  &:hover {
    background-color: ${palette.blue2};
    border-bottom: 2px solid ${palette.blue2};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;
