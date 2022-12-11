import React from 'react';
import styled from 'styled-components';
import { UserEnteredValueType } from './IntegerInput';
import VariableButton from './VariableButton';
import VariableButtonDown from './VariableButtonDown';
import VariableButtonUp from './VariableButtonUp';
import { Variable } from './VariablePad';

interface VariableButtonRowProps {
  variable: Variable;
}

const VariableButtonRow = (props: VariableButtonRowProps) => {
  const { variable } = props;
  return (
    <Wrapper>
      <VariableButtonUp />
      <VariableButtonDown variable={variable} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default VariableButtonRow;
