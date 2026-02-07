import Text from '../Text';
import styled from 'styled-components';
import { IconButton } from '../Buttons';

type Props = {
  label: string;
  onChange: () => void;
  isChecked: boolean;
};

export const Checkbox: React.FC<Props> = ({ label, onChange, isChecked }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" checked={isChecked} onChange={onChange} />
      <IconWrapper>
        <IconButton
          sizeInPx={18}
          variant={isChecked ? 'checkboxChecked' : 'checkboxUnChecked'}
        />
      </IconWrapper>
      <Text variant="p">{label}</Text>
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
`;

const CheckboxInput = styled.input`
  height: 18px;
  left: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  width: 18px;
`;

const IconWrapper = styled.div`
  height: 18px;
  margin-right: 8px;
  pointer-events: none;
  width: 18px;
`;
