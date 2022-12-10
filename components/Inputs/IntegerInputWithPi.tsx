import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import CheckButton from './CheckButton';
import NumberPad from './NumberPad';

interface IntegerInputWithPiProps {
  answer: number;
  placeholder?: string;
}

export type UserEnteredValueType = {
  numerical: number | null;
  pi: number;
};

const IntegerInputWithPi = (props: IntegerInputWithPiProps) => {
  const { answer, placeholder } = props;
  const [userEnteredValue, setUserEnteredValue] =
    useState<UserEnteredValueType>({
      numerical: null,
      pi: 0,
    });
  const [showNumberPad, setShowNumberPad] = useState(true);

  useEffect(() => {
    addEventListener('click', () => {});
  }, []);

  const integerInputRef = useRef<HTMLDivElement>(null);

  const handleFocusInputClick = (e: any) => {
    if (!integerInputRef.current) return;
    integerInputRef.current.focus();
  };

  return (
    <>
      <Wrapper>
        <EquationAndInputWrapper>
          <Equation>Area = </Equation>
          <InputAndCheck>
            <InputWrapper>
              <IntegerInput
                tabIndex={0}
                ref={integerInputRef}
                onClick={(e) => handleFocusInputClick(e)}
              >
                {userEnteredValue.numerical === null &&
                userEnteredValue.pi === 0 &&
                placeholder ? (
                  <PlaceholderSpan> {placeholder} </PlaceholderSpan>
                ) : null}
                {userEnteredValue?.numerical
                  ? userEnteredValue.numerical.toString()
                  : ''}
                <VariableInput>
                  {userEnteredValue.pi > 0 ? 'π' : ''}
                  {
                    <VariableExponent>
                      {' '}
                      {userEnteredValue.pi !== 1 && userEnteredValue.pi !== 0
                        ? userEnteredValue.pi
                        : ''}{' '}
                    </VariableExponent>
                  }
                </VariableInput>
                <Units>u²</Units>
              </IntegerInput>
            </InputWrapper>
            <CheckButton userEnteredValue={userEnteredValue} answer={answer} />
          </InputAndCheck>
        </EquationAndInputWrapper>

        {showNumberPad ? (
          <NumberPad
            userEnteredValue={userEnteredValue}
            setValue={setUserEnteredValue}
          />
        ) : null}
      </Wrapper>
    </>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: auto;
  border-radius: 4px;
`;

const PlaceholderSpan = styled.span`
  color: ${cl.getHSL(cl.gray_mid)};
`;

const InputAndCheck = styled.div`
  display: flex;
  overflow: hidden;
  max-width: max-content;
  min-width: fit-content;

  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 350px;
  gap: 10px;
  color: ${cl.getHSL(cl.gray_dark)};
`;

const EquationAndInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Equation = styled.div`
  font-size: 1rem;
  display: inline;
  min-width: fit-content;
`;

const IntegerInput = styled.div`
  height: 50px;

  font-size: 1.25rem;
  padding-left: 10px;
  min-width: 100px;
  width: fit-content;
  max-width: 100% !important;
  overflow: auto;
  align-items: baseline;

  /* overflow-x: scroll; */
  flex: 1;

  /* border: 1px solid ${cl.getHSLA(cl.black, 0.2)}; */
  background-color: ${cl.getHSL(cl.white)};
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

const VariableInput = styled.div`
  padding-left: 2px;
  display: flex;
  align-items: baseline;
  color: ${cl.getHSL(cl.purple)};
`;

const VariableExponent = styled.div`
  color: ${cl.getHSL(cl.gray_mid)};
  font-size: 0.65rem;
  height: 100%;
  display: flex;
  align-self: flex-start;
`;

const Units = styled(Equation)`
  padding-left: 5px;
  padding-right: 10px;
  color: ${cl.getHSL(cl.blue)};
`;

export default IntegerInputWithPi;
