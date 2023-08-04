import React from 'react';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';
import styled from 'styled-components';
import CheckButton from './CheckButton';
import CheckIcon from './CheckIcon';
import Hint from './Hint';

type ActionBarProps = {
  answerState: AnswerState;
  handleCheck: () => void;
  userAnswer: number | null;
  hint: JSX.Element;
};
const ActionBar = (props: ActionBarProps) => {
  const { answerState, handleCheck, userAnswer, hint } = props;
  return (
    <Wrapper answerState={answerState}>
      {hint ? <Hint hint={hint} /> : null}
      {answerState !== 'correct' ? (
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
  width: 100%;
  display: flex;
  padding-top: 10px;
`;

export default ActionBar;
