import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
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
import { Slider } from '@mui/material';

export interface TargetValueObj {
  value: number;
  completed: boolean;
  current?: boolean;
}

const Degree = () => {
  const [userEnteredDegreeValue, setUserEnteredDegreeValue] = useState(1);
  const [changeMe, setChangeMe] = useState(5);
  const [introCircleDegree, setIntroCircleDegree] = useState(16);
  const [userCircleDivisions, setUserCircleDivisions] = useState(1);
  const [userSelectedPowerOfTen, setUserSelectedPowerOfTen] = useState(1);
  const [targetValueObjs, setTargetValueObjs] = useState<TargetValueObj[]>([
    { value: 32, completed: false },
    { value: 123, completed: false },
    { value: 206, completed: false },
    { value: 360, completed: false },
  ]);

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
      <MySliderWrapper>
        <MySlider
          max={360}
          value={introCircleDegree}
          onChange={(e: Event, newValue: number | number[]) => {
            setIntroCircleDegree(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={introMarks}
        />
      </MySliderWrapper>
    </InteractiveDegreeDragWrapper>
  );

  const circleDivsionsCanvas = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          sceneGetter={getSceneUserCicrcleDivision}
          height={400}
          objectPassedToScene={{
            targetValueObjs,
            setTargetValueObjs,
            userCircleDivisions,
            setUserCircleDivisions,
          }}
        />
      </Canvas1Background>
      <AddFactorsButtonBar setUserEnteredValue={setUserCircleDivisions} />
      <InputForUserCircleDivisions
        value={userCircleDivisions}
        setValue={setUserCircleDivisions}
      />
    </InteractiveDegreeDragWrapper>
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

  const tenHundredThousand = (
    <InteractiveDegreeDragWrapper>
      <Canvas1Background>
        <CanvasForTopicComponent
          sceneGetter={getSceneTensHundredsDivisions}
          height={400}
          objectPassedToScene={{
            introCircleDegree,
            setIntroCircleDegree,
          }}
        />
      </Canvas1Background>
      <MySliderWrapper>
        <MySlider
          max={360}
          value={introCircleDegree}
          onChange={(e: Event, newValue: number | number[]) => {
            setIntroCircleDegree(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={introMarks}
        />
      </MySliderWrapper>

      {/* <PowersOfTenSlider>
        <MySlider
          sx={{
            '& input[type="range"]': {
              WebkitAppearance: 'slider-vertical',
            },
            height: '150px',
          }}
          max={3}
          value={introCircleDegree}
          onChange={(e: Event, newValue: number | number[]) => {
            setIntroCircleDegree(newValue as number);
          }}
          valueLabelDisplay="auto"
          marks={powersOfTenMarks}
          orientation="vertical"
        />
      </PowersOfTenSlider> */}
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

  return (
    <TopicComponentBoilerPlate
      title={
        <>
          degrees<span style={{ fontSize: '2.5rem' }}>°</span>
        </>
      }
    >
      <>
        <DegreeIntro>
          The degree, or more formally, the
          <Fancy> arcdegree </Fancy>, is one way to measure an angle. 360 of
          them form a complete circle. The symbol for the degree {`(`} ° {`)`}{' '}
          is quite appropriately a tiny circle.
        </DegreeIntro>

        <br />

        {IntroDegrees}
        <p>Why 360? Why not some other number?</p>
        <p>
          That a circle has exactly 360° feels very specific. People had to have
          something in mind when deciding on 360 right? Why not keep things nice
          and metric by choosing some power of 10 like 100 1000, or even 1
          instead?
          <br />
          <br />
        </p>
        {tenHundredThousand}
        <br />
        <br />
        <p>
          The speed of light is <em>natural</em>. If two intelligent lifeforms
          at far ends of the galaxy accurately measure the speed of light, they
          are helpless but to discover the same value — 2.99792458 × 10⁸ meters
          per second. not created by us, but found that way in the wild.
          However, 360 was not.
          <em>convenient</em>. The simplest answer for why we use 360 – because
          somebody started doing it that way and the rest of humanity went a
          long with it ¯\_(ツ)_/¯.
          <br />
          <br />
          No law of <em>nature </em> dictates that we couldn't all to agree to
          making it standard to divide a circle into 7 units instead of 360.
          Nothing is stopping us from choosing any other number we want. Still,
          360 feels too... specific to just be a entirely randomly selected
          number.
          <br />
          <br />
          While laws of nature have no preference for 360 divisions in a circle,
          laws of <em>convenience </em> make a very, very strong case for having
          360 degrees instead of say 10 or 100. It boils down to 360's marvelous
          ability to divide itself into many useful fractions (halves, thirds,
          quarters, fifths, sixths, sevenths, tenths, twelfths, ...) without
          every having to deal with decimal numbers.
          {/* <br /> <br /> */}
          {/* ¯\_(ツ)_/¯ Admittedly, sometimes in math we (as in humanity) just get
          stuck in our ways and make life more complicated than we need to. But,
          this isn't one of those cases! 360 degrees is much easier than 100 to
          divide without leaving the world of nice "round" or integer numbers. */}
          <br /> <br />
          To understand why let's examine the multiplicative DNA of 360 and 100.
          Here are the
          <Fancy> prime factorizations </Fancy> for 360 and another for 100.
        </p>
        <div
          style={{
            width: '100%',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'space-evenly',
            paddingBottom: '25px',
          }}
        >
          <Image src="/360_factorization.png" width={175} height={320} />
          <Image src="/100_factorization.png" width={175} height={320} />
        </div>
        <P>
          {/* Any number a, that can be divided evenly into another number b, must
          be a product of the prime factors of b. Ufff, rewritten 3 times and
          that last sentence is <em> still </em> an earful. If it has been
          awhile since you've used Common Factors (GCFs and LCMs), it may make
          more sense with a concrete example: */}
          The reason we care about prime factorization, is that any other number
          which can be made by multiplying the factors of a number's prime
          factorizations can divide evenly into that number with no decimals
          involved.{' '}
          <Link href="https://www.cuemath.com/numbers/prime-factorization/">
            A more detailed explanation here.
          </Link>
        </P>
        <P>
          360's prime factorization is abnormally good at dividing evenly into
          most numbers less than 20, which is most of the numbers that in
          practice, historically — especially for sailors navigating celestial,
          humanity has wanted to precisely divide a circle into.
        </P>
        <h3>
          See if you can find an alternative that divides evenly by more values
          than 360!
        </h3>

        <P>
          {' '}
          I'd encourage you to take advantage of the feature to add prime
          factors. Rather than starting at a final number and testing by trial
          and error, try building your number from the ground up by "feeding" it
          more prime factors to meet the requirements!
        </P>
        <br />

        {circleDivsionsCanvas}
        {/* <h3>Using degrees to measure triangles</h3>
        <p>
          Our eventual goal is to know everything there is to know about
          triangles. For now, let's start by zeroing in on the angles of a
          triangle rather than its sides.
          <br />
          <br />
          At each corner or ~ <Fancy> vertex </Fancy> ~ of a triangle we will
          find an <Fancy> interior </Fancy> (inside) angle, and an{' '}
          <Fancy> exterior </Fancy> (outside) angle.
        </p>
        <Canvas2Background>
          <CanvasForTopicComponent
            sceneGetter={getSceneInteriorAngles}
            height={400}
          />
        </Canvas2Background> */}
      </>
    </TopicComponentBoilerPlate>
  );
};

const MySliderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
  color: ${cl.getHSLA(cl.purple, 1)};
`;

const PowersOfTenSlider = styled.div`
  display: 'absolute';
`;

const MySlider = styled(Slider)`
  color: inherit;
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
  /* position: static; */
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

const Canvas2Background = styled.div`
  background: ${cl.getHSL(cl.white)};
  /* border-top: 7px solid ${cl.getHSLA(cl.purple, 0.5)};
  border-bottom: 7px solid ${cl.getHSLA(cl.purple, 0.5)}; */
`;

const P = styled.div`
  padding: 5px;
`;

const Fancy = styled.span`
  color: ${cl.getHSL(cl.purple_bright)};
`;

export default Degree;
