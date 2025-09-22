import styled, { css } from 'styled-components';

import type { Props } from '../LanguageDropdown/LangItem';
import { ButtonText } from '../LanguageDropdown/LangItem';
import { palette } from '@/components/constants';

export const LanguageItem: React.FC<Props> = ({
  changeLang,
  isSelected,
  text,
}) => (
  <Link
    $isSelected={isSelected}
    onClick={isSelected ? e => e.stopPropagation() : changeLang}
  >
    <ButtonText
      color={isSelected ? 'blueDark' : 'purple'}
      variant="link"
      $isSelected={isSelected}
    >
      {text}
    </ButtonText>
  </Link>
);

const Link = styled.a<{ $isSelected: boolean }>`
  padding: 0 2rem;

  ${({ $isSelected }) =>
    $isSelected
      ? css`
          background-color: ${palette.blue2};
          cursor: default;
        `
      : css`
          cursor: pointer;
        `}
`;
