import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import cl from '../../colors';

const IntegerInputWithPi = () => {
  const [userEnteredValue, setUserEnteredValue] = useState('test');

  useEffect(() => {
    addEventListener('click', () => {
      console.log('test');
      console.log(document.activeElement);
    });
  }, []);

  const integerInputRef = useRef<HTMLDivElement>(null);

  const handleFocusInputClick = (e: any) => {
    if (!integerInputRef.current) return;
    integerInputRef.current.focus();
  };

  return (
    <Wrapper>
      <Equation>Area = </Equation>
      <InputWrapper>
        <Units>u²</Units>
        <IntegerInput
          tabIndex={0}
          ref={integerInputRef}
          onClick={(e) => handleFocusInputClick(e)}
        >
          {userEnteredValue}
        </IntegerInput>
      </InputWrapper>
      <input type="number" />
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

const IntegerInput = styled.div`
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

  &:hover {
    cursor: text;
    box-shadow: 1px 1px 5px ${cl.getHSL(cl.gray_mid)};
  }

  &:focus {
    box-shadow: 1px 1px 5px ${cl.getHSL(cl.purple)};
  }
`;

const Units = styled(Equation)`
  position: absolute;
  color: ${cl.getHSL(cl.blue)};
  right: 20px;
`;

export default IntegerInputWithPi;
