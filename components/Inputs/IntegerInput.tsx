import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import CheckButton from './CheckButton';
import { AnswerState } from './MultipleChoiceQuestion';
import NumberPad from './NumberPad';
import VariablePad, { Variable } from './VariablePad';

interface IntegerInputProps {
  answer: number;
  placeholder?: string;
  variables: Variable[];
}

export type UserEnteredValueType = {
  numerical: number | null;
  variables?: Variable[];
  decimalPlaceIndex: number | null;
};

const IntegerInput = (props: IntegerInputProps) => {
  const { answer, placeholder, variables } = props;
  console.log('variables', variables);
  const [userEnteredValue, setUserEnteredValue] =
    useState<UserEnteredValueType>({
      numerical: null,
      variables: variables || [],
      decimalPlaceIndex: null,
    });
  const [showNumberPad, setShowNumberPad] = useState(true);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const numericalToString = userEnteredValue.numerical?.toString() || '';

  let displayNumerical;

  if (userEnteredValue.decimalPlaceIndex) {
    displayNumerical =
      numericalToString.slice(0, userEnteredValue.decimalPlaceIndex) +
      '.' +
      numericalToString.slice(userEnteredValue.decimalPlaceIndex);
  } else {
    displayNumerical = numericalToString;
  }

  useEffect(() => {
    addEventListener('click', () => {});
  }, []);

  const integerInputRef = useRef<HTMLDivElement>(null);

  const handleFocusInputClick = (e: any) => {
    if (!integerInputRef.current) return;
    integerInputRef.current.focus();
  };

  const variableInputs =
    userEnteredValue.variables?.map((variable) => {
      return (
        <VariableInput
          key={variable.symbol}
          customcolor={variable.color || cl.getHSL(cl.purple)}
        >
          {variable.degree > 0 ? variable.symbol : ''}
          {
            <VariableExponent>
              {' '}
              {variable.degree !== 1 && variable.degree !== 0
                ? variable.degree
                : ''}{' '}
            </VariableExponent>
          }
        </VariableInput>
      );
    }) || [];

  return (
    <>
      <Wrapper>
        <EquationAndInputWrapper>
          <InputAndCheck>
            <InputWrapper>
              <IntInput
                tabIndex={0}
                ref={integerInputRef}
                onClick={(e) => handleFocusInputClick(e)}
              >
                {userEnteredValue.numerical === null && placeholder ? (
                  <PlaceholderSpan> {placeholder} </PlaceholderSpan>
                ) : null}
                {userEnteredValue?.numerical ? displayNumerical : ''}
                {/* <VariableInput>
                  {userEnteredValue.pi > 0 ? 'π' : ''}
                  {
                    <VariableExponent>
                      {' '}
                      {userEnteredValue.pi !== 1 && userEnteredValue.pi !== 0
                        ? userEnteredValue.pi
                        : ''}{' '}
                    </VariableExponent>
                  }
                </VariableInput> */}
                {variableInputs}
                <Units>u²</Units>
              </IntInput>
            </InputWrapper>
            <CheckButton userEnteredValue={userEnteredValue} answer={answer} />
          </InputAndCheck>
        </EquationAndInputWrapper>

        <ControlPad>
          <NumberPad
            userEnteredValue={userEnteredValue}
            setValue={setUserEnteredValue}
          />

          <VariablePad
            userEnteredValue={userEnteredValue}
            setValue={setUserEnteredValue}
          />
        </ControlPad>
      </Wrapper>
    </>
  );
};

const ControlPad = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: -12px;
  margin-left: -12px;
  margin-right: -12px;
  width: calc(100% + 24px);
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: auto;
`;

const PlaceholderSpan = styled.span`
  color: ${cl.getHSL(cl.gray_mid)};
`;

const InputAndCheck = styled.div`
  display: flex;
  overflow: hidden;
  max-width: max-content;
  min-width: fit-content;
  gap: 20px;

  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  color: ${cl.getHSL(cl.gray_dark)};
`;

const EquationAndInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: -12px;
`;

const Equation = styled.div`
  font-size: 1rem;
  display: inline;
  min-width: fit-content;
`;

const IntInput = styled.div`
  height: 55px;

  font-size: 1.5rem;
  padding-left: 10px;
  min-width: 175px;
  width: fit-content;
  max-width: 100% !important;
  overflow: auto;
  align-items: baseline;
  border-bottom: 2px solid ${cl.getHSL(cl.gray_dark)};

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

const VariableInput = styled.div<{ customcolor: string }>`
  padding-left: 2px;
  display: flex;
  align-items: baseline;
  color: ${(p) => p.customcolor};
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
  color: ${cl.getHSLA(cl.gray_mid, 0.7)};
`;

export default IntegerInput;
