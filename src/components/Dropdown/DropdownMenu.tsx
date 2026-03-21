import styled, { css } from 'styled-components';
<<<<<<< HEAD
import { useRef, useEffect, useState, useCallback } from 'react';
=======
import { useState, useRef, useEffect } from 'react';
>>>>>>> 8faf417 (Filter, sort and search users)
import Text from '../Text';
import { animations, palette } from '../constants';
import { Chevron } from '../Icons/Chevron';

<<<<<<< HEAD
<<<<<<< HEAD
type Props<T extends string | number> = {
  options: T[];
  value?: T;
  onChange: (value: T | undefined) => void;
  variant?: 'form' | 'inline';
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  allowClear?: boolean;
=======
type DropdownVariant = 'default' | 'compact' | 'form'
=======
type DropdownVariant = 'default' | 'compact' | 'form';
>>>>>>> c6c43c4 (Filter, sort and search users)

type Props = {
  isDisabled?: boolean;
  options: string[];
  placeholder: string;
  selectOption: (option: string) => void;
  label: string;
  defaultOption?: string;
  selected?: string;
  variant?: DropdownVariant;
>>>>>>> 8faf417 (Filter, sort and search users)
};

export const DropdownMenu = <T extends string | number>({
  options,
  value,
  onChange,
  variant = 'form',
  label,
<<<<<<< HEAD
  placeholder = '',
  isDisabled = false,
  allowClear = false,
}: Props<T>): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
=======
  defaultOption,
  variant = 'default',
}: Props): React.JSX.Element => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
>>>>>>> 8faf417 (Filter, sort and search users)
  const containerRef = useRef<HTMLDivElement>(null);
  const isInline = variant === 'inline';

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (option: T) => {
      if (isDisabled) return;

      if (allowClear && option === value) {
        onChange(undefined);
      } else {
        onChange(option);
      }
      setIsOpen(false);
    },
    [isDisabled, allowClear, value, onChange],
  );

  const handleToggle = useCallback(() => {
    if (!isDisabled) {
      setIsOpen(prev => !prev);
    }
  }, [isDisabled]);

  const dropdownId = `dropdown-${label?.replace(/\s+/g, '-').toLowerCase() ?? 'menu'}`;
  const labelId = `${dropdownId}-label`;
  const displayValue = value ?? placeholder;
  const textColor = isDisabled ? 'greyFaded' : 'purple';

  const labelElement = label && (
    <LabelRow $isInline={isInline}>
      <span id={labelId}>
        <Text variant={isInline ? undefined : 'label'}>{label}</Text>
      </span>
    </LabelRow>
  );

  const triggerProps = {
    onClick: handleToggle,
    disabled: isDisabled,
    'aria-haspopup': 'listbox' as const,
    'aria-expanded': isOpen,
    'aria-labelledby': label ? labelId : undefined,
  };

  if (isInline) {
    return (
      <InlineContainer>
        {labelElement}
        <InlineAnchor ref={containerRef}>
          <InlineTrigger {...triggerProps} $isOpen={isOpen}>
            <Text variant="boldBaloo" color="purple">
              {displayValue}
            </Text>
            <Chevron
              variant={isOpen ? 'up' : 'down'}
              color={textColor}
              isLarge
            />
          </InlineTrigger>

          {!isDisabled && isOpen && (
            <InlineMenu
              id={`${dropdownId}-menu`}
              data-testid="dropdown-menu"
              role="listbox"
              aria-labelledby={labelId}
            >
              {options.map(option => {
                const isSelected = option === value;
                return (
                  <InlineOption
                    key={option}
                    onClick={() => handleSelect(option)}
                    disabled={isSelected}
                    $isSelected={isSelected}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <InlineOptionText
                      color={isSelected ? 'greyOverlay' : 'blueDark'}
                    >
                      {option}
                    </InlineOptionText>
                  </InlineOption>
                );
              })}
            </InlineMenu>
          )}
        </InlineAnchor>
      </InlineContainer>
    );
  }

  return (
<<<<<<< HEAD
    <FormContainer>
      {labelElement}
      <FormDropdownContainer ref={containerRef}>
        <FormTrigger
          {...triggerProps}
          $isOpen={isOpen}
=======
    <Container>
      <DropdownContainer ref={containerRef} $variant={variant}>
        <LabelRow>
          <Text variant="label">{label}</Text>
        </LabelRow>

        <DropdownTrigger
          $hasOpenDropdown={isDropdownVisible}
>>>>>>> 8faf417 (Filter, sort and search users)
          $isDisabled={isDisabled}
        >
          <Text
            variant="menuOption"
            color={isDisabled ? 'greyFaded' : 'blueDark'}
          >
            {displayValue}
          </Text>

          <FormChevronWrapper $isOpen={isOpen}>
            <Chevron variant="down" color={textColor} />
          </FormChevronWrapper>
        </FormTrigger>

        {!isDisabled && isOpen && (
          <FormMenu
            id={`${dropdownId}-menu`}
            data-testid="dropdown-menu"
            role="listbox"
            aria-labelledby={labelId}
          >
            {options.map(option => (
              <FormMenuItem
                key={option}
                onMouseDown={() => handleSelect(option)}
                role="option"
                aria-selected={option === value}
              >
                <Text variant="menuOption">{option}</Text>
              </FormMenuItem>
            ))}
          </FormMenu>
        )}
      </FormDropdownContainer>
    </FormContainer>
  );
};

