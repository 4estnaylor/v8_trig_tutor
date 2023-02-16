import { Shuffle } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import useTrigUser from '../../utils/hooks/useTrigUser';
import MultipleChoiceOption from './MultipleChoiceOption';

type Option = string | JSX.Element | React.ReactElement;

interface MultipleChoiceQuestionProps {
  question: string;
  incorrectOptions: (string | JSX.Element | React.ReactElement)[];
  correctOptions: (string | JSX.Element | React.ReactElement)[];
  answerState: AnswerState;
  setAnswerState: React.Dispatch<React.SetStateAction<AnswerState>>;
  questionId: string;
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
  const {
    question,
    incorrectOptions,
    correctOptions,
    answerState,
    setAnswerState,
    questionId,
  } = props;

  // const shuffledOptions = shuffle([...incorrectOptions, ...correctOptions]);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const trigUser = useTrigUser();

  const correctSymbol = <CorrectSymbol> ✓ </CorrectSymbol>;

  const checkAnswer = async () => {
    const selectedOptions = selectedValues.map((selectedValue) => {
      return shuffledOptions[selectedValue];
    });

    if (selectedValues.length !== correctOptions.length) {
      setAnswerState('invalid amount of answers');
      console.log('invalid amoutn of answers');
      return;
    }

    // const allUserAnswersCorrect = selectedOptions.every((option) =>
    //   correctOptions.includes(option)
    // );
    const allAnswersInUserAnswers = correctOptions.every((answer) =>
      selectedOptions.includes(answer)
    );

    if (allAnswersInUserAnswers && allAnswersInUserAnswers) {
      setAnswerState('correct');
      //trigUserId, questionId, answerState, attemptIncrement

      const bodyForQuestionUpsert = {
        trigUserId: trigUser.id,
        questionId: questionId,
        answerState: 'correct',
        attemptIncrement: 1,
      };

      const response = await fetch('/api/db/updateAnswerObject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyForQuestionUpsert),
      });

      const responseJSON = await response.json();

      console.log('response JSON', responseJSON);

      console.log(bodyForQuestionUpsert);

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
        questionAnswerState={answerState}
        correctOptions={correctOptions}
      />
    );
  });

  return (
    <Wrapper>
      <TopPart>
        <Header>
          Question{' '}
          {answerState === 'correct' ? (
            correctSymbol
          ) : (
            <CheckButtonWrapper>
              <CheckButton
                variant="contained"
                onClick={checkAnswer}
                sx={{
                  color: `${cl.getHSL(cl.white)}`,
                  fontWeight: '800',
                  background: `linear-gradient(15deg, ${cl.getHSL(
                    cl.red_light
                  )}, ${cl.getHSL(cl.purple)}, ${cl.getHSL(cl.blue_light)})`,
                  backgroundSize: '200%',
                }}
              >
                Check
              </CheckButton>
            </CheckButtonWrapper>
          )}
        </Header>
        <Question> {question} </Question>
        <ChooseXOfY isHighlighted={answerState === 'invalid amount of answers'}>
          {'('}choose {correctOptions.length} of the {shuffledOptions.length}{' '}
          options{')'}
        </ChooseXOfY>
      </TopPart>
      <BottomPart>
        <Options>{options}</Options>
      </BottomPart>
    </Wrapper>
  );
};

const TopPart = styled.div`
  background: linear-gradient(
    160deg,
    ${cl.getHSLA(cl.purple_dark, 1)},
    ${cl.getHSLA(cl.black, 1)}
  );
  padding: 15px;
`;

const BottomPart = styled.div`
  /* background: linear-gradient(
    160deg,
    ${cl.getHSLA(cl.purple_dark, 0.7)},
    ${cl.getHSLA(cl.purple_dark, 1)} 80%,
    ${cl.getHSLA(cl.red, 1)}
  ); */
  background: transparent;
  background-size: 200%;
  padding: 15px;
`;

const Wrapper = styled.div`
  box-shadow: 0px 0px 4px ${cl.getHSLA(cl.black, 0.5)};
  color: ${cl.getHSL(cl.gray_dark)};

  max-width: 500px;
  margin: 5px;

  margin-top: 30px;
  margin-bottom: 30px;

  @media ${QUERIES.tabletAndUp} {
    margin: 0px;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  border-radius: 8px;
  overflow: hidden;
`;

const Header = styled.h2`
  color: ${cl.getHSL(cl.white)};

  display: flex;

  position: relative;
  height: 50px;
  align-items: center;
`;

const Question = styled.div`
  font-size: 1.25rem;
  color: ${cl.getHSL(cl.white)};
`;

const CorrectSymbol = styled.div`
  height: 70px;
  width: 70px;
  font-size: 2.5rem;
  position: absolute;
  right: 0;
  box-shadow: 1px 1px 2px ${cl.getHSL(cl.black)};

  color: ${cl.getHSL(cl.white)};
  background: linear-gradient(
    15deg,
    ${cl.getHSL(cl.purple_bright)},
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.blue)}
  );
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckButtonWrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  bottom: 10;
`;

const CheckButton = styled(Button)``;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ChooseXOfY = styled.div<{ isHighlighted: boolean }>`
  padding: 15px;
  margin-top: 5px;
  width: fit-content;
  font-size: 0.75rem;
  background-color: ${(p) =>
    p.isHighlighted ? cl.getHSL(cl.red) : 'transparent'};
  color: ${(p) =>
    p.isHighlighted ? cl.getHSL(cl.white) : cl.getHSL(cl.white)};
  border-radius: 8px;
`;

export default MultipleChoiceQuestion;
