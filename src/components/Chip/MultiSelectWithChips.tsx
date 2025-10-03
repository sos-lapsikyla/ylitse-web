import styled from 'styled-components';
import { useState } from 'react';
import Text from '@/components/Text';
import { Chip } from '@/components/Chip';
import DropdownSearch from '@/components/DropdownSearch/DropdownSearch';
import { Column } from '@/components/common';

type MultiSelectWithChipsProps = {
  label?: string;
  selected: string[];
  options: string[];
  placeholder?: string;
  isDisabled?: boolean;
  onChange: (items: string[]) => void;
};

const MultiSelectWithChips: React.FC<MultiSelectWithChipsProps> = ({
  label,
  selected,
  options,
  placeholder,
  isDisabled = false,
  onChange,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const addItem = (item: string) => {
    setIsDropdownVisible(false);
    onChange([...selected, item]);
  };

  const removeItem = (item: string) => {
    setIsDropdownVisible(false);
    onChange(selected.filter(i => i !== item));
  };

  // Don’t show already-selected items in dropdown
  const availableOptions = options.filter(o => !selected.includes(o));

  return (
    <Column>
      {label && <Text variant="label">{label}</Text>}
      <Chips>
        {selected.map(item => (
          <Chip key={item} text={item} onToggle={removeItem} />
        ))}
      </Chips>
      <DropdownSearch
        isDisabled={isDisabled}
        isDropdownVisible={isDropdownVisible}
        options={availableOptions}
        placeholder={placeholder ?? ''}
        selectOption={addItem}
        setIsDropdownVisible={setIsDropdownVisible}
      />
    </Column>
  );
};

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export default MultiSelectWithChips;
