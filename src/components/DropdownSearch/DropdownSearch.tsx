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

  // Delay dropdown hide to allow click event on options
  const handleBlur = () => setTimeout(() => setIsDropdownVisible(false), 200);
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
            <DropdownItem key={i} onClick={() => selectOption(option)}>
              <Text variant="menuOption">{option}</Text>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem 0;
  max-width: 350px;
  position: relative;
`;

const Dropdown = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  max-height: 200px;
  outline: ${palette.purple} solid 2px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

export default DropdownSearch;
