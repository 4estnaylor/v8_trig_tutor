import React, { useEffect, useState } from 'react';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';
import Video from '../../components/Video';
import styled from 'styled-components';
import ExpandableBullet from '../../components/ExpandableBullet';
import DraggableButton from '../../components/DraggableButton';
import CanvasForTopicComponent from '../../components/HomePage/MyCanvas/CanvasForTopicComponent';
import AddFactorsButtonBar from '../../components/Inputs/AddFactorsButtonsBar';
import InputForUserCircleDivisions from '../../components/Inputs/InputForUserCircleDivisions';
import getSceneUserCicrcleDivision from '../../components/getScenes/degrees/getSceneUserCircleDivision';
import cl from '../../colors';
import { Button, Input, Slider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import P from '../../components/P';
import Em from '../../components/Em';
import RemoveFactors from '../../components/smallness and divisibility/RemoveFactors';
import IntegerAnswerQuestion from '../../components/Inputs/IntegerAnswerQuestion';
import { AnswerState } from '../../components/Inputs/MultipleChocieQuestionForSeries';
import IntegerSimple from '../../components/Inputs/IntegerSimple';
import TopPart from '../../components/Question/TopPart';
import QuestionDisplay from '../../components/Question/QuestionDisplay';
import QuestionWrapper from '../../components/Question/QuestionWrapper';
import MostDivisible from '../../components/niche/MostDivisible';
import DivisorsPlot from '../../components/niche/DivisorsPlot';
import getSceneInteriorAngles from '../../components/getScenes/degrees/getSceneInteriorAngles';
import getSceneExponentialSlider from '../../components/getScenes/degrees/getSceneExponentialSlider';
import Smallest from '../../components/niche/Smallest';
import Quote from '../../components/Quote/Quote';
import Image from 'next/image';
import AsideNote from '../../components/AsideNote/AsideNote';
import MyLink from '../../components/MyLink';
import Visibility from '../../components/niche/Visibility';
import LinearSmallnessModel from '../../components/niche/LinearSmallnessModel';

export type MostDivisibleQuestionObject = {
  limit: number;
  correct: number[];
  answerState: AnswerState;
};

const smallness_and_divisibility = () => {
  const [userCircleDivisions, setUserCircleDivisions] = useState(1);
  const [points, setPoints] = useState(0);
  const [smallestValueAns, setSmallestValueAns] =
    useState<AnswerState>('unanswered');
  const [multiplier, setMultiplier] = useState(4);
  const [factors, setFactors] = useState<number[]>([1]);
  const scoreMultipliers = {
    Ten: 8,
    Hundred: 4,
    Thousand: 2,
  };

  const [mostDivisibleQuestions, setMostDivisibleQuestions] = useState<
    MostDivisibleQuestionObject[]
  >([
    { limit: 15, correct: [12], answerState: 'unanswered' },
    { limit: 100, correct: [60, 72, 84, 90, 96], answerState: 'unanswered' },
    { limit: 1000, correct: [840], answerState: 'unanswered' },
    { limit: 10000, correct: [7560, 9240], answerState: 'unanswered' },
  ]);

  const [mostDivisibleAnswerState, setMostDivisibleAnswerState] =
    useState<AnswerState>('unanswered');

  const divisiblityPoints = {
    Ten: 1,
    Twenty: 1,
    Fifty: 1,
    Hundered: 1,
  };

  const [controlledPosition, setControlledPosition] = useState({
    x: 50,
    y: 50,
  });

  const [userSelectedSmallestValue, setUserSelectedSmallestValue] = useState();

  const notTooBigCollapsable = (
    <div>
      The advantage of smaller values is things become manageable for our
      computers and pencils. 10,000 is the largest allowable number for this
      exercise.
      <CollapsableList>
        <li>
          {`numbers up to 10 get base points `}
          <Multiplier>× {scoreMultipliers.Ten}</Multiplier>
        </li>
        <li>
          {`numbers up to 100 get base points `}

          <Multiplier>× {scoreMultipliers.Hundred}</Multiplier>
        </li>
        <li>
          {`numbers up to 1000 get base points `}

          <Multiplier>× {scoreMultipliers.Thousand}</Multiplier>
        </li>
        <li>{`numbers over 1000 get no bonus.`}</li>
      </CollapsableList>
    </div>
  );

  const dividesNeatlyCollapsable = (
    <div>
      Priority given to integers that divide into your selected value. The
      advantage is the utility in being able to divide a circle into many
      integer values i.e. halves, thirds, fifths, etc..
      <CollapsableList>
        <li>
          {`numbers up to 10 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Ten} points</Points>
        </li>
        <li>
          {`numbers up to 20 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Twenty} points</Points>
        </li>
        <li>
          {`numbers up to 50 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Fifty} points</Points>
        </li>
        <li>
          {`numbers up to 100 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Hundered} point</Points>
        </li>
        <li>{`numbers over 100`} rewarded no points.</li>
      </CollapsableList>
    </div>
  );

  const getFactors = (number: number = userCircleDivisions) => {
    setFactors(
      Array.from(Array(number + 1), (_, i) => i).filter((i) => number % i === 0)
    );
  };

  const getFactorPoints = () => {
    let newPoints = 0;
    factors.forEach((factor) => {
      if (factor <= 10) {
        newPoints += divisiblityPoints.Ten;
      } else if (factor <= 20) {
        newPoints += divisiblityPoints.Twenty;
      } else if (factor <= 50) {
        newPoints += divisiblityPoints.Fifty;
      } else if (factor <= 100) {
        newPoints += divisiblityPoints.Hundered;
      } else {
        newPoints += 1;
      }
    });
    setPoints(newPoints);
  };

  const getMultiplier = () => {
    let newMultiplier;
    if (userCircleDivisions <= 10) {
      newMultiplier = scoreMultipliers.Ten;
    } else if (userCircleDivisions <= 100) {
      newMultiplier = scoreMultipliers.Hundred;
    } else if (userCircleDivisions <= 1000) {
      newMultiplier = scoreMultipliers.Thousand;
    } else {
      newMultiplier = 1;
    }

    // newMultiplier = 1 + 3 * ((4 - Math.log10(userCircleDivisions)) / 3);
    // newMultiplier = Math.round(newMultiplier * 10) / 10;

    setMultiplier(newMultiplier);
  };

  // useEffect(() => {
  //   getDivisibleNumbers(userCircleDivisions);
  // }, [userCircleDivisions]);

  useEffect(() => {
    getFactors();
    getMultiplier();
    console.log('divisions', userCircleDivisions);
    console.log('factors', factors);
    console.log('points', points);
  }, [userCircleDivisions]);

  useEffect(() => {
    getFactorPoints();
  }, [factors]);

  // useEffect(() => {
  //   getDivisibleNumbers(50)
  // }, []);
  const circleDivsionsCanvas = (
    <>
      <Criteria>
        <ExpandableBullet pre={2} title={'more divisible'}>
          {dividesNeatlyCollapsable}
        </ExpandableBullet>
        <ExpandableBullet pre={1} title={`smaller`}>
          {notTooBigCollapsable}
        </ExpandableBullet>
      </Criteria>

      <Spacer />

      <RelativeWrapper>
        <DraggableButton
          controlledPosition={controlledPosition}
          setControlledPosition={setControlledPosition}
        />

        <CanvasForTopicComponent
          sceneGetter={getSceneUserCicrcleDivision}
          height={400}
          objectPassedToScene={{
            userCircleDivisions,
            setUserCircleDivisions,
            setControlledPosition,
            controlledPosition,
          }}
        ></CanvasForTopicComponent>

        {/* <div>{userCircleDivisions}</div>
        <div>
          {factors.map((factor) => (
            <span>{factor}, </span>
          ))}
        </div>
        <div>{points}</div> */}
      </RelativeWrapper>
      <BottomBar>
        <UserDivisionsDisplay>
          {' '}
          <Caption>divisions</Caption>
          <DivisionsInput type="number" value={userCircleDivisions} />
          {/* {userCircleDivisions} */}
        </UserDivisionsDisplay>
        <PointsDisplay sx={{ color: cl.getHSL(cl.blue) }}>
          <Caption>divisibility</Caption>
          {points}
        </PointsDisplay>

        <MultiplierDisplay>
          <Caption>smallness</Caption>× {multiplier}
        </MultiplierDisplay>

        <ScoreDisplay>
          <Caption>score</Caption>
          {Math.round(points * multiplier * 10) / 10}
        </ScoreDisplay>
      </BottomBar>
      {/* <InputForUserCircleDivisions
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      /> */}
      <RemoveFactors
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      />
      <AddFactorsButtonBar
        setUserEnteredValue={setUserCircleDivisions}
        userEnteredValue={userCircleDivisions}
      />
    </>
  );

  return (
    <TopicComponentBoilerPlate2 title="Why 360° ?">
      <>
        <RamanujanFace
          src="/ramanujanFace.svg"
          width={400}
          height={400}
          style={{ margin: 'auto' }}
        />
        <P>
          <Quote
            quote={
              'Dear Sir, I beg to introduce myself to you as a clerk in the Accounts Department of the Port Trust Office at Madras on a salary of only £20 per annum. I am now about 23 years of age…'
            }
            byLine={
              <>
                {' '}
                Srinivasa Ramanujan{' '}
                <AsideNote>
                  <div style={{ overflow: 'scroll' }}>
                    <Image
                      src="/ramanujanPhoto.png"
                      height={300}
                      width={250}
                      style={{ borderRadius: '8px', marginLeft: 'auto' }}
                    />
                    <br />
                    <br />
                    Srinivasa Ramanujan was not only a math prodigy but a
                    self-taught prodigy. Likely due to this, he often asked and
                    solved questions from a pretty unique intellectual angle —
                    very rough around the edges compared to most prominent
                    mathematicians at the time, but far ahead of them in a lot
                    of ways too. Ramanujan was completely ignorant of some areas
                    of mathematics that virtually all of his peers had studied
                    as part of a more formal education, yet he was deeply
                    immersed in mathematical ideas that the same peers had
                    barely given any thought to. Ramanujan's work in mathematics
                    stunned leading mathematicians at the time for it's
                    originality and creativity.
                    <Quote
                      quote={
                        'Plenty of mathematicians, Hardy knew, could follow a step-by-step discursus unflaggingly—yet counted for nothing beside Ramanujan. Years later, he would contrive an informal scale of natural mathematical ability on which he assigned himself a 25 and Littlewood a 30. To David Hilbert, the most eminent mathematician of the day, he assigned an 80. To Ramanujan he gave 100.'
                      }
                      byLine={'Robert Kanigel'}
                      source="https://ia801601.us.archive.org/7/items/TheManWhoKnewInfinityALifeOfTheGeniusRamanujan/The-Man-Who-Knew-Infinity-A-Life-of-the-Genius-Ramanujan.pdf"
                    />
                    Ramanujan had an incredible familiarity with positive
                    integers aka "counting numbers" and their properties. A
                    story told by one of his mathematician collegues really
                    highlights this :
                    <Quote
                      quote={`I remember once going to see him when he was ill at Putney. I had ridden in taxi cab No. 1729 and remarked that the number seemed to me rather a dull one, and that I hoped it was not an unfavourable omen. "No," he replied, "it is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways.`}
                      byLine={'G. H. Hardy'}
                    />
                    The two different ways are:
                    <br />
                    <br />
                    1729 = 13 + 123 = 93 + 103
                    <br />
                    <br />
                    If the story is true, the implication that Ramanujan had
                    such specific information about such a large number just
                    catalogued somewhere in the back of his head at all times.
                    Wow. And based on how prolific Ramanujan's discoveries in
                    math were over his short life, this kind of encyclopedic
                    knowledge seems very plausible.
                    <br />
                    <br />
                    Ramanujan's familiairty of and curiosity towards positive
                    integers, while a very unreasonable standard to hold
                    ourselves to, is a posture worth at least leaning into as we
                    consider how to divide a cirlce. We will also directly make
                    use of one of his ideas, highly-composite primes. So, I felt
                    Ramanujan really fit well for the title animation.
                    <br />
                    <br />
                    <MyLink href="https://en.wikipedia.org/wiki/Srinivasa_Ramanujan">
                      His wikipedia page
                    </MyLink>{' '}
                    is pretty inspiring, tragic, and overall fascinating.
                  </div>
                </AsideNote>{' '}
              </>
            }
            source="https://writings.stephenwolfram.com/2016/04/who-was-ramanujan/"
          />
          Is 360 really the ideal way to divide a circle? To answer this
          question well, first forget a circle has ever been measured using 360
          degrees. Without any mental baggage of a "default" or "standard"
          number of divisions, you can more freely ask the much better, more
          general question:
          <br />
          <br />
          What would be{' '}
          <em>
            <b> the best</b>
          </em>{' '}
          number to divide a circle for measurement?
          <br />
          <br />
          There are actually a number of correct answers to this question, but
          *** be warned *** there are many, <em>many</em> more incorrect
          answers. Your task is to pick one of the correct ones AND to
          understand why you picked it.
          <br />
          <br />
          Remember, with no memory of 360 to speak of, we must approach this
          question totally naive, with eyes wide and hearts open.
          <br />
          <br /> 3 rules
          <AsideNote>
            <>
              More like guidelines than "rules" really.
              <br />
              <br />
              Except, it does have to be less than 10,000. That's a rule. I only
              limit it to less than 10,000 because some of the visuals start to
              get laggy with really big numbers.
            </>
          </AsideNote>{' '}
          for your chosen number:
          <ul>
            <li>Smaller is better.</li>
            <li>More divisible is better.</li>
            <li>It can't be bigger than 10,000 </li>
          </ul>
          {/* We'll restrict our search to values less than 10,000.
          <br />
          <br />
          We will create {`(and refine) `} a model to determine which numbers
          would be the best option{`(s)`} to divide a circle into.
          <br />
          <br />
          There are two qualities in particular that our models will focus on —
          smallness and having many divisors. */}
          <h1>Smaller is Better</h1>
          Small numbers are great because they:
          <Ul>
            <li>
              make calculations less taxing for our brains and our computers'
              CPUs.{' '}
              <AsideNote>
                <div>
                  Although modern computers can often handle wickedly large
                  numbers, we ask increasingly more of them especially when it
                  comes to graphics. Each page rerender all the animations on
                  this page ask your computer to calculate and produce the color
                  of every pixel on your device's display. And the animations,
                  if not laggy, rerender at least around 24 times in a second{' '}
                  {`also called 24 Hz (pronounced "Hurts")`}. If the animation
                  is laggy, it is probably because the calculations become too
                  intensive to perform them quickly enough between each
                  rerender.
                  <br />
                  <br />
                  <CanvasForTopicComponent
                    sceneGetter={getSceneInteriorAngles}
                  />
                  <br />
                  <br />
                  Not long ago, the gold standard for video games was around 60
                  times a second {`60 Hz`}. <br />
                  <br />
                  <MyLink href={'https://www.youtube.com/shorts/esIl_oMew8c'}>
                    {' '}
                    Now it's pushing 4 times that at {`240 Hz`}
                  </MyLink>
                  .
                </div>
              </AsideNote>
            </li>
            <li>
              make visualization possible: observing, displaying, drawing, and
              measuring divisions pretty quickly reaches both the limitations of
              our our eyes and/or our displays. How many divisions can you
              distinguish on the circle below using your display? I can
              distinguish the individual lines up to about 550 at the outside of
              the circle using my display.
              <br /> <br />
            </li>
          </Ul>
          <Visibility />
          <h1>
            Modeling Smallness{' '}
            <AsideNote>
              <div>
                Why model smallness and not bigness? In general there's not a
                good reason, and you're welcome to conceptualize it that way.
                For this web app, I wanted to use a point system that relies on
                good qualities being associated with positivie values. I picked
                smallness to model since it is a positive quality as opposed to
                bigness which would have been a negative quality.
              </div>
            </AsideNote>
          </h1>
          So "smallness" is a quality we definitely want to prioritize. The real
          question will be, how are we going to grade a number's "smallness"?
          The method we use to grade smallenss is going to be a critical part of
          your model.
          <h1>Linear Model</h1>
          One way to grade would be a linear model. The smaller the number, the
          more points it gets. For example, we could model smallness in a away
          where 1 gets 100 points for smallness whereas 10,000 gets 0 points for
          smallness. And 5,000 exactly half way in between those numbers would
          get 50 points.
          <LinearSmallnessModel />
          <h1>Exponential Model</h1>
          Another answer would be an exponential model — a curve. In this kind
          of model 1 might still get 100 points and 10,000 could still get zero.
          But 5,000 might only 2 points (twice that of 10,000, but 1/50th that
          of 1), significantly less than 50.
          <h1>Step-Wise Model</h1>
          <h1>Mixed Model</h1>
          <br />
          <br />
          <Smallest />
          {/* I made the diagram above so darn tall because otherwise the smallest
          numbers, represented by just fractions of a pixel, become too small to
          see.
          <br />
          <br />
          I most often represent the size diagram to an exponential (curve that
          goes up with increasing steepness). It gives the smaller numbers more
          of a spotlight — which I think they deserve. If you find it warping
          your sense of scale, you can toggle it to a linear representation!
          <br />
          <br />
          Conceptually even numbers much smaller than 10,000 are beyond what our
          primitive little human minds can fully grasp. But visuals can assist
          and refine our flawed intuitions.
          <br />
          <br />
          A fun thought experiment to demonstrate how bad we are at
          conceptualizing large numbers — Try mentally visualizing as many
          distinct, individual circles as you can. Eyes closed. Most people
          report that they cannot mentally visualize more than 5-7 distinct
          circles at the same time.
          <br />
          <br />
          Going forward though, I will squish exponential figures down for
          practical reasons, making large numbers like 10,000 appear small
          because the smallest numbers will become too tiny to dispaly with the
          screens' pixels.
          <br />
          <br /> */}
          <h4>More Divisible is Better</h4>
          Numbers divisible by a large number of factors make life easier{' '}
          {`(no nasty decimals!)`} which is another quality we definitely want
          to prioritize. For instance 12 can be evenly divided by 4 factors: 2,
          3, 4, and 6 whereas 14 can only be evenly divided by two factors: 2
          and 7.
          <br />
          <br />
          Like you found the smallest number, you're now tasked with a problem
          with a little more bite to it. Finding the most divisible number{' '}
          {`(less than 10,000)`}. Fear not though, you'll tackle this question
          in chunks.
          <br />
          <br />
          <MostDivisible
            answerState={mostDivisibleAnswerState}
            setAnswerState={setMostDivisibleAnswerState}
            // questionObjects={mostDivisibleQuestions}
            // setQuestionObjects={setMostDivisibleQuestions}
          />
          <h4># of Divisors Plot:</h4>
          <DivisorsPlot />
          <h4>The Tradeoff</h4>
          Ideally these two qualtiies — smallness and divisibility — would go
          hand in hand and you wouldn't have to pick one over the other. Smaller
          numbers would also tend to be more divisible. Is that the case though?
          Unfortunately, there is a trend where as numbers get less small they
          get <em>more</em> divisible. You need to make decisions about how to
          prioritize these two desired qualities.
          {/* A question that requires more experimentation. Use the "Multiply" tool
          provided below to set the number.
          <br />
          <br /> */}
          {/* <IntegerAnswerQuestion
            question={`What is the smallest number between 1 and 10,000?`}
            answer={1}
            decimalPlaceIndex={1}
            answerState={smallestValueAns}
            setAnswerState={setSmallestValueAns}
          /> */}
          {/* <ul>
            <li>
              {' '}
              By hand, large numbers are inconvenient. They take up a lot of
              space on the page and give us hand cramps.{' '}
            </li>
            <br />
            <br />
            <li>
              {' '}
              With computers, we can easily use much bigger numbers. Still,{' '}
              <Em>really</Em> huge numbers eat up more memory eventually
              overwheliming computers despite them having literally billions of
              transistors now-a-days.
            </li>
          </ul> */}
          {/* <br />
          <br />
          If this were taking only smallness consideration, 1 seems like a
          pretty ideal number to choose. But, there's another competing quality
          besides smallness that we want to consider. */}
          The smallest value: 1. <br />
          <br />
          The value with the most divisors: 7560. <br />
          <br />
          We will have to negotiate between our two priorities — finding a small
          number, and finding a number with many divisors.
          <h4>A Humble Model of Smallness</h4>
          <h4>Divisibility</h4>
          Circles that can be divided into more whole number groups help us
          avoid the general gnarly-ness of decimal place values. Decimal places
          tend to make calculations a lot slower when done by hand. Computers
          again have an advantage here, but very precise values, like
          3.0000000000001723, start to be become pretty computationally
          expensive. So, we want to avoid decimals entirely for the exercises
          coming up in favor of nice, whole-number groups that divide evenly
          into our total circle divisions.
        </P>
        <Video href="https://player.vimeo.com/video/796468904?h=dc4303ab13&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" />
        <Spacer />
        {circleDivsionsCanvas}
      </>
    </TopicComponentBoilerPlate2>
  );
};

const Spacer = styled.div`
  height: 30px;
`;

const InfoExpand = styled.div``;

const InfoIconWrapper = styled.div`
  position: absolute;
  height: 15px;
  width: 15px;
  font-size: small;
  right: 0;
  top: 0;
`;

const RamanujanFace = styled(Image)`
  margin: auto;
`;

const Criteria = styled.div`
  display: flex;
  flex-direction: column;
`;

const RelativeWrapper = styled.div`
  /* position: relative; */
  position: relative;
  /* position: static; */
  z-index: 2;
`;

const DivisionsInput = styled(Input)`
  width: 80px;
  display: flex;
  color: ${cl.getHSL(cl.purple)};
  justify-content: center;
  font-size: 1.25rem;
`;

const CollapsableList = styled.ul`
  list-style: none;
  padding-left: 10px;

  & li {
    padding-top: 10px;
  }
`;
const Multiplier = styled.span`
  color: ${cl.getHSL(cl.purple)};
  display: inline;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: baseline;
`;

const PointsAndMultiplierDisplays = styled(Button)`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
`;

const Caption = styled.div`
  font-size: 0.65rem;
  color: ${cl.getHSL(cl.gray_mid)};
  width: min-content;
  @media (pointer: fine) {
  }
  opacity: 1;
`;

const PointsDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.blue)};
  margin-left: auto;
`;

const MultiplierDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.red)};
`;

const UserDivisionsDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.purple)};
`;

const ScoreDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.black)};
`;

export const Ul = styled.ul`
  list-style-position: outside;
`;

const Points = styled.div`
  color: ${cl.getHSL(cl.purple)};
`;
export default smallness_and_divisibility;
