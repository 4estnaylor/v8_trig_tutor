import React from 'react';
import styled from 'styled-components';
import QUERIES from '../../breakpoints';
import cl from '../../colors';
import IntegerInput from './IntegerInput';
import { Variable } from './VariablePad';

interface IntegerAnswerQuestionProps {
  question: string;
  answer: number;
  variables?: Variable[];
  diagram?: JSX.Element;
}

const IntegerAnswerQuestion = (props: IntegerAnswerQuestionProps) => {
  const { question, answer, variables, diagram } = props;
  return (
    <Wrapper>
      <Header>Question</Header>
      <Question>{question}</Question>
      <Diagram>{diagram}</Diagram>
      <IntegerInput answer={answer} variables={variables || []} />
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

  padding: 20px;
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