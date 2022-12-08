import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInputWithPi';

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
      };
      return updatedUserEnteredValue;
    });
  };

  return <Wrapper onClick={handleClick}>{value}</Wrapper>;
};

const Wrapper = styled.div`
  font-size: 1rem;
  color: ${cl.getHSL(cl.gray_mid)};
  /* background-color: ${cl.getHSLA(cl.black, 0.2)}; */

  border: none;
  border-radius: 0px;
  max-width: 50px;

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
    border-radius: 4px;
    border: 2px solid ${cl.getHSLA(cl.gray_mid, 0.5)};
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

export default NumberButton;
