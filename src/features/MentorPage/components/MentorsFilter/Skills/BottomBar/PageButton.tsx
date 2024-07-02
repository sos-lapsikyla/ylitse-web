import styled, { css } from 'styled-components';
import { THREE_DOTS } from './usePagination';

import { palette } from '@/components/variables';
import Text from '@/components/Text';

type Props = {
  isSelected: boolean;
  onClick: () => void;
  page: string | number;
};

export const PageButton = ({ isSelected, onClick, page }: Props) => {
  const handleOnClick = () => {
    if (page === THREE_DOTS) return;

    onClick();
  };

  return (
    <PageNumber
      isSelected={isSelected}
      onClick={handleOnClick}
      isClickable={page !== THREE_DOTS}
    >
      <Text variant="bold">{page}</Text>
    </PageNumber>
  );
};

const PageNumber = styled.span<{ isSelected: boolean; isClickable: boolean }>`
  border-radius: 16%;
  padding: 0.2rem 1rem;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${palette.blue2};
        `
      : css`
          color: ${palette.purpleDark};
        `}

  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    `};
`;
