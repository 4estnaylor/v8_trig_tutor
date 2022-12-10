import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInputWithPi';

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
    const userEnteredValueAsNumber: number | null = userEnteredValue.numerical
      ? userEnteredValue.numerical * Math.pow(Math.PI, userEnteredValue.pi)
      : null;

    let allowableDelta;
    switch (decimalPointPrecision) {
      case null || undefined:
        allowableDelta = 0.01;
        break;
      default:
        allowableDelta = Math.pow(0.1, decimalPointPrecision);
    }

    const withinRange =
      userEnteredValueAsNumber &&
      Math.abs(answer - userEnteredValueAsNumber) < allowableDelta
        ? true
        : false;

    if (withinRange) {
      setCheckState('correct');
    } else {
      setCheckState('incorrect');
    }

    console.log('comparision', userEnteredValueAsNumber, answer);
  };

  switch (checkState) {
    case 'unanswered':
      return <Wrapper onClick={handleCheck}>Check</Wrapper>;
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
  border-radius: 0;

  background-color: transparent;
`;

const UnansweredWrapper = styled(Wrapper)``;

const CorrectWrapper = styled(Wrapper)`
  border: 2px solid green;
`;

const IncorrectWrapper = styled(Wrapper)`
  border: 2px solid ${cl.getHSL(cl.red)};
`;

export default CheckButton;
