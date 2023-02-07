import React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import cl from '../../colors';
import { AnswerState } from './MultipleChoiceQuestion';

interface MultipleChoiceOptionProps {
  radioKey: number;
  option: string;
  setSelectedValues: React.Dispatch<React.SetStateAction<number[]>>;
  selectedValues: number[];
  questionAnswerState: AnswerState;
  correctOptions: (string | JSX.Element | React.ReactElement)[];
}

const MultipleChoiceOption = (props: MultipleChoiceOptionProps) => {
  const {
    radioKey,
    option,
    setSelectedValues,
    selectedValues,
    questionAnswerState,
    correctOptions,
  } = props;

  const displayAsCorrect =
    correctOptions.includes(option) && questionAnswerState === 'correct';

  const handleRadioClick = () => {
    if (questionAnswerState === 'correct') return;
    setSelectedValues((prev) => {
      if (prev.includes(radioKey)) {
        let newArray = prev.filter((value) => value !== radioKey);
        console.log('deleted', newArray);
        return newArray;
      } else {
        let newArray = [...prev, radioKey];
        console.log('added', newArray);
        return newArray;
      }
    });
  };

  return (
    <Wrapper
      onClick={handleRadioClick}
      selected={selectedValues.includes(radioKey)}
      answerstate={questionAnswerState}
      displayAsCorrect={displayAsCorrect}
    >
      <RadioCheckContainer displayAsCorrect={displayAsCorrect}>
        <MyRadio
          value={radioKey}
          checked={selectedValues.includes(radioKey)}
          sx={{
            color: cl.getHSL(cl.white),
            '&.Mui-checked': {
              color: cl.getHSL(cl.white),
            },
          }}
          answerstate={questionAnswerState}
        />
        <MiniCheckMarkBackgroundCircle displayAsCorrect={displayAsCorrect}>
          <MiniCheckMark displayAsCorrect={displayAsCorrect}>✓</MiniCheckMark>
        </MiniCheckMarkBackgroundCircle>
      </RadioCheckContainer>
      <OptionWrapper
        selected={selectedValues.includes(radioKey)}
        displayAsCorrect={displayAsCorrect}
      >
        {option}
      </OptionWrapper>
    </Wrapper>
  );
};

const RadioCheckContainer = styled.div<{ displayAsCorrect: boolean }>`
  position: relative;
  /* background-color: ${(p) =>
    p.displayAsCorrect ? cl.getHSL(cl.white) : null}; */
`;

const Wrapper = styled.div<{
  selected: boolean;
  answerstate: AnswerState;
  displayAsCorrect: boolean;
}>`
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: ${(p) =>
    p.selected || p.displayAsCorrect
      ? cl.getHSLA(cl.white, 0.3)
      : 'transparent'};
  border-radius: 8px;
  /* border: ${(p) =>
    p.answerstate === 'correct' ? `3px solid ${cl.getHSL(cl.white)}` : null};
  width: fit-content; */
  width: fit-content;
`;

const MiniCheckMark = styled.div<{ displayAsCorrect: boolean }>`
  display: ${(p) => (p.displayAsCorrect ? 'flex' : 'none')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background: linear-gradient(
    15deg,
    hsl(225, 92%, 60%),
    hsl(190, 100%, 40%),
    hsl(190, 100%, 40%)
  ); */
  font-weight: 800;
  font-size: 1.3rem;

  background: linear-gradient(
    90deg,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.red)}
  );

  background-size: 100%;

  color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  color: ${cl.getHSL(cl.white)};
  /* border: 2px solid ${cl.getHSL(cl.purple)}; */
  border-radius: 50%;
  height: 30px;
  width: 30px;

  align-items: center;
  justify-content: center;
`;

const MiniCheckMarkBackgroundCircle = styled.div<{ displayAsCorrect: boolean }>`
  visibility: ${(p) => (p.displayAsCorrect ? null : 'hidden')};
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: white;
`;

const MyRadio = styled(Radio)<{ answerstate: AnswerState }>`
  visibility: ${(p) => (p.answerstate === 'correct' ? 'hidden' : null)};
`;

const OptionWrapper = styled.div<{
  selected: boolean;
  displayAsCorrect: boolean;
}>`
  flex: 1;
  color: ${(p) =>
    p.selected || p.displayAsCorrect
      ? cl.getHSL(cl.white)
      : cl.getHSLA(cl.white, 0.5)};

  border-radius: 8px;
  padding: 10px;
`;

export default MultipleChoiceOption;
