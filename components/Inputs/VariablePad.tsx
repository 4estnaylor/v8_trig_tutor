import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ClearAllButton from './ClearAllButton';
import { UserEnteredValueType } from './IntegerInput';
import VariableButton from './VariableButton';
import VariableButtonRow from './VariableButtonRow';

export type Variable = {
  symbol: string;
  value: number;
  degree: number;
  color?: string;
};

interface VariablePadProps {
  userEnteredValue: UserEnteredValueType;
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const VariablePad = (props: VariablePadProps) => {
  const { userEnteredValue, setValue } = props;
  const variableButtonRows = userEnteredValue.variables?.map((variable) => {
    return (
      <VariableButtonRow
        variable={variable}
        key={variable.symbol}
        setValue={setValue}
      />
    );
  });
  return (
    <Wrapper>
      {variableButtonRows}
      <ClearAllButton setValue={setValue} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 0px;
  display: grid;

  grid-template-columns: 105px;
  grid-template-rows: repeat(4, 50px);
  gap: 5px 5px;
  flex-direction: column;
  flex: 1;
`;
export default VariablePad;
