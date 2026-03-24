import styled, { css } from 'styled-components';
import { useRef, useEffect, useState, useCallback } from 'react';
import Text from '../Text';
import { animations, palette } from '../constants';
import { Chevron } from '../Icons/Chevron';

type BaseProps<T extends string | number> = {
  options: T[];
  value?: T;
  onChange: (value: T | undefined) => void;
  isDisabled?: boolean;
  allowClear?: boolean;
};

type FormVariantProps<T extends string | number> = BaseProps<T> & {
  variant?: 'form';
  label: string;
  placeholder: string;
};

type InlineVariantProps<T extends string | number> = BaseProps<T> & {
  variant: 'inline';
  label?: string;
};

type Props<T extends string | number> =
  | FormVariantProps<T>
  | InlineVariantProps<T>;

export const DropdownMenu = <T extends string | number>({
  options,
  value,
  onChange,
  isDisabled = false,
  allowClear = false,
  ...rest
}: Props<T>): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const variant = rest.variant ?? 'form';
  const label = rest.label;
  const placeholder =
    variant === 'form' ? (rest as FormVariantProps<T>).placeholder : '';

  // Close dropdown when clicking outside or pressing Escape
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

  if (variant === 'inline') {
    return (
      <InlineContainer>
        {label && (
          <span id={`${dropdownId}-label`}>
            <Text>{label}</Text>
          </span>
        )}
        <InlineAnchor ref={containerRef}>
          <InlineTrigger
            onClick={handleToggle}
            $isOpen={isOpen}
            disabled={isDisabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? `${dropdownId}-label` : undefined}
          >
            <Text variant="boldBaloo" color="purple">
              {value ?? ''}
            </Text>
            <Chevron variant={isOpen ? 'up' : 'down'} color="purple" isLarge />
          </InlineTrigger>

          {isOpen && (
            <InlineMenu role="listbox" aria-labelledby={`${dropdownId}-label`}>
              {options.map(option => (
                <InlineOption
                  key={option}
                  onClick={() => handleSelect(option)}
                  disabled={option === value}
                  $isSelected={option === value}
                  role="option"
                  aria-selected={option === value}
                >
                  <InlineOptionText
                    color={option === value ? 'greyOverlay' : 'blueDark'}
                  >
                    {option}
                  </InlineOptionText>
                </InlineOption>
              ))}
            </InlineMenu>
          )}
        </InlineAnchor>
      </InlineContainer>
    );
  }

  return (
    <FormContainer>
      <FormDropdownContainer ref={containerRef}>
        <LabelRow>
          <span id={`${dropdownId}-label`}>
            <Text variant="label">{label}</Text>
          </span>
        </LabelRow>

        <FormTrigger
          $hasOpenDropdown={isOpen}
          $isDisabled={isDisabled}
          onClick={handleToggle}
          disabled={isDisabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${dropdownId}-label`}
        >
          <Text
            variant="menuOption"
            color={isDisabled ? 'greyFaded' : 'blueDark'}
          >
            {value ?? placeholder}
          </Text>

          <FormChevronWrapper $isOpen={isOpen}>
            <Chevron
              variant="down"
              color={isDisabled ? 'greyFaded' : 'purple'}
            />
          </FormChevronWrapper>
        </FormTrigger>

        {!isDisabled && isOpen && (
          <FormMenu role="listbox" aria-labelledby={`${dropdownId}-label`}>
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

// Form variant styles

const FormContainer = styled.div`
  padding: 0 0 1rem 0;
`;

const FormDropdownContainer = styled.div`
  margin-top: 0.5rem;
  max-width: 250px;
  position: relative;
`;

const FormTrigger = styled.button<{
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

const LabelRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-right: 0.5rem;
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
