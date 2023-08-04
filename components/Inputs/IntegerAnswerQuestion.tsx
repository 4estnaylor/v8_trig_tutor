import React from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import IntegerInput from './IntegerInput';
import { AnswerState } from './MultipleChoiceQuestion';
import { Variable } from './VariablePad';

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

const IntegerAnswerQuestion = (props: IntegerAnswerQuestionProps) => {
  const { question, answer, variables, diagram, answerState, setAnswerState } =
    props;
  return (
    <Wrapper>
      <TopPart>
        <Question>{question}</Question>
        <Diagram>{diagram}</Diagram>
      </TopPart>
      <BottomPart>
        <IntegerInput
          answer={answer}
          variables={variables || []}
          placeholder="?"
          answerState={answerState}
          setAnswerState={setAnswerState}
        />
      </BottomPart>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0px 0px 4px ${cl.getHSLA(cl.black, 0.5)};
  color: ${cl.getHSL(cl.white)};

  margin: 2px;

  @media ${QUERIES.tabletAndUp} {
    margin: 10px;
  }
  overflow: hidden;

  /* padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 8px;
  padding-right: 8px; */
  border-radius: 8px;
`;

const Diagram = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

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
    hsla(225 72% 30% / 0.7),
    hsla(225 72% 30% / 1) 80%,
    hsla(340 90% 50% / 1)
  ); */
  background: transparent;
  background-size: 200%;
  padding: 15px;
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
`;

export default IntegerAnswerQuestion;
