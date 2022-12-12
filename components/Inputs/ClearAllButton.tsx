import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInput';
import { Variable } from './VariablePad';

interface ClearAllButtonProps {
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const ClearAllButton = (props: ClearAllButtonProps) => {
  const { setValue } = props;
  const handleClick = () => {
    let variablesToZero: Variable[] = [];

    setValue((prev) => {
      if (prev.variables) {
        variablesToZero = [...prev.variables];
        variablesToZero.forEach((variable) => (variable.degree = 0));
      }

      const emptyValue: UserEnteredValueType = {
        numerical: null,
        decimalPlaceIndex: null,
        variables: variablesToZero,
      };

      return emptyValue;
    });
  };

  return <Wrapper onClick={handleClick}>Clear All</Wrapper>;
};

const Wrapper = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${cl.getHSL(cl.white)};
  max-width: 115px;
  min-width: 115px;
  max-height: 55px;
  min-height: 55px;
  background-color: ${cl.getHSL(cl.gray_dark)};
  grid-row: 4;

  &:hover {
    cursor: pointer;
    background-color: ${cl.getHSL(cl.gray_dark)};
    color: ${cl.getHSL(cl.white)};
    border: none;
  }
`;

export default ClearAllButton;
