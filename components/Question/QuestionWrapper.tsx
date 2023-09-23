import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import QUERIES from '../../breakpoints';
import { AnswerState } from '../Inputs/MultipleChoiceQuestion';

type QuestionWrapperProps = {
  children: JSX.Element;
  answer?: AnswerState;
};

const QuestionWrapper = (props: QuestionWrapperProps) => {
  const { children, answer } = props;
  return <Wrapper answer={answer || 'unanswered'}>{children}</Wrapper>;
};

const Tester = styled.div``;

const Wrapper = styled.div<{ answer: AnswerState }>`
  box-shadow: 0px 0px 4px ${cl.getHSLA(cl.black, 0.5)};
  color: ${cl.getHSL(cl.gray_dark)};

  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-left: auto;
  margin-right: auto;

  /* margin-top: 30px; */
  margin-bottom: 30px;

  @media ${QUERIES.tabletAndUp} {
  }

  border-radius: 8px;
  overflow: hidden;
`;

export default QuestionWrapper;
