import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInputWithPi';

interface CheckButtonProps {
  userEnteredValue: UserEnteredValueType;
  answer: number;
}

const convertStringToNumber = (str: string) => {};

const CheckButton = (props: CheckButtonProps) => {
  const { userEnteredValue, answer } = props;
  const handleCheck = () => {
    console.log('checking answer', userEnteredValue, answer);
  };
  return <Wrapper onClick={handleCheck}>Check</Wrapper>;
};

const Wrapper = styled(Button)`
  border-radius: 0;

  background-color: transparent;
`;

export default CheckButton;
