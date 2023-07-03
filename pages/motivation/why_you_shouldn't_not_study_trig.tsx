import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import MultipleChoiceQuestion, {
  AnswerState,
} from '../../components/Inputs/MultipleChoiceQuestion';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';
import doubleDownQuestions from '../../components/HomePage/CourseMap/DoubleDownQuestions';
import mathKrakenQuestions from '../../components/HomePage/CourseMap/MathKrakenQuestions';

const math_kraken = () => {
  // const [qTrigImportanceState, setQTrigImportanceState] =
  //   useState<AnswerState>('unanswered');

  let questionAnswerStates: AnswerState[] = [];
  mathKrakenQuestions.forEach((question) => {
    if (question.answerState) {
      questionAnswerStates.push(question.answerState);
    } else {
    }
  });
  return (
    <TopicComponentBoilerPlate2
      title={<>Why You Shouldn't Not Study Trig</>}
      questions={questionAnswerStates}
      questionObjects={mathKrakenQuestions}
    >
      <Wrapper>
        If feared and disregarded, trig will inevitably sink students, but if
        understood and cared for, trig becomes a powerful ally. Trig is a kraken
        you will want to be on friendly terms with as you navigate the world of
        mathematics. Trig just has it's tentacles wrapped around too many
        branches of math in highschool and college to succesfully be avoided.
        There is no escape...
        <br /> <br />
        Sweet mother of standards-compliant lesson plans, I have taught a lot of
        different math (and math-ish) classes. I have taken even more as a
        student. And, around 95% of them benefit substantially from being really
        good at Trig. Personally, I will openly admit trig is not my favorite
        subject area. So why make a website about it ?
        <br />
        <br />
        <h3>The real reason I made this site about Trig specifically</h3>I made
        this website because in my experience as both a teacher and a student,
        trig is
        <b style={{ color: cl.getHSL(cl.red) }}>
          {' '}
          the point of greatest leverage{' '}
        </b>{' '}
        for understanding highschool and college level math. Yes other hischool
        math classes are important, I certianly don't deny that. In fact, I've
        taught most of them! But trig stands out as the obvious answer to where
        students would benefit the most from investing more time and effort
        into. Trig gives the biggest bang for your buck if you want to pursue
        mathematics to the level of calculus and beyond.
        <br />
        <br />
        <Image
          src="/kraken.png"
          width={1000}
          height={1000}
          alt="kraken image"
        />
        {/* <MultipleChoiceQuestion
          question="Why is trig especially important for math students according to me?"
          correctOptions={[
            'Trig holds a central and pervasive role within the math universe.',
            `Trig is a point of great leverage in a student's math education.`,
          ]}
          incorrectOptions={[
            'It has many applications useful in every day life, engineering, and architecture.',
            'It gives insight into complex systems like few other subjects.',
          ]}
          answerState={qTrigImportanceState}
          setAnswerState={setQTrigImportanceState}
        /> */}
        {mathKrakenQuestions[0].createMCQuestionElement()}
      </Wrapper>
    </TopicComponentBoilerPlate2>
  );
};

const Wrapper = styled.div`
  padding: 5px;
`;

export default math_kraken;
