import { Button } from '@mui/material';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import index from '../../pages/strategy';
import { UserEnteredValueType } from './IntegerInput';
import { Variable } from './VariablePad';

interface VariableButtonUpProps {
  variable: Variable;
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const VariableButtonUp = (props: VariableButtonUpProps) => {
  const { variable, setValue } = props;
  const [isClickable, setIsClickable] = useState(true);

  const handleButtonDownVariableClick = (e: React.MouseEvent) => {
    if (!isClickable) {
      e.preventDefault();
      return;
    }
    setValue((prev) => {
      if (!prev.variables) return prev;
      const indexOfVarToUpdate = prev.variables?.indexOf(variable);
      const updatedVariables = [...prev.variables];
      updatedVariables[indexOfVarToUpdate].degree += 1;

      let updatedValue: UserEnteredValueType = {
        numerical: prev.numerical,
        decimalPlaceIndex: prev.decimalPlaceIndex,
        variables: updatedVariables,
      };

      return updatedValue;
    });
  };

  return (
    <Wrapper
      variant="contained"
      customcolor={variable.color || cl.getHSL(cl.purple)}
      $isclickable={isClickable}
      onClick={(e) => handleButtonDownVariableClick(e)}
    >
      {variable.symbol}
      <PlusSign>+</PlusSign>
    </Wrapper>
  );
};

const Wrapper = styled(Button)<{
  customcolor: string;
  $isclickable: boolean;
}>`
  max-width: 55px;
  min-width: 55px;
  max-height: 55px;
  min-height: 55px;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.customcolor};

  text-transform: lowercase;
  position: relative;
  opacity: ${(p) => (p.$isclickable ? 1 : 0.1)};

  &:hover {
    background-color: ${(p) => p.customcolor};
    opacity: ${(p) => (p.$isclickable ? 0.8 : 0.3)};
  }
`;

const PlusSign = styled.div`
  position: absolute;
  right: 5px;
  top: -8px;
`;

export default VariableButtonUp;
