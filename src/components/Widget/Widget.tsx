import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../constants';
import Text from '../Text';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

type WidgetProps = {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'callToAction';
};

export const Widget: React.FC<WidgetProps> = ({
  children,
  title,
  variant = 'default',
}) => {
  const { isTabletNarrow } = useGetLayoutMode();
  const isDefault = variant === 'default';
  return (
    <Container $isDesktop={!isTabletNarrow} $variant={variant}>
      {isDefault && <Text variant="h2">{title}</Text>}
      {!isDefault && (
        <TextContainer>
          <Text variant="h2" color="white">
            {title}
          </Text>
        </TextContainer>
      )}
      {children}
    </Container>
  );
};

const variantStyles = {
  default: css<{ $isDesktop: boolean }>`
    background: ${palette.white};

    padding: ${({ $isDesktop }) =>
      $isDesktop ? '2rem' : '3rem 2rem 4rem 2rem'};
  `,

  callToAction: css<{ $isDesktop: boolean }>`
    align-items: center;
    background: ${palette.purple};
    flex-direction: column;
    justify-content: center;

    padding: ${({ $isDesktop }) =>
      $isDesktop ? '4rem' : '3rem 2rem 4rem 2rem'};

    ${({ $isDesktop }) =>
      $isDesktop &&
      css`
        min-height: 16rem;
      `}
  `,
};

const Container = styled.div<{
  $isDesktop: boolean;
  $variant: 'default' | 'callToAction';
}>`
  gap: 1rem;

  ${({ $isDesktop }) =>
    $isDesktop &&
    css`
      border-radius: 10px;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
    `}

  ${({ $variant }) => variantStyles[$variant]}
`;

const TextContainer = styled.div`
  align-items: center;
  color: ${palette.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
