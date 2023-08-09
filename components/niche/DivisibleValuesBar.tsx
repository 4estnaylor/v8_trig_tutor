import { Button, ButtonGroup, FormLabel } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

type DivisbleValueBarProps = {
  factors: number[];
};
const DivisibleValuesBar = (props: DivisbleValueBarProps) => {
  const { factors } = props;
  const factorButtons = factors.map((factor) => {
    return (
      <FactorButton key={factor} color="inherit">
        {' '}
        {factor}{' '}
      </FactorButton>
    );
  });
  return (
    <Wrapper>
      <FormLabel>Divisors</FormLabel>
      <ButtonWrap>{factorButtons}</ButtonWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  color: ${cl.getHSL(cl.blue)};
  max-height: 150px;
  overflow-y: scroll;
`;

const FactorButton = styled(Button)``;

export default DivisibleValuesBar;
