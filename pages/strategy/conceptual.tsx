import { ST } from 'next/dist/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import IntegerAnswerQuestion from '../../components/Inputs/IntegerAnswerQuestion';
import MultipleChoiceQuestion, {
  AnswerState,
} from '../../components/Inputs/MultipleChoiceQuestion';
import { Variable } from '../../components/Inputs/VariablePad';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';

const conceptual = () => {
  const [circleAreaAnswerBlurred, setCircleAreaAnswerBlurred] = useState(true);
  const [sectionOneCompleted, setSectionOneCompleted] = useState(false);
  const [questionOneAnswerState, setQuestionOneAnswerState] =
    useState<AnswerState>('unanswered');

  // const questionStatuses = [
  //   question1Status,
  //   question2Status,
  //   question3Status,
  //   question4Status,
  // ];

  const variablesToUse: Variable[] = [
    {
      symbol: 'π',
      value: Math.PI,
      degree: 0,
      color: cl.getHSL(cl.blue),
    },
    // {
    //   symbol: 'τ',
    //   value: Math.PI * 2,
    //   degree: 0,
    //   color: cl.getHSL(cl.red),
    // },
  ];

  const circleAreaDiagram = (
    <Image src="/conceptual_circle.svg" width="200" height="200" />
  );
  return (
    <TopicComponentBoilerPlate title={<>Conceptual Learning</>}>
      <>
        <Image
          src="/beesknees.svg"
          width={1000}
          height={1000}
          alt="bee's knees"
        />
        <P>
          Conceptual learning is the absolute bees' knees. In may ways it is
          math in it's purist form.
          <br /> <br />
          The ideal of conceptual understanding in math inevitably gets gaps in
          the every day churn of most real-life math classes. These gaps are a
          normal and even healthy part of any math diet,
          <span style={{ color: cl.getHSL(cl.purple), fontWeight: 800 }}>
            {' '}
            so long as it gets returned to{' '}
          </span>{' '}
          and filled in.
          <br /> <br />
          Let me explain by example:
          {/* Conceptual learning in math is about understanding how and why things
          are true. It is not a s peries of steps to find a missing value, but a
          logical understanding of something.
          <br />
          <br />
          Conceptual learning cannot really be "taught" to students. It has to
          be activley learned. I realize the last two sentecnces sound like I'm
          waxing poetic or parsing hairs – saying concepts can be learned but
          not taught. I admit I'm having a hard time writing language to convey
          this idea emphatically enough.
          <br />
          <br />
          <Em>It is an essential distinction</Em> you will need to grapple with
          to get really, really good at trig. If you are consciously aware of
          this distinction it can also make you a much more efficient learner in
          almost any context, not just math.
          <br />
          <br />
          Facts and algorithims can be taught, but ideas or "concepts" are
          events that can only occur when actively produced within the ol'
          noggin. Memorizing a series of facts can be quite useful and often
          assists with conceptual learning, but it is not conceptual learning in
          and of itself.
          <br />
          <br />
          <br />
          <br />
          A talented teacher often supports students' learn conceptually about a
          topic without getting in the way. The support involves allowing
          students time, space, questioning, and often floating some relevant
          facts conducive to allowing students to investigate, experiment, and
          draw conclusions on their own.
          <br />
          <br />
          To give you a more concrete idea of what I mean by conceptual learning
          follow me through a short 2 step thought experiment. */}
          <IntegerAnswerQuestion
            question="What is the area of the circle?"
            answer={49 * Math.PI}
            diagram={circleAreaDiagram}
            variables={variablesToUse}
            decimalPlaceIndex={null}
            answerState={questionOneAnswerState}
            setAnswerState={setQuestionOneAnswerState}
          />
          {/* <Step> Step 1 </Step> Ask yourself, do you know what is the area
              of this circle? */}
          <br />
          <br />
          {/* <CircleAreaImgWrap>
                <Image src="/conceptual_circle.svg" width="200" height="200" />
              </CircleAreaImgWrap> */}
          {/* <IntegerInputWithPi answer={49 * Math.PI} placeholder={'?'} /> */}
          <ContinuePrompts $isvisible={questionOneAnswerState !== 'correct'}>
            complete the question to continue
          </ContinuePrompts>
          <HiddenSection $isvisible={questionOneAnswerState === 'correct'}>
            <CircleAreaAnswer>
              Maybe a typical math student, like me, upon seeing this question
              thinks something like:
              <br />
              <br />
              <StudentThoughts>
                <span>Oh, I know, this is a A = πr² situation!</span>
                <span>Okay, so r looks like 7 units.</span>
                <span>Let's plug 7 into the equation &rarr; π · 7²</span>

                <span>Simplify &rarr; A = 49π u² is the answer.</span>
              </StudentThoughts>
            </CircleAreaAnswer>
            <br />
            <br />
            We are not demonstrating conceptual learning in answering the
            question this way. We are showing the technical ability to use an
            equation.
            <br />
            <br />
            Consider a different scenario. Imagine your grandmother disagrees
            with you not only about the answer, but the equation you are using
            to use it. Your grandmother stubbornly says that you have
            misremembered basic geometry; the equation for the area of a circle
            is actually:
            <br />
            <br />
            <EquationContainer>
              <Image
                src="/AreaOfCircleWrongEqn.svg"
                width={150}
                height={100}
                alt="wrong area of circle equation"
              />
            </EquationContainer>
            The only hope to convince your grandmother, is to logically explain
            why the area of circle must be described by the equation A = πr².
            Could you explain not just the technique to use the equation, but
            the underlying concept of where the equation comes from?
            <br />
            <br />
            If so,{' '}
            <b>
              <em>that</em>
            </b>{' '}
            is conceptual understanding. If not,{' '}
            <Link href="https://www.youtube.com/watch?v=YokKp3pwVFc">
              <span
                style={{
                  color: cl.getHSL(cl.blue),
                  textDecoration: 'underline',
                }}
              >
                here is a great explanation
              </span>
            </Link>{' '}
            for you grandmother. `
            <br />
            <br />
            <MultipleChoiceQuestion
              question={'Which best demonstrates conceptual understanding?'}
              correctOptions={['Recreating a math formula if you forget it.']}
              incorrectOptions={[
                'Having a math formula memorized',
                'Knowing how to use a math formula',
              ]}
            />
            <br />
            <br />
            Conceptual understanding is not only important because it is "pure"
            or "the bee's knees".{' '}
            <span style={{ color: cl.getHSL(cl.blue), fontWeight: 800 }}>
              Conceptual understanding has practical importance.
            </span>
            <br />
            <br />
            {/* With conceptual understanding things "make sense". If you don't have
            conceptual understanding, math becomes shrouded in mystery and the
            techniques you are using become a mixture of memorization and
            guesswork. If things are arbitrary, they are easier to forget, and
            harder to rediscover on the fly. Math tests begin to feel less like
            a logic puzzle where everything fits neatly together, and some kind
            of sadistic, high-stakes academic guessing game.
            <br />
            <br /> */}
            When students feel they are having trouble using, or memorizing math
            techniques, <em> most of the time </em> their issue comes not from
            an inability to memorize, but from a gap in conceptual knowledge.
            <br />
            <br />
            Students (and teachers) understandably tend to focus more on math
            techniques than the underlying math concepts. It often seems faster
            and more critical to learn technique, because after all, technique
            is what you will students are directly tested on.
            <br />
            <br />
            Technique is for the most part what you will see on SAT, ACT, IB or
            virtually any standardized math testing.
            <br />
            <br />
            On the other hand, conceptual understanding is labor intensive to
            measure. Its very hard to gauge it without conversation with a
            student or long written explanations. Unsuprisingly, it very rarely
            gets tested in highschool simply because it is usually pretty
            impractical.
            <br />
            <br />
            Begs the question, why even bother with conceptual learning then?
            <br />
            <br />
            If you train solely technique, while developing holes in conceptual
            understanding, reliance on memorization grows beyond what most of us
            can manage. Technique will not be a logical strategy, but an
            ever-growing heap of arbitrary rules to follow. This heap, when
            grown sufficiently large, consumes most of the cognitive load your
            brain can manage – effectively making it :
            <ol>
              <li>
                impossible to think clearly while wracking your memory for rule
                after rule.
              </li>
              <li>
                critical that you don't forget even the tiniest detail, because
                you're technique is based entirely upon memorization rather than
                logic.
              </li>
            </ol>
            This is a terrible condition for a student to be in if they hope to
            learn anything or test well.
            <br />
            <br />
            If you are generally struggling with trig or any math course, the
            first and most likely culprit is conceptual gaps.
            <br />
            <br />
            Conceptual gaps are expected, and really not a big deal if nipped in
            the bud. When you encounter them, rather than trying to keep at it,
            or push ahead into new math ideas, move backwards. Move backwards
            until just before you feel comfortable, and things make complete
            sense. That is probably what you want to dig into, working your way
            back up from there.
          </HiddenSection>
          <li>
            {/* <Step> Step 2 </Step> Ask yourself, do you know why A = πr² gives
              the area of a circle? Can you explain to me where that equation
              comes from with logic? */}
          </li>
        </P>
      </>
    </TopicComponentBoilerPlate>
  );
};

const Em = styled.span`
  color: ${cl.getHSL(cl.purple)};
  font-weight: 800;
`;

const P = styled.div`
  padding: 5px;
`;

const EquationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleAreaImgWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const HiddenSection = styled.div<{ $isvisible: boolean }>`
  display: ${(p) => (p.$isvisible ? 'block' : 'none')};
`;

const CircleAreaAnswer = styled.div`
  position: relative;
`;

const CircleAreaAnswerCover = styled.div<{ blurred: boolean }>`
  position: absolute;
  backdrop-filter: blur(16px);
  width: 100%;
  height: 100%;
  background-color: ${cl.getHSLA(cl.black, 0.3)};
  border-radius: 8px;
`;

const StudentThoughts = styled.div`
  border-left: 2px solid ${cl.getHSL(cl.purple)};
  padding: 20px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ContinuePrompts = styled.div<{ $isvisible: boolean }>`
  font-size: 1.25rem;
  display: ${(p) => (p.$isvisible ? 'flex' : 'none')};
`;

const Question1 = styled.div``;
const Question2 = styled.div``;
const Complete = styled.div``;

export default conceptual;
