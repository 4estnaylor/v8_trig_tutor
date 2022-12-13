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
}

const IntegerAnswerQuestion = (props: IntegerAnswerQuestionProps) => {
  const { question, answer, variables, diagram, answerState, setAnswerState } =
    props;
  return (
    <Wrapper>
      <Header>Question</Header>
      <Question>{question}</Question>
      <Diagram>{diagram}</Diagram>
      <IntegerInput
        answer={answer}
        variables={variables || []}
        placeholder="?"
        answerState={answerState}
        setAnswerState={setAnswerState}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0px 0px 4px ${cl.getHSLA(cl.black, 0.5)};
  color: ${cl.getHSL(cl.gray_dark)};

  margin: 2px;

  @media ${QUERIES.tabletAndUp} {
    margin: 10px;
  }

  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 8px;
`;

const Diagram = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Header = styled.h2``;

const Question = styled.div`
  font-size: 1.25rem;
`;

export default IntegerAnswerQuestion;
