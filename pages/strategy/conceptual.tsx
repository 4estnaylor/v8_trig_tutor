import { Alert } from '@mui/material';
import { ST } from 'next/dist/shared/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import Gap from '../../components/Gaps/Gap';
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

  const [questionTwoAnswerState, setQuestionTwoAnswerState] =
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
          Conceptual learning is the absolute bees' knees. In many ways, it is
          math in it's purist form.
          <Gap height={30} />
          <EinsteinQuote>
            Any fool can know. The point is to understand.
            <ByLine>Probably Not Einstein</ByLine>
          </EinsteinQuote>
          <Gap height={30} />
          Now and then, a student's conceptual understanding inevitably gets a
          gap in the churn of a real-life math class. These gaps are a normal
          and even healthy part of any math diet,
          <span style={{ color: cl.getHSL(cl.purple), fontWeight: 800 }}>
            {' '}
            so long as it gets returned to{' '}
          </span>{' '}
          and filled in.
          <br /> <br />
          Let me make a distinction with two examples:
          <br />
          <br />
          <h4>Example 1</h4>
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
              Maybe like me, upon seeing this question, you think something
              along the lines of:
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
            conceptual learning in answering the question this way. Instead, am
            only showing the technical ability to use an equation.
            <br />
            <br />
            <Alert severity="info">
              That's not a bad thing by the way! Being able to solve problems
              technically, step-by-step, algorithm is the well earned fruit of
              conceptual understanding.
            </Alert>
            <br />
            <br />
            <h4>Example 2</h4>
            Imagine a different scenario now. Your grandmother says you've got
            it all wrong. She says the area of a circle is actually,
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
            Could you explain to your grandmother why <em>your equation</em> is
            the correct way to find the area and not hers? Could you explain the
            underlying concept of where the equation comes from in the first
            place?
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
            <EinsteinQuote>
              You do not really understand something unless you can explain it
              to your grandmother.
              <ByLine>Again, Probably Not Einstein</ByLine>
            </EinsteinQuote>
            <Image src="/einstein.svg" width={1000} height={1000} />
            <br />
            <br />
            <Alert severity="warning">
              These quotes, like so many others regularly attributed to
              Einstein, were probably not actually said by him. Still good
              quotes though!
              <br />
              <br />I double-checked with the Ultimate Quotable Einstein
              published by Princeton University Press which also cannot verify
              any source for these particular quotes.
            </Alert>
            <br />
            <br />
            <MultipleChoiceQuestion
              question={'Which best demonstrates conceptual understanding?'}
              correctOptions={['Recreating a math formula if you forget it.']}
              incorrectOptions={[
                'Having a math formula memorized',
                'Knowing how to use a math formula',
              ]}
              answerState={questionTwoAnswerState}
              setAnswerState={setQuestionTwoAnswerState}
            />
          </HiddenSection>
          <br />
          <br />
          <HiddenSection $isvisible={questionTwoAnswerState === 'correct'}>
            {/* Conceptual understanding is not only important because it is "pure"
            or "the bee's knees".{' '}
            <span style={{ color: cl.getHSL(cl.blue), fontWeight: 800 }}>
              Conceptual understanding has practical importance.
            </span>
            <br />
            <br /> */}
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
            {/* Students (and teachers) understandably tend to focus more on math
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
            <br /> */}
            If you train solely technique, while developing holes in conceptual
            understanding, reliance on memorization grows beyond what most of us
            can manage. Technique will not be a logical strategy, but an
            ever-growing heap of arbitrary rules to follow. This heap, when
            grown sufficiently large, consumes most of the cognitive load your
            brain putting you in a place where it is:
            <ol>
              <li>
                all but impossible to think clearly while wracking your memory
                for rule after rule.
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
            If a student tells me they are generally struggling with trig or any
            math course, the culprit that comes to mind first and foremost is a
            conceptual gap.
            <br />
            <br />
            Conceptual gaps are expected, and not a big deal if nipped in the
            bud. When you encounter them, rather than trying to keep at it, or
            push ahead into new math ideas, move backwards. Move backwards until
            just before you feel comfortable, and things make complete sense.
            That is probably what you want to dig into, working your way back up
            from there.
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

const EinsteinQuote = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-left: 2px solid ${cl.getHSL(cl.purple)};
  margin-top: 0px;
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
  gap: 20px;
  /* background-color: ${cl.getHSLA(cl.purple, 0.05)}; */
  font-size: 1rem;
`;

const ByLine = styled.div`
  font-size: 0.8rem;
  font-weight: 800;
`;
const CircaLine = styled.div`
  padding-top: 10px;
  font-size: 0.8rem;
`;

const ContinuePrompts = styled.div<{ $isvisible: boolean }>`
  font-size: 1.25rem;
  display: ${(p) => (p.$isvisible ? 'flex' : 'none')};
`;

const Question1 = styled.div``;
const Question2 = styled.div``;
const Complete = styled.div``;

export default conceptual;
