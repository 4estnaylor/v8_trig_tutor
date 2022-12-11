import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import { UserEnteredValueType } from './IntegerInput';

interface VariableButtonProps {
  symbol: string;
  value: UserEnteredValueType;

  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const VariableButton = (props: VariableButtonProps) => {
  const { symbol, value, setValue } = props;

  const handleClick = () => {
    setValue((prev) => {
      let updatedValue: UserEnteredValueType = {
        numerical: prev.numerical,
        pi: prev.pi + 1,
      };

      return updatedValue;
    });
  };
  return (
    <Wrapper onClick={handleClick}>
      {symbol}
      <ExponentWrapper>+</ExponentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  font-size: 1rem;
  color: ${cl.getHSL(cl.purple)};
  /* background-color: ${cl.getHSLA(cl.black, 0.2)}; */

  border-radius: 0px;
  max-width: 50px;

  display: flex;

  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      cursor: pointer;
      background-color: ${cl.getHSL(cl.purple)};
      color: ${cl.getHSL(cl.white)};
      border: none;
    }
  }

  @media ${QUERIES.tabletAndUp} {
    border-radius: 4px;
    border: 2px solid ${cl.getHSLA(cl.purple, 0.5)};
  }
`;

const ExponentWrapper = styled.div`
  position: absolute;
  font-size: 0.75rem;
  right: 4px;
  top: 5px;
  font-weight: 800;
`;

export default VariableButton;
