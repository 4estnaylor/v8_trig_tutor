import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInput';

interface CheckButtonProps {
  userEnteredValue: UserEnteredValueType;
  answer: number;
  decimalPointPrecision?: number;
}

const convertStringToNumber = (str: string) => {};

type CheckStateType = 'correct' | 'incorrect' | 'unanswered';

const CheckButton = (props: CheckButtonProps) => {
  const [checkState, setCheckState] = useState<CheckStateType>('unanswered');
  const { userEnteredValue, answer, decimalPointPrecision } = props;
  const handleCheck = () => {
    console.log('checking answer', userEnteredValue, answer);
    let totalValue: number;

    let base: number = userEnteredValue.numerical || 1;
    if (userEnteredValue.decimalPlaceIndex) {
      let numericalStr = userEnteredValue.numerical?.toString() || '';
      base = Number(
        numericalStr.slice(0, userEnteredValue.decimalPlaceIndex) +
          '.' +
          numericalStr.slice(userEnteredValue.decimalPlaceIndex)
      );
    }

    if (userEnteredValue.variables) {
      userEnteredValue.variables.forEach((variable) => {
        base *= Math.pow(variable.value, variable.degree);
      });
    } else {
      base = 0;
    }

    totalValue = base;

    // const userEnteredValueAsNumber: number | null = userEnteredValue.numerical
    //   ? userEnteredValue.variables userEnteredValue.numerical
    //   : null;

    let allowableDelta;
    switch (decimalPointPrecision) {
      case null || undefined:
        allowableDelta = 0.01;
        break;
      default:
        allowableDelta = Math.pow(0.1, decimalPointPrecision);
    }

    const withinRange =
      totalValue && Math.abs(answer - totalValue) < allowableDelta
        ? true
        : false;

    if (withinRange) {
      setCheckState('correct');
    } else {
      setCheckState('incorrect');
    }

    console.log('comparision', totalValue, answer);
  };

  switch (checkState) {
    case 'unanswered':
      return (
        <Wrapper onClick={handleCheck} variant="outlined">
          Check
        </Wrapper>
      );
      break;
    case 'correct':
      return <CorrectWrapper onClick={handleCheck}>Check</CorrectWrapper>;
      break;
    case 'incorrect':
      return <IncorrectWrapper onClick={handleCheck}>Check</IncorrectWrapper>;
      break;
  }
};

const Wrapper = styled(Button)`
  background-color: transparent;
  width: 115px;
`;

const UnansweredWrapper = styled(Wrapper)``;

const CorrectWrapper = styled(Wrapper)`
  border: 2px solid green;
`;

const IncorrectWrapper = styled(Wrapper)`
  border: 2px solid ${cl.getHSL(cl.red)};
`;

export default CheckButton;