// Shared styles

const LabelRow = styled.div<{ $isInline: boolean }>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  ${({ $isInline }) =>
    !$isInline &&
    css`
      margin-bottom: 0.5rem;
      padding-right: 0.5rem;
    `}
`;

// Form variant styles

const FormContainer = styled.div`
  padding: 0 0 1rem 0;
`;

<<<<<<< HEAD
<<<<<<< HEAD
const FormDropdownContainer = styled.div`
=======
const DropdownContainer = styled.div<{$variant: DropdownVariant}>`
>>>>>>> 8faf417 (Filter, sort and search users)
=======
const DropdownContainer = styled.div<{ $variant: DropdownVariant }>`
>>>>>>> c6c43c4 (Filter, sort and search users)
  margin-top: 0.5rem;
  position: relative;
  ${({ $variant }) =>
    $variant === 'form' &&
    css`
      max-width: 250px;
    `}
`;

const FormTrigger = styled.button<{
  $isDisabled: boolean;
  $isOpen: boolean;
}>`
  align-items: center;
  background-color: ${({ $isDisabled }) => ($isDisabled ? '#f8f8f8' : 'white')};
  border: 1px solid ${palette.purple};
  border-radius: ${({ $isOpen }) => ($isOpen ? '10px 10px 0 0' : '10px')};
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

const FormChevronWrapper = styled.div<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) =>
    $isOpen
      ? 'rotate(180deg) translateY(3.1px)'
      : 'rotate(0deg) translateY(0)'};
  transition: transform 0.2s ease;
`;

const FormMenu = styled.div`
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

const FormMenuItem = styled.div`
  cursor: pointer;
  padding: 0.75rem 1rem;

  &:hover {
    background-color: ${palette.blueLight};
  }
`;

// Inline variant styles

const InlineContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`;

const InlineAnchor = styled.div`
  align-items: stretch;
  display: inline-flex;
  overflow: visible;
  position: relative;
`;

const InlineTrigger = styled.button<{ $isOpen: boolean }>`
  align-items: center;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 8px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;

  ${({ $isOpen }) =>
    $isOpen
      ? css`
          border-bottom-color: transparent;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          border-color: ${palette.purple};
        `
      : css`
          &:hover {
            background-color: ${palette.white};
          }
        `}
`;

const InlineMenu = styled.div`
  animation: ${animations.growDown};
  background: ${palette.white};
  border: 2px solid ${palette.purple};
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  left: 0;
  min-width: calc(100% - 4px);
  position: absolute;
  top: calc(100% - 2px);
  transform-origin: top center;
  z-index: 10;

  button:last-of-type {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }
`;

const InlineOption = styled.button<{ $isSelected?: boolean }>`
  align-items: center;
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${palette.greyMid};
  box-sizing: border-box;
  cursor: ${({ $isSelected }) => ($isSelected ? 'auto' : 'pointer')};
  display: flex;
  padding: 0 0.5rem;
  width: 100%;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? 'inherit' : palette.blueLight};
  }
`;

const InlineOptionText = styled(Text)`
  line-height: 1rem;
  margin: 0.5rem 0;
`;

export default DropdownMenu;
