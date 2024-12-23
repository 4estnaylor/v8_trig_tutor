import { Alert } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import doubleDownQuestions from '../../components/HomePage/CourseMap/DoubleDownQuestions';
import MultipleChoiceQuestion, {
  AnswerState,
} from '../../components/Inputs/MultipleChoiceQuestion';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';

const double_down = () => {
  let questionAnswerStates: AnswerState[] = [];
  doubleDownQuestions.forEach((question) => {
    if (question.answerState) {
      questionAnswerStates.push(question.answerState);
    } else {
    }
  });

  return (
    <TopicComponentBoilerPlate2
      title={<>Motivation</>}
      questions={questionAnswerStates}
      questionObjects={doubleDownQuestions}
    >
      <>
        <DoubleDownWrapper>
          <Image src="/double_down.svg" width={700} height={400} />
        </DoubleDownWrapper>
        <Wrapper>
          <span>
            If there is one single piece of math advice I could give to my past
            self in highschool, it would be this: <br /> <br />
            <DoubleDownText> double-down on trig </DoubleDownText>
            <br />
            <br />
            The things you learn in trig will be used again, and again, and
            again in future courses. If you invest the effort needed to build a
            solid understanding, and even fluency in trigonometry, it will give
            you an almost hilarious amount of mileage on your math journey.
            <br />
            <br />
            <br /> <br />
            <Alert severity="info">
              I teach a lot of math, and I should stress,
              philosophically-speaking there is no such thing as the single most
              important highschool math class. Math comes in all shapes and
              sizes, and trying to uniformly declare one as the most important
              is just as ridiculous as determining the single best song of all
              time.
              <br /> <br />
              But, practically speaking... it's trig.
              <br />
              <br />
              {/* And, if you ask me,{' '}
              <Link href="https://www.youtube.com/watch?v=Ixrje2rXLMA">
                <a>Jolene by Dolly Parton</a>
              </Link>{' '}
              is pretty close to peerless. */}
            </Alert>
          </span>
          {/* <MultipleChoiceQuestion
            question="What one single piece of math advice would the author give to his former self?"
            correctOptions={['Double-down on trig.']}
            incorrectOptions={[
              'Establish dominance by using crayon instead of pencil on math tests.',
              'Try extreme dietry fads to enhance your ability to think fast.',
              'Forget about math. Math is for robots now.',
              'Pursue your interests and ask lots of questions along the way.',
            ]}
            answerState={adviceQuestionState}
            setAnswerState={setAdviceQuestionState}
          /> */}
          {doubleDownQuestions[0].createMCQuestionElement()}
          <span>
            In the next two sections I want to dig into why I have found,
            practically speaking, Trig is the most important component of a
            student's highschool math education.
          </span>
        </Wrapper>
      </>
    </TopicComponentBoilerPlate2>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  & b {
    color: ${cl.getHSL(cl.purple)};
  }

  a {
    color: ${cl.getHSL(cl.blue)};
  }
`;

const DoubleDownText = styled.div`
  font-size: 3rem;

  background: linear-gradient(
    90deg,
    ${cl.getHSL(cl.blue)},
    ${cl.getHSL(cl.purple)},
    ${cl.getHSL(cl.red)}
  );

  background-size: 80%;

  text-align: center;
  color: transparent;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

const BlueLink = styled(Link)`
  color: ${cl.getHSL(cl.blue)};
  background-color: red;
`;

const DoubleDownWrapper = styled.div``;

export default double_down;
