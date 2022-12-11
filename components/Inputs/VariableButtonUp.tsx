import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const VariableButtonUp = () => {
  return <Wrapper variant="contained">.</Wrapper>;
};
const Wrapper = styled(Button)`
  max-width: 50px;
  min-width: 50px;
  max-height: 50px;
  min-height: 50px;
`;

export default VariableButtonUp;
