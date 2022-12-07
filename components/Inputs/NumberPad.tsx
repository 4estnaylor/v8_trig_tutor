import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import NumberButton from './NumberButton';

interface NumberPadProps {
  setValue: Dispatch<SetStateAction<string>>;
}

const NumberPad = (props: NumberPadProps) => {
  const { setValue } = props;

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'π', 'τ'];

  const numberButtons = numbers.map((number) => {
    return <NumberButton key={number} value={number} setValue={setValue} />;
  });

  return <Wrapper>{numberButtons} </Wrapper>;
};

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 50px 50px;

  width: 100vw;
  margin-left: -5px;
  max-width: 700px;

  background-color: ${cl.getHSLA(cl.black, 0.2)};
  top: 0;
  transform: translateY(60px);
  backdrop-filter: blur(30px);
`;

export default NumberPad;
