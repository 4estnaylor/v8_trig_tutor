import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import DeleteButton from './DeleteButton';
import DeletePiButton from './DeletePiButton';
import { UserEnteredValueType } from './IntegerInputWithPi';
import NumberButton from './NumberButton';
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
      {numberButtons}
      <VariableButton symbol="π" value={userEnteredValue} setValue={setValue} />

      <DeletePiButton setValue={setValue} />
      <DeleteButton setValue={setValue} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: 50px 50px;
  gap: 0px 0px;
  @media ${QUERIES.tabletAndUp} {
    gap: 8px 8px;
  }
  padding-left: 5px;
  padding-right: 5px;

  width: 100vw;
  margin-left: -5px;
  max-width: 600px;

  /* background: linear-gradient(
    -30deg,
    ${cl.getHSLA(cl.purple, 0.2)},
    ${cl.getHSLA(cl.black, 0.5)}
  ); */
  /* background-color: ${cl.getHSLA(cl.black, 0.4)}; */

  backdrop-filter: blur(30px);
`;

export default NumberPad;
