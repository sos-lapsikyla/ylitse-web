import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { palette } from '../constants';
import SearchIconImg from '@/static/icons/search.svg';

type Variant = 'small' | 'normal';

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
};

const sizingMap: Record<Variant, FlattenSimpleInterpolation> = {
  normal: css`
    padding: 0.75rem 4.5rem;
  `,
  small: css`
    padding: 0.75rem 2rem 0.75rem 4rem;
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
  ...props
}) => (
  <SearchBox className={className}>
    <SearchIcon />
    <SearchInput
      disabled={isDisabled}
      hasOpenDropdown={hasOpenDropdown}
      onBlur={onBlur}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      type="text"
      variant={variant}
      {...props}
    ></SearchInput>
  </SearchBox>
);

const SearchInput = styled.input<{
  hasOpenDropdown: boolean;
  variant: Variant;
}>`
  border: 1px solid ${palette.purple};
  border-radius: ${({ hasOpenDropdown }) =>
    hasOpenDropdown ? '20px 20px 0 0' : '20px'};
  box-sizing: border-box;
  display: flex;
  flex: 1;
  font-family: 'Source Sans 3';
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 400;
  padding: 1rem 4.5rem;
  width: 100%;

  ${({ variant }) => sizingMap[variant]}

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

const SearchIcon = styled.div`
  background-image: url(${SearchIconImg});
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  flex: 0 0 auto;
  height: 1.5rem;
  left: 1.5rem;
  position: absolute;
  width: 1.5rem;
`;

export default SearchBar;
