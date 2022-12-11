import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { Variable } from './VariablePad';

interface VariableButtonDownProps {
  variable: Variable;
}

const VariableButtonDown = (props: VariableButtonDownProps) => {
  const { variable } = props;
  return <Wrapper variant="contained">{variable.symbol} - </Wrapper>;
};

const Wrapper = styled(Button)`
  max-width: 50px;
  min-width: 50px;
  max-height: 50px;
  min-height: 50px;
`;

export default VariableButtonDown;
