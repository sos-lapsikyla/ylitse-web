import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Text from '../Text';
import { palette } from '../constants';

type Props = {
  isDisabled?: boolean;
  options: string[];
  placeholder: string;
  selectOption: (option: string) => void;
  label: string;
};

export const DropdownMenu = ({
  isDisabled = false,
  options,
  placeholder,
  selectOption,
  label,
}: Props): React.JSX.Element => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const shouldShowDropdown = isDropdownVisible;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    selectOption(option);
    setIsDropdownVisible(false);
  };

  return (
    <Container>
      <DropdownContainer ref={containerRef}>
        <LabelRow>
          <Text variant="label">{label}</Text>
        </LabelRow>
        <DropdownTrigger
          $hasOpenDropdown={shouldShowDropdown}
          $isDisabled={isDisabled}
          onClick={() => {
            if (!isDisabled) setIsDropdownVisible(prev => !prev);
          }}
        >
          <Text variant="menuOption">{selectedOption || placeholder}</Text>

          <RightIconWrapper $isOpen={isDropdownVisible}>
            {/* Lisää chevron */}
          </RightIconWrapper>
        </DropdownTrigger>

        {isDropdownVisible && (
          <Dropdown id="dropdown-menu">
            {options.map((option, i) => (
              <DropdownItem key={i} onMouseDown={() => handleSelect(option)}>
                <Text variant="menuOption">{option}</Text>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </DropdownContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1.5rem 0;
`;

const DropdownContainer = styled.div`
  margin: 0;
  max-width: 350px;
  position: relative;
`;

const DropdownTrigger = styled.button<{
  $isDisabled: boolean;
  $hasOpenDropdown: boolean;
}>`
  align-items: center;
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: ${({ $hasOpenDropdown }) =>
    $hasOpenDropdown ? '10px 10px 0 0' : '10px'};
  color: ${palette.blueDark};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  text-align: left;
  width: 100%;

  &:focus {
    outline: ${palette.purple} solid 2px;
  }

  &:hover {
    background-color: ${({ $isDisabled }) =>
      $isDisabled ? 'white' : palette.blueLight};
  }
`;

const RightIconWrapper = styled.div<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

const Dropdown = styled.div`
  background-color: white;
  border: 1px solid ${palette.purple};
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  left: 0;
  max-height: 200px;
  min-width: 100%;
  outline: ${palette.purple} solid 2px;
  overflow-y: auto;
  position: absolute;
  top: calc(100% - 2px);
  z-index: 10;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  padding: 0.75rem 1rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

const LabelRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 0.5rem;
`;

export default DropdownMenu;
