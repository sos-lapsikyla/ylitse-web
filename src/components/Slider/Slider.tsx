import styled from 'styled-components';

import { Column } from '../common';
import { palette } from '../constants';
import Text from '../Text';

type Props = {
  id: string;
  label: string;
  onChange: () => void;
  text: string;
  value: boolean;
};

export const Slider = ({ id, label, onChange, text, value }: Props) => (
  <Column>
    <Text variant="label">{label}</Text>
    <SwitchContainer>
      <Switch>
        <Input id={id} type="checkbox" checked={value} onChange={onChange} />
        <Thumb checked={value} />
      </Switch>
      <Text inputId={id} variant="label">
        {text}
      </Text>
    </SwitchContainer>
  </Column>
);

const SwitchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Switch = styled.label`
  position: relative;
  width: 59px;
  height: 29px;
  cursor: pointer;

  input:checked + span {
    &::before {
      transform: translateX(28px);
    }
  }
`;

const Input = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

const Thumb = styled.span<{ checked: boolean }>`
  position: absolute;
  inset: 0;
  border: 2px solid
    ${({ checked }) => (checked ? palette.purple : palette.greyFaded)};
  border-radius: 19px;
  transition: 0.4s;

  &::before {
    position: absolute;
    top: 2px;
    left: 3px;
    width: 21px;
    height: 21px;
    content: '';
    background-color: ${({ checked }) =>
      checked ? palette.purple : palette.greyFaded};
    border-radius: 50%;
    transition: 0.4s;
  }
`;
