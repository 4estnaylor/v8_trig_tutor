import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import getScene360Divisibility from '../../components/getScenes/degrees/getScene360DivisibilityComparison';
import getSceneDegreesIntro from '../../components/getScenes/degrees/getSceneDegreesIntro';
import getSceneInteriorAngles from '../../components/getScenes/degrees/getSceneInteriorAngles';
import CanvasForTopicComponent from '../../components/HomePage/MyCanvas/CanvasForTopicComponent';
import InteractiveCanvas from '../../components/HomePage/MyCanvas/InteractiveCanvas';
import AngleQue from '../../components/Question/AngleQue';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';
import FactorsButtonBar from '../../components/Inputs/FactorsButtonBar';
import NumberInput from '../../components/Inputs/InputForUserCircleDivisions';
import getSceneUserCicrcleDivision from '../../components/getScenes/degrees/getSceneUserCircleDivision';
import AddFactorsButtonBar from '../../components/Inputs/AddFactorsButtonsBar';
import InputForUserCircleDivisions from '../../components/Inputs/InputForUserCircleDivisions';
import getSceneTensHundredsDivisions from '../../components/getScenes/degrees/getSceneTensHundredsDivisions';
import getSceneDegreesBasicPractice from '../../components/getScenes/degrees/getSceneDegreeBasicPractice';
import { Alert, AlertTitle, Button, Collapse, Slider } from '@mui/material';
import Quote from '../../components/Quote/Quote';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ExpandableBullet from '../../components/ExpandableBullet';
import DraggableButton from '../../components/DraggableButton';
import getScene360Intro from '../../components/getScenes/degrees/getScene360Intro';
import QuestionWrapper from '../../components/Question/QuestionWrapper';
import Question from '../api/db/getQuestionObject/[question]';
import QuestionDisplay from '../../components/Question/QuestionDisplay';
import TopPart from '../../components/Question/TopPart';
import BottomPart from '../../components/Question/BottomPart';
import ActionBar from '../../components/Question/ActionBar';
import ToggleTicks from '../../components/niche/Intro/ToggleTicks';
import GeneralSwitchp from '../../components/GeneralSwitch';
import GeneralSwitch from '../../components/GeneralSwitch';
import DragToCorrectAngle from '../../components/niche/Intro/DragToCorrectAngle';
import NegativeAngles from '../../components/niche/Intro/NegativeAngles';
import DragToCorrectAngleWithNegatives from '../../components/niche/Intro/DragToCorrectAngleWithNegatives';
import DragToBigAngles from '../../components/niche/Intro/DragToBigAngles';

export interface TargetValueObj {
  value: number;
  completed: boolean;
  current?: boolean;
}

