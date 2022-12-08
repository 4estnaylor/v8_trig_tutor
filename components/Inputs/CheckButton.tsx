import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

const CheckButton = () => {
  const handleCheck = () => {
    console.log('checking answer');
  };
  return <Wrapper onClick={handleCheck}>Check</Wrapper>;
};

const Wrapper = styled(Button)`
  border-radius: 0;

  background-color: transparent;
`;

export default CheckButton;
