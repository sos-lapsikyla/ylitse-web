import styled from 'styled-components';

import { createUniqueId } from '@/utils/id';
import InputErrorMessage from '../InputErrorMessage';
import Text from '../Text';
import TextInput from '../TextInput';
import Tooltip from '../Tooltip';

import type { InputType } from '../TextInput/TextInput';
import type { TextInputVariant } from '../TextInput/variants';

type Props = {
  error?: string | null;
  label: string;
  onChange: (value: string) => void;
  rows?: number;
  tooltip?: string;
  type?: InputType;
  value: string;
  variant?: TextInputVariant;
};

export const LabeledInput = ({
  error,
  label,
  onChange,
  rows,
  tooltip,
  type = 'text',
  value,
  variant,
}: Props): React.JSX.Element => {
  const inputId = `labeled_input_${createUniqueId()}`;

  return (
    <Container>
      <LabelRow>
        <Text inputId={inputId} variant="label">
          {label}
        </Text>
        {tooltip && <Tooltip text={tooltip} />}
      </LabelRow>
      <Input
        id={inputId}
        isError={!!error}
        onChange={onChange}
        rows={rows}
        type={type}
        value={value}
        variant={variant}
      />
      {!!error && <InputErrorMessage text={error} />}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1rem;
`;

const LabelRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 0.5rem;
`;

const Input = styled(TextInput)`
  margin-top: 0.5rem;
`;
