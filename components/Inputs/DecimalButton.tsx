import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInput';

interface DecimalButtonProps {
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const countOcurrancesofPiInString = (str: string) => {
  let occurances = str.replace(/[^π]/g, '').length;
  return occurances;
};

const DecimalButton = (props: DecimalButtonProps) => {
  const { setValue } = props;
  const handleClick = () => {
    setValue((prev) => {
      const numericalAsString = prev.numerical?.toString() || '';
      const indexValue = numericalAsString.length;
      console.log('indexValue', indexValue);
      let updatedUserEnteredValue: UserEnteredValueType = {
        numerical: prev.numerical,
        variables: prev.variables,
        decimalPlaceIndex: indexValue,
      };
      return updatedUserEnteredValue;
    });
  };

  return <Wrapper onClick={handleClick}>.</Wrapper>;
};

const Wrapper = styled(Button)`
  font-size: 1rem;
  color: ${cl.getHSL(cl.white)};
  /* background-color: ${cl.getHSLA(cl.black, 0.2)}; */

  border: none;

  max-width: 55px;
  min-width: 55px;
  max-height: 55px;
  min-height: 55px;
  background-color: ${cl.getHSL(cl.gray_dark)};
  background: ${cl.getHSLA(cl.white, 0.1)};
  &:hover {
    cursor: pointer;
    background-color: ${cl.getHSL(cl.gray_mid)};
    color: ${cl.getHSL(cl.white)};
    border: none;
  }

  display: flex;

  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.gray_mid)};
      color: ${cl.getHSL(cl.white)};
      border: none;
    }
  }

  @media ${QUERIES.tabletAndUp} {
  }
`;

const PiWrapper = styled(Wrapper)`
  color: ${cl.getHSL(cl.purple)};
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.gray_mid)};
      color: ${cl.getHSLA(cl.white, 1)};
      border: none;
    }
  }
`;

export default DecimalButton;
