import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Text from '../Text';
import { palette } from '../constants';
import { Chevron } from '../Icons/Chevron';

type Props = {
  isDisabled?: boolean;
  options: string[];
  placeholder: string;
  selectOption: (option: string) => void;
  label: string;
  defaultOption?: string;
};

export const DropdownMenu = ({
  isDisabled = false,
  options,
  placeholder,
  selectOption,
  label,
  defaultOption,
}: Props): React.JSX.Element => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (defaultOption) {
      setSelectedOption(defaultOption);
      selectOption(defaultOption);
    }
  }, [defaultOption]);

  const handleSelect = (option: string) => {
    if (isDisabled) return;

    if (option === selectedOption) {
      setSelectedOption('');
      selectOption('');
    } else {
      setSelectedOption(option);
      selectOption(option);
    }
    setIsDropdownVisible(false);
  };

  const handleToggleDropdown = () => {
    if (!isDisabled) {
      setIsDropdownVisible(prev => !prev);
    }
  };

  return (
    <Container>
      <DropdownContainer ref={containerRef}>
        <LabelRow>
          <Text variant="label">{label}</Text>
        </LabelRow>

        <DropdownTrigger
          $hasOpenDropdown={isDropdownVisible}
          $isDisabled={isDisabled}
          onClick={handleToggleDropdown}
          disabled={isDisabled}
        >
          <Text
            variant="menuOption"
            color={isDisabled ? 'greyFaded' : 'blueDark'}
          >
            {selectedOption || placeholder}
          </Text>

          <RightIconWrapper $isOpen={isDropdownVisible}>
            <Chevron
              variant="down"
              color={isDisabled ? 'greyFaded' : 'purple'}
            />
          </RightIconWrapper>
        </DropdownTrigger>

        {!isDisabled && isDropdownVisible && (
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
  padding: 0 0 1rem 0;
`;

const DropdownContainer = styled.div`
  margin-top: 0.5rem;
  max-width: 250px;
  position: relative;
`;

const DropdownTrigger = styled.button<{
  $isDisabled: boolean;
  $hasOpenDropdown: boolean;
}>`
  align-items: center;
  background-color: ${({ $isDisabled }) => ($isDisabled ? '#f8f8f8' : 'white')};
  border: 1px solid ${palette.purple};
  border-radius: ${({ $hasOpenDropdown }) =>
    $hasOpenDropdown ? '10px 10px 0 0' : '10px'};
  color: ${palette.blueDark};
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  padding: 0.6rem 1rem 0.4rem 1rem;
  text-align: left;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  width: 100%;

  &:focus {
    outline: ${({ $isDisabled }) =>
      $isDisabled ? 'none' : `${palette.purple} solid 2px`};
  }

  &:hover {
    background-color: ${({ $isDisabled }) =>
      $isDisabled ? '#f8f8f8' : palette.blueLight};
  }
`;

const RightIconWrapper = styled.div<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) =>
    $isOpen
      ? 'rotate(180deg) translateY(3.1px)'
      : 'rotate(0deg) translateY(0)'};
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
  margin-bottom: 0.5rem;
  padding-right: 0.5rem;
`;

export default DropdownMenu;
