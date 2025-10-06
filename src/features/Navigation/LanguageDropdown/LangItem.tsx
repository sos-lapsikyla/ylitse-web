import styled, { css } from 'styled-components';
import { NAVIGATION_HEIGHT, palette } from '@/components/constants';
import Text from '@/components/Text';

export type Props = {
  changeLang: () => void;
  isSelected: boolean;
  text: string;
};

export const LangItem: React.FC<Props> = ({ changeLang, isSelected, text }) => (
  <Button $isSelected={isSelected} onClick={changeLang}>
    <ButtonText
      variant="link"
      color={isSelected ? 'blueDark' : 'purple'}
      $isSelected={isSelected}
    >
      {text}
    </ButtonText>
  </Button>
);

const Button = styled.button<{ $isSelected: boolean }>`
  display: flex;
  gap: 0.5rem;
  height: ${NAVIGATION_HEIGHT};
  padding: 0 1rem;
  cursor: pointer;
  background: transparent;
  background-color: ${palette.white};
  border: none;
  border-right: 2px solid ${palette.purple};
  border-left: 2px solid ${palette.purple};

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      pointer-events: none;
      background: ${palette.blue2};
    `}

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

export const ButtonText = styled(Text)<{ $isSelected: boolean }>`
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      text-decoration: underline;
      text-underline-offset: 4px;
    `}
`;
