import { Button, ButtonGroup } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';

type FactorButtonsProps = {
  setUserEnteredValue: Dispatch<SetStateAction<number>>;
};

const maximum = 1000000000;

const AddFactorsButtonBar = (props: FactorButtonsProps) => {
  const { setUserEnteredValue } = props;
  const handleAddingFactor = (factor: number) => {
    setUserEnteredValue((prev) => {
      if (prev === 0) {
        return 1 * factor;
      }
      if (prev * factor > maximum) {
        return prev;
      } else {
        return prev * factor;
      }
    });
  };
  const primeFactors = [2, 3, 5, 7, 11, 13];
  const primeFactorsButtons = primeFactors.map((factor) => {
    return (
      <SpecialButton
        color="inherit"
        key={factor}
        onClick={() => {
          handleAddingFactor(factor);
        }}
      >
        {factor}
      </SpecialButton>
    );
  });
  return (
    <OutterWrapper>
      {`Add Prime Factors`}
      <Wrapper>{primeFactorsButtons}</Wrapper>
    </OutterWrapper>
  );
};

const Wrapper = styled(ButtonGroup)``;
const OutterWrapper = styled.div`
  background: ${cl.getHSL(cl.gray_mid)};
  display: flex;
  gap: 10px;
  padding-left: 5px;
  align-items: center;
  font-size: 1.25rem;
  color: ${cl.getHSL(cl.white)};
  padding-top: 10px;
  padding-bottom: 10px;
  flex-wrap: wrap;
  margin-top: -1px;
`;

const SpecialButton = styled(Button)`
  &:hover {
  }
`;

export default AddFactorsButtonBar;
