import { Shuffle } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

const MultipleChoiceQuestion = (props: MultipleChoiceQuestionProps) => {
  const { question, incorrectOptions, correctOptions } = props;
  // const shuffledOptions = shuffle([...incorrectOptions, ...correctOptions]);
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  const [selectedValues, setSelectedValues] = useState<number[]>([]);

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
      <ChooseXOfY>
        {'('}choose {correctOptions.length} of the {shuffledOptions.length}{' '}
        options{')'}
      </ChooseXOfY>
      <Options>{options}</Options>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Header = styled.h2``;

const Question = styled.div`
  font-size: 1.25rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 15px;
  padding-top: 15px;
  padding-right: 5px;
`;

const ChooseXOfY = styled.div`
  padding: 5px;
  font-size: 0.75rem;
`;

export default MultipleChoiceQuestion;
