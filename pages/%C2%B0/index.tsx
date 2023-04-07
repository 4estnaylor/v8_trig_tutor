import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import getScene360Divisibility from '../../components/getScenes/degrees/getScene360DivisibilityComparison';
import getSceneDegreesIntro from '../../components/getScenes/degrees/getSceneDegreesIntro';
import getSceneInteriorAngles from '../../components/getScenes/degrees/getSceneInteriorAngles';
import CanvasForTopicComponent from '../../components/HomePage/MyCanvas/CanvasForTopicComponent';
import TopicComponentBoilerPlate from '../../components/TopicComponents/TopicComponentBoilerPlate';

export interface TargetValueObjs {
  value: number;
  completed: boolean;
}

const Degree = () => {
  const [userEnteredDegreeValue, setUserEnteredDegreeValue] = useState(100);
  const [targetValueObjs, setTargetValueObjs] = useState<TargetValueObjs[]>([
    { value: 0, completed: false },
    { value: 90, completed: false },
    { value: 45, completed: false },
    { value: 63, completed: false },
  ]);

  return (
    <TopicComponentBoilerPlate
      title={
        <>
          degrees<span style={{ fontSize: '2.5rem' }}>°</span>
        </>
      }
    >
      <>
        <Canvas1Background>
          <CanvasForTopicComponent
            sceneGetter={getSceneDegreesIntro}
            height={400}
            objectPassedToScene={{ targetValueObjs, setTargetValueObjs }}
          />
        </Canvas1Background>
        <div>{targetValueObjs[0].value}</div>
        <DegreeIntro>
          The degree, or as it is more formily known, the
          <Fancy> arcdegree </Fancy>, is one way to measure an angle. 360 of
          them form a complete circle. The symbol for the degree {`(`} ° {`)`}{' '}
          is, quite appropriately, a tiny circle.
        </DegreeIntro>
        <h3>Why 360? Why not some other number</h3>
        <p>
          Circles don't just exist in nature divided into 360 discrete slices.
          People had to decide on that somehow. So why choose 360 and not some
          other more convenient number? Maybe some power of 10 — 100, 1000, or
          possibly even 1.
          <br />
          <br />
          ¯\_(ツ)_/¯ ultimately, because somebody started doing it that way and
          people went along with it. No law of <em>nature </em> dictates that we
          couldn't all to agree to making it standard to divide a circle into 7
          units instead of 360.
          <br />
          <br />
          But, laws of <em>convenience </em> make a very, very strong case for
          360 degrees. It all boils down to 360 dividing itself into many useful
          fractions (halves, thirds, quarters, fifths, sixths, sevenths, tenths,
          twelfths, ...) without every having to deal with decimal numbers.
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
          The reason we care about this, is that any number which can be made by
          multiplying elements from prime factorizations can divide evenly into
          that number with no decimals involved.{' '}
          <Link href="https://sciencing.com/factors-number-quickly-easily-5192972.html">
            A more detailed explanation here.
          </Link>
        </P>
        <P>
          360's prime factorization turns out to be really good at dividing
          evenly into most numbers less than 20, which is most of the numbers we
          (as in humanity) normally want to divide a circle into.
        </P>
        <h3>
          See if you can find a number that divides evenly by more values than
          360!
        </h3>
        <div
          style={{
            backgroundColor: 'tan',
            position: 'relative',
            display: 'flex',
          }}
        >
          <CanvasForTopicComponent sceneGetter={getScene360Divisibility} />
          <Div360NumInput
            type="number"
            min={0}
            max={1000}
            step={1}
            value={userEnteredDegreeValue}
            onChange={(e) => {
              setUserEnteredDegreeValue(Number(e.target.value));
            }}
          />
          <Div360Title360>360°</Div360Title360>
        </div>
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
  right: calc(25% - 50px);
  top: 10px;
  width: 100px;
  height: 50px;
  flex: 1;
  font-size: 36px;
  background-color: transparent;
  border: none;
  border-bottom: 4px solid ${cl.getHSL(cl.black)};
  text-align: center;
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
  color: ${cl.getHSL(cl.purple)};
  text-align: center;
`;

const Canvas1Background = styled.div`
  background: linear-gradient(
    20deg,
    ${cl.getHSL(cl.purple_dark)},
    ${cl.getHSL(cl.black)}
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
