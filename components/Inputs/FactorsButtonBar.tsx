import { Button, ButtonGroup } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import AddFactorsButtonBar from './AddFactorsButtonsBar';

type FactorButtonsProps = {
  setUserEnteredValue: Dispatch<SetStateAction<number>>;
};

const maximum = 1000;

const FactorsButtonBar = (props: FactorButtonsProps) => {
  const { setUserEnteredValue } = props;

  return (
    <div>
      <AddFactorsButtonBar setUserEnteredValue={setUserEnteredValue} />
    </div>
  );
};

const Wrapper = styled.div``;

export default FactorsButtonBar;
