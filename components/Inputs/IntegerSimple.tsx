import React, { useState } from 'react';
import { Variable } from './VariablePad';
import { AnswerState } from './MultipleChoiceQuestion';
import styled from 'styled-components';
import TopPart from '../Question/TopPart';
import QuestionWrapper from '../Question/QuestionWrapper';
import QuestionDisplay from '../Question/QuestionDisplay';
import BottomPart from '../Question/BottomPart';
import { Input } from '@mui/icons-material';
import { TextField } from '@mui/material';
import CheckButton from '../Question/CheckButton';
import ActionBar from '../Question/ActionBar';

interface IntegerAnswerQuestionProps {
  question: string;
  answer: number;
  decimalPlaceIndex: number | null;
  variables?: Variable[];
  diagram?: JSX.Element;
  answerState: AnswerState;
  setAnswerState: React.Dispatch<React.SetStateAction<AnswerState>>;
  hint?: JSX.Element;
}

const IntegerSimple = (props: IntegerAnswerQuestionProps) => {
  const {
    question,
    answer,
    decimalPlaceIndex,
    variables,
    diagram,
    answerState,
    setAnswerState,
    hint,
  } = props;
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let userInput = e.target.value;

    let userInputNum = Number(userInput);
    if (isNaN(Number(userInput) as any)) {
      setUserAnswer(null);
    } else if (userInput === '') {
      setUserAnswer(null);
    } else {
      setUserAnswer(userInputNum);
    }
  };

  const handleCheck = () => {
    console.log('checking');
    if (userAnswer === answer) {
      setAnswerState('correct');
    } else {
      setAnswerState('incorrect');
    }
  };

  return (
    <QuestionWrapper>
      <>
        <TopPart>
          <QuestionDisplay>{question}</QuestionDisplay>
        </TopPart>
        <BottomPart>
          <>
            <SpinnerLessTextField
              type="number"
              value={userAnswer}
              onChange={handleChange}
              variant="standard"
              label="your answer"
              sx={{ width: '100px', fontSize: '1.25rem' }}
            />
            <ActionBar
              answerState={answerState}
              handleCheck={handleCheck}
              userAnswer={userAnswer}
              hint={hint}
            />
            {/* <BottomBar answerState = {answerState}>
              <CheckButton onClick={handleCheck} />
            </BottomBar> */}
          </>
        </BottomPart>
      </>
    </QuestionWrapper>
  );
};

const BottomBar = styled.div<{ answerState: AnswerState }>`
  width: 100%;
  display: flex;
`;

const SpinnerLessTextField = styled(TextField)`
  & > .mui-number-field {
    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default IntegerSimple;
