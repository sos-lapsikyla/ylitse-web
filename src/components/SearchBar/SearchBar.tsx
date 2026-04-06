import styled, { css, type RuleSet } from 'styled-components';
import { palette } from '../constants';
import SearchIconImg from '@/static/icons/search.svg';
import Text from '../Text';

type Variant = 'small' | 'normal' | 'narrow';

type SearchProps = {
  className?: string;
  hasOpenDropdown?: boolean;
  isDisabled?: boolean;
  onBlur?: () => void;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder: string;
  value: string;
  variant: Variant;
  label?: string;
};

const sizingMap: Record<Variant, RuleSet> = {
  normal: css`
    padding: 0.75rem 4.5rem;
  `,
  small: css`
    padding: 0.75rem 2rem 0.75rem 3.5rem;
  `,
  narrow: css`
    font-size: 18px;
    height: 46px;
    line-height: 1;
    padding: 0.5rem 2rem 0.5rem 2.7rem;
  `,
};

const SearchBar: React.FC<SearchProps> = ({
  className,
  hasOpenDropdown = false,
  isDisabled = false,
  onBlur,
  onChange,
  onFocus,
  variant,
  label,
  ...props
}) => (
  <Container $variant={variant}>
    {label && (
      <LabelWrapper $variant={variant}>
        <Text variant="label">{label}</Text>
      </LabelWrapper>
    )}
    <SearchBox className={className}>
      <SearchIcon $variant={variant} />
      <SearchInput
        disabled={isDisabled}
        $hasOpenDropdown={hasOpenDropdown}
        onBlur={onBlur}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        type="text"
        $variant={variant}
        {...props}
      ></SearchInput>
    </SearchBox>
  </Container>
);

const Container = styled.div<{ $variant: Variant }>`
  ${({ $variant }) =>
    $variant === 'narrow' &&
    css`
      padding-bottom: 1rem;
      width: 100%;
    `}
  ${({ $variant }) =>
    $variant === 'normal' &&
    css`
      width: 30rem;
    `}
`;

const LabelWrapper = styled.div<{ $variant: Variant }>`
  margin-bottom: 0.5rem;
  padding-right: 0.5rem;
  ${({ $variant }) =>
    $variant === 'narrow' &&
    css`
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0;
      margin-top: 0.25rem;
    `}
`;

const SearchInput = styled.input<{
  $hasOpenDropdown: boolean;
  $variant: Variant;
}>`
  border: 1px solid ${palette.purple};
  border-radius: ${({ $hasOpenDropdown }) =>
    $hasOpenDropdown ? '20px 20px 0 0' : '20px'};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  font-family: 'Source Sans 3';
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 400;
  padding: 1rem 4.5rem;
  width: 100%;
  ${({ $variant }) =>
    $variant === 'narrow' &&
    css`
      border-radius: 18px;
    `}

  ${({ $variant }) => sizingMap[$variant]}

  &:focus {
    outline: ${palette.purple} solid 2px;
  }
`;

const SearchBox = styled.div`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  position: relative;
`;

const SearchIcon = styled.div<{ $variant: Variant }>`
  background-image: url(${SearchIconImg});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex: 0 0 auto;
  height: 1.5rem;
  left: 1.25rem;
  position: absolute;
  width: 1.5rem;
  ${({ $variant }) =>
    $variant === 'narrow' &&
    css`
      height: 1rem;
      left: 1rem;
      width: 1rem;
    `}
`;

export default SearchBar;
