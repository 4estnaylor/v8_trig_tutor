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
    <TopicComponentBoilerPlate2 title="Smallness and Divisibility">
      <>
        <P>
          <Quote
            quote={
              'The test of a first-rate intelligence is the ability to hold two opposed ideas in the mind at the same time, and still retain the ability to function.'
            }
            byLine="F. Scott Fitzgerald"
            source="https://www.esquire.com/lifestyle/a4310/the-crack-up/"
          />
          360 be damned, we are going to clear the slate and search for the very
          best number of divisions for a circle.
          <br />
          <br />
          We'll restrict our search to values less than 10,000.
          <br />
          <br />
          We will create {`(and refine) `} a model to determine which numbers
          would be the best option{`(s)`} to divide a circle into.
          <br />
          <br />
          There are two qualities in particular that our models will focus on —
          smallness and having many divisors. Deciding how exactly we should
          measure these qualities and how much weight we should give them will
          be a task left for you.
          <h4>Smallest</h4>
          This first question below is a little scroll-intensive, but very
          straightforward.
          <br />
          <br />
          <Smallest />
          I made the diagram above so darn tall because otherwise the smallest
          numbers represented by just fractions of a pixel, become too small to
          visibly notice.
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
          <br />
          <h4>Most Divisible</h4>
          A question that requires more experimentation. Use the "Multiply" tool
          provided below to set the number.
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

const Points = styled.div`
  color: ${cl.getHSL(cl.purple)};
`;
export default smallness_and_divisibility;
