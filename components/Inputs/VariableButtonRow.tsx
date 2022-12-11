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
  height: 60px;
  display: flex;
  align-items: center;
`;

export default VariableButtonRow;
