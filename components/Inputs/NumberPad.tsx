import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import DecimalButton from './DecimalButton';
import DeleteButton from './DeleteButton';
import DeletePiButton from './DeletePiButton';
import { UserEnteredValueType } from './IntegerInput';
import NumberButton from './NumberButton';
import ReducePiButton from './ReducePiButton';
import VariableButton from './VariableButton';

interface NumberPadProps {
  userEnteredValue: UserEnteredValueType;
  setValue: Dispatch<SetStateAction<UserEnteredValueType>>;
}

const NumberPad = (props: NumberPadProps) => {
  const { userEnteredValue, setValue } = props;

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const numberButtons = numbers.map((number) => {
    return <NumberButton key={number} value={number} setValue={setValue} />;
  });

  return (
    <Wrapper>
      <NumberButton value={1} setValue={setValue} />
      <NumberButton value={2} setValue={setValue} />
      <NumberButton value={3} setValue={setValue} />
      <NumberButton value={4} setValue={setValue} />
      <NumberButton value={5} setValue={setValue} />
      <NumberButton value={6} setValue={setValue} />
      <NumberButton value={7} setValue={setValue} />
      <NumberButton value={8} setValue={setValue} />
      <NumberButton value={9} setValue={setValue} />
      <DecimalButton setValue={setValue} />
      <NumberButton value={0} setValue={setValue} />
      <DeleteButton setValue={setValue} />

      {/* {numberButtons} */}
      {/* <VariableButton symbol="π" value={userEnteredValue} setValue={setValue} />
      <ReducePiButton setValue={setValue} />

      <DeletePiButton setValue={setValue} />
      <DeleteButton setValue={setValue} /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${cl.getHSLA(cl.black, 0.3)};
  border-radius: 8px;
  overflow: hidden;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(4, 50px);
  grid-template-rows: 50px 50px;
  gap: 0px 0px;
  @media ${QUERIES.tabletAndUp} {
  }

  /* background: linear-gradient(
    -30deg,
    ${cl.getHSLA(cl.purple, 0.2)},
    ${cl.getHSLA(cl.black, 0.5)}
  ); */
  /* background-color: ${cl.getHSLA(cl.black, 0.4)}; */

  backdrop-filter: blur(30px);
`;

export default NumberPad;
