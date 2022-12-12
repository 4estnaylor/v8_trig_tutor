import { Shuffle } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import MultipleChoiceOption from './MultipleChoiceOption';

interface MultipleChoiceQuestionProps {
  question: string;
  incorrectOptions: string[];
  correctOptions: string[];
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export type AnswerState =
  | 'unanswered'
  | 'correct'
  | 'incorrect'
  | 'invalid amount of answers';

const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
  const { question, incorrectOptions, correctOptions } = props;
  // const shuffledOptions = shuffle([...incorrectOptions, ...correctOptions]);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');

  const correctSymbol = <CorrectSymbol> ✓ </CorrectSymbol>;

  const checkAnswer = () => {
    const selectedOptions = selectedValues.map((selectedValue) => {
      return shuffledOptions[selectedValue];
    });

    if (selectedValues.length !== correctOptions.length) {
      setAnswerState('invalid amount of answers');
      console.log('invalid amoutn of answers');
      return;
    }

    const allUserAnswersCorrect = selectedOptions.every((option) =>
      correctOptions.includes(option)
    );
    const allAnswersInUserAnswers = correctOptions.every((answer) =>
      selectedOptions.includes(answer)
    );

    if (allAnswersInUserAnswers && allAnswersInUserAnswers) {
      setAnswerState('correct');
      console.log('correct!');
      return;
    } else {
      setAnswerState('incorrect');
      console.log('incorrect');
      return;
    }
  };

  useEffect(() => {
    setShuffledOptions(shuffle([...incorrectOptions, ...correctOptions]));
  }, []);

  const options = shuffledOptions.map((option, index) => {
    return (
      <MultipleChoiceOption
        option={option}
        radioKey={index}
        key={index}
        setSelectedValues={setSelectedValues}
        selectedValues={selectedValues}
      />
    );
  });

  return (
    <Wrapper>
      <Header>Question</Header>
      <Question> {question} </Question>
      <ChooseXOfY isHighlighted={answerState === 'invalid amount of answers'}>
        {'('}choose {correctOptions.length} of the {shuffledOptions.length}{' '}
        options{')'}
      </ChooseXOfY>
      <Options>{options}</Options>
      {answerState === 'correct' ? (
        correctSymbol
      ) : (
        <CheckButtonWrapper>
          <CheckButton variant="outlined" onClick={checkAnswer}>
            Check
          </CheckButton>
        </CheckButtonWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* background-color: ${cl.getHSLA(cl.black, 0.5)}; */
  box-shadow: 0px 0px 4px ${cl.getHSLA(cl.black, 0.5)};
  color: ${cl.getHSL(cl.gray_dark)};

  margin: 2px;

  @media ${QUERIES.tabletAndUp} {
    margin: 10px;
  }

  padding: 20px;
  border-radius: 8px;
`;

const Header = styled.h2``;

const Question = styled.div`
  font-size: 1.25rem;
`;

const CorrectSymbol = styled.div`
  height: 50px;
  width: 50px;
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

const CheckButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const CheckButton = styled(Button)``;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 15px;
  padding-top: 15px;
  padding-right: 5px;
`;

const ChooseXOfY = styled.div<{ isHighlighted: boolean }>`
  padding: 15px;
  margin-top: 5px;
  width: fit-content;
  font-size: 0.75rem;
  background-color: ${(p) =>
    p.isHighlighted ? cl.getHSL(cl.red) : 'transparent'};
  color: ${(p) =>
    p.isHighlighted ? cl.getHSL(cl.white) : cl.getHSL(cl.gray_mid)};
  border-radius: 8px;
`;

export default MultipleChoiceQuestion;
