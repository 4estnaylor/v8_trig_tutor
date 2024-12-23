import { Button } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInput';
import { AnswerState } from './MultipleChoiceQuestion';

interface CheckButtonProps {
  userEnteredValue: UserEnteredValueType;
  answer: number;
  decimalPointPrecision?: number;
  answerState: AnswerState;
  setAnswerState: React.Dispatch<React.SetStateAction<AnswerState>>;
}

const convertStringToNumber = (str: string) => {};

const CheckButton = (props: CheckButtonProps) => {
  const {
    userEnteredValue,
    answer,
    decimalPointPrecision,
    answerState,
    setAnswerState,
  } = props;
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
        break;
    }

    const withinRange =
      totalValue && Math.abs(answer - totalValue) < allowableDelta
        ? true
        : false;

    if (withinRange) {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }

    console.log('comparision', totalValue, answer);
  };

  switch (answerState) {
    case 'unanswered':
      return (
        <UnansweredWrapper
          onClick={handleCheck}
          variant="outlined"
          sx={{
            background: `linear-gradient(15deg, hsl(340, 100%, 80%), hsl(225, 72%, 60%), hsl(190, 100%, 85%))`,
            color: `${cl.getHSL(cl.white)}`,
          }}
        >
          Check
        </UnansweredWrapper>
      );
      break;
    case 'correct':
      return (
        <CorrectWrapper onClick={handleCheck} variant="outlined">
          Check
        </CorrectWrapper>
      );
      break;
    case 'incorrect':
      return (
        <IncorrectWrapper
          onClick={handleCheck}
          variant="outlined"
          color="warning"
        >
          Check
        </IncorrectWrapper>
      );
      break;
    default:
      return (
        <Wrapper onClick={handleCheck} variant="outlined" color="primary">
          Check 2
        </Wrapper>
      );
  }
};

const Wrapper = styled(Button)`
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
