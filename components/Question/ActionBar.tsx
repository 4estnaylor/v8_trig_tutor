import React from 'react';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';
import styled from 'styled-components';
import CheckButton from './CheckButton';
import CheckIcon from './CheckIcon';
import Hint from './Hint';
import cl from '../../colors';

const correctGradient = `radial-gradient(circle at right, 
  ${cl.getHSL(cl.green)},
  ${cl.getHSL(cl.green)},
  ${cl.getHSLA(cl.blue, 1)})
   `;

const incorrectGradient = `radial-gradient(circle at right, 
  ${cl.getHSLA(cl.red, 0.0)},
  ${cl.getHSLA(cl.red, 1)})
  
`;

type ActionBarProps = {
  answerState: AnswerState;
  handleCheck: () => void;
  userAnswer: number | string | null;
  hint?: JSX.Element | string;
  videoLink?: string;
  checkButtonOff?: boolean;
  children?: JSX.Element;
};
const ActionBar = (props: ActionBarProps) => {
  const {
    answerState,
    handleCheck,
    userAnswer,
    hint,
    children,
    checkButtonOff,
  } = props;
  return (
    <Wrapper answerState={answerState}>
      {hint ? <Hint hint={hint} answerState={answerState} /> : null}
      {children}
      {answerState !== 'correct' && !checkButtonOff ? (
        <CheckButton
          onClick={handleCheck}
          answerState={answerState}
          userAnswer={userAnswer}
        />
      ) : (
        <CheckIcon />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ answerState: AnswerState }>`
  /* width: 100%; */
  display: flex;
  padding-top: 10px;
  align-items: center;
  margin: -15px;
  margin-top: 0px;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;

  background: ${(p) => {
    if (p.answerState === 'correct') {
      return correctGradient;
    }
    if (p.answerState === 'incorrect') {
      return incorrectGradient;
    }
  }};
`;

export default ActionBar;
