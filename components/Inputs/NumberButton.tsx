import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';

interface NumberButtonProps {
  value: number | string;

  setValue: Dispatch<SetStateAction<string>>;
}

const NumberButton = (props: NumberButtonProps) => {
  const { value, setValue } = props;
  console.log('setvalue', setValue);
  const handleClick = () => {
    setValue((prev) => prev + value);
  };

  console.log(props, value);
  return <Wrapper onClick={handleClick}>{value}</Wrapper>;
};

const Wrapper = styled.div`
  font-size: 1.5rem;
  color: ${cl.getHSL(cl.white)};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: ${cl.getHSLA(cl.white, 0.2)};
  }
`;

export default NumberButton;
