import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { UserEnteredValueType } from './IntegerInput';
import VariableButton from './VariableButton';
import VariableButtonRow from './VariableButtonRow';

export type Variable = {
  symbol: string;
  value: number;
  degree: number;
};

interface VariablePadProps {
  userEnteredValue: UserEnteredValueType;
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const VariablePad = (props: VariablePadProps) => {
  const { userEnteredValue, setValue } = props;
  const variableButtonRows = userEnteredValue.variables?.map((variable) => {
    return <VariableButtonRow variable={variable} />;
  });
  console.log(setValue);
  return <Wrapper>{variableButtonRows}</Wrapper>;
};

const Wrapper = styled.div``;

export default VariablePad;
