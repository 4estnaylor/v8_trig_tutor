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
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import P from '../../components/P';
import Em from '../../components/Em';
import RemoveFactors from '../../components/smallness and divisibility/RemoveFactors';

const smallness_and_divisibility = () => {
  const [userCircleDivisions, setUserCircleDivisions] = useState(1);
  const [points, setPoints] = useState(8);
  const [multiplier, setMultiplier] = useState(4);
  const [factors, setFactors] = useState<number[]>([1]);
  const scoreMultipliers = {
    Ten: 8,
    Hundred: 4,
    Thousand: 2,
  };

  const divisiblityPoints = {
    Ten: 8,
    Twenty: 4,
    Fifty: 2,
    Hundered: 1,
  };

  const [controlledPosition, setControlledPosition] = useState({
    x: 50,
    y: 50,
  });

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

    newMultiplier = 10 * ((4 - Math.log10(userCircleDivisions)) / 3);

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
      <BottomBar>
        <PointsDisplay sx={{ color: cl.getHSL(cl.blue) }}>
          <Caption>
            points
            <div style={{ display: 'flex' }}>
              <InfoIcon />
              <ExpandMoreIcon />
            </div>
          </Caption>
          {points}
        </PointsDisplay>

        <MultiplierDisplay>
          {' '}
          <Caption>
            multiplier
            <InfoExpand>
              <InfoIcon />
              <ExpandMoreIcon />
            </InfoExpand>
          </Caption>
          × {multiplier}
        </MultiplierDisplay>
        <ScoreDisplay>
          <Caption>
            score
            <InfoIcon />
          </Caption>
          {points * multiplier}
        </ScoreDisplay>
      </BottomBar>
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
      <InputForUserCircleDivisions
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      />
      <AddFactorsButtonBar setUserEnteredValue={setUserCircleDivisions} />
      <RemoveFactors
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      />
    </>
  );
  return (
    <TopicComponentBoilerPlate2 title="Smallness and Divisibility">
      <>
        <P>
          Forget everything you know about dividing circles, we are going to
          start with a fresh slate.
          <br />
          <br />
          There are two qualities in particular that can make our lives easier
          when using angles.
          <h4>Smallness</h4>
          This one is pretty straight-forward.
          <br />
          <br />
          <ul>
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
          </ul>
          <br />
          <br />
          If this were taking only smallness consideration, 1 seems like a
          pretty ideal number to choose. But, there's another competing quality
          besides smallness that we want to consider.
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
  z-index: 99999;
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
`;

const MultiplierDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.red)};
`;

const ScoreDisplay = styled(PointsAndMultiplierDisplays)`
  color: ${cl.getHSL(cl.black)};
  margin-left: auto;
`;

const Points = styled.div`
  color: ${cl.getHSL(cl.purple)};
`;
export default smallness_and_divisibility;
