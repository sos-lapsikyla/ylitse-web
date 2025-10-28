import { useState } from 'react';
import styled from 'styled-components';
import Text from '@/components/Text';
import { Column } from '../common';
import { Chip } from '../Chip';
import { DropdownSearch } from '../DropdownSearch';

type EditorProps = {
  updateChips: (chips: string[]) => void;
  chips: string[];
  allOptions: string[];
  placeholder: string;
  label: string;
};

const ChipsEditor = ({
  updateChips,
  chips,
  allOptions: allChips,
  placeholder,
  label,
}: EditorProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const addChip = (chip: string) => {
    setIsDropdownVisible(false);
    updateChips([...chips, chip]);
  };

  const removeChip = (chip: string) => {
    setIsDropdownVisible(false);
    updateChips(chips.filter(c => c !== chip));
  };

  const chipOptions = allChips.filter(chip => !chips.includes(chip));

  return (
    <Column>
      <LabelText variant="label">{label}</LabelText>
      {chips.length > 0 && (
        <Chips>
          {chips.map(chip => (
            <Chip key={chip} text={chip} onToggle={removeChip} />
          ))}
        </Chips>
      )}
      <DropdownSearch
        isDropdownVisible={isDropdownVisible}
        options={chipOptions}
        placeholder={placeholder}
        selectOption={addChip}
        setIsDropdownVisible={setIsDropdownVisible}
      />
    </Column>
  );
};

const LabelText = styled(Text)`
  margin: 0 0 -0.6rem 0;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export default ChipsEditor;
