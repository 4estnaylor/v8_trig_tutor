import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInput';

interface NumberButtonProps {
  value: number;

  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const countOcurrancesofPiInString = (str: string) => {
  let occurances = str.replace(/[^π]/g, '').length;
  return occurances;
};

const NumberButton = (props: NumberButtonProps) => {
  const { value, setValue } = props;
  const handleClick = () => {
    setValue((prev) => {
      let updatedUserEnteredValue: UserEnteredValueType = {
        numerical: prev.numerical
          ? Number(prev.numerical.toString() + value)
          : value,
        pi: prev.pi,
        variables: prev.variables,
      };
      return updatedUserEnteredValue;
    });
  };

  return (
    <Wrapper
      onClick={handleClick}
      variant="contained"
      color="gray"
      size="small"
    >
      {value}
    </Wrapper>
  );
};

const Wrapper = styled(Button)`
  font-size: 1.25rem;
  color: ${cl.getHSL(cl.white)};
  /* background-color: ${cl.getHSLA(cl.black, 0.2)}; */

  border: none;
  max-width: 60px;
  max-height: 60px;

  display: flex;

  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    /* &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.gray_mid)};
      color: ${cl.getHSL(cl.white)};
      border: none;
    } */
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
    }
  }
`;

export default NumberButton;
