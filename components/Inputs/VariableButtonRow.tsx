import React, { SetStateAction, Dispatch } from 'react';
import styled from 'styled-components';
import { UserEnteredValueType } from './IntegerInput';
import VariableButton from './VariableButton';
import VariableButtonDown from './VariableButtonDown';
import VariableButtonUp from './VariableButtonUp';
import { Variable } from './VariablePad';

interface VariableButtonRowProps {
  variable: Variable;
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const VariableButtonRow = (props: VariableButtonRowProps) => {
  const { variable, setValue } = props;
  return (
    <Wrapper>
      <VariableButtonDown variable={variable} setValue={setValue} />
      <VariableButtonUp variable={variable} setValue={setValue} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;

  gap: 5px;
`;

export default VariableButtonRow;