const Degree = () => {
  const [open, setOpen] = useState(false);
  const [tabletCaptionOpen, setTabletCaptionOpen] = useState(false);
  const [fromScratchValue, setFromScratchValue] = useState(1);
  const [userEnteredDegreeValue, setUserEnteredDegreeValue] = useState(1);
  const [changeMe, setChangeMe] = useState(5);
  const [introCircleDegree, setIntroCircleDegree] = useState(16);
  const [userCircleDivisions, setUserCircleDivisions] = useState(1);
  const [slider360Value, setSlider360Value] = useState(0);
  const slider360ValueRef = useRef(slider360Value);

  useEffect(() => {
    slider360ValueRef.current = slider360Value;
  }, [slider360Value]);

  const [userSelectedPowerOfTenValue, setUserSelectedPowerOfTenValue] =
    useState(2);
  const [targetValueObjs, setTargetValueObjs] = useState<TargetValueObj[]>([
    { value: 32, completed: false },
    { value: 123, completed: false },
    { value: 206, completed: false },
    { value: 360, completed: false },
  ]);

  const [controlledPosition, setControlledPosition] = useState({
    x: 50,
    y: 50,
  });

  const onControlledDrag = (e: Event, position: { x: number; y: number }) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  };

  const introMarks = [
    {
      value: 0,
      label: '0°',
    },
    {
      value: 360,
      label: '360°',
    },
  ];

  const powersOfTenMarks = [
    {
      value: 0,
      label: '1',
    },
    {
      value: 1,
      label: '10',
    },
    {
      value: 2,
      label: '100',
    },
    {
      value: 2.55630250077,
      label: '360',
    },
    {
      value: 3,
      label: '1000',
    },
  ];

  const IntroDegrees = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          sceneGetter={getSceneDegreesIntro}
          height={400}
          objectPassedToScene={{
            introCircleDegree,
            setIntroCircleDegree,
          }}
        />
      </Canvas1Background>
      {/* <MySliderWrapper>
        <MySlider
          max={360}
          value={introCircleDegree}
          onChange={(e: Event, newValue: number | number[]) => {
            setIntroCircleDegree(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={introMarks}
        />
      </MySliderWrapper> */}
    </InteractiveDegreeDragWrapper>
  );

  type betterUnitsModes = 'circle' | 'factors' | 'score breakdown';

  const scoreMultipliers = {
    Ten: 4,
    Hundred: 3,
    Thousand: 2,
  };

  const divisiblityPoints = {
    Ten: 8,
    Twenty: 4,
    Fifty: 2,
    Hundered: 1,
  };

  const notTooBigCollapsable = (
    <NotTooBigWrapper>
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
    </NotTooBigWrapper>
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

  const handle360SliderChange = (event: Event, newValue: number | number[]) => {
    setSlider360Value(newValue as number);
  };

  const slide360Marks = [
    {
      value: 0,
      label: '0°',
    },
    {
      value: 360,
      label: '360°',
    },
  ];

  const circleDivsionsCanvas = (
    <>
      {/* <Criteria>
        <ExpandableBullet pre={2} title={'more divisible'}>
          {dividesNeatlyCollapsable}
        </ExpandableBullet>
        <ExpandableBullet pre={1} title={`smaller`}>
          {notTooBigCollapsable}
        </ExpandableBullet>
      </Criteria> */}

      <InteractiveDegreeDragWrapper>
        {/* <DraggableButton
          controlledPosition={controlledPosition}
          setControlledPosition={setControlledPosition}
        /> */}
        <Canvas1Background>
          <CanvasForTopicComponent
            sceneGetter={getScene360Intro}
            height={350}
            objectPassedToScene={{
              targetValueObjs,
              setTargetValueObjs,
              userCircleDivisions,
              setUserCircleDivisions,
              setControlledPosition,
              controlledPosition,
              slider360ValueRef,
            }}
          ></CanvasForTopicComponent>
        </Canvas1Background>
        <Slider360Wrapper>
          <Slider
            value={slider360Value}
            min={0}
            max={360}
            step={1}
            onChange={handle360SliderChange}
            marks={slide360Marks}
          />
        </Slider360Wrapper>
        {/* <AddFactorsButtonBar setUserEnteredValue={setUserCircleDivisions} /> */}
        {/* <InputForUserCircleDivisions
          value={userCircleDivisions}
          setValue={setUserCircleDivisions}
        /> */}
      </InteractiveDegreeDragWrapper>
    </>
  );

  const tenHundredThousan2 = (
    <InteractiveDegreeDragWrapper>
      <CanvasForTopicComponent
        sceneGetter={getSceneTensHundredsDivisions}
        height={400}
        objectPassedToScene={{
          targetValueObjs,
          setTargetValueObjs,
          userCircleDivisions,
          setUserCircleDivisions,
        }}
      />

      {/* <AddFactorsButtonBar setUserEnteredValue={setUserCircleDivisions} />
      <InputForUserCircleDivisions
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      /> */}
    </InteractiveDegreeDragWrapper>
  );

  const calculateTenScale = (value: number) => {
    return Math.round(10 ** value);
  };

  const tenHundredThousand = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          // style={{position:'relative'}}
          sceneGetter={getSceneTensHundredsDivisions}
          height={400}
          objectPassedToScene={{
            userSelectedPowerOfTenValue,
            setUserSelectedPowerOfTenValue,
          }}
        />
      </Canvas1Background>
      {/* <MySliderWrapper>
        <MySlider
          max={360}
          value={userSelectedPowerOfTenAngleValue}
          onChange={(e: Event, newValue: number | number[]) => {
            setUserSelectedPowerOfTenAngleValue(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={introMarks}
        />
      </MySliderWrapper> */}

      <MySliderWrapper>
        {/* <div
          style={{
            position: 'relative',
            // width: '620px',
            // height: '100px',
            // top: '0',
            // left: '0',
            marginLeft: '40px',
            marginRight: '40px',
          }}
        > */}
        <ExponentialBackground>
          <ExponentialBackgroundFill
            fillValue={userSelectedPowerOfTenValue / 3}
          />
          <ExponentialImage
            src={'/tenExponential.svg'}
            // layout="fill"
            width="620px"
            height="100px"
          />
        </ExponentialBackground>
        {/* </div> */}
        <MySlider
          // sx={{
          //   '& input[type="range"]': {
          //     WebkitAppearance: 'slider-vertical',
          //   },
          //   height: '150px',
          // }}
          max={3}
          step={0.001}
          value={userSelectedPowerOfTenValue}
          scale={calculateTenScale}
          onChange={(e: Event, newValue: number | number[]) => {
            setUserSelectedPowerOfTenValue(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={powersOfTenMarks}
          // orientation="vertical"
        />
      </MySliderWrapper>
    </InteractiveDegreeDragWrapper>
  );

  const basicPractice = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          sceneGetter={getSceneDegreesBasicPractice}
          height={400}
          objectPassedToScene={{
            targetValueObjs,
            setTargetValueObjs,
            userEnteredDegreeValue,
            setUserEnteredDegreeValue,
          }}
        />
        <AngleQue targetValueObjs={targetValueObjs} />
      </Canvas1Background>
    </InteractiveDegreeDragWrapper>
  );

  const handler = () => {};

  return (
    <TopicComponentBoilerPlate
      title={
        <>
          degrees<span style={{ fontSize: '2.5rem' }}>°</span>
        </>
      }
    >
      <>
        {circleDivsionsCanvas}
        {/* <GeneralSwitch handleSwitch={() => {}} /> */}
        {/* <ToggleTicks /> */}
        <DegreeIntro>
          The degree, or more formally, the
          <Fancy> arcdegree </Fancy>, is one way to measure an angle. 360 of
          them form a complete circle. The symbol for the degree {`(`} ° {`)`}{' '}
          is quite fittingly a circle.
        </DegreeIntro>
        <br />
        <br />
        For this course we will generally follow the standard convention of
        starting or anchoring our angles from the rightmost position of a circle
        or "3 o'clock" position.
        <br />
        <br />
        We will follow another standard convention and say that positive angles
        indicate clockwise direction and negative angles indicate
        counter-clockwise direction.
        <br />
        <br />
        <DragToCorrectAngle />
        <NegativeAngles />
        <DragToCorrectAngleWithNegatives />
        <DragToBigAngles />
      </>
    </TopicComponentBoilerPlate>
  );
};

const PhotoCredit = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  border-left: 2px solid ${cl.getHSL(cl.purple)};
`;

const ExponentialBackground = styled.div`
  position: relative;
  background-color: ${cl.getHSLA(cl.purple_light, 0.2)};
`;

const ExponentialBackgroundFill = styled.div<{ fillValue: number }>`
  position: absolute;
  background-color: ${cl.getHSLA(cl.purple, 0.6)};
  height: 100%;
  width: ${(props) => `${props.fillValue * 100}%`};
`;

const ExponentialImage = styled(Image)``;

const MySliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* justify-content: center; */
  padding: 40px;
  padding-top: 0px;
  color: ${cl.getHSLA(cl.purple, 1)};

  /* transform: translateY(-50%); */
  /* z-index: -100; */
`;

const PowersOfTenSlider = styled.div`
  display: 'absolute';
`;

const MySlider = styled(Slider)`
  color: inherit;
  background: 'transparent';
  margin-top: -8px;
  padding-top: 0px;
`;

const MyLink = styled.a`
  color: ${cl.getHSL(cl.purple)};
  display: inline-flex;
`;

const DegreeIntro = styled.p``;
const WhatDoesThisHaveToDoWithTrig = styled.p``;

const Div360NumInput = styled.input`
  position: absolute;
  left: calc(25% - 110px);
  top: 10px;
  width: 220px;
  height: 50px;
  flex: 1;
  font-size: 36px;
  background-color: ${cl.getHSLA(cl.white, 0.2)};
  border-radius: 10px 10px 0px 0px;
  border: none;
  border-bottom: 2px solid ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.white)};
  text-align: center;
`;

const InteractiveDegreeDragWrapper = styled.div`
  /* position: relative; */
  position: relative;
  /* position: static; */
`;

const Criteria = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div360Title360 = styled.div`
  position: absolute;
  left: calc(25% - 50px);
  top: 10px;
  width: 100px;
  height: 50px;
  flex: 1;
  font-size: 36px;
  background-color: transparent;
  border: none;
  color: ${cl.getHSL(cl.purple_light)};
  text-align: center;
`;

const Pi = styled.div`
  color: ${cl.getHSL(cl.purple)};
  font-weight: 400;
  initial-value: 3;
  display: inline;
`;

const BabylonTabletGroup = styled.div`
  max-width: 800px;
`;
const BabylonImgCaption = styled.div`
  font-size: small;
  max-width: 500px;
  margin: auto;
`;

const BabylonImgGroup = styled.div`
  display: flex;
  max-width: 500px;
  margin: auto;
`;

const LongQuote = styled(Quote)`
  width: 500px;
  min-width: 240px;
  max-width: 500px;
`;

const Canvas1Background = styled.div`
  /* position: relative; */
  /* background: linear-gradient(
    0deg,
    ${cl.getHSL(cl.blue_light)},
    ${cl.getHSL(cl.purple_light)},
    ${cl.getHSL(cl.red_light)}
  ); */
  /* /* border-top: 5px solid ${cl.getHSLA(cl.purple, 0.5)}; */
`;

const CollapsableList = styled.ul`
  list-style: none;
  padding-left: 10px;

  & li {
    padding-top: 10px;
  }
`;

const Canvas2Background = styled.div`
  background: ${cl.getHSL(cl.white)};
  /* border-top: 7px solid ${cl.getHSLA(cl.purple, 0.5)};
  border-bottom: 7px solid ${cl.getHSLA(cl.purple, 0.5)}; */
`;

const P = styled.div`
  padding: 5px;
`;

const Multiplier = styled.span`
  color: ${cl.getHSL(cl.purple)};
  display: inline;
`;
const Points = styled.div`
  color: ${cl.getHSL(cl.purple)};
`;

const Fancy = styled.span`
  color: ${cl.getHSL(cl.purple_bright)};
`;

const NotTooBigWrapper = styled.div``;

const Slider360Wrapper = styled.div`
  padding-left: 25%;
  padding-right: 25%;
`;

export default Degree;
