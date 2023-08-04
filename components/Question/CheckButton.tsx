import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';

type CheckButtonProps = {
  onClick: () => void;
  answerState: AnswerState;
  userAnswer: any | null;
};

const CheckButton = (props: CheckButtonProps) => {
  const { onClick, answerState, userAnswer } = props;

  const display = 'none';
  let isVisible = true;
  if (userAnswer === null || '') {
    isVisible = false;
  }

  return (
    <Wrapper
      variant="outlined"
      onClick={() => {
        console.log('heyo');
        onClick();
      }}
      answerState={answerState}
      isVisible={isVisible}
    >
      Check
      {/* {answerState === 'incorrect' ? 'Check Again' : 'Check'} */}
    </Wrapper>
  );
};

const Wrapper = styled(Button)<{
  answerState: AnswerState;
  isVisible: boolean;
}>`
  display: inline-block;
  display: ${(p) => (p.answerState === 'correct' ? 'none' : 'inline-block')};
  opacity: ${(p) => (p.isVisible ? 1 : 0.3)};
  height: 50px;

  margin-left: auto;
  align-self: flex-end;
`;

export default CheckButton;
