import styled from 'styled-components';
import { useState } from 'react';

import { palette } from '@/components/constants';
import SearchBar from '../SearchBar';
import Text from '../Text';

type Props = {
  isDisabled: boolean;
  isDropdownVisible: boolean;
  options: string[];
  placeholder: string;
  selectOption: (option: string) => void;
  setIsDropdownVisible: (isVisible: boolean) => void;
};

export const DropdownSearch = ({
  isDisabled,
  isDropdownVisible,
  options,
  placeholder,
  selectOption,
  setIsDropdownVisible,
}: Props): React.JSX.Element => {
  const [query, setQuery] = useState('');

  const handleBlur = () => setIsDropdownVisible(false);
  const handleFocus = () => setIsDropdownVisible(true);

  const filteredOptions = options.filter(
    option =>
      query.length === 0 || option.toLowerCase().includes(query.toLowerCase()),
  );

  const shouldShowDropdown = isDropdownVisible && filteredOptions.length > 0;

  return (
    <Container>
      <SearchBar
        isDisabled={isDisabled}
        hasOpenDropdown={shouldShowDropdown}
        onBlur={handleBlur}
        onChange={setQuery}
        onFocus={handleFocus}
        placeholder={placeholder}
        value={query}
        variant="small"
      />
      {shouldShowDropdown && (
        <Dropdown id="skill-dropdown">
          {filteredOptions.map((option, i) => (
            <DropdownItem
              key={i}
              onMouseDown={() => {
                selectOption(option);
                setIsDropdownVisible(false);
              }}
            >
              <Text variant="menuOption">{option}</Text>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  max-width: 350px;
  margin: 2rem 0 0;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% - 2px);
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  min-width: 100%;
  max-height: 200px;
  overflow-y: auto;
  outline: ${palette.purple} solid 2px;
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
`;

const DropdownItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

export default DropdownSearch;
