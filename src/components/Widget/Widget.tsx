import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { palette } from '../constants';
import Text from '../Text';
import { useGetLayoutMode } from '@/hooks/useGetLayoutMode';

type WidgetVariant = 'default' | 'callToAction' | 'centered';

type WidgetProps = {
  title: string;
  children: ReactNode;
  variant?: WidgetVariant;
};

export const Widget: React.FC<WidgetProps> = ({
  children,
  title,
  variant = 'default',
}) => {
  const { isTabletNarrow } = useGetLayoutMode();
  const isCallToAction = variant === 'callToAction';
  return (
    <Container $isDesktop={!isTabletNarrow} $variant={variant}>
      {!isCallToAction && <Text variant="h2">{title}</Text>}
      {isCallToAction && (
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
  centered: css<{ $isDesktop: boolean }>`
    align-items: center;
    background: ${palette.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${({ $isDesktop }) =>
      $isDesktop ? '3rem' : '3rem 2rem 4rem 2rem'};
    text-align: center;
  `,
};

const Container = styled.div<{
  $isDesktop: boolean;
  $variant: WidgetVariant;
}>`
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
