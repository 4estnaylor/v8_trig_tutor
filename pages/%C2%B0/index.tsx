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

export interface TargetValueObj {
  value: number;
  completed: boolean;
  current?: boolean;
}

const Degree = () => {
  const [userEnteredDegreeValue, setUserEnteredDegreeValue] = useState(1);
  const [changeMe, setChangeMe] = useState(5);
  const [userCircleDivisions, setUserCircleDivisions] = useState(1);
  const [targetValueObjs, setTargetValueObjs] = useState<TargetValueObj[]>([
    { value: 32, completed: false },
    { value: 123, completed: false },
    { value: 206, completed: false },
    { value: 360, completed: false },
  ]);

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
        <InteractiveDegreeDragWrapper>
          <Canvas1Background>
            <CanvasForTopicComponent
              sceneGetter={getSceneDegreesIntro}
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

        <h3>Why 360? Why not some other number</h3>
        <p>
          That a circle has exactly 360° probably feels familiar, maybe even
          natural. Circles don't just divide themselves into 360 discrete slices
          in nature. People had to decide on that very specific value of 360
          somehow. So why choose 360 and not some other more straight forward
          number? Maybe some power of 10 — 100, 1000, or possibly even 1?
          <br />
          <br />
          The simplest answer for why we use 360 – because somebody started
          doing it that way and the rest of humanity went a long with it
          ¯\_(ツ)_/¯.
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
  background: linear-gradient(
    0deg,
    ${cl.getHSL(cl.gray_mid)},
    ${cl.getHSL(cl.gray_dark)}
  );
  /* border-top: 5px solid ${cl.getHSLA(cl.purple, 0.5)};
  border-bottom: 5px solid ${cl.getHSLA(cl.purple, 0.5)}; */
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
