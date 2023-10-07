import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import CheckButton from './CheckButton';
import MultipleChoiceQuestion, { AnswerState } from './MultipleChoiceQuestion';
import NumberPad from './NumberPad';
import VariablePad, { Variable } from './VariablePad';

import TheatersIcon from '@mui/icons-material/Theaters';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Alert, Button, Typography } from '@mui/material';
import Hint from './Hint';
import WrittenExample from './WrittenExample';
import Gap from '../Gaps/Gap';

interface IntegerInputProps {
  answer: number;
  placeholder?: string;
  variables: Variable[];
  answerState: AnswerState;
  setAnswerState: React.Dispatch<React.SetStateAction<AnswerState>>;
}

export type UserEnteredValueType = {
  numerical: number | null;
  variables?: Variable[];
  decimalPlaceIndex: number | null;
};

const IntegerInput = (props: IntegerInputProps) => {
  const { answer, placeholder, variables, answerState, setAnswerState } = props;
  console.log('variables', variables);
  const [helpBarVisible, setHelpBarVisible] = useState(false);
  const [userEnteredValue, setUserEnteredValue] =
    useState<UserEnteredValueType>({
      numerical: null,
      variables: variables || [],
      decimalPlaceIndex: null,
    });
  const [showNumberPad, setShowNumberPad] = useState(true);
  // const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
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

  useEffect(() => {
    if (answerState === 'correct') {
      setHelpBarVisible(true);
    }
  }, [answerState]);

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
            {answerState === 'correct' ? (
              <CorrectSymbol> ✓ </CorrectSymbol>
            ) : (
              <CheckButton
                userEnteredValue={userEnteredValue}
                answer={answer}
                answerState={answerState}
                setAnswerState={setAnswerState}
              />
            )}
          </InputAndCheck>
        </EquationAndInputWrapper>

        <ControlPad $isvisible={answerState !== 'correct'}>
          <NumberPad
            userEnteredValue={userEnteredValue}
            setValue={setUserEnteredValue}
          />

          <VariablePad
            userEnteredValue={userEnteredValue}
            setValue={setUserEnteredValue}
          />
        </ControlPad>
        {answerState === 'incorrect' || helpBarVisible ? (
          <HelpBar>
            <Hint
              answerState={answerState}
              hint={
                <>
                  <P>The area of a circle can be found with the equation: </P>
                  <img
                    src="/AreaOfCircleEqn.svg"
                    width={100}
                    height={100}
                    style={{ margin: 'auto' }}
                  />
                  <P>where r is the radius of the circle</P>
                </>
              }
            />
            {/* <WrittenExample
              writtenExample={
                <>
                  <P> We will use the following equation:</P>
                  <img
                    src="/AreaOfCircleEqn.svg"
                    width={100}
                    height={100}
                    style={{ margin: 'auto' }}
                  />
                  <P> consider the following circle:</P>
                  <img
                    src="/AreaOfCircleWrittenExample.svg"
                    width={200}
                    height={200}
                  />
                  <P> </P>
                  <MultipleChoiceQuestion
                    question={'What is the value of r, the radius?'}
                    incorrectOptions={['8', '11']}
                    correctOptions={['4']}
                  />
                  <Gap height={20} />
                  <P>
                    Once we have the value of the radius, we just need to
                    replace r with its value in our equation.
                  </P>
                  <Gap height={20} />
                  <MultipleChoiceQuestion
                    question={
                      'Which of the following equations will find us the answer?'
                    }
                    correctOptions={[
                      <img src="/AIsPiRSquared.svg" width={100} height={50} />,
                    ]}
                    incorrectOptions={['incorrect1', 'incorrect2']}
                  />
                </>
              }
            /> */}

            <HelpBarIcon variant="outlined">
              <TheatersIcon color="primary" />
            </HelpBarIcon>
          </HelpBar>
        ) : (
          <HelpButton
            onClick={() => {
              setHelpBarVisible(true);
            }}
          >
            {' '}
            help?{' '}
          </HelpButton>
        )}
      </Wrapper>
    </>
  );
};

const P = styled.div`
  padding: 5px;
`;

const ControlPad = styled.div<{ $isvisible: boolean }>`
  display: ${(p) => (p.$isvisible ? 'flex' : 'none')};
  gap: 20px;
  margin-bottom: -12px;
  width: calc(100% + 24px);
`;

const HelpBarIcon = styled(Button)`
  min-width: 55px;
  min-height: 55px;
  max-width: 55px;
  max-height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: auto;
`;

const HelpButton = styled(Button)`
  min-width: 55px;
  min-height: 55px;
  max-width: 55px;
  max-height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const HelpBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 55px);
  grid-template-rows: 55px;
  gap: 5px 5px;
  padding-top: 15px;
`;

const CorrectSymbol = styled.div`
  height: 55px;
  width: 55px;
  position: absolute;
  right: 15px;
  bottom: -10px;

  font-size: 2rem;
  margin: auto;
  margin-top: 13.25px;
  margin-bottom: 13.25px;
  color: ${cl.getHSL(cl.white)};
  background: linear-gradient(
    0deg,
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.blue)}
  );
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  transition: all 0.5s linear;
`;

const Wrapper = styled.div`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  color: ${cl.getHSL(cl.gray_dark)};
  position: relative;
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
  border-radius: 4px;

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
