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
  background: transparent;
  background-color: ${palette.white};
  border: none;
  border-left: 2px solid ${palette.purple};
  border-right: 2px solid ${palette.purple};
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  height: ${NAVIGATION_HEIGHT};
  padding: 0 1rem;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background: ${palette.blue2};
      pointer-events: none;
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
