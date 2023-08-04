import {
  Box,
  Button,
  ButtonGroup,
  FormLabel,
  InputLabel,
  Modal,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { Label } from '@mui/icons-material';
import primesUnder10k from '../../utils/primesUnder10k';

type FactorButtonsProps = {
  setUserEnteredValue: Dispatch<SetStateAction<number>>;
  userEnteredValue: number;
};

const maximum = 10000;

const AddFactorsButtonBar = (props: FactorButtonsProps) => {
  const { setUserEnteredValue, userEnteredValue } = props;
  const [largePrimesVisible, setLargePrimesVisible] = useState(false);
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

  const handleExpandLargePrimes = () => {
    setLargePrimesVisible(!largePrimesVisible);
  };
  const primeFactors = [2, 3, 5, 7, 11];
  const primeFactorsButtons = primeFactors.map((factor) => {
    const isMaxedOut = userEnteredValue * factor > maximum;
    return (
      <SpecialButton
        color="inherit"
        key={factor}
        onClick={() => {
          handleAddingFactor(factor);
        }}
        isMaxedOut={isMaxedOut}
      >
        {factor}
      </SpecialButton>
    );
  });

  const largePrimeFactorButtons = primesUnder10k.map((prime) => {
    if (prime <= 11 || prime >= 100) {
      return;
    }
    const isMaxedOut = userEnteredValue * prime > maximum;
    return (
      <SpecialButton
        color="inherit"
        key={prime}
        onClick={() => {
          handleAddingFactor(prime);
        }}
        isMaxedOut={isMaxedOut}
      >
        {prime}
      </SpecialButton>
    );
  });

  const largePrimeModal = (
    <Modal
      open={largePrimesVisible}
      onClose={() => {
        setLargePrimesVisible(false);
      }}
    >
      <LargePrimeModalWrapper>{largePrimeFactorButtons}</LargePrimeModalWrapper>
    </Modal>
  );

  const toggleLargePrimesButton = (
    <SpecialButton onClick={handleExpandLargePrimes} color="inherit">
      ...
    </SpecialButton>
  );
  return (
    <OutterWrapper>
      <InputLabel>Multiply</InputLabel>
      <Wrapper>
        <ButtonGroup>
          {primeFactorsButtons} {toggleLargePrimesButton}
        </ButtonGroup>

        {largePrimeModal}
      </Wrapper>
    </OutterWrapper>
  );
};

const LargePrimeModalWrapper = styled(ButtonGroup)`
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  background-color: ${cl.getHSL(cl.white)};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  min-width: 200px;
  min-height: 100px;

  padding-left: 10px;
  padding-right: 10px;
  /* overflow-y: auto; */
  overflow-x: auto;

  border-radius: 8px;
`;

const Wrapper = styled.div`
  /* color: ${cl.getHSL(cl.blue)}; */
`;
const OutterWrapper = styled.div`
  flex-direction: column;
  /* background: ${cl.getHSL(cl.gray_dark)}; */
  display: flex;
  gap: 10px;
  padding-left: 5px;
  align-items: center;
  font-size: 1.25rem;
  color: ${cl.getHSL(cl.gray_dark)};
  padding-top: 10px;
  padding-bottom: 10px;
  flex-wrap: wrap;
`;

const SpecialButton = styled(Button)<{ isMaxedOut?: boolean }>`
  width: 45px;
  height: 45px;
  opacity: ${(p) => (p.isMaxedOut ? 0.2 : 1)};
  &:hover {
  }
`;

export default AddFactorsButtonBar;
