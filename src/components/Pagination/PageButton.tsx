import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { THREE_DOTS } from './usePagination';

import { palette } from '@/components/constants';
import Text from '@/components/Text';

type Props = {
  isSelected: boolean;
  onClick: () => void;
  page: string | number;
};

export const PageButton = ({ isSelected, onClick, page }: Props) => {
  const { t } = useTranslation('common');

  if (page === THREE_DOTS) {
    return (
      <Dots aria-hidden="true">
        <Text variant="bold">{page}</Text>
      </Dots>
    );
  }

  return (
    <PageNumber
      $isSelected={isSelected}
      onClick={onClick}
      aria-label={t('pagination.page', { page })}
      aria-current={isSelected ? 'page' : undefined}
    >
      <Text variant="bold">{page}</Text>
    </PageNumber>
  );
};

const Dots = styled.span`
  border-radius: 16%;
  padding: 0.2rem 0.8rem;
`;

const PageNumber = styled.button<{ $isSelected: boolean }>`
  background: none;
  border: none;
  border-radius: 16%;
  cursor: pointer;
  padding: 0.2rem 0.8rem;

  ${({ $isSelected }) =>
    $isSelected
      ? css`
          background-color: ${palette.blue2};
        `
      : css`
          color: ${palette.purpleDark};
        `}

  &:hover {
    opacity: 0.7;
  }
`;
