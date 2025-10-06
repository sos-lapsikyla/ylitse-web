import styled, { css, type RuleSet } from 'styled-components';
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

const sizingMap: Record<Variant, RuleSet> = {
  normal: css`
    padding: 0.75rem 4.5rem;
  `,
  small: css`
    padding: 0.75rem 2rem 0.75rem 3.5rem;
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
      $hasOpenDropdown={hasOpenDropdown}
      onBlur={onBlur}
      onChange={e => onChange(e.target.value)}
      onFocus={onFocus}
      type="text"
      $variant={variant}
      {...props}
    ></SearchInput>
  </SearchBox>
);

const SearchInput = styled.input<{
  $hasOpenDropdown: boolean;
  $variant: Variant;
}>`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  width: 100%;
  padding: 1rem 4.5rem;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 400;
  border: 1px solid ${palette.purple};
  border-radius: ${({ $hasOpenDropdown }) =>
    $hasOpenDropdown ? '20px 20px 0 0' : '20px'};

  &:focus {
    outline: ${palette.purple} solid 2px;
  }

  ${({ $variant }) => sizingMap[$variant]}
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.25rem;
  display: flex;
  flex: 0 0 auto;
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(${SearchIconImg});
  background-repeat: no-repeat;
  background-size: contain;
`;

export default SearchBar;
