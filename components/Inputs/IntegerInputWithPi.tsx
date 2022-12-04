import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';

const IntegerInputWithPi = () => {
  return (
    <Wrapper>
      <Equation>Area = </Equation>
      <InputWrapper>
        <Units>u²</Units>
        <IntegerInput>49</IntegerInput>
      </InputWrapper>
    </Wrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  padding-top: 20px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Equation = styled.div`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const IntegerInput = styled.span`
  height: 50px;
  font-size: 1.5rem;
  padding-left: 10px;
  min-width: 100px;
  width: fit-content;
  flex: 1;
  border-radius: 4px;
  border: 1px solid ${cl.getHSLA(cl.black, 0.2)};
  display: flex;
  align-items: center;
`;

const Units = styled(Equation)`
  position: absolute;
  color: ${cl.getHSL(cl.blue)};
  right: 20px;
`;

export default IntegerInputWithPi;
