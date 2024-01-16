import React from 'react';
import styled from 'styled-components';
import AngleInput from './AngleInput';
import cl from '../../colors';
import UnitSelections from './UnitSelections';

const InputBarForAngleCircle = () => {
  return (
    <Wrapper>
      <AngleInput />
      <UnitSelections />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: black;
  height: 80px;
  border-radius: 16px 16px 0px 0px;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0px 0px 16px ${cl.getHSL(cl.gray_light)};
  overflow-x: hidden;
`;

export default InputBarForAngleCircle;
